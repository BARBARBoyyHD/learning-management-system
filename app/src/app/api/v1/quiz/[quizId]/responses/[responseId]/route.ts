/**
 * Get Response Details API
 *
 * Returns detailed answers for a student's quiz response.
 *
 * GET /api/v1/quiz/[quizId]/responses/[responseId]
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ quizId: string; responseId: string }> }
) {
  try {
    const { quizId, responseId } = await params

    // Fetch response details with question info
    const details = await prisma.responseDetail.findMany({
      where: { responseId },
      include: {
        question: {
          select: {
            id: true,
            questionText: true,
            questionType: true,
            options: {
              select: {
                id: true,
                option: true,
                isCorrect: true,
              },
            },
          },
        },
      },
    })

    // Format details
    const formattedDetails = details.map(detail => ({
      questionId: detail.questionId,
      questionText: detail.question.questionText,
      answerGiven: detail.answerGiven,
      isCorrect: detail.isCorrect,
      correctAnswer: detail.question.options.find(opt => opt.isCorrect)?.option,
    }))

    return NextResponse.json({
      success: true,
      details: formattedDetails,
    })
  } catch (error) {
    console.error('Error fetching response details:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch response details' },
      { status: 500 }
    )
  }
}
