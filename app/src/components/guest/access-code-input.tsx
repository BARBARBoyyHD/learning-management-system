/**
 * Access Code Input Component
 *
 * Reusable component for entering 6-character access codes.
 * Features:
 * - 6 individual input boxes (one per character)
 * - Auto-focus next box on input
 * - Auto-submit when 6th character entered (optional)
 * - Backspace moves to previous box
 * - Only accepts alphanumeric characters
 * - Converts to uppercase automatically
 * - Accessible (ARIA labels, keyboard navigation)
 */

'use client'

import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface AccessCodeInputProps {
  /** Callback when code is complete (6 characters) */
  onComplete?: (code: string) => void
  /** Callback on any change */
  onChange?: (code: string) => void
  /** Error state */
  error?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Auto-submit when complete */
  autoSubmit?: boolean
}

export function AccessCodeInput({
  onComplete,
  onChange,
  error = false,
  disabled = false,
  autoSubmit = false,
}: AccessCodeInputProps) {
  // Array of 6 input refs
  const inputs = useRef<(HTMLInputElement | null)[]>([])
  // Store the 6-character code
  const code = useRef<string[]>(['', '', '', '', '', ''])

  /**
   * Focus first input on mount
   */
  useEffect(() => {
    inputs.current[0]?.focus()
  }, [])

  /**
   * Handle input change
   */
  const handleChange = (index: number, value: string) => {
    // Only accept alphanumeric characters
    const char = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase()

    if (!char) return

    // Update code array
    code.current[index] = char
    const fullCode = code.current.join('')

    // Notify parent of change
    onChange?.(fullCode)

    // Move to next input
    if (index < 5) {
      inputs.current[index + 1]?.focus()
    }

    // Auto-submit if complete
    if (fullCode.length === 6 && autoSubmit) {
      onComplete?.(fullCode)
    }
  }

  /**
   * Handle key down (backspace navigation)
   */
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code.current[index]) {
      // Move to previous input on backspace if current is empty
      if (index > 0) {
        inputs.current[index - 1]?.focus()
        // Clear previous input
        code.current[index - 1] = ''
        inputs.current[index - 1]?.dispatchEvent(new Event('input', { bubbles: true }))
      }
    }
  }

  /**
   * Handle paste (allow pasting full 6-character code)
   */
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').toUpperCase().replace(/[^A-Z0-9]/g, '')

    if (pastedData.length === 6) {
      // Fill all inputs
      for (let i = 0; i < 6; i++) {
        code.current[i] = pastedData[i] || ''
        const input = inputs.current[i]
        if (input) {
          input.value = pastedData[i] || ''
        }
      }

      // Notify parent
      onChange?.(pastedData)

      // Focus last input or submit
      inputs.current[5]?.focus()
      if (autoSubmit) {
        onComplete?.(pastedData)
      }
    }
  }

  /**
   * Set input ref in array
   */
  const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
    inputs.current[index] = el
  }

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: 6 }).map((_, index) => (
        <input
          key={index}
          ref={setInputRef(index)}
          type="text"
          inputMode="text"
          maxLength={1}
          disabled={disabled}
          aria-label={`Character ${index + 1} of 6`}
          className={cn(
            'w-12 h-14 text-center text-2xl font-bold rounded-lg border-2 transition-all',
            'focus:outline-none focus:ring-2 focus:ring-primary-base focus:border-primary-base',
            error
              ? 'border-error-base bg-error-base/10 text-error-base'
              : 'border-neutral-700 bg-neutral-900 text-white hover:border-neutral-600',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  )
}
