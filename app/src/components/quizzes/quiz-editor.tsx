/**
 * Quiz Editor Component
 *
 * Main quiz editor showing quiz details and question list.
 * Teachers can add, edit, and manage questions for this quiz.
 * Implements Theme A (Light) design system for teacher-facing screens.
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Quiz, Question, QuestionOption } from '@prisma/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Plus,
  FileText,
  Clock,
  Shuffle,
  Repeat2,
  Eye,
  EyeOff,
  ChevronRight,
  Trash2,
  Edit2,
} from 'lucide-react'
import { deleteQuestion } from '@/actions/questions/delete'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

/**
 * QuizEditor props
 */
export interface QuizEditorProps {
  /** Quiz data with questions */
  quiz: Quiz & {
    questions: (Question & {
      options: QuestionOption[]
    })[]
  }
}

/**
 * Get question type display name
 */
function getQuestionTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    multiple_choice: 'Multiple Choice',
    essay: 'Essay',
    fill_blank: 'Fill in the Blank',
    match: 'Match',
    reorder: 'Reorder',
  }
  return labels[type] || type
}

/**
 * Get question type icon color
 */
function getQuestionTypeColor(type: string): string {
  const colors: Record<string, string> = {
    multiple_choice: 'bg-accent-purple text-white',
    essay: 'bg-accent-blue text-white',
    fill_blank: 'bg-accent-orange text-white',
    match: 'bg-accent-teal text-white',
    reorder: 'bg-accent-pink text-white',
  }
  return colors[type] || 'bg-neutral-500 text-white'
}

/**
 * QuizEditor component
 *
 * Displays:
 * - Quiz header with title and status
 * - Quiz settings summary
 * - Question list with add/edit/delete actions
 * - "Add Question" button
 */
export function QuizEditor({ quiz }: QuizEditorProps) {
  const questionCount = quiz.questions.length
  const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null)

  /**
   * Open delete confirmation dialog
   */
  const handleDeleteClick = (questionId: string) => {
    setQuestionToDelete(questionId)
  }

  /**
   * Close delete confirmation dialog
   */
  const handleDialogClose = () => {
    setQuestionToDelete(null)
  }

  /**
   * Handle question deletion
   */
  const handleDelete = async () => {
    if (!questionToDelete) return

    setIsDeleting(true)

    try {
      const formData = new FormData()
      formData.append('questionId', questionToDelete)
      formData.append('quizId', quiz.id)

      const result = await deleteQuestion(formData)

      if (result.success) {
        toast.success('Question deleted successfully')
        // Reload page to reflect changes
        window.location.reload()
      } else {
        toast.error(result.error || 'Failed to delete question')
        handleDialogClose()
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
      console.error('Delete error:', error)
      handleDialogClose()
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">{quiz.title}</h1>
            <Badge variant={quiz.isPublic ? 'default' : 'secondary'} className={cn(
              quiz.isPublic ? 'bg-success-base/20 text-success-base hover:bg-success-base/30' : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
            )}>
              {quiz.isPublic ? (
                <>
                  <Eye className="h-3 w-3 mr-1" />
                  Published
                </>
              ) : (
                <>
                  <EyeOff className="h-3 w-3 mr-1" />
                  Draft
                </>
              )}
            </Badge>
          </div>
          {quiz.description && (
            <p className="text-neutral-400 text-sm">{quiz.description}</p>
          )}
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          <Link href={`/teacher/quizzes/${quiz.id}/results`}>
            <Button variant="secondary" size="sm">
              <span className="material-symbols-outlined mr-2 h-4 w-4">analytics</span>
              Results
            </Button>
          </Link>
          <Link href={`/teacher/quizzes/${quiz.id}/questions/new`}>
            <Button className="bg-primary-base text-white hover:bg-primary-hover">
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </Link>
        </div>
      </div>

      {/* Quiz Settings Summary */}
      <Card className="border-neutral-800 bg-neutral-900/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-white">Quiz Settings</CardTitle>
          <CardDescription className="text-neutral-400">Current quiz configuration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-neutral-500" />
              <span className="font-medium text-neutral-300">Time Limit:</span>
              <span className="text-neutral-400">{quiz.timeLimit ? `${quiz.timeLimit} min` : 'Not set'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shuffle className="h-4 w-4 text-neutral-500" />
              <span className="font-medium text-neutral-300">Shuffle:</span>
              <span className="text-neutral-400">Off</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Repeat2 className="h-4 w-4 text-neutral-500" />
              <span className="font-medium text-neutral-300">Max Attempts:</span>
              <span className="text-neutral-400">Unlimited</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4 text-neutral-500" />
              <span className="font-medium text-neutral-300">Access Code:</span>
              <span className="font-mono bg-neutral-800 px-2 py-0.5 rounded text-white">
                {quiz.accessCode || 'Not set'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions Section */}
      <Card className="border-neutral-800 bg-neutral-900/50 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base text-white">Questions</CardTitle>
              <CardDescription className="text-neutral-400">
                {questionCount === 0
                  ? 'No questions yet. Add your first question to get started.'
                  : `${questionCount} question${questionCount > 1 ? 's' : ''} • ${totalPoints} total points`}
              </CardDescription>
            </div>
            <Link href={`/teacher/quizzes/${quiz.id}/questions/new`}>
              <Button size="sm" className="bg-primary-base text-white hover:bg-primary-hover">
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {questionCount === 0 ? (
            /* Empty State */
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-800 mb-4">
                <FileText className="h-8 w-8 text-neutral-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                No questions yet
              </h3>
              <p className="text-neutral-400 mb-6 max-w-md mx-auto">
                Start building your quiz by adding your first question. Choose from multiple choice,
                essay, fill in the blank, match, or reorder question types.
              </p>
              <Link href={`/teacher/quizzes/${quiz.id}/questions/new`}>
                <Button className="bg-primary-base text-white hover:bg-primary-hover">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Question
                </Button>
              </Link>
            </div>
          ) : (
            /* Question List */
            <div className="space-y-3">
              {quiz.questions.map((question, index) => (
                <div
                  key={question.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-neutral-800 bg-neutral-800/30 hover:border-primary-base/50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {/* Question Number */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                      <span className="text-sm font-medium text-neutral-300">
                        #{index + 1}
                      </span>
                    </div>

                    {/* Question Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getQuestionTypeColor(question.questionType)}`}
                        >
                          {getQuestionTypeLabel(question.questionType)}
                        </span>
                        <span className="text-sm text-neutral-500">
                          {question.points} pts
                        </span>
                      </div>
                      <p className="text-white text-sm truncate">
                        {question.questionText}
                      </p>
                      {question.options.length > 0 && (
                        <p className="text-neutral-500 text-xs mt-1">
                          {question.options.length} option{question.options.length > 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/teacher/quizzes/${quiz.id}/questions/${question.id}/edit`}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-neutral-600 hover:text-primary-base"
                      >
                        <Edit2 className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(question.id)}
                      disabled={isDeleting}
                      className="text-neutral-600 hover:text-error-base disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                    <ChevronRight className="h-5 w-5 text-neutral-400" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-4">
        <Link href="/dashboard">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview Quiz
          </Button>
        </Link>
        <Link href={`/teacher/quizzes/${quiz.id}/questions/new`}>
          <Button className="bg-primary-base text-white hover:bg-primary-hover">
            <Plus className="h-4 w-4 mr-2" />
            Add Question
          </Button>
        </Link>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!questionToDelete} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-md border-neutral-200 bg-white">
          <DialogHeader>
            <DialogTitle className="text-neutral-900 text-lg">
              Delete this question?
            </DialogTitle>
            <DialogDescription className="text-neutral-600 text-sm mt-2">
              This action cannot be undone. This question will be permanently removed from the quiz.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleDialogClose}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-[#ef4444] text-white hover:bg-[#dc2626]"
            >
              {isDeleting ? (
                <>
                  <Trash2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
