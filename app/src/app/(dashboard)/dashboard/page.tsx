import { StatisticsCards } from '@/components/dashboard/statistics-cards'
import { QuizList } from '@/components/quizzes/quiz-list'
import { quizService } from '@/services/quiz.service'
import { getSession } from '@/lib/auth-server'
import Link from 'next/link'

/**
 * Teacher Dashboard Page
 */
export default async function DashboardPage() {
  const { data: { user } } = await getSession()

  // Fetch quiz data if user is authenticated
  let stats = {
    total: 0,
    published: 0,
    draft: 0,
  }
  let quizzes: import('@/types/quiz').Quiz[] = []

  if (user) {
    const userId = user.id

    const [statsData, quizzesData] = await Promise.all([
      quizService.getStats(userId),
      quizService.getByTeacher(userId),
    ])

    stats = statsData
    quizzes = quizzesData
  }

  return (
    <div className="space-y-8">
      {/* Page Header with Action */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="mt-2 text-neutral-400">
            Manage your quizzes and track student progress
          </p>
        </div>

        <Link
          href="/teacher/quizzes/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary-base px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-hover transition-colors shadow-lg shadow-primary-base/20"
        >
          <span className="material-symbols-outlined">add_circle</span>
          Create Quiz
        </Link>
      </div>

      {/* Statistics Cards */}
      <StatisticsCards stats={stats} />

      {/* Quiz List */}
      <QuizList quizzes={quizzes} />
    </div>
  )
}
