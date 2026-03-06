/**
 * Access Code Input Component Tests
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AccessCodeInput } from '../access-code-input'

describe('AccessCodeInput', () => {
  it('should render 6 input boxes', () => {
    render(<AccessCodeInput />)
    
    const inputs = screen.getAllByRole('textbox')
    expect(inputs).toHaveLength(6)
  })

  it('should auto-focus first input on mount', () => {
    render(<AccessCodeInput />)
    
    const firstInput = screen.getByLabelText('Character 1 of 6')
    expect(firstInput).toHaveFocus()
  })

  it('should accept only alphanumeric characters', () => {
    const handleChange = vi.fn()
    render(<AccessCodeInput onChange={handleChange} />)
    
    const firstInput = screen.getByLabelText('Character 1 of 6')
    
    // Type valid character
    fireEvent.change(firstInput, { target: { value: 'A' } })
    expect(handleChange).toHaveBeenCalledWith('A')
    
    // Type invalid character (should be filtered)
    fireEvent.change(firstInput, { target: { value: '-' } })
    expect(handleChange).toHaveBeenCalledTimes(1) // Should not be called again
  })

  it('should convert lowercase to uppercase', () => {
    const handleChange = vi.fn()
    render(<AccessCodeInput onChange={handleChange} />)
    
    const firstInput = screen.getByLabelText('Character 1 of 6')
    fireEvent.change(firstInput, { target: { value: 'a' } })
    
    expect(handleChange).toHaveBeenCalledWith('A')
  })

  it('should auto-focus next input on character entry', () => {
    render(<AccessCodeInput />)
    
    const firstInput = screen.getByLabelText('Character 1 of 6')
    const secondInput = screen.getByLabelText('Character 2 of 6')
    
    fireEvent.change(firstInput, { target: { value: 'A' } })
    
    expect(secondInput).toHaveFocus()
  })

  it('should handle backspace navigation', () => {
    render(<AccessCodeInput />)
    
    const firstInput = screen.getByLabelText('Character 1 of 6')
    const secondInput = screen.getByLabelText('Character 2 of 6')
    
    // Fill first input
    fireEvent.change(firstInput, { target: { value: 'A' } })
    
    // Press backspace on second input
    fireEvent.keyDown(secondInput, { key: 'Backspace' })
    
    expect(firstInput).toHaveFocus()
  })

  it('should call onComplete when all 6 characters entered with autoSubmit', () => {
    const handleComplete = vi.fn()
    render(<AccessCodeInput onComplete={handleComplete} autoSubmit />)
    
    const inputs = screen.getAllByRole('textbox')
    
    // Fill all 6 inputs
    'ABCDEF'.split('').forEach((char, index) => {
      fireEvent.change(inputs[index], { target: { value: char } })
    })
    
    expect(handleComplete).toHaveBeenCalledWith('ABCDEF')
  })

  it('should handle paste of 6-character code', () => {
    const handleChange = vi.fn()
    render(<AccessCodeInput onChange={handleChange} />)
    
    const firstInput = screen.getByLabelText('Character 1 of 6')
    
    // Paste full code
    fireEvent.paste(firstInput, {
      clipboardData: {
        getData: () => 'ABC123',
      },
    })
    
    expect(handleChange).toHaveBeenCalledWith('ABC123')
  })

  it('should apply error styling when error prop is true', () => {
    render(<AccessCodeInput error />)
    
    const firstInput = screen.getByLabelText('Character 1 of 6')
    expect(firstInput).toHaveClass('border-error-base')
  })

  it('should be disabled when disabled prop is true', () => {
    render(<AccessCodeInput disabled />)
    
    const firstInput = screen.getByLabelText('Character 1 of 6')
    expect(firstInput).toBeDisabled()
  })
})
