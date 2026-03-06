/**
 * Join Form Component
 *
 * Client component for handling quiz join form submission.
 * Features:
 * - Access code input with 6-character boxes
 * - API integration for code validation
 * - Loading and error states
 * - Navigation to next step on success
 * - Toast notifications
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { AccessCodeInput } from './access-code-input'
import { Button } from '@/components/ui/button'

export function JoinForm() {
  const router = useRouter()
  const [accessCode, setAccessCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  /**
   * Handle access code completion (6 characters entered)
   */
  const handleCodeComplete = async (code: string) => {
    if (code.length !== 6) return

    setIsLoading(true)
    setError('')

    try {
      // Call API to validate access code
      const response = await fetch('/api/v1/quizzes/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessCode: code }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle different error status codes
        if (response.status === 429) {
          throw new Error(data.error || 'Too many attempts. Please wait a minute.')
        } else if (response.status === 404) {
          throw new Error(data.error || 'Invalid access code.')
        } else if (response.status === 400) {
          throw new Error(data.error || 'Invalid code format.')
        } else {
          throw new Error('Unable to connect. Please try again.')
        }
      }

      // Success - navigate to next step (name input / quiz start)
      toast.success('Access code valid!')

      // TODO: Navigate to name input page (US-M6-02)
      // For now, just show success message
      toast.success(`Found quiz: ${data.data.title}`)

      // Store quiz info for next step
      sessionStorage.setItem('quizToJoin', JSON.stringify(data.data))

      // Navigate to name input page (will be created in US-M6-02)
      router.push(`/join/${data.data.quizId}/name`)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong'
      setError(errorMessage)
      toast.error(errorMessage)

      // Clear code inputs on error
      setAccessCode('')
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Handle manual form submission (button click)
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (accessCode.length !== 6) {
      setError('Please enter all 6 characters')
      toast.error('Please enter a complete access code')
      return
    }

    handleCodeComplete(accessCode)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Instruction */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-white mb-2">Enter Game Code</h2>
        <p className="text-sm text-neutral-400">
          Enter the 6-character code provided by your teacher
        </p>
      </div>

      {/* Access Code Input */}
      <div className="py-4">
        <AccessCodeInput
          onComplete={handleCodeComplete}
          onChange={setAccessCode}
          error={!!error}
          disabled={isLoading}
          autoSubmit={false}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-center">
          <p className="text-sm text-error-base">{error}</p>
          <p className="text-xs text-neutral-500 mt-1">
            Having trouble? Check with your teacher
          </p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading || accessCode.length !== 6}
        className="w-full h-12 text-lg bg-primary-base hover:bg-primary-hover transition-colors"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined h-5 w-5 animate-spin">progress_activity</span>
            Checking...
          </span>
        ) : (
          'Continue'
        )}
      </Button>
    </form>
  )
}
