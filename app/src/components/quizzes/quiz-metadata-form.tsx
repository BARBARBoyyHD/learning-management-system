'use client'

import { Quiz } from '@/types/quiz'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { quizMetadataUpdateSchema, QuizMetadataUpdateInput } from '@/lib/validators/quiz'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import Link from 'next/link'

interface QuizMetadataFormProps {
  quiz: Quiz
}

export function QuizMetadataForm({ quiz }: QuizMetadataFormProps) {
  const router = useRouter()
  const [showTimeLimitWarning, setShowTimeLimitWarning] = useState(false)

  // Form setup with react-hook-form and zod validation
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<QuizMetadataUpdateInput>({
    resolver: zodResolver(quizMetadataUpdateSchema),
    defaultValues: {
      title: quiz.title,
      description: quiz.description ?? '',
      timeLimit: quiz.timeLimit ?? null,
      isPublic: quiz.isPublic,
      accessCode: quiz.accessCode ?? null,
    },
  })

  // Watch form values for unsaved changes warning
  const formValues = watch()
  const isPublic = watch('isPublic')

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty])

  // Show time limit warning if quiz has active attempts (placeholder logic)
  useEffect(() => {
    // In a real implementation, check for active student attempts
    // For now, just show warning when time limit changes
    if (formValues.timeLimit !== quiz.timeLimit && quiz.timeLimit !== null) {
      setShowTimeLimitWarning(true)
    } else {
      setShowTimeLimitWarning(false)
    }
  }, [formValues.timeLimit, quiz.timeLimit])

  // Generate access code when switching to private
  useEffect(() => {
    if (!isPublic && !formValues.accessCode) {
      // Access code will be generated on the server
    }
  }, [isPublic, formValues.accessCode])

  // Copy access code to clipboard
  const copyAccessCode = async () => {
    if (formValues.accessCode) {
      await navigator.clipboard.writeText(formValues.accessCode)
    }
  }

  // Regenerate access code (client-side preview)
  const regenerateAccessCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = ''
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setValue('accessCode', code)
  }

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (data: QuizMetadataUpdateInput) => {
      const response = await fetch(`/api/v1/quizzes/${quiz.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update quiz')
      }

      return response.json()
    },
    onSuccess: () => {
      router.push('/dashboard')
      router.refresh()
    },
  })

  // Form submission handler
  const onSubmit = (data: QuizMetadataUpdateInput) => {
    updateMutation.mutate(data)
  }

  // Cancel handler
  const handleCancel = () => {
    if (isDirty) {
      const confirmed = confirm('You have unsaved changes. Are you sure you want to leave?')
      if (!confirmed) return
    }
    router.push('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Quiz Title</Label>
          <Input
            id="title"
            {...register('title')}
            placeholder="Enter quiz title"
            className="bg-neutral-800 border-neutral-700"
          />
          {errors.title && (
            <p className="text-sm text-error-base">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="mt-6 space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            {...register('description')}
            placeholder="Enter quiz description"
            rows={4}
            className="bg-neutral-800 border-neutral-700"
          />
          {errors.description && (
            <p className="text-sm text-error-base">{errors.description.message}</p>
          )}
        </div>

        {/* Time Limit */}
        <div className="mt-6 space-y-2">
          <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
          <Input
            id="timeLimit"
            type="number"
            min="1"
            max="180"
            {...register('timeLimit', { valueAsNumber: true })}
            placeholder="Leave empty for no time limit"
            className="bg-neutral-800 border-neutral-700"
          />
          {errors.timeLimit && (
            <p className="text-sm text-error-base">{errors.timeLimit.message}</p>
          )}
          <p className="text-xs text-neutral-500">
            Set to 0 or leave empty for no time limit
          </p>
        </div>

        {showTimeLimitWarning && (
          <div className="mt-4 rounded-lg bg-warning-base/10 border border-warning-base/20 p-4">
            <p className="text-sm text-warning-base">
              ⚠️ Changing the time limit may affect students currently taking this quiz.
            </p>
          </div>
        )}

        {/* Visibility Toggle */}
        <div className="mt-6 flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="isPublic">Make Quiz Public</Label>
            <p className="text-sm text-neutral-500">
              Public quizzes are searchable. Private quizzes require an access code.
            </p>
          </div>
          <Switch
            id="isPublic"
            checked={isPublic}
            onCheckedChange={(checked: boolean) => setValue('isPublic', checked)}
          />
        </div>

        {/* Access Code (only shown for private quizzes) */}
        {!isPublic && (
          <div className="mt-6 space-y-4 rounded-lg bg-neutral-800 p-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="accessCode">Access Code</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={regenerateAccessCode}
                className="h-8"
              >
                <span className="material-symbols-outlined h-3 w-3 mr-1">refresh</span>
                Regenerate
              </Button>
            </div>

            <div className="flex gap-2">
              <Input
                id="accessCode"
                {...register('accessCode')}
                placeholder="6-character code"
                maxLength={6}
                className="bg-neutral-700 border-neutral-600 uppercase font-mono"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={copyAccessCode}
                disabled={!formValues.accessCode}
              >
                <span className="material-symbols-outlined h-4 w-4">content_copy</span>
              </Button>
            </div>
            {errors.accessCode && (
              <p className="text-sm text-error-base">{errors.accessCode.message}</p>
            )}
            <p className="text-xs text-neutral-500">
              Students need this code to join your private quiz
            </p>
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-between">
        <Link href="/dashboard">
          <Button type="button" variant="outline">
            <span className="material-symbols-outlined h-4 w-4 mr-2">arrow_back</span>
            Back to Dashboard
          </Button>
        </Link>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={updateMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={updateMutation.isPending || !isDirty}
          >
            {updateMutation.isPending ? (
              <>
                <span className="material-symbols-outlined h-4 w-4 mr-2 animate-spin">progress_activity</span>
                Saving...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined h-4 w-4 mr-2">save</span>
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Success/Error Messages */}
      {updateMutation.isSuccess && (
        <div className="rounded-lg bg-success-base/10 border border-success-base/20 p-4">
          <p className="text-sm text-success-base">✓ Quiz updated successfully!</p>
        </div>
      )}

      {updateMutation.error && (
        <div className="rounded-lg bg-error-base/10 border border-error-base/20 p-4">
          <p className="text-sm text-error-base">
            ✗ Error: {updateMutation.error.message}
          </p>
        </div>
      )}
    </form>
  )
}
