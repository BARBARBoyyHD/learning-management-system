/**
 * Quiz Edit Page
 *
 * Main quiz editor showing quiz details and question list.
 * Teachers can add, edit, and manage questions for this quiz.
 */

import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import { QuizEditor } from '@/components/quizzes/quiz-editor'
import Link from 'next/link'

export default async function QuizEditPage(props: {
  params: Promise<{ quizId: string }>
}) {
  const params = await props.params
  const { quizId } = params

  // Check authentication
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get quiz with questions
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

  // Quiz not found or user doesn't own it
  if (!quiz || quiz.teacherId !== user.id) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="border-b border-border-primary bg-bg-secondary sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-text-secondary mb-1">
                <Link href="/dashboard" className="hover:text-text-primary transition-colors">Dashboard</Link>
                <span className="material-symbols-outlined h-4 w-4">chevron_right</span>
                <Link href="/teacher/quizzes" className="hover:text-text-primary transition-colors">My Quizzes</Link>
                <span className="material-symbols-outlined h-4 w-4">chevron_right</span>
                <span className="text-text-primary">{quiz.title}</span>
              </div>
              <h1 className="text-2xl font-bold text-text-primary">{quiz.title}</h1>
              <p className="mt-1 text-sm text-text-secondary">
                Edit questions and settings
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/teacher/quizzes/${quizId}/results`}
                className="inline-flex items-center gap-2 rounded-xl bg-bg-tertiary px-4 py-2.5 text-sm font-medium text-text-primary hover:bg-bg-secondary transition-colors"
              >
                <span className="material-symbols-outlined">analytics</span>
                View Results
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <QuizEditor quiz={quiz} />
      </main>
    </div>
  )
}
