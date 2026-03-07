/**
 * Quiz Results API
 *
 * Returns all student responses and scores for a quiz.
 * Only accessible by the quiz owner (teacher).
 *
 * GET /api/v1/quizzes/[id]/results
 */

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Check authentication
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get quiz with all responses and student info
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        teacherId: true,
        questions: {
          select: {
            id: true,
            questionText: true,
            points: true,
            questionType: true,
          },
          orderBy: { orderIndex: 'asc' },
        },
        responses: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            details: {
              select: {
                questionId: true,
                answerGiven: true,
                isCorrect: true,
              },
            },
          },
          orderBy: { completedAt: 'desc' },
        },
      },
    })

    // Quiz not found
    if (!quiz) {
      return NextResponse.json(
        { error: 'Quiz not found' },
        { status: 404 }
      )
    }

    // Check if user owns this quiz
    if (quiz.teacherId !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden: You can only view results for your own quizzes' },
        { status: 403 }
      )
    }

    // Calculate total points
    const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0)

    // Format responses
    const formattedResponses = quiz.responses.map(response => ({
      id: response.id,
      userId: response.userId,
      score: response.score,
      completedAt: response.completedAt,
      user: response.user,
      details: response.details.map(detail => ({
        questionId: detail.questionId,
        answerGiven: detail.answerGiven,
        isCorrect: detail.isCorrect,
      })),
    }))

    // Format questions
    const formattedQuestions = quiz.questions.map(question => ({
      id: question.id,
      questionText: question.questionText,
      points: question.points,
      questionType: question.questionType,
    }))

    return NextResponse.json({
      success: true,
      quiz: {
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        questions: formattedQuestions,
        totalPoints,
      },
      responses: formattedResponses,
      statistics: {
        totalSubmissions: formattedResponses.length,
        averageScore: formattedResponses.length > 0
          ? Math.round(
              formattedResponses.reduce((acc, r) => acc + (r.score || 0), 0) /
              formattedResponses.length
            )
          : 0,
        highestScore: formattedResponses.length > 0
          ? Math.max(...formattedResponses.map(r => r.score || 0))
          : 0,
        lowestScore: formattedResponses.length > 0
          ? Math.min(...formattedResponses.map(r => r.score || 0))
          : 0,
      },
    })
  } catch (error) {
    console.error('Error fetching quiz results:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch quiz results' },
      { status: 500 }
    )
  }
}
