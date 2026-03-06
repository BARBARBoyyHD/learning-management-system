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
      {/* Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-primary-base p-8 md:p-12 text-white">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4 max-w-xl">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Welcome back, Instructor!</h2>
            <p className="text-white/80 text-lg opacity-90 leading-relaxed">
              Ready to create engaging quizzes for your students today? Check your latest reports and performance metrics below.
            </p>
            <div className="flex gap-4 pt-2">
              <Link
                href="/teacher/quizzes/new"
                className="bg-white text-primary-base px-6 py-3 rounded-xl font-bold hover:bg-neutral-100 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/dashboard/reports"
                className="bg-primary-base/20 border border-white/30 text-white px-6 py-3 rounded-xl font-bold backdrop-blur-sm hover:bg-primary-base/30 transition-colors"
              >
                View Reports
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="size-48 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 flex items-center justify-center transform rotate-6">
              <span className="material-symbols-outlined text-7xl text-white">auto_awesome</span>
            </div>
          </div>
        </div>
        {/* Background shapes */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 size-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 size-64 bg-black/10 rounded-full blur-2xl"></div>
      </section>

      {/* Statistics Cards */}
      <StatisticsCards stats={stats} />

      {/* Quiz List */}
      <QuizList quizzes={quizzes} />
    </div>
  )
}
