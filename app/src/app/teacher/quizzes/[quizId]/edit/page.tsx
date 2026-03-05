/**
 * Edit Quiz Page
 *
 * Page for editing quiz metadata.
 */

import { QuizMetadataForm } from '@/components/quizzes/quiz-metadata-form'
import { quizService } from '@/services/quiz.service'
import { requireAuth } from '@/lib/auth-server'
import { notFound } from 'next/navigation'

/**
 * Edit Quiz Page Props
 */
interface EditQuizPageProps {
  params: Promise<{
    quizId: string
  }>
}

/**
 * Edit Quiz Page Component
 */
export default async function EditQuizPage({ params }: EditQuizPageProps) {
  // Authenticate user
  await requireAuth()

  // Get quiz ID from params
  const { quizId } = await params

  // Fetch quiz data
  const quiz = await quizService.getById(quizId)

  // Check if quiz exists
  if (!quiz) {
    notFound()
  }

  // Check ownership
  if (!quiz.teacherId) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Edit Quiz</h1>
        <p className="mt-2 text-neutral-400">
          Update quiz metadata and settings
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <QuizMetadataForm quiz={quiz} />
      </div>
    </div>
  )
}
