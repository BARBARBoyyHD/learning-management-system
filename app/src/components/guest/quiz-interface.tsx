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
import { EssayQuestion } from './essay-question'

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

  return (
    <div className="space-y-6">
      {/* Header with Timer and Progress */}
      <header className="flex items-center justify-between border-b border-primary-base/10 px-6 py-4 bg-neutral-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary-base/10 rounded-lg text-primary-base">
            <span className="material-symbols-outlined">eco</span>
          </div>
          <div>
            <h2 className="text-white text-lg font-bold leading-tight tracking-tight">{quiz.title}</h2>
            <p className="text-xs text-neutral-400 font-medium">Quiz in Progress</p>
          </div>
        </div>
        
        {/* Progress & Timer */}
        <div className="flex items-center gap-8">
          <div className="hidden md:flex flex-col items-center gap-1 min-w-[120px]">
            <div className="flex justify-between w-full text-[10px] uppercase tracking-widest font-bold text-primary-base">
              <span>Progress</span>
              <span>{currentQuestion + 1}/{totalQuestions}</span>
            </div>
            <div className="w-full h-2 bg-primary-base/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-base rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          {timeRemaining !== null && (
            <div className="flex items-center gap-3 bg-primary-base/10 px-4 py-2 rounded-xl border border-primary-base/20">
              <span className="material-symbols-outlined text-primary-base text-xl">timer</span>
              <div className="flex gap-1 font-mono text-xl font-bold text-white">
                <span>{String(Math.floor(timeRemaining / 60)).padStart(2, '0')}</span>
                <span className="animate-pulse">:</span>
                <span>{String(timeRemaining % 60).padStart(2, '0')}</span>
              </div>
            </div>
          )}
          
          <button className="flex items-center justify-center rounded-xl h-10 w-10 bg-neutral-800 text-neutral-400 hover:bg-primary-base/20 hover:text-white transition-colors">
            <span className="material-symbols-outlined">pause</span>
          </button>
        </div>
      </header>

      {/* Question Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-5xl mx-auto w-full">
        <div className="w-full text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-primary-base/10 text-primary-base text-sm font-bold mb-6 border border-primary-base/20 uppercase tracking-wider">
            {question.questionType.replace('_', ' ')}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white max-w-3xl mx-auto">
            {question.questionText}
          </h1>
        </div>
        
        {/* Question Component based on type */}
        <div className="w-full h-full max-h-[500px]">
          {question.questionType === 'multiple_choice' && (
            <MultipleChoiceQuestion
              question={question}
              selectedAnswer={answers[question.id]}
              onAnswer={handleAnswer}
            />
          )}

          {question.questionType === 'essay' && (
            <EssayQuestion
              question={question}
              selectedAnswer={answers[question.id]}
              onAnswer={handleAnswer}
            />
          )}

          {/* TODO: Other question types */}
          {question.questionType !== 'multiple_choice' && question.questionType !== 'essay' && (
            <div className="text-neutral-400 text-center py-8">
              <p>Question type &ldquo;{question.questionType}&rdquo; coming soon</p>
            </div>
          )}
        </div>
      </main>

      {/* Navigation Footer */}
      <footer className="p-6 bg-neutral-900/80 backdrop-blur-sm border-t border-primary-base/10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              variant="secondary"
              className="px-6 py-3 rounded-xl border border-neutral-700 text-neutral-300 font-bold hover:bg-neutral-800 transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
              Previous
            </Button>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 text-neutral-400">
              <span className="material-symbols-outlined">lightbulb</span>
              <span className="text-sm font-medium">{question.points} points</span>
            </div>
            
            {currentQuestion === totalQuestions - 1 ? (
              <Button
                onClick={handleSubmitQuiz}
                disabled={isSubmitting}
                className="px-10 py-3 rounded-xl bg-success-base text-white font-bold shadow-lg shadow-success-base/25 hover:bg-success-base/90 transition-all active:scale-95 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-xl animate-spin">progress_activity</span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-xl">check_circle</span>
                    Submit Quiz
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="px-10 py-3 rounded-xl bg-primary-base text-white font-bold shadow-lg shadow-primary-base/25 hover:bg-primary-base/90 transition-all active:scale-95 flex items-center gap-2"
              >
                Next
                <span className="material-symbols-outlined text-xl">keyboard_double_arrow_right</span>
              </Button>
            )}
          </div>
        </div>
      </footer>
    </div>
  )
}
