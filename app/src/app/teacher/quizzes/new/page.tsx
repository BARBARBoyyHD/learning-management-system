/**
 * Create Quiz Page
 *
 * Assessment editor page for creating new quizzes.
 * Teachers can set title, description, and quiz settings.
 *
 * Acceptance Criteria (US-M3-01):
 * - Given I am a teacher
 * - When I click "Create Quiz" and fill the form
 * - Then quiz is created with me as owner
 */

import { AssessmentForm } from '@/components/assessments/assessment-form'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function CreateQuizPage() {
  // Check if user is authenticated
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Redirect to login if not authenticated
  if (!user) {
    redirect('/login')
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
                <span className="text-text-primary">Create Quiz</span>
              </div>
              <h1 className="text-2xl font-bold text-text-primary">Create Quiz</h1>
              <p className="mt-1 text-sm text-text-secondary">
                Set up your quiz details and settings
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <AssessmentForm />
      </main>
    </div>
  )
}
