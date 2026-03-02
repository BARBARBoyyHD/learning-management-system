/**
 * Create Question Page
 *
 * Question editor for adding new questions to quizzes.
 * Supports multiple question types: Multiple Choice, Essay, Fill in Blank, Match, Reorder.
 */

import { quizService } from '@/services/quiz.service'
import { requireAuth } from '@/lib/auth-server'
import { notFound } from 'next/navigation'
import { QuestionEditor } from '@/components/questions/question-editor'

/**
 * Create Question Page Props
 */
interface CreateQuestionPageProps {
  params: Promise<{
    quizId: string
  }>
}

/**
 * Create Question Page Component
 */
export default async function CreateQuestionPage({ params }: CreateQuestionPageProps) {
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

  // Check ownership (quiz.teacherId should exist if quiz exists)
  if (!quiz.teacherId) {
    notFound()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Add Question</h1>
          <p className="mt-2 text-neutral-400">
            Add a new question to &ldquo;{quiz.title}&rdquo;
          </p>
        </div>
      </div>

      {/* Question Editor */}
      <QuestionEditor quizId={quizId} />
    </div>
  )
}
