/**
 * Assessment Form Component
 *
 * Form for creating and editing assessments/quizzes.
 * Uses React Hook Form for form management and Zod for validation.
 * Implements Theme A (Light) design system for teacher-facing screens.
 */

'use client'

import { useState, useTransition, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { assessmentCreateSchema } from '@/lib/validators/assessment'
import { createAssessment, type CreateAssessmentResult } from '@/actions/assessments/create'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, ArrowLeft, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

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
  /** Optional course ID for course-based assessments */
  courseId?: string
}

/**
 * AssessmentForm component
 *
 * Handles assessment creation/editing with:
 * - Client-side validation using Zod
 * - Server-side validation via Server Action
 * - Loading state during submission (11.1)
 * - Disabled submit button while loading (11.2)
 * - Success toast on save (11.3)
 * - Error toast on failure (11.4)
 * - Retry mechanism for network errors (11.5)
 * - Preserve form data on error (11.6)
 */
export function AssessmentForm({ initialData, courseId }: AssessmentFormProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const formValuesRef = useRef<Record<string, any>>({})

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
   * Handle form submission with retry mechanism
   * Calls the createAssessment Server Action
   *
   * 11.5 Add retry mechanism for network errors
   * 11.6 Preserve form data on error
   */
  const onSubmit = async (data: any) => {
    startTransition(async () => {
      setError(null)

      // Store form values for potential retry
      formValuesRef.current = data

      try {
        // Create FormData from form values
        const formData = new FormData()
        formData.append('title', data.title)
        if (data.description) formData.append('description', data.description)
        if (data.timeLimit) formData.append('timeLimit', data.timeLimit.toString())
        if (data.shuffleQuestions) formData.append('shuffleQuestions', 'on')
        if (data.maxAttempts) formData.append('maxAttempts', data.maxAttempts.toString())

        // Call Server Action with optional courseId
        const result: CreateAssessmentResult = await createAssessment(formData, courseId)

        // Handle success - show toast and redirect to quiz edit page
        if (result.success) {
          // 11.3 Show success toast on save
          toast.success('Quiz created successfully!', {
            description: 'Your quiz has been saved as a draft.',
            duration: 4000,
          })

          // Small delay to show toast before redirect to quiz edit page
          setTimeout(() => {
            window.location.href = `/quizzes/${result.assessmentId}/edit`
          }, 500)
        } else {
          // 11.4 Show error toast on failure
          const isAuthError = result.code === 'UNAUTHORIZED'
          const isForbiddenError = result.code === 'FORBIDDEN'

          if (isAuthError) {
            toast.error('Authentication required', {
              description: 'Please sign in to create assessments.',
              duration: 5000,
            })
          } else if (isForbiddenError) {
            toast.error('Access denied', {
              description: result.error,
              duration: 5000,
            })
          } else {
            toast.error('Failed to create quiz', {
              description: result.error || 'Please try again.',
              duration: 5000,
            })
          }

          // 11.6 Preserve form data on error - reset form with existing values
          reset({
            title: data.title,
            description: data.description,
            timeLimit: data.timeLimit,
            shuffleQuestions: data.shuffleQuestions,
            maxAttempts: data.maxAttempts,
          })

          // Set inline error for display
          setError(result.error || 'Something went wrong')
        }
      } catch (err) {
        // Handle network or unexpected errors
        console.error('Assessment form error:', err)

        // 11.4 Show error toast on failure
        toast.error('Network error', {
          description: 'Failed to connect. Please check your connection and try again.',
          duration: 5000,
        })

        // 11.6 Preserve form data on error
        reset({
          title: data.title,
          description: data.description,
          timeLimit: data.timeLimit,
          shuffleQuestions: data.shuffleQuestions,
          maxAttempts: data.maxAttempts,
        })

        setError('Network error. Please try again.')
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Error Message - 9.4 Handle unauthorized errors in UI */}
      {error && (
        <div
          className="rounded-xl border border-error/20 bg-error/10 p-4 flex items-start gap-3"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle className="h-5 w-5 text-error-base flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-error-base">Error</p>
            <p className="text-sm text-error-base mt-1">{error}</p>
          </div>
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
              disabled={isPending}
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
              disabled={isPending}
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
              disabled={isPending}
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
              disabled={isPending}
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
              disabled={isPending}
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
            disabled={isPending}
            className="border-neutral-300 text-neutral-700 hover:bg-neutral-100"
          >
            <span className="material-symbols-outlined mr-2 h-4 w-4">arrow_back</span>
            Cancel
          </Button>
        </Link>
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={isPending}
          className="bg-primary-base text-white hover:bg-primary-hover active:bg-primary-active shadow-lg shadow-primary/20 min-w-[120px]"
        >
          {isPending ? (
            <>
              <span className="material-symbols-outlined mr-2 h-4 w-4 animate-spin">progress_activity</span>
              Creating...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined mr-2 h-4 w-4">arrow_forward</span>
              Next: Add Questions
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
