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

      // Store quiz info for next step
      sessionStorage.setItem('quizToJoin', JSON.stringify(data.data))

      // Navigate to name input page
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
    <div className="w-full max-w-[480px] space-y-6 ">
      {/* Main Join Card */}
      <div className="bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 p-8 rounded-xl shadow-2xl flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Ready to Play?</h1>
          <p className="text-neutral-400">Enter your game code to begin</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Access Code Section */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-neutral-300 ml-1">
              Game Code
            </label>
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

          {/* Join Button */}
          <Button
            type="submit"
            disabled={isLoading || accessCode.length !== 6}
            className="w-full h-16 bg-primary-base hover:bg-primary-base/90 text-white font-bold text-xl rounded-xl shadow-lg shadow-primary-base/30 transition-all flex items-center justify-center gap-3 active:scale-95 group"
          >
            JOIN GAME
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Button>
        </form>
      </div>

      {/* Secondary Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center px-2">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <span className="material-symbols-outlined text-base">group</span>
          <span>Ready to learn</span>
        </div>
      </div>
    </div>
  )
}
