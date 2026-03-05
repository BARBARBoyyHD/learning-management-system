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
 * - And redirected to questions editor to add questions
 */

import { AssessmentForm } from '@/components/assessments/assessment-form'
import { requireAuth } from '@/lib/auth-server'

export default async function CreateQuizPage() {
  // Check if user is authenticated
  await requireAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Create Quiz</h1>
        <p className="mt-2 text-neutral-400">
          Set up your quiz details. After saving, you'll add questions.
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <AssessmentForm />
      </div>
    </div>
  )
}
