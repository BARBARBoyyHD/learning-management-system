/**
 * Save Answer API
 *
 * Auto-saves student answers during quiz.
 * Called every time student selects an answer.
 *
 * POST /api/v1/quiz/[quizId]/answer
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
    const { userId, questionId, answer } = body

    // Validate required fields
    if (!userId || !questionId || !answer) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify quiz exists
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
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

    // Verify question exists and belongs to quiz
    const question = await prisma.question.findFirst({
      where: {
        id: questionId,
        quizId,
      },
    })

    if (!question) {
      return NextResponse.json(
        { success: false, error: 'Question not found' },
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

    // Find or create response detail
    let detail = await prisma.responseDetail.findFirst({
      where: {
        responseId: response.id,
        questionId,
      },
    })

    if (detail) {
      // Update existing answer
      await prisma.responseDetail.update({
        where: { id: detail.id },
        data: { answerGiven: answer },
      })
    } else {
      // Create new answer
      await prisma.responseDetail.create({
        data: {
          responseId: response.id,
          questionId,
          answerGiven: answer,
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Answer saved',
    })
  } catch (error) {
    console.error('Error saving answer:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save answer' },
      { status: 500 }
    )
  }
}
