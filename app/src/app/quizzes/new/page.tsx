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

export default async function CreateQuizPage() {
  // Check if user is authenticated
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Redirect to login if not authenticated
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-semibold text-neutral-900">
            Create Quiz
          </h1>
          <p className="mt-1 text-sm text-neutral-600">
            Set up your quiz details and settings
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <AssessmentForm />
        </div>
      </main>
    </div>
  )
}
