/**
 * Submit Quiz API
 *
 * Submits quiz and calculates score.
 * Called when student clicks "Submit Quiz".
 *
 * POST /api/v1/quiz/[quizId]/submit
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ quizId: string }> }
) {
  try {
    const { quizId } = await params
    const body = await request.json()
    const { userId, answers } = body

    // Validate required fields
    if (!userId || !answers) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify quiz exists
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    })

    if (!quiz) {
      return NextResponse.json(
        { success: false, error: 'Quiz not found' },
        { status: 404 }
      )
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Find or create student response
    let response = await prisma.studentResponse.findFirst({
      where: {
        userId,
        quizId,
      },
    })

    if (!response) {
      response = await prisma.studentResponse.create({
        data: {
          userId,
          quizId,
          score: 0,
        },
      })
    }

    // Calculate score
    let totalScore = 0
    const questionIdToAnswer = new Map<string, string>()

    // Process each answer
    for (const [questionId, answer] of Object.entries(answers)) {
      questionIdToAnswer.set(questionId, answer as string)

      // Find the question
      const question = quiz.questions.find((q) => q.id === questionId)
      if (!question) continue

      // Find the selected option
      const selectedOption = question.options.find(
        (opt) => opt.id === answer
      )

      // Check if correct and add points
      if (selectedOption?.isCorrect) {
        totalScore += question.points
      }

      // Update or create response detail
      const detail = await prisma.responseDetail.findFirst({
        where: {
          responseId: response!.id,
          questionId,
        },
      })

      if (detail) {
        await prisma.responseDetail.update({
          where: { id: detail.id },
          data: {
            answerGiven: answer as string,
            isCorrect: selectedOption?.isCorrect ?? false,
          },
        })
      } else {
        await prisma.responseDetail.create({
          data: {
            responseId: response!.id,
            questionId,
            answerGiven: answer as string,
            isCorrect: selectedOption?.isCorrect ?? false,
          },
        })
      }
    }

    // Update response with final score
    await prisma.studentResponse.update({
      where: { id: response.id },
      data: {
        score: totalScore,
        completedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      score: totalScore,
      totalQuestions: quiz.questions.length,
      message: 'Quiz submitted successfully',
    })
  } catch (error) {
    console.error('Error submitting quiz:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit quiz' },
      { status: 500 }
    )
  }
}
