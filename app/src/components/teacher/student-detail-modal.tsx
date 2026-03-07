/**
 * Student Detail Modal Component
 *
 * Modal showing individual student's answers for each question.
 */

'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Question {
  id: string
  questionText: string
  points: number
  questionType: string
}

interface Quiz {
  id: string
  title: string
  description: string
  questions: Question[]
  totalPoints: number
}

interface StudentResponse {
  id: string
  userId: string
  score: number | null
  completedAt: string
  user: {
    id: string
    name: string
    email: string
  }
  details: Array<{
    questionId: string
    answerGiven: string | null
    isCorrect: boolean | null
  }>
}

interface StudentDetailModalProps {
  response: StudentResponse
  quiz: Quiz
  onClose: () => void
}

export function StudentDetailModal({
  response,
  quiz,
  onClose,
}: StudentDetailModalProps) {
  const percentage = quiz.totalPoints > 0
    ? Math.round(((response.score || 0) / quiz.totalPoints) * 100)
    : 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="bg-neutral-900 rounded-xl border border-neutral-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-neutral-900 border-b border-neutral-800 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-semibold text-white">{response.user.name}</h2>
            <p className="text-sm text-neutral-400">{response.user.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{response.score || 0}/{quiz.totalPoints}</p>
              <p className="text-sm text-neutral-400">{percentage}%</p>
            </div>
            <Button onClick={onClose} variant="ghost" size="sm">
              <span className="material-symbols-outlined h-5 w-5">close</span>
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {quiz.questions.map((question, index) => {
            const detail = response.details.find(d => d.questionId === question.id)
            const isCorrect = detail?.isCorrect

            return (
              <div
                key={question.id}
                className={cn(
                  'rounded-lg border p-4',
                  isCorrect === true
                    ? 'border-success-base/30 bg-success-base/5'
                    : isCorrect === false
                    ? 'border-error-base/30 bg-error-base/5'
                    : 'border-neutral-700 bg-neutral-800/30'
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      'flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold',
                      isCorrect === true
                        ? 'bg-success-base text-white'
                        : isCorrect === false
                        ? 'bg-error-base text-white'
                        : 'bg-neutral-600 text-white'
                    )}>
                      {index + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-neutral-400">{question.points} points</span>
                      <span className="text-xs text-neutral-500 px-2 py-0.5 rounded bg-neutral-800">
                        {question.questionType.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  {isCorrect === true ? (
                    <span className="text-success-base flex items-center gap-1 text-sm">
                      <span className="material-symbols-outlined h-4 w-4">check_circle</span>
                      Correct
                    </span>
                  ) : isCorrect === false ? (
                    <span className="text-error-base flex items-center gap-1 text-sm">
                      <span className="material-symbols-outlined h-4 w-4">cancel</span>
                      Incorrect
                    </span>
                  ) : (
                    <span className="text-neutral-400 flex items-center gap-1 text-sm">
                      <span className="material-symbols-outlined h-4 w-4">remove</span>
                      No Answer
                    </span>
                  )}
                </div>

                <p className="text-white mb-4">{question.questionText}</p>

                <div className="space-y-2">
                  <div className={cn(
                    'p-3 rounded-lg',
                    isCorrect === true
                      ? 'bg-success-base/10'
                      : isCorrect === false
                      ? 'bg-error-base/10'
                      : 'bg-neutral-800/50'
                  )}>
                    <span className="text-sm text-neutral-400">Student answer: </span>
                    <span className="text-white">
                      {detail?.answerGiven || 'No answer provided'}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
