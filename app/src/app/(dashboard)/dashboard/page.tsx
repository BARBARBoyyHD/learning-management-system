import { StatisticsCards } from '@/components/dashboard/statistics-cards'
import { QuizList } from '@/components/quizzes/quiz-list'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'

/**
 * Teacher Dashboard Page
 * 
 * Main landing page for teachers after login.
 * Displays quiz statistics and quiz listing.
 */
export default async function DashboardPage() {
  // TODO: Fetch quiz data from API when implemented
  // For now, show empty state
  const stats = {
    total: 0,
    published: 0,
    draft: 0,
    archived: 0,
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
          href="/quizzes/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary-base px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-hover transition-colors shadow-lg shadow-primary-base/20"
        >
          <PlusCircle className="h-4 w-4" />
          Create Quiz
        </Link>
      </div>

      {/* Statistics Cards */}
      <StatisticsCards stats={stats} />

      {/* Quiz List */}
      <QuizList quizzes={[]} />
    </div>
  )
}
