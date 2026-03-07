/**
 * Teacher Quiz Results Page
 *
 * Shows all student submissions for a quiz.
 * Teacher can view individual student answers and export results.
 *
 * Route: /dashboard/quizzes/[quizId]/results
 */

import { prisma } from '@/lib/prisma'
import { createServerClient } from '@/lib/supabase/server'
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
  const supabase = await createServerClient()
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
          <h1 className="text-3xl font-bold text-text-primary mb-2">Quiz Results</h1>
          <p className="text-text-secondary">{quiz.title}</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-border-primary bg-bg-secondary p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined h-6 w-6 text-text-secondary">people</span>
            <span className="text-sm text-text-secondary">Total Students</span>
          </div>
          <p className="text-2xl font-bold text-text-primary">{totalStudents}</p>
        </div>

        <div className="rounded-xl border border-border-primary bg-bg-secondary p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined h-6 w-6 text-text-secondary">trending_up</span>
            <span className="text-sm text-text-secondary">Average Score</span>
          </div>
          <p className="text-2xl font-bold text-text-primary">{averageScore}/{totalPoints}</p>
        </div>

        <div className="rounded-xl border border-border-primary bg-bg-secondary p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined h-6 w-6 text-text-secondary">percent</span>
            <span className="text-sm text-text-secondary">Average %</span>
          </div>
          <p className="text-2xl font-bold text-success-base">{averagePercentage}%</p>
        </div>

        <div className="rounded-xl border border-border-primary bg-bg-secondary p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined h-6 w-6 text-text-secondary">assignment</span>
            <span className="text-sm text-text-secondary">Total Points</span>
          </div>
          <p className="text-2xl font-bold text-text-primary">{totalPoints}</p>
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
