/**
 * Quiz Results Page
 *
 * Shows quiz results after submission.
 * Displays score, percentage, and question review.
 *
 * Route: /join/[quizId]/result
 */

import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { ResultsDisplay } from '@/components/guest/results-display'

/**
 * Page Props
 */
interface ResultsPageProps {
  params: Promise<{
    quizId: string
  }>
  searchParams: Promise<{
    userId: string
  }>
}

/**
 * Results Page Component
 */
export default async function ResultsPage({ params, searchParams }: ResultsPageProps) {
  const { quizId } = await params
  const { userId } = await searchParams

  // Fetch quiz with questions and user's response
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      questions: {
        orderBy: { orderIndex: 'asc' },
        include: {
          options: true,
        },
      },
    },
  })

  // Quiz not found
  if (!quiz) {
    notFound()
  }

  // Fetch user's response
  const response = await prisma.studentResponse.findFirst({
    where: {
      userId,
      quizId,
    },
    include: {
      details: {
        include: {
          question: {
            include: {
              options: true,
            },
          },
        },
      },
    },
  })

  // Response not found
  if (!response) {
    notFound()
  }

  // Fetch user details
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    notFound()
  }

  // Calculate results
  const totalQuestions = quiz.questions.length
  const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0)
  const earnedPoints = response.score || 0
  const percentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0

  // Map user's answers to questions
  const questionResults = quiz.questions.map((question) => {
    const userResponse = response.details.find(
      (detail) => detail.questionId === question.id
    )

    const userAnswer = question.options.find(
      (opt) => opt.id === userResponse?.answerGiven
    )

    const correctAnswer = question.options.find((opt) => opt.isCorrect)

    return {
      question: {
        id: question.id,
        text: question.questionText,
        type: question.questionType,
        points: question.points,
      },
      userAnswer: userAnswer
        ? {
            id: userAnswer.id,
            text: userAnswer.option,
            isCorrect: userAnswer.isCorrect,
          }
        : null,
      correctAnswer: correctAnswer
        ? {
            id: correctAnswer.id,
            text: correctAnswer.option,
          }
        : null,
      isCorrect: userAnswer?.isCorrect ?? false,
      earnedPoints: userAnswer?.isCorrect ? question.points : 0,
    }
  })

  return (
    <div className="w-full max-w-4xl">
      <ResultsDisplay
        quiz={quiz}
        studentName={user.name}
        score={earnedPoints}
        totalScore={totalPoints}
        percentage={percentage}
        totalQuestions={totalQuestions}
        questionResults={questionResults}
      />
    </div>
  )
}
