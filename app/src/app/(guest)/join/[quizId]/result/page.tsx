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

    // For essay questions, the answer is stored directly in answerGiven
    // For multiple choice, we look up the option text
    const isEssay = question.questionType === 'essay'
    
    const userAnswerObj = isEssay
      ? {
          id: 'essay-answer',
          text: userResponse?.answerGiven || '',
          isCorrect: userResponse?.isCorrect ?? null, // null means needs grading
        }
      : question.options.find((opt) => opt.id === userResponse?.answerGiven)

    const correctAnswer = isEssay
      ? null // Essays don't have a single correct answer
      : question.options.find((opt) => opt.isCorrect)

    // For essay questions, check if answered (not graded yet)
    const isCorrect = isEssay
      ? userResponse?.isCorrect ?? (userResponse?.answerGiven ? null : false)
      : userAnswerObj?.isCorrect ?? false

    return {
      question: {
        id: question.id,
        text: question.questionText,
        type: question.questionType,
        points: question.points,
      },
      userAnswer: userAnswerObj
        ? {
            id: userAnswerObj.id,
            text: 'option' in userAnswerObj ? userAnswerObj.option : userAnswerObj.text,
            isCorrect: userAnswerObj.isCorrect,
          }
        : null,
      correctAnswer: correctAnswer
        ? {
            id: correctAnswer.id,
            text: correctAnswer.option,
          }
        : null,
      isCorrect: isCorrect,
      earnedPoints: isCorrect === true ? question.points : 0,
      needsGrading: isEssay && userResponse?.isCorrect === null,
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
