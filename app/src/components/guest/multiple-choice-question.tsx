/**
 * Multiple Choice Question Component
 *
 * Displays multiple choice question with option cards (A, B, C, D).
 * Handles answer selection and visual feedback.
 */

'use client'

import { cn } from '@/lib/utils'

interface Option {
  id: string
  option: string
  sortOrder?: number | null
  isCorrect: boolean
}

interface Question {
  id: string
  questionText: string
  options: Option[]
}

interface MultipleChoiceQuestionProps {
  question: Question
  selectedAnswer: string | undefined
  onAnswer: (questionId: string, answer: string) => void
}

/**
 * Option colors for multiple choice
 */
const optionColors: Record<string, string> = {
  0: 'bg-option-a hover:bg-option-a/80',
  1: 'bg-option-b hover:bg-option-b/80',
  2: 'bg-option-c hover:bg-option-c/80',
  3: 'bg-option-d hover:bg-option-d/80',
}

const optionLabels = ['A', 'B', 'C', 'D']

export function MultipleChoiceQuestion({
  question,
  selectedAnswer,
  onAnswer,
}: MultipleChoiceQuestionProps) {
  const handleSelect = (optionId: string) => {
    onAnswer(question.id, optionId)
  }

  return (
    <div className="space-y-4">
      {/* Options Grid */}
      <div className="grid gap-4">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option.id
          const colorClass = optionColors[index] || 'bg-neutral-700'

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={cn(
                'w-full p-4 rounded-xl border-2 transition-all duration-200',
                'flex items-center gap-4 text-left',
                isSelected
                  ? 'border-white bg-white/10 shadow-lg'
                  : 'border-neutral-700 bg-neutral-800/50 hover:border-neutral-600',
                colorClass
              )}
            >
              {/* Option Label (A, B, C, D) */}
              <div
                className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-full font-bold text-white',
                  isSelected ? 'bg-white text-neutral-900' : 'bg-black/20'
                )}
              >
                {optionLabels[index]}
              </div>

              {/* Option Text */}
              <div className="flex-1 text-white text-lg">{option.option}</div>

              {/* Selection Indicator */}
              {isSelected && (
                <span className="material-symbols-outlined h-6 w-6 text-white">
                  check_circle
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Helper Text */}
      {!selectedAnswer && (
        <p className="text-sm text-neutral-500 text-center mt-4">
          Select one option to continue
        </p>
      )}
    </div>
  )
}
