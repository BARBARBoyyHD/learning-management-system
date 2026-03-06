/**
 * Name Input Form Component
 *
 * Client component for guest student name entry and auto-registration.
 * Features:
 * - Name input with validation
 * - Auto-registers guest student with UUID
 * - Creates session for guest
 * - Navigates to quiz start page
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { registerGuestStudent } from '@/app/(guest)/actions'

interface NameInputFormProps {
  quizId: string
  quizTitle?: string
}

export function NameInputForm({ quizId, quizTitle: _quizTitle }: NameInputFormProps) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate name
    if (!name.trim()) {
      setError('Please enter your name')
      toast.error('Please enter your name')
      return
    }

    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters')
      toast.error('Name must be at least 2 characters')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Register guest student and get user ID
      const result = await registerGuestStudent(name.trim(), quizId)

      if (!result.success) {
        throw new Error(result.error || 'Failed to register')
      }

      toast.success('Joined successfully!')

      // Navigate to quiz start page
      router.push(`/join/${quizId}/start?userId=${result.userId}`)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Instruction */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-white mb-2">Enter Your Name</h2>
        <p className="text-sm text-neutral-400">
          This is how you&apos;ll appear in the quiz
        </p>
      </div>

      {/* Name Input */}
      <div className="py-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          disabled={isLoading}
          className="w-full h-14 px-4 text-lg rounded-lg border-2 border-neutral-700 bg-neutral-900 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-base focus:border-primary-base transition-all disabled:opacity-50"
          autoFocus
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-center">
          <p className="text-sm text-error-base">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading || !name.trim()}
        className="w-full h-12 text-lg bg-primary-base hover:bg-primary-hover transition-colors"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined h-5 w-5 animate-spin">progress_activity</span>
            Joining...
          </span>
        ) : (
          'Join Quiz'
        )}
      </Button>

      {/* Privacy Notice */}
      <p className="text-xs text-neutral-500 text-center">
        No registration required. You&apos;ll be assigned a guest account automatically.
      </p>
    </form>
  )
}
