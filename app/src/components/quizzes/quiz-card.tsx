/**
 * Quiz Card Component
 *
 * Displays a single quiz card with title, description, and actions.
 * Used in quiz lists on dashboard and other pages.
 */

'use client'

import { Quiz } from '@/types/quiz'
import Link from 'next/link'
import { useState, useTransition } from 'react'
import { deleteQuiz } from '@/app/quizzes/actions'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

/**
 * Quiz card props
 */
export interface QuizCardProps {
  /** Quiz data */
  quiz: Quiz
}

/**
 * QuizCard component
 */
export function QuizCard({ quiz }: QuizCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteQuiz(quiz.id)

      if (result.success) {
        toast.success(result.message)
        setIsDeleteDialogOpen(false)
      } else {
        toast.error(result.error || 'Failed to delete quiz')
      }
    })
  }

  return (
    <>
      <div className="group rounded-xl border border-neutral-800 bg-neutral-900 p-6 transition-all hover:border-neutral-700 hover:shadow-lg hover:shadow-neutral-900/50">
        {/* Header with Actions */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {quiz.isPublic ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-success-base/10 text-success-base">
                <span className="h-1.5 w-1.5 rounded-full bg-success-base" />
                Public
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-700 text-neutral-300">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
                Private
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Link
              href={`/teacher/quizzes/${quiz.id}/results`}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
              title="View Results"
            >
              <span className="material-symbols-outlined h-4 w-4">analytics</span>
            </Link>
            <Link
              href={`/teacher/quizzes/${quiz.id}/edit`}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
              title="Edit"
            >
              <span className="material-symbols-outlined h-4 w-4">edit</span>
            </Link>
            <button
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
              title="Duplicate"
            >
              <span className="material-symbols-outlined h-4 w-4">content_copy</span>
            </button>
            <button
              onClick={() => setIsDeleteDialogOpen(true)}
              className="p-1.5 text-neutral-400 hover:text-error-base hover:bg-neutral-800 rounded-lg transition-colors"
              title="Delete"
            >
              <span className="material-symbols-outlined h-4 w-4">delete</span>
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
          {quiz.title}
        </h3>

        {/* Description */}
        {quiz.description && (
          <p className="text-sm text-neutral-400 line-clamp-2 mb-4">
            {quiz.description}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex items-center gap-3 text-xs text-neutral-500">
          {quiz.questionCount !== undefined && (
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined h-3.5 w-3.5">library_books</span>
              {quiz.questionCount} questions
            </span>
          )}
          {quiz.accessCode && (
            <span className="flex items-center gap-1 px-2 py-1 bg-neutral-800 rounded text-neutral-400">
              <span className="material-symbols-outlined h-3 w-3">vpn_key</span>
              {quiz.accessCode}
            </span>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Quiz</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &ldquo;{quiz.title}&rdquo;? This action cannot be
              undone and will permanently delete all questions, student responses, and associated
              data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isPending}
              className="bg-error-base text-white hover:bg-error-base/90"
            >
              {isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
