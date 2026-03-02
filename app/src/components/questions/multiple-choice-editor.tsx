/**
 * Multiple Choice Question Editor
 *
 * Component for creating and editing Multiple Choice questions.
 * Features color-coded options, correct answer selection, and shuffle configuration.
 */

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash2, Save, Shuffle } from 'lucide-react'
import { createQuestion } from '@/actions/questions/create'
import { updateQuestion } from '@/actions/questions/update'

/**
 * Option model for UI state
 */
interface Option {
  id?: string
  text: string
  isCorrect: boolean
  sortOrder: number
}

/**
 * MultipleChoiceEditor props
 */
export interface MultipleChoiceEditorProps {
  /** Quiz ID to add question to */
  quizId: string
  /** Initial data for editing */
  initialData?: {
    id?: string
    questionText: string
    points: number
    shuffle: boolean
    options: Option[]
  }
}

/**
 * Option colors for visual distinction
 */
const OPTION_COLORS = [
  { bg: 'bg-purple-100', border: 'border-purple-500', text: 'text-purple-700' }, // A
  { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-700' }, // B
  { bg: 'bg-orange-100', border: 'border-orange-500', text: 'text-orange-700' }, // C
  { bg: 'bg-pink-100', border: 'border-pink-500', text: 'text-pink-700' }, // D
  { bg: 'bg-teal-100', border: 'border-teal-500', text: 'text-teal-700' }, // E
  { bg: 'bg-indigo-100', border: 'border-indigo-500', text: 'text-indigo-700' }, // F
  { bg: 'bg-red-100', border: 'border-red-500', text: 'text-red-700' }, // G
  { bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-700' }, // H
  { bg: 'bg-yellow-100', border: 'border-yellow-500', text: 'text-yellow-700' }, // I
  { bg: 'bg-cyan-100', border: 'border-cyan-500', text: 'text-cyan-700' }, // J
]

const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

/**
 * MultipleChoiceEditor component
 */
export function MultipleChoiceEditor({ quizId, initialData }: MultipleChoiceEditorProps) {
  const [questionText, setQuestionText] = useState(initialData?.questionText ?? '')
  const [points, setPoints] = useState(initialData?.points ?? 10)
  const [shuffle, setShuffle] = useState(initialData?.shuffle ?? false)
  const [options, setOptions] = useState<Option[]>(
    initialData?.options ?? [
      { text: '', isCorrect: false, sortOrder: 0 },
      { text: '', isCorrect: false, sortOrder: 1 },
      { text: '', isCorrect: false, sortOrder: 2 },
      { text: '', isCorrect: false, sortOrder: 3 },
    ]
  )
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Update form when initialData changes (for edit mode)
  useEffect(() => {
    if (initialData) {
      setQuestionText(initialData.questionText)
      setPoints(initialData.points)
      setShuffle(initialData.shuffle)
      setOptions(initialData.options)
    }
  }, [initialData])

  /**
   * Add a new option
   */
  const addOption = () => {
    if (options.length >= 10) return
    setOptions([
      ...options,
      { text: '', isCorrect: false, sortOrder: options.length },
    ])
  }

  /**
   * Remove an option
   */
  const removeOption = (index: number) => {
    if (options.length <= 2) return
    setOptions(options.filter((_, i) => i !== index).map((opt, i) => ({
      ...opt,
      sortOrder: i,
    })))
  }

  /**
   * Update option text
   */
  const updateOptionText = (index: number, text: string) => {
    const newOptions = [...options]
    newOptions[index].text = text
    setOptions(newOptions)
  }

  /**
   * Set correct answer (single select for now)
   */
  const setCorrectAnswer = (index: number) => {
    setOptions(options.map((opt, i) => ({
      ...opt,
      isCorrect: i === index,
    })))
  }

  /**
   * Save question
   */
  const handleSave = async () => {
    setIsSaving(true)
    setError(null)

    try {
      // Validate
      if (!questionText.trim()) {
        setError('Question text is required')
        setIsSaving(false)
        return
      }

      if (options.some((opt) => !opt.text.trim())) {
        setError('All options must have text')
        setIsSaving(false)
        return
      }

      if (!options.some((opt) => opt.isCorrect)) {
        setError('At least one correct answer required')
        setIsSaving(false)
        return
      }

      // Create FormData
      const formData = new FormData()
      formData.append('quizId', quizId)
      formData.append('questionType', 'multiple_choice')
      formData.append('questionText', questionText)
      formData.append('points', points.toString())
      formData.append('shuffle', shuffle.toString())
      formData.append('options', JSON.stringify(options))
      
      // Add question ID if editing
      if (initialData?.id) {
        formData.append('questionId', initialData.id)
      }

      // Call Server Action
      const result = initialData?.id
        ? await updateQuestion(formData)
        : await createQuestion(formData)

      if (result.success) {
        // Redirect to quiz page
        window.location.href = `/quizzes/${quizId}`
      } else {
        setError(result.error || 'Failed to save question')
        setIsSaving(false)
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="rounded-xl border border-error/20 bg-error/10 p-4">
          <p className="text-sm text-error-base">{error}</p>
        </div>
      )}

      {/* Question Text Card */}
      <Card className="border-neutral-200 bg-white">
        <CardHeader>
          <CardTitle className="text-neutral-900">Question</CardTitle>
          <CardDescription className="text-neutral-600">
            Enter your question text
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="questionText" className="text-neutral-700">
              Question Text *
            </Label>
            <textarea
              id="questionText"
              rows={3}
              className="flex w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-primary-base focus:outline-none focus:ring-2 focus:ring-primary-base"
              placeholder="Enter your question here..."
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="points" className="text-neutral-700">
              Points
            </Label>
            <Input
              id="points"
              type="number"
              min="1"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
              className="w-32 border-neutral-300"
            />
          </div>
        </CardContent>
      </Card>

      {/* Options Card */}
      <Card className="border-neutral-200 bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-neutral-900">Answer Options</CardTitle>
              <CardDescription className="text-neutral-600">
                Add 2-10 options and mark the correct answer(s)
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="shuffle"
                checked={shuffle}
                onChange={(e) => setShuffle(e.target.checked)}
                className="h-4 w-4 rounded border-neutral-300 text-primary-base focus:ring-primary-base"
              />
              <Label htmlFor="shuffle" className="flex items-center gap-2 text-neutral-700">
                <Shuffle className="h-4 w-4" />
                Shuffle options
              </Label>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Options List */}
          {options.map((option, index) => {
            const colors = OPTION_COLORS[index]
            return (
              <div
                key={index}
                className={`flex items-center gap-3 rounded-lg border-2 p-3 ${colors.bg} ${colors.border}`}
              >
                {/* Option Label */}
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${colors.bg} ${colors.text} font-bold`}>
                  {OPTION_LABELS[index]}
                </div>

                {/* Option Text */}
                <Input
                  className={`flex-1 border-neutral-300 bg-white ${colors.text}`}
                  placeholder={`Option ${OPTION_LABELS[index]} text`}
                  value={option.text}
                  onChange={(e) => updateOptionText(index, e.target.value)}
                />

                {/* Correct Answer Radio */}
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={option.isCorrect}
                    onChange={() => setCorrectAnswer(index)}
                    className="h-4 w-4 text-primary-base focus:ring-primary-base"
                    aria-label={`Mark option ${OPTION_LABELS[index]} as correct`}
                  />
                  <Label className="text-neutral-700">Correct</Label>
                </div>

                {/* Remove Button */}
                {options.length > 2 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOption(index)}
                    className="text-neutral-500 hover:text-error-base"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                )}
              </div>
            )
          })}

          {/* Add Option Button */}
          {options.length < 10 && (
            <Button
              variant="outline"
              onClick={addOption}
              className="w-full border-neutral-300 text-neutral-700 hover:bg-neutral-100"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Option
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={() => window.history.back()}
          className="border-neutral-300 text-neutral-700"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary-base text-white hover:bg-primary-hover shadow-lg shadow-primary/20"
        >
          {isSaving ? (
            <>
              <Save className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Question
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
