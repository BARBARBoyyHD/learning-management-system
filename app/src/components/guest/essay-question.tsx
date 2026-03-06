/**
 * Essay Question Component
 *
 * Displays essay question with rich text editor for student answers.
 * Supports word limit and auto-save functionality.
 */

'use client'

import { useState, useEffect, useRef } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface EssayQuestion {
  id: string
  questionText: string
  settings?: {
    gradingRubric?: string
    wordLimit?: number
  } | null
}

interface EssayQuestionProps {
  question: EssayQuestion
  selectedAnswer: string | undefined
  onAnswer: (questionId: string, answer: string) => void
}

export function EssayQuestion({
  question,
  selectedAnswer,
  onAnswer,
}: EssayQuestionProps) {
  const [answer, setAnswer] = useState(selectedAnswer || '')
  const [wordCount, setWordCount] = useState(0)
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const wordLimit = question.settings?.wordLimit

  /**
   * Count words in answer
   */
  const countWords = (text: string): number => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0)
      .length
  }

  /**
   * Handle answer change
   */
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAnswer = e.target.value
    const words = countWords(newAnswer)

    // Check word limit
    if (wordLimit && words > wordLimit) {
      return // Don't allow exceeding word limit
    }

    setAnswer(newAnswer)
    setWordCount(words)
    onAnswer(question.id, newAnswer)
  }

  /**
   * Update word count on mount
   */
  useEffect(() => {
    if (selectedAnswer) {
      setWordCount(countWords(selectedAnswer))
    }
  }, [selectedAnswer])

  /**
   * Auto-resize textarea
   */
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [answer])

  const isOverLimit = wordLimit && wordCount > wordLimit * 0.9

  return (
    <div className="space-y-4">
      {/* Essay Textarea */}
      <div className={cn(
        'rounded-xl border-2 transition-all duration-200 overflow-hidden',
        isFocused
          ? 'border-primary-base bg-neutral-800/70'
          : 'border-neutral-700 bg-neutral-800/50'
      )}>
        <Textarea
          ref={textareaRef}
          value={answer}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Type your answer here..."
          className={cn(
            'min-h-[300px] resize-none border-0 bg-transparent text-white text-base leading-relaxed',
            'focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            'placeholder:text-neutral-500'
          )}
          disabled={!!wordLimit && wordCount >= wordLimit}
        />
      </div>

      {/* Word Count and Limit */}
      <div className="flex items-center justify-between text-sm">
        <div className={cn(
          'transition-colors',
          isOverLimit ? 'text-warning-base' : 'text-neutral-500'
        )}>
          {wordCount} {wordCount === 1 ? 'word' : 'words'}
          {wordLimit && (
            <span className="ml-2">
              / {wordLimit} limit
            </span>
          )}
        </div>

        {wordLimit && (
          <div className={cn(
            'px-3 py-1 rounded-full text-xs font-medium',
            isOverLimit
              ? 'bg-warning-base/20 text-warning-base'
              : 'bg-neutral-700 text-neutral-400'
          )}>
            {Math.round((wordCount / wordLimit) * 100)}% used
          </div>
        )}
      </div>

      {/* Grading Rubric (if provided) */}
      {question.settings?.gradingRubric && (
        <div className="mt-6 p-4 rounded-xl border border-neutral-700 bg-neutral-800/30">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined h-5 w-5 text-neutral-400">info</span>
            <h4 className="text-sm font-medium text-neutral-300">Grading Rubric</h4>
          </div>
          <p className="text-sm text-neutral-400 whitespace-pre-wrap">
            {question.settings.gradingRubric}
          </p>
        </div>
      )}

      {/* Helper Text */}
      {!answer && (
        <p className="text-sm text-neutral-500 text-center mt-4">
          Write your detailed answer in the text area above
        </p>
      )}
    </div>
  )
}
