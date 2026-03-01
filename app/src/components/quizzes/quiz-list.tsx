/**
 * Quiz List Component
 *
 * Displays a grid of quiz cards.
 * Handles empty state when no quizzes exist.
 */

import { QuizCard } from '@/components/quizzes/quiz-card'

/**
 * Quiz list props
 */
export interface QuizListProps {
  /** Array of quizzes */
  quizzes: Array<{
    id: string
    title: string
    description?: string | null
    isPublic: boolean
    accessCode?: string | null
    questionCount?: number
    studentCount?: number
  }>
  /** Empty state message */
  emptyMessage?: string
}

/**
 * QuizList component
 */
export function QuizList({ quizzes, emptyMessage }: QuizListProps) {
  if (quizzes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-500">
          {emptyMessage || 'No quizzes yet'}
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {quizzes.map((quiz) => (
        <QuizCard
          key={quiz.id}
          id={quiz.id}
          title={quiz.title}
          description={quiz.description}
          isPublic={quiz.isPublic}
          accessCode={quiz.accessCode}
          questionCount={quiz.questionCount}
          studentCount={quiz.studentCount}
        />
      ))}
    </div>
  )
}
