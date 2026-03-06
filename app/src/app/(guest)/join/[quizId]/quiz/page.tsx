/**
 * Quiz Taking Page
 *
 * Main quiz interface where students answer questions.
 * Supports multiple question types with navigation.
 *
 * Route: /join/[quizId]/quiz
 */

import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { QuizInterface } from '@/components/guest/quiz-interface'

/**
 * Page Props
 */
interface QuizPageProps {
  params: Promise<{
    quizId: string
  }>
  searchParams: Promise<{
    userId: string
    question?: string
  }>
}

/**
 * Quiz Page Component
 */
export default async function QuizPage({ params, searchParams }: QuizPageProps) {
  const { quizId } = await params
  const { userId, question: questionIndex } = await searchParams
  const currentIndex = questionIndex ? parseInt(questionIndex, 10) : 0

  // Fetch quiz with all questions and options
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      questions: {
        orderBy: { orderIndex: 'asc' },
        include: {
          options: {
            orderBy: { sortOrder: 'asc' },
          },
        },
      },
    },
  })

  // Quiz not found
  if (!quiz) {
    notFound()
  }

  // Verify user exists
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    notFound()
  }

  // Validate question index
  if (currentIndex < 0 || currentIndex >= quiz.questions.length) {
    notFound()
  }

  return (
    <div className="w-full max-w-4xl">
      <QuizInterface
        quiz={quiz}
        questions={quiz.questions}
        currentQuestionIndex={currentIndex}
        userId={userId}
      />
    </div>
  )
}
