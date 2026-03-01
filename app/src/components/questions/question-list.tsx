/**
 * Question List Component
 *
 * Displays a list of questions in a quiz.
 * Shows question preview, type, points, and actions.
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, Edit, Trash2, Plus } from 'lucide-react'
import { deleteQuestion } from '@/actions/questions/delete'

/**
 * Question list props
 */
export interface QuestionListProps {
  /** Quiz ID */
  quizId: string
  /** Array of questions */
  questions: Array<{
    id: string
    questionType: string
    questionText: string
    points: number
    orderIndex: number
  }>
  /** Can edit questions */
  canEdit?: boolean
}

/**
 * Get question type display name
 */
function getQuestionTypeDisplay(type: string): string {
  const types: Record<string, string> = {
    multiple_choice: 'Multiple Choice',
    essay: 'Essay',
    fill_blank: 'Fill in the Blank',
    match: 'Match',
    reorder: 'Reorder',
  }
  return types[type] || type
}

/**
 * Get question type icon color
 */
function getQuestionTypeColor(type: string): string {
  const colors: Record<string, string> = {
    multiple_choice: 'bg-purple-100 text-purple-700',
    essay: 'bg-blue-100 text-blue-700',
    fill_blank: 'bg-orange-100 text-orange-700',
    match: 'bg-pink-100 text-pink-700',
    reorder: 'bg-teal-100 text-teal-700',
  }
  return colors[type] || 'bg-neutral-100 text-neutral-700'
}

/**
 * QuestionList component
 */
export function QuestionList({ quizId, questions, canEdit = true }: QuestionListProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (questionId: string) => {
    if (!confirm('Are you sure you want to delete this question? This action cannot be undone.')) {
      return
    }

    setIsDeleting(true)

    try {
      const formData = new FormData()
      formData.append('questionId', questionId)
      formData.append('quizId', quizId)

      const result = await deleteQuestion(formData)

      if (result.success) {
        // Reload page to reflect changes
        window.location.reload()
      } else {
        alert(result.error)
        setIsDeleting(false)
      }
    } catch (error) {
      alert('Failed to delete question')
      setIsDeleting(false)
    }
  }
  if (questions.length === 0) {
    return (
      <Card className="border-neutral-200 bg-white">
        <CardHeader>
          <CardTitle className="text-neutral-900">Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-neutral-400" />
            <p className="mt-4 text-neutral-500">No questions yet</p>
            <p className="text-sm text-neutral-400">Add your first question to get started</p>
            {canEdit && (
              <Link href={`/quizzes/${quizId}/questions/new`}>
                <Button className="mt-4 bg-primary-base text-white hover:bg-primary-hover">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Question
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-neutral-200 bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-neutral-900">Questions</CardTitle>
          {canEdit && (
            <Link href={`/quizzes/${quizId}/questions/new`}>
              <Button variant="outline" size="sm" className="border-neutral-300">
                <Plus className="mr-2 h-4 w-4" />
                Add Question
              </Button>
            </Link>
          )}
        </div>
        <CardDescription className="text-neutral-600">
          {questions.length} {questions.length === 1 ? 'question' : 'questions'} •{' '}
          {questions.reduce((sum, q) => sum + q.points, 0)} total points
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {questions.map((question, index) => (
          <div
            key={question.id}
            className="flex items-start justify-between gap-4 rounded-lg border border-neutral-200 p-4"
          >
            <div className="flex items-start gap-3 flex-1">
              {/* Question Number */}
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-sm font-medium text-neutral-700">
                {index + 1}
              </div>

              {/* Question Type Icon */}
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${getQuestionTypeColor(question.questionType)}`}>
                <FileText className="h-4 w-4" />
              </div>

              {/* Question Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {getQuestionTypeDisplay(question.questionType)}
                  </Badge>
                  <span className="text-sm font-medium text-neutral-700">
                    {question.points} pts
                  </span>
                </div>
                <p className="mt-1 text-sm text-neutral-600 line-clamp-2">
                  {question.questionText}
                </p>
              </div>
            </div>

            {/* Actions */}
            {canEdit && (
              <div className="flex items-center gap-2">
                <Link href={`/quizzes/${quizId}/questions/${question.id}/edit`}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-neutral-500 hover:text-primary-base"
                    disabled={isDeleting}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(question.id)}
                  disabled={isDeleting}
                  className="text-neutral-500 hover:text-error-base"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
