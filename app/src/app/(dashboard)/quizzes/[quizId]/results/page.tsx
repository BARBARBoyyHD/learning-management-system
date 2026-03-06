/**
 * Teacher Quiz Results Page
 *
 * Shows all student submissions for a quiz.
 * Teacher can view individual student answers and export results.
 *
 * Route: /dashboard/quizzes/[quizId]/results
 */

import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { ResultsList } from '@/components/teacher/results-list'

/**
 * Page Props
 */
interface ResultsPageProps {
  params: Promise<{
    quizId: string
  }>
}

/**
 * Results Page Component
 */
export default async function QuizResultsPage({ params }: ResultsPageProps) {
  const { quizId } = await params

  // Check authentication
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch quiz with all student responses
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      responses: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          completedAt: 'desc',
        },
      },
      questions: {
        select: {
          id: true,
          questionText: true,
          points: true,
        },
      },
    },
  })

  // Quiz not found or user doesn't own it
  if (!quiz || quiz.teacherId !== user.id) {
    notFound()
  }

  // Calculate statistics
  const totalStudents = quiz.responses.length
  const averageScore = totalStudents > 0
    ? Math.round(quiz.responses.reduce((sum, r) => sum + (r.score || 0), 0) / totalStudents)
    : 0
  const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0)
  const averagePercentage = totalPoints > 0
    ? Math.round((averageScore / totalPoints) * 100)
    : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Quiz Results</h1>
          <p className="text-neutral-400">{quiz.title}</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined h-6 w-6 text-neutral-400">people</span>
            <span className="text-sm text-neutral-400">Total Students</span>
          </div>
          <p className="text-2xl font-bold text-white">{totalStudents}</p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined h-6 w-6 text-neutral-400">trending_up</span>
            <span className="text-sm text-neutral-400">Average Score</span>
          </div>
          <p className="text-2xl font-bold text-white">{averageScore}/{totalPoints}</p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined h-6 w-6 text-neutral-400">percent</span>
            <span className="text-sm text-neutral-400">Average %</span>
          </div>
          <p className="text-2xl font-bold text-success-base">{averagePercentage}%</p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined h-6 w-6 text-neutral-400">assignment</span>
            <span className="text-sm text-neutral-400">Total Points</span>
          </div>
          <p className="text-2xl font-bold text-white">{totalPoints}</p>
        </div>
      </div>

      {/* Student Results List */}
      <ResultsList
        quiz={quiz}
        responses={quiz.responses}
        totalPoints={totalPoints}
      />
    </div>
  )
}
