/**
 * Quiz List Component
 *
 * Displays a grid of quiz cards.
 * Handles empty state when no quizzes exist.
 */

import { Quiz } from '@/types/quiz'
import { QuizCard } from './quiz-card'
import Link from 'next/link'

/**
 * Quiz list props
 */
export interface QuizListProps {
  /** Array of quizzes */
  quizzes: Quiz[]
}

/**
 * QuizList component
 */
export function QuizList({ quizzes }: QuizListProps) {
  if (quizzes.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-12 text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-base/20 to-primary-base/5">
          <span className="material-symbols-outlined h-10 w-10 text-primary-base">library_books</span>
        </div>

        {/* Heading */}
        <h3 className="text-2xl font-bold text-white mb-2">
          Oops, no quizzes yet!
        </h3>

        {/* Description */}
        <p className="text-neutral-400 mb-8 max-w-md mx-auto leading-relaxed">
          Create your first quiz to get started. It only takes a few minutes to set up.
        </p>

        {/* CTA Button */}
        <Link
          href="/teacher/quizzes/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary-base px-6 py-3 text-sm font-medium text-white hover:bg-primary-hover transition-all shadow-lg shadow-primary-base/20 hover:shadow-primary-base/30"
        >
          <span className="material-symbols-outlined">add_circle</span>
          Create Your First Quiz
        </Link>

        {/* Quick Tips */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
          <div className="rounded-lg bg-neutral-800/50 p-4">
            <span className="material-symbols-outlined h-5 w-5 text-primary-base mx-auto mb-2">auto_awesome</span>
            <p className="text-xs font-medium text-white">5 Question Types</p>
            <p className="text-xs text-neutral-500 mt-1">MC, Essay, Fill-in & more</p>
          </div>
          <div className="rounded-lg bg-neutral-800/50 p-4">
            <span className="material-symbols-outlined h-5 w-5 text-primary-base mx-auto mb-2">fact_check</span>
            <p className="text-xs font-medium text-white">Auto-grading</p>
            <p className="text-xs text-neutral-500 mt-1">Instant feedback</p>
          </div>
          <div className="rounded-lg bg-neutral-800/50 p-4">
            <span className="material-symbols-outlined h-5 w-5 text-primary-base mx-auto mb-2">password</span>
            <p className="text-xs font-medium text-white">Access Codes</p>
            <p className="text-xs text-neutral-500 mt-1">Private quizzes</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {quizzes.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </div>
  )
}
