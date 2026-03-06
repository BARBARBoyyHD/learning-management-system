/**
 * Question Editor Component
 *
 * Main editor for creating questions in quizzes.
 * Provides a form for question text, type selection, and answer configuration.
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { createQuestion } from '@/actions/questions/create'

/**
 * Question type enum
 */
export type QuestionType = 'multiple_choice' | 'essay' | 'fill_blank' | 'match' | 'reorder'

/**
 * QuestionEditor props
 */
export interface QuestionEditorProps {
  /** Quiz ID to add question to */
  quizId: string
}

/**
 * QuestionEditor component
 */
export function QuestionEditor({ quizId }: QuestionEditorProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Handle form submission
   */
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    
    try {
      const result = await createQuestion(formData)

      if (result.success) {
        // Redirect back to add another question or view quiz
        router.push(`/dashboard/quizzes/${quizId}/questions/new`)
        router.refresh()
      } else {
        setError(result.error || 'Failed to create question')
        setIsLoading(false)
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setIsLoading(false)
    }
  }

  /**
   * Cancel and go back
   */
  const handleCancel = () => {
    router.push(`/teacher/quizzes/${quizId}/edit`)
  }

  return (
    <form onSubmit={onSubmit}>
      {/* Hidden quiz ID field */}
      <input type="hidden" name="quizId" value={quizId} />
      
      <Card className="border-neutral-800 bg-neutral-900">
        <CardHeader>
          <CardTitle className="text-white">Question Details</CardTitle>
          <CardDescription className="text-neutral-400">
            Enter the question text and configure settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="rounded-lg border border-error-base/20 bg-error-base/10 p-4">
              <p className="text-sm text-error-base">{error}</p>
            </div>
          )}

          {/* Question Type */}
          <div className="space-y-2">
            <Label htmlFor="questionType" className="text-neutral-300">
              Question Type
            </Label>
            <select
              id="questionType"
              name="questionType"
              className="flex w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-primary-base focus:outline-none focus:ring-2 focus:ring-primary-base"
              defaultValue="multiple_choice"
            >
              <option value="multiple_choice">Multiple Choice</option>
              <option value="essay">Essay</option>
              <option value="fill_blank">Fill in the Blank</option>
              <option value="match">Match</option>
              <option value="reorder">Reorder</option>
            </select>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <Label htmlFor="questionText" className="text-neutral-300">
              Question Text <span className="text-error-base">*</span>
            </Label>
            <Textarea
              id="questionText"
              name="questionText"
              placeholder="Enter your question here..."
              rows={4}
              required
              className="flex w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-primary-base focus:outline-none focus:ring-2 focus:ring-primary-base"
            />
          </div>

          {/* Points */}
          <div className="space-y-2">
            <Label htmlFor="points" className="text-neutral-300">
              Points
            </Label>
            <Input
              id="points"
              name="points"
              type="number"
              min="1"
              max="100"
              defaultValue="10"
              className="border-neutral-700 bg-neutral-800 text-white"
            />
          </div>

          {/* Shuffle Options (for MC) */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="shuffle" className="text-neutral-300">
                Shuffle Options
              </Label>
              <p className="text-sm text-neutral-500">
                Randomize option order for each student
              </p>
            </div>
            <Switch
              id="shuffle"
              name="shuffle"
              defaultChecked={false}
            />
          </div>
        </CardContent>
      </Card>

      {/* Note about option editing */}
      <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
        <p className="text-sm text-neutral-400">
          <span className="font-medium">Note:</span> After saving, you&apos;ll be able to add answer options for multiple choice questions.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={isLoading}
          className="border-neutral-700 text-neutral-300 hover:bg-neutral-800"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-primary-base text-white hover:bg-primary-hover shadow-lg shadow-primary/20"
        >
          {isLoading ? (
            <>
              <span className="material-symbols-outlined mr-2 h-4 w-4 animate-spin">progress_activity</span>
              Saving...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined mr-2 h-4 w-4">save</span>
              Save Question
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
