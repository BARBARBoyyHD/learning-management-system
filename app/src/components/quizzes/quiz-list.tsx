/**
 * Quiz List Component
 *
 * Displays a list of quizzes in a table format.
 * Handles empty state when no quizzes exist.
 */

import { Quiz } from '@/types/quiz'
import Link from 'next/link'
import { cn } from '@/lib/utils'

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
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold tracking-tight text-white">Recent Quizzes</h3>
        <Link className="text-primary-base text-sm font-bold hover:underline" href="/teacher/quizzes">
          View All
        </Link>
      </div>
      <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-neutral-800 bg-neutral-800/50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-400">Quiz Title</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-400">Date Created</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-400">Questions</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-400">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-400">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {quizzes.map((quiz) => (
                <tr key={quiz.id} className="hover:bg-neutral-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-neutral-800 rounded-lg flex items-center justify-center overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-primary-base to-purple-400"/>
                      </div>
                      <span className="font-bold text-white">{quiz.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-400">
                    {new Date(quiz.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-white">
                    {quiz.questionCount || 0}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold',
                      quiz.isPublic
                        ? 'bg-success-base/20 text-success-base'
                        : 'bg-neutral-700 text-neutral-300'
                    )}>
                      {quiz.isPublic ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/teacher/quizzes/${quiz.id}/edit`}
                      className="p-2 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors"
                    >
                      <span className="material-symbols-outlined">more_horiz</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
