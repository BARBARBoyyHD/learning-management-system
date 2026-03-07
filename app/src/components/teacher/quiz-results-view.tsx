/**
 * Quiz Results View Component
 *
 * Main component showing quiz statistics and student submissions table.
 */

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { StudentDetailModal } from './student-detail-modal'

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

interface Statistics {
  totalSubmissions: number
  averageScore: number
  highestScore: number
  lowestScore: number
}

interface QuizResultsViewProps {
  quiz: Quiz
  responses: StudentResponse[]
  statistics: Statistics
}

export function QuizResultsView({ quiz, responses, statistics }: QuizResultsViewProps) {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)

  // Export to CSV
  const handleExport = () => {
    const headers = ['Student Name', 'Email', 'Score', 'Percentage', 'Completed At']
    const rows = responses.map(r => [
      r.user.name,
      r.user.email,
      `${r.score || 0}/${quiz.totalPoints}`,
      `${Math.round(((r.score || 0) / quiz.totalPoints) * 100)}%`,
      new Date(r.completedAt).toLocaleString(),
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${quiz.title.replace(/\s+/g, '_')}_results.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // Get selected student response
  const selectedResponse = selectedStudent
    ? responses.find(r => r.userId === selectedStudent)
    : null

  return (
    <div className="space-y-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Submissions"
          value={statistics.totalSubmissions.toString()}
          icon="people"
        />
        <StatCard
          label="Average Score"
          value={`${statistics.averageScore}/${quiz.totalPoints}`}
          subValue={`${Math.round((statistics.averageScore / quiz.totalPoints) * 100)}%`}
          icon="analytics"
        />
        <StatCard
          label="Highest Score"
          value={`${statistics.highestScore}/${quiz.totalPoints}`}
          icon="trending_up"
          highlight="success"
        />
        <StatCard
          label="Lowest Score"
          value={`${statistics.lowestScore}/${quiz.totalPoints}`}
          icon="trending_down"
          highlight="warning"
        />
      </div>

      {/* Results Table */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
          <h2 className="text-xl font-semibold text-white">Student Submissions</h2>
          <Button
            onClick={handleExport}
            variant="secondary"
            className="flex items-center gap-2"
            disabled={responses.length === 0}
          >
            <span className="material-symbols-outlined h-4 w-4">download</span>
            Export CSV
          </Button>
        </div>

        {responses.length === 0 ? (
          <div className="p-12 text-center">
            <span className="material-symbols-outlined h-16 w-16 text-neutral-600 mx-auto mb-4">inbox</span>
            <h3 className="text-xl font-semibold text-white mb-2">No Submissions Yet</h3>
            <p className="text-neutral-400">Students haven&apos;t taken this quiz yet.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-neutral-800/50">
              <tr>
                <th className="text-left text-sm font-medium text-neutral-400 px-6 py-4">Student</th>
                <th className="text-left text-sm font-medium text-neutral-400 px-6 py-4">Email</th>
                <th className="text-left text-sm font-medium text-neutral-400 px-6 py-4">Score</th>
                <th className="text-left text-sm font-medium text-neutral-400 px-6 py-4">Percentage</th>
                <th className="text-left text-sm font-medium text-neutral-400 px-6 py-4">Completed</th>
                <th className="text-right text-sm font-medium text-neutral-400 px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {responses.map((response) => {
                const percentage = quiz.totalPoints > 0
                  ? Math.round(((response.score || 0) / quiz.totalPoints) * 100)
                  : 0
                const grade = percentage >= 90 ? 'A' : percentage >= 80 ? 'B' : percentage >= 70 ? 'C' : percentage >= 60 ? 'D' : 'F'
                
                return (
                  <tr key={response.id} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary-base/20 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-base">
                            {response.user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-white font-medium">{response.user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-400">{response.user.email}</td>
                    <td className="px-6 py-4 text-white">
                      {response.score || 0} / {quiz.totalPoints}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={
                          percentage >= 70 ? 'text-success-base' :
                          percentage >= 60 ? 'text-warning-base' : 'text-error-base'
                        }>
                          {percentage}%
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          percentage >= 90 ? 'bg-success-base/20 text-success-base' :
                          percentage >= 80 ? 'bg-info-base/20 text-info-base' :
                          percentage >= 70 ? 'bg-warning-base/20 text-warning-base' :
                          percentage >= 60 ? 'bg-orange-400/20 text-orange-400' :
                          'bg-error-base/20 text-error-base'
                        }`}>
                          {grade}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-400 text-sm">
                      {new Date(response.completedAt).toLocaleDateString()}
                      <br />
                      <span className="text-xs">
                        {new Date(response.completedAt).toLocaleTimeString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        onClick={() => setSelectedStudent(response.userId)}
                        variant="ghost"
                        size="sm"
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Student Detail Modal */}
      {selectedResponse && (
        <StudentDetailModal
          response={selectedResponse}
          quiz={quiz}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  )
}

// Statistics Card Component
function StatCard({
  label,
  value,
  subValue,
  icon,
  highlight,
}: {
  label: string
  value: string
  subValue?: string
  icon: string
  highlight?: 'success' | 'warning'
}) {
  const highlightColor = highlight === 'success'
    ? 'text-success-base bg-success-base/10'
    : highlight === 'warning'
    ? 'text-warning-base bg-warning-base/10'
    : 'text-primary-base bg-primary-base/10'

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <span className={`material-symbols-outlined h-6 w-6 ${highlightColor} rounded-lg p-1`}>
          {icon}
        </span>
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      {subValue && <p className="text-sm text-neutral-400">{subValue}</p>}
      <p className="text-sm text-neutral-400 mt-2">{label}</p>
    </div>
  )
}
