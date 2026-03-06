/**
 * Student Detail View Component
 *
 * Modal showing individual student's answers for each question.
 */

'use client'

import { useEffect, useState } from 'react'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface StudentResponse {
  id: string
  userId: string
  score: number | null
  completedAt: Date
  user: {
    id: string
    name: string
    email: string
  }
}

interface Question {
  id: string
  title: string
  points: number
}

interface Quiz {
  id: string
  title: string
  questions: Question[]
}

interface StudentDetailViewProps {
  response: StudentResponse
  quiz: Quiz
  totalPoints: number
  onClose: () => void
}

export function StudentDetailView({
  response,
  quiz,
  totalPoints,
  onClose,
}: StudentDetailViewProps) {
  const [details, setDetails] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch response details
    const fetchDetails = async () => {
      try {
        const res = await fetch(`/api/v1/quiz/${quiz.id}/responses/${response.id}`)
        const data = await res.json()
        setDetails(data.details || [])
      } catch (error) {
        console.error('Failed to fetch details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [quiz.id, response.id])

  const percentage = Math.round(((response.score || 0) / totalPoints) * 100)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="bg-neutral-900 rounded-xl border border-neutral-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-neutral-900 border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">{response.user.name}</h2>
            <p className="text-sm text-neutral-400">{response.user.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{response.score || 0}/{totalPoints}</p>
              <p className="text-sm text-neutral-400">{percentage}%</p>
            </div>
            <Button onClick={onClose} variant="ghost" size="sm">
              <span className="material-symbols-outlined h-5 w-5">close</span>
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {loading ? (
            <div className="text-center py-8 text-neutral-400">Loading answers...</div>
          ) : (
            quiz.questions.map((question, index) => {
              const detail = details.find(d => d.questionId === question.id)
              const isCorrect = detail?.isCorrect

              return (
                <div
                  key={question.id}
                  className={cn(
                    'rounded-lg border p-4',
                    isCorrect ? 'border-success-base/30 bg-success-base/5' : 'border-error-base/30 bg-error-base/5'
                  )}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        'flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold',
                        isCorrect ? 'bg-success-base text-white' : 'bg-error-base text-white'
                      )}>
                        {index + 1}
                      </span>
                      <span className="text-sm text-neutral-400">{question.points} points</span>
                    </div>
                    {isCorrect ? (
                      <span className="text-success-base flex items-center gap-1 text-sm">
                        <span className="material-symbols-outlined h-4 w-4">check_circle</span>
                        Correct
                      </span>
                    ) : (
                      <span className="text-error-base flex items-center gap-1 text-sm">
                        <span className="material-symbols-outlined h-4 w-4">cancel</span>
                        Incorrect
                      </span>
                    )}
                  </div>

                  <p className="text-white mb-4">{question.title}</p>

                  <div className="space-y-2">
                    <div className={cn(
                      'p-3 rounded-lg',
                      isCorrect ? 'bg-success-base/10' : 'bg-error-base/10'
                    )}>
                      <span className="text-sm text-neutral-400">Student answer: </span>
                      <span className="text-white">{detail?.answerGiven || 'No answer'}</span>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
