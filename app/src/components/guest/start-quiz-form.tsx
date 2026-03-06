/**
 * Start Quiz Form Component
 *
 * Client component with "Start Quiz" button.
 * Navigates to first question when clicked.
 */

'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface StartQuizFormProps {
  quizId: string
  userId: string
}

export function StartQuizForm({ quizId, userId }: StartQuizFormProps) {
  const router = useRouter()

  const handleStartQuiz = () => {
    // Navigate to first question
    router.push(`/join/${quizId}/quiz?userId=${userId}&question=0`)
  }

  return (
    <div className="space-y-4">
      <Button
        onClick={handleStartQuiz}
        className="w-full h-14 text-lg bg-primary-base hover:bg-primary-hover transition-colors shadow-lg shadow-primary-base/20"
      >
        <span className="material-symbols-outlined h-5 w-5 mr-2">play_arrow</span>
        Start Quiz
      </Button>

      <p className="text-xs text-neutral-500 text-center">
        Click &ldquo;Start Quiz&rdquo; to begin. Good luck!
      </p>
    </div>
  )
}
