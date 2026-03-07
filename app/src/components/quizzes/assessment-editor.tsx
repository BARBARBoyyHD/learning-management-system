'use client'

/**
 * Assessment Editor Component
 *
 * Quiz metadata editor styled according to the assessment-editor.html mockup.
 * Theme A - Light Mode with Indigo primary color (#6467f2)
 */

import { Quiz } from '@/types/quiz'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { quizMetadataUpdateSchema, QuizMetadataUpdateInput } from '@/lib/validators/quiz'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

interface AssessmentEditorProps {
  quiz: Quiz
}

export function AssessmentEditor({ quiz }: AssessmentEditorProps) {
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

  // Watch form values
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

  // Show time limit warning if quiz has active attempts
  useEffect(() => {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Main Card */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Toolbar */}
        <div className="flex items-center gap-1 border-b border-slate-100 p-3">
          <button
            type="button"
            className="rounded p-1.5 transition-colors hover:bg-slate-100"
            title="Bold"
          >
            <span className="material-symbols-outlined text-[20px] text-slate-600">
              format_bold
            </span>
          </button>
          <button
            type="button"
            className="rounded p-1.5 transition-colors hover:bg-slate-100"
            title="Italic"
          >
            <span className="material-symbols-outlined text-[20px] text-slate-600">
              format_italic
            </span>
          </button>
          <button
            type="button"
            className="rounded p-1.5 transition-colors hover:bg-slate-100"
            title="Underline"
          >
            <span className="material-symbols-outlined text-[20px] text-slate-600">
              format_underlined
            </span>
          </button>
          <div className="mx-1 h-5 w-px bg-slate-200"></div>
          <button
            type="button"
            className="rounded p-1.5 transition-colors hover:bg-slate-100"
            title="Add Image"
          >
            <span className="material-symbols-outlined text-[20px] text-slate-600">
              image
            </span>
          </button>
          <button
            type="button"
            className="rounded p-1.5 transition-colors hover:bg-slate-100"
            title="Add Math"
          >
            <span className="material-symbols-outlined text-[20px] text-slate-600">
              functions
            </span>
          </button>
        </div>

        {/* Form Content */}
        <div className="space-y-6 p-6">
          {/* Title */}
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-xs font-bold uppercase tracking-widest text-slate-500"
            >
              Quiz Title
            </label>
            <input
              id="title"
              {...register('title')}
              placeholder="Enter quiz title"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium text-slate-900 transition-colors focus:border-[#6467f2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6467f2]/20"
            />
            {errors.title && (
              <p className="text-sm text-[#ef4444]">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-xs font-bold uppercase tracking-widest text-slate-500"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register('description')}
              placeholder="Enter quiz description (optional)"
              rows={4}
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium text-slate-900 transition-colors focus:border-[#6467f2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6467f2]/20"
            />
            {errors.description && (
              <p className="text-sm text-[#ef4444]">{errors.description.message}</p>
            )}
          </div>

          {/* Time Limit */}
          <div className="space-y-2">
            <label
              htmlFor="timeLimit"
              className="text-xs font-bold uppercase tracking-widest text-slate-500"
            >
              Time Limit (minutes)
            </label>
            <input
              id="timeLimit"
              type="number"
              min="0"
              max="180"
              {...register('timeLimit', { valueAsNumber: true })}
              placeholder="0 for no time limit"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium text-slate-900 transition-colors focus:border-[#6467f2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6467f2]/20"
            />
            {errors.timeLimit && (
              <p className="text-sm text-[#ef4444]">{errors.timeLimit.message}</p>
            )}
            <p className="text-xs text-slate-500">
              Set to 0 or leave empty for no time limit
            </p>
          </div>

          {showTimeLimitWarning && (
            <div className="rounded-xl border border-[#f59e0b]/20 bg-[#f59e0b]/10 p-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#f59e0b]">warning</span>
                <p className="text-sm text-[#f59e0b]">
                  ⚠️ Changing the time limit may affect students currently taking this quiz.
                </p>
              </div>
            </div>
          )}

          {/* Visibility Toggle */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label
                  htmlFor="isPublic"
                  className="text-sm font-semibold text-slate-700"
                >
                  Make Quiz Public
                </label>
                <p className="text-sm text-slate-500">
                  Public quizzes are searchable. Private quizzes require an access code.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={isPublic}
                onClick={() => setValue('isPublic', !isPublic)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#6467f2] focus:ring-offset-2 ${
                  isPublic ? 'bg-[#6467f2]' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isPublic ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Access Code (only shown for private quizzes) */}
          {!isPublic && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-4 flex items-center justify-between">
                <label
                  htmlFor="accessCode"
                  className="text-sm font-semibold text-slate-700"
                >
                  Access Code
                </label>
                <button
                  type="button"
                  onClick={regenerateAccessCode}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                >
                  <span className="material-symbols-outlined text-[14px]">refresh</span>
                  Regenerate
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  id="accessCode"
                  {...register('accessCode')}
                  placeholder="6-character code"
                  maxLength={6}
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm font-bold uppercase tracking-wider text-slate-900 transition-colors focus:border-[#6467f2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6467f2]/20"
                />
                <button
                  type="button"
                  onClick={copyAccessCode}
                  disabled={!formValues.accessCode}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 font-medium text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    content_copy
                  </span>
                </button>
              </div>
              {errors.accessCode && (
                <p className="mt-2 text-sm text-[#ef4444]">{errors.accessCode.message}</p>
              )}
              <p className="mt-2 text-xs text-slate-500">
                Students need this code to join your private quiz
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Form Actions */}
      <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-slate-200 bg-white/80 backdrop-blur-sm pt-4">
        <button
          type="submit"
          disabled={updateMutation.isPending || !isDirty}
          className="inline-flex items-center gap-2 rounded-lg bg-[#6467f2] px-8 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#6467f2]/20 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {updateMutation.isPending ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">
                progress_activity
              </span>
              Saving...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">save</span>
              Save Changes
            </>
          )}
        </button>
      </div>

      {/* Success/Error Messages */}
      {updateMutation.isSuccess && (
        <div className="rounded-xl border border-[#22c55e]/20 bg-[#22c55e]/10 p-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#22c55e]">check_circle</span>
            <p className="text-sm font-medium text-[#22c55e]">
              ✓ Quiz updated successfully!
            </p>
          </div>
        </div>
      )}

      {updateMutation.error && (
        <div className="rounded-xl border border-[#ef4444]/20 bg-[#ef4444]/10 p-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#ef4444]">error</span>
            <p className="text-sm font-medium text-[#ef4444]">
              ✗ Error: {updateMutation.error.message}
            </p>
          </div>
        </div>
      )}
    </form>
  )
}
