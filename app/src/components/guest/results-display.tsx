/**
 * Results Display Component
 *
 * Client component for showing quiz results.
 * Displays score, percentage, and question-by-question review.
 */

'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Question {
  id: string
  text: string
  type: string
  points: number
}

interface QuestionResult {
  question: Question
  userAnswer: {
    id: string
    text: string
    isCorrect: boolean
  } | null
  correctAnswer: {
    id: string
    text: string
  } | null
  isCorrect: boolean
  earnedPoints: number
}

interface Quiz {
  id: string
  title: string
  timeLimit?: number | null
}

interface ResultsDisplayProps {
  quiz: Quiz
  studentName: string
  score: number
  totalScore: number
  percentage: number
  totalQuestions: number
  questionResults: QuestionResult[]
}

export function ResultsDisplay({
  quiz,
  studentName,
  score,
  totalScore,
  percentage,
  totalQuestions,
  questionResults,
}: ResultsDisplayProps) {
  const router = useRouter()

  // Determine grade and color based on percentage
  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A', color: 'text-success-base' }
    if (percentage >= 80) return { grade: 'B', color: 'text-info-base' }
    if (percentage >= 70) return { grade: 'C', color: 'text-warning-base' }
    if (percentage >= 60) return { grade: 'D', color: 'text-orange-400' }
    return { grade: 'F', color: 'text-error-base' }
  }

  const { grade, color } = getGrade(percentage)

  return (
    <div className="space-y-6">
      {/* Header with Grade */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-8 text-center">
        <div className="mb-4">
          <span className="material-symbols-outlined h-16 w-16 text-primary-base mx-auto">
            {percentage >= 70 ? 'emoji_events' : 'sentiment_neutral'}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h1>
        <p className="text-neutral-400 mb-6">Great job, {studentName}!</p>

        {/* Grade Circle */}
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-4 border-primary-base bg-primary-base/10 mb-6">
          <span className={cn('text-5xl font-bold', color)}>{grade}</span>
        </div>

        {/* Score */}
        <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
          <div>
            <p className="text-xs text-neutral-500 mb-1">Score</p>
            <p className="text-2xl font-bold text-white">
              {score}/{totalScore}
            </p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 mb-1">Percentage</p>
            <p className={cn('text-2xl font-bold', color)}>{percentage}%</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 mb-1">Questions</p>
            <p className="text-2xl font-bold text-white">{totalQuestions}</p>
          </div>
        </div>
      </div>

      {/* Question Review */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined h-5 w-5 text-neutral-400">
            review
          </span>
          Question Review
        </h2>

        <div className="space-y-4">
          {questionResults.map((result, index) => (
            <div
              key={result.question.id}
              className={cn(
                'rounded-lg border p-4',
                result.isCorrect
                  ? 'border-success-base/30 bg-success-base/5'
                  : 'border-error-base/30 bg-error-base/5'
              )}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold',
                      result.isCorrect
                        ? 'bg-success-base text-white'
                        : 'bg-error-base text-white'
                    )}
                  >
                    {index + 1}
                  </span>
                  <span className="text-sm text-neutral-400">
                    {result.question.type.replace('_', ' ')}
                  </span>
                </div>
                <span
                  className={cn(
                    'text-sm font-medium',
                    result.isCorrect ? 'text-success-base' : 'text-error-base'
                  )}
                >
                  {result.isCorrect ? (
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined h-4 w-4">
                        check_circle
                      </span>
                      Correct
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined h-4 w-4">
                        cancel
                      </span>
                      Incorrect
                    </span>
                  )}
                </span>
              </div>

              {/* Question Text */}
              <p className="text-white mb-4">{result.question.text}</p>

              {/* Answers */}
              <div className="space-y-2">
                {/* User's Answer */}
                <div
                  className={cn(
                    'p-3 rounded-lg flex items-center justify-between',
                    result.isCorrect
                      ? 'bg-success-base/10 border border-success-base/30'
                      : 'bg-error-base/10 border border-error-base/30'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-neutral-400">Your answer:</span>
                    <span className="text-white">
                      {result.userAnswer?.text || 'No answer'}
                    </span>
                  </div>
                  {result.isCorrect && (
                    <span className="material-symbols-outlined h-5 w-5 text-success-base">
                      check_circle
                    </span>
                  )}
                </div>

                {/* Correct Answer (if user got it wrong) */}
                {!result.isCorrect && result.correctAnswer && (
                  <div className="p-3 rounded-lg bg-success-base/10 border border-success-base/30">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-neutral-400">Correct answer:</span>
                      <span className="text-success-base font-medium">
                        {result.correctAnswer.text}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Points */}
              <div className="mt-3 text-right text-sm text-neutral-400">
                +{result.earnedPoints} / {result.question.points} points
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={() => router.push('/join')}
          variant="secondary"
          className="flex-1"
        >
          <span className="material-symbols-outlined h-5 w-5 mr-2">home</span>
          Back to Join
        </Button>
        <Button
          onClick={() => router.push(`/join/${quiz.id}`)}
          className="flex-1 bg-primary-base hover:bg-primary-hover"
        >
          <span className="material-symbols-outlined h-5 w-5 mr-2">refresh</span>
          Retake Quiz
        </Button>
      </div>
    </div>
  )
}
