/**
 * Quiz Start Page
 *
 * Welcome screen shown before student starts the quiz.
 * Displays quiz info and "Start Quiz" button.
 *
 * Route: /join/[quizId]/start
 */

import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { StartQuizForm } from '@/components/guest/start-quiz-form'

/**
 * Page Props
 */
interface QuizStartPageProps {
  params: Promise<{
    quizId: string
  }>
  searchParams: Promise<{
    userId: string
  }>
}

/**
 * Quiz Start Page Component
 */
export default async function QuizStartPage({ params, searchParams }: QuizStartPageProps) {
  const { quizId } = await params
  const { userId } = await searchParams

  // Fetch quiz details with questions
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      teacher: {
        select: { name: true },
      },
      questions: {
        select: {
          id: true,
          questionType: true,
          points: true,
          orderIndex: true,
        },
        orderBy: { orderIndex: 'asc' },
      },
    },
  })

  // Quiz not found
  if (!quiz) {
    notFound()
  }

  // Calculate total points
  const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0)

  return (
    <div className="w-full max-w-2xl">
      {/* Welcome Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="material-symbols-outlined h-12 w-12 text-primary-base">quiz</span>
          <h1 className="text-3xl font-bold text-white">Quiz Ready!</h1>
        </div>
        <p className="text-neutral-400">
          Welcome, let&apos;s get you started
        </p>
      </div>

      {/* Quiz Info Card */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">{quiz.title}</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Teacher */}
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined h-6 w-6 text-neutral-400">person</span>
            <div>
              <p className="text-xs text-neutral-500">Teacher</p>
              <p className="text-sm text-white">{quiz.teacher.name}</p>
            </div>
          </div>

          {/* Questions */}
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined h-6 w-6 text-neutral-400">library_books</span>
            <div>
              <p className="text-xs text-neutral-500">Questions</p>
              <p className="text-sm text-white">{quiz.questions.length}</p>
            </div>
          </div>

          {/* Points */}
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined h-6 w-6 text-neutral-400">star</span>
            <div>
              <p className="text-xs text-neutral-500">Total Points</p>
              <p className="text-sm text-white">{totalPoints}</p>
            </div>
          </div>

          {/* Time Limit */}
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined h-6 w-6 text-neutral-400">schedule</span>
            <div>
              <p className="text-xs text-neutral-500">Time Limit</p>
              <p className="text-sm text-white">
                {quiz.timeLimit ? `${quiz.timeLimit} minutes` : 'No limit'}
              </p>
            </div>
          </div>
        </div>

        {/* Question Types */}
        {quiz.questions.length > 0 && (
          <div className="border-t border-neutral-800 pt-4">
            <p className="text-xs text-neutral-500 mb-2">Question Types:</p>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(quiz.questions.map(q => q.questionType))).map(type => (
                <span
                  key={type}
                  className="px-3 py-1 rounded-full text-xs bg-primary-base/10 text-primary-light"
                >
                  {type.replace('_', ' ')}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-4 mb-6">
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined h-4 w-4 text-info-base">info</span>
          Instructions
        </h3>
        <ul className="space-y-2 text-sm text-neutral-400">
          <li className="flex items-start gap-2">
            <span className="material-symbols-outlined h-4 w-4 text-neutral-500 mt-0.5">check_circle</span>
            <span>Answer all questions to the best of your ability</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="material-symbols-outlined h-4 w-4 text-neutral-500 mt-0.5">check_circle</span>
            <span>
              {quiz.timeLimit 
                ? `You have ${quiz.timeLimit} minutes to complete the quiz`
                : 'Take your time, there is no time limit'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="material-symbols-outlined h-4 w-4 text-neutral-500 mt-0.5">check_circle</span>
            <span>Your answers are saved automatically</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="material-symbols-outlined h-4 w-4 text-neutral-500 mt-0.5">check_circle</span>
            <span>You can navigate between questions using Next/Previous buttons</span>
          </li>
        </ul>
      </div>

      {/* Start Button */}
      <StartQuizForm quizId={quizId} userId={userId} />
    </div>
  )
}
