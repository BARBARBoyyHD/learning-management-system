/**
 * Quiz Interface Component
 *
 * Client component for quiz taking experience.
 * Handles question display, answer selection, navigation, and timer.
 */

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { MultipleChoiceQuestion } from './multiple-choice-question'

interface Question {
  id: string
  questionType: string
  questionText: string
  mediaUrl?: string | null
  settings?: any | null
  points: number
  orderIndex: number
  options: {
    id: string
    option: string
    sortOrder?: number | null
    isCorrect: boolean
  }[]
}

interface Quiz {
  id: string
  title: string
  timeLimit?: number | null
}

interface QuizInterfaceProps {
  quiz: Quiz
  questions: Question[]
  currentQuestionIndex: number
  userId: string
}

export function QuizInterface({
  quiz,
  questions,
  currentQuestionIndex,
  userId,
}: QuizInterfaceProps) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(currentQuestionIndex)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeRemaining, setTimeRemaining] = useState<number | null>(
    quiz.timeLimit ? quiz.timeLimit * 60 : null
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  const question = questions[currentQuestion]
  const totalQuestions = questions.length
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  /**
   * Timer effect
   */
  useEffect(() => {
    if (!timeRemaining) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 0) return 0
        if (prev === 1) {
          // Time's up - auto submit
          handleSubmitQuiz()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeRemaining])

  /**
   * Handle answer selection
   */
  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))

    // Auto-save answer (debounced - in production would use actual debounce)
    saveAnswer(questionId, answer)
  }

  /**
   * Save answer to server
   */
  const saveAnswer = async (questionId: string, answer: string) => {
    try {
      await fetch(`/api/v1/quiz/${quiz.id}/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          questionId,
          answer,
        }),
      })
    } catch (error) {
      console.error('Failed to save answer:', error)
    }
  }

  /**
   * Navigate to next question
   */
  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      const nextIndex = currentQuestion + 1
      setCurrentQuestion(nextIndex)
      router.push(`/join/${quiz.id}/quiz?userId=${userId}&question=${nextIndex}`)
    }
  }

  /**
   * Navigate to previous question
   */
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const prevIndex = currentQuestion - 1
      setCurrentQuestion(prevIndex)
      router.push(`/join/${quiz.id}/quiz?userId=${userId}&question=${prevIndex}`)
    }
  }

  /**
   * Submit quiz
   */
  const handleSubmitQuiz = async () => {
    setIsSubmitting(true)

    try {
      // Submit all answers
      const response = await fetch(`/api/v1/quiz/${quiz.id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          answers,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast.success('Quiz submitted successfully!')
        // Navigate to results page
        router.push(`/join/${quiz.id}/result?userId=${userId}`)
      } else {
        throw new Error(result.error || 'Failed to submit quiz')
      }
    } catch (error) {
      console.error('Quiz submission error:', error)
      toast.error('Failed to submit quiz. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  /**
   * Format time remaining
   */
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6">
      {/* Header with Timer and Progress */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            {/* Question Counter */}
            <div className="text-sm text-neutral-400">
              Question {currentQuestion + 1} of {totalQuestions}
            </div>

            {/* Timer */}
            {timeRemaining !== null && (
              <div className={`flex items-center gap-2 ${timeRemaining < 60 ? 'text-error-base' : 'text-neutral-400'}`}>
                <span className="material-symbols-outlined h-5 w-5">schedule</span>
                <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
              </div>
            )}
          </div>

          {/* Points */}
          <div className="text-sm text-neutral-400">
            {question.points} points
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-base transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Content */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
        {/* Question Type Badge */}
        <div className="mb-4">
          <span className="px-3 py-1 rounded-full text-xs bg-primary-base/10 text-primary-light">
            {question.questionType.replace('_', ' ')}
          </span>
        </div>

        {/* Question Text */}
        <h2 className="text-xl font-semibold text-white mb-6">
          {question.questionText}
        </h2>

        {/* Question Media (if any) */}
        {question.mediaUrl && (
          <div className="mb-6">
            <img
              src={question.mediaUrl}
              alt="Question media"
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        )}

        {/* Question Component based on type */}
        {question.questionType === 'multiple_choice' && (
          <MultipleChoiceQuestion
            question={question}
            selectedAnswer={answers[question.id]}
            onAnswer={handleAnswer}
          />
        )}

        {/* TODO: Other question types */}
        {question.questionType !== 'multiple_choice' && (
          <div className="text-neutral-400 text-center py-8">
            <p>Question type &ldquo;{question.questionType}&rdquo; coming soon</p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          variant="secondary"
          className="flex-1"
        >
          <span className="material-symbols-outlined h-5 w-5 mr-2">arrow_back</span>
          Previous
        </Button>

        {currentQuestion === totalQuestions - 1 ? (
          <Button
            onClick={handleSubmitQuiz}
            disabled={isSubmitting}
            className="flex-1 bg-success-base hover:bg-success-base/90"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined h-5 w-5 mr-2 animate-spin">progress_activity</span>
                Submitting...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined h-5 w-5 mr-2">check_circle</span>
                Submit Quiz
              </>
            )}
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="flex-1 bg-primary-base hover:bg-primary-hover"
          >
            Next
            <span className="material-symbols-outlined h-5 w-5 ml-2">arrow_forward</span>
          </Button>
        )}
      </div>
    </div>
  )
}
