/**
 * Assessment Form Component
 *
 * Form for creating and editing assessments/quizzes.
 * Uses React Hook Form for form management and Zod for validation.
 * Implements Theme A (Light) design system for teacher-facing screens.
 */

'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { assessmentCreateSchema } from '@/lib/validators/assessment'
import { createAssessment } from '@/actions/assessments/create'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

/**
 * AssessmentForm props
 */
export interface AssessmentFormProps {
  /** Initial data for edit mode */
  initialData?: {
    title: string
    description?: string | null
    timeLimit?: number | null
    shuffleQuestions?: boolean
    maxAttempts?: number | null
  }
}

/**
 * AssessmentForm component
 *
 * Handles assessment creation/editing with:
 * - Client-side validation using Zod
 * - Server-side validation via Server Action
 * - Loading state during submission
 * - Error message display
 */
export function AssessmentForm({ initialData }: AssessmentFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(assessmentCreateSchema),
    defaultValues: {
      title: initialData?.title ?? '',
      description: initialData?.description ?? null,
      timeLimit: initialData?.timeLimit ?? null,
      shuffleQuestions: initialData?.shuffleQuestions ?? false,
      maxAttempts: initialData?.maxAttempts ?? null,
    },
  })

  /**
   * Handle form submission
   * Calls the createAssessment Server Action
   */
  const onSubmit = async (data: any) => {
    setIsLoading(true)
    setError(null)

    try {
      // Create FormData from form values
      const formData = new FormData()
      formData.append('title', data.title)
      if (data.description) formData.append('description', data.description)
      if (data.timeLimit) formData.append('timeLimit', data.timeLimit.toString())
      if (data.shuffleQuestions) formData.append('shuffleQuestions', 'on')
      if (data.maxAttempts) formData.append('maxAttempts', data.maxAttempts.toString())

      // Call Server Action
      const result = await createAssessment(formData)
      
      // Handle success - redirect to dashboard
      if (result.success) {
        window.location.href = `/dashboard?created=${result.assessmentId}`
      } else {
        setError(result.error || 'Something went wrong')
        setIsLoading(false)
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
      console.error('Assessment form error:', err)
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div
          className="rounded-xl border border-error/20 bg-error/10 p-4"
          role="alert"
          aria-live="assertive"
        >
          <p className="text-sm text-error-base">{error}</p>
        </div>
      )}

      {/* Main Settings Card */}
      <Card className="border-neutral-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-neutral-900">Basic Information</CardTitle>
          <CardDescription className="text-neutral-600">
            Enter the quiz title and optional description
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Title Field */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-neutral-700">
              Title <span className="text-error-base">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Enter quiz title"
              className="border-neutral-300 focus:border-primary-base focus:ring-primary-base"
              disabled={isLoading}
              {...register('title')}
            />
            {errors.title && (
              <p className="text-sm text-error-base" role="alert">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-neutral-700">
              Description
            </Label>
            <textarea
              id="description"
              rows={4}
              placeholder="Enter quiz description (optional)"
              className="flex w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-primary-base focus:outline-none focus:ring-2 focus:ring-primary-base disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading}
              {...register('description')}
            />
            {errors.description && (
              <p className="text-sm text-error-base" role="alert">
                {errors.description.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quiz Settings Card */}
      <Card className="border-neutral-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-neutral-900">Quiz Settings</CardTitle>
          <CardDescription className="text-neutral-600">
            Configure time limits, shuffling, and attempt limits
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Time Limit */}
          <div className="space-y-2">
            <Label htmlFor="timeLimit" className="text-neutral-700">
              Time Limit (minutes)
            </Label>
            <Input
              id="timeLimit"
              type="number"
              min="1"
              max="180"
              placeholder="Leave empty for no time limit"
              className="border-neutral-300 focus:border-primary-base focus:ring-primary-base"
              disabled={isLoading}
              {...register('timeLimit', { valueAsNumber: true })}
            />
            {errors.timeLimit && (
              <p className="text-sm text-error-base" role="alert">
                {errors.timeLimit.message}
              </p>
            )}
          </div>

          {/* Shuffle Questions */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="shuffleQuestions"
              className="h-4 w-4 rounded border-neutral-300 text-primary-base focus:ring-primary-base"
              disabled={isLoading}
              {...register('shuffleQuestions')}
            />
            <Label htmlFor="shuffleQuestions" className="text-neutral-700">
              Shuffle question order for each student
            </Label>
          </div>

          {/* Max Attempts */}
          <div className="space-y-2">
            <Label htmlFor="maxAttempts" className="text-neutral-700">
              Maximum Attempts
            </Label>
            <Input
              id="maxAttempts"
              type="number"
              min="1"
              placeholder="Leave empty for unlimited"
              className="border-neutral-300 focus:border-primary-base focus:ring-primary-base"
              disabled={isLoading}
              {...register('maxAttempts', { valueAsNumber: true })}
            />
            {errors.maxAttempts && (
              <p className="text-sm text-error-base" role="alert">
                {errors.maxAttempts.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4">
        <Link href="/dashboard">
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            className="border-neutral-300 text-neutral-700 hover:bg-neutral-100"
          >
            <span className="material-symbols-outlined mr-2 h-4 w-4">arrow_back</span>
            Cancel
          </Button>
        </Link>
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          className="bg-primary-base text-white hover:bg-primary-hover active:bg-primary-active shadow-lg shadow-primary/20"
        >
          {isLoading ? (
            <>
              <span className="material-symbols-outlined mr-2 h-4 w-4 animate-spin">progress_activity</span>
              Saving...
            </>
          ) : (
            'Save Quiz'
          )}
        </Button>
      </div>
    </div>
  )
}
