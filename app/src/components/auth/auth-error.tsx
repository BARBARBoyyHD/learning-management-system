/**
 * Auth Error Display Component
 *
 * Displays authentication error messages with appropriate styling and actions.
 * Supports different error types: invalid credentials, unverified account, network errors.
 *
 * Features:
 * - Toast-style notification
 * - Error-specific messaging
 * - Resend verification email option
 * - Auto-dismiss with manual close
 */

'use client'

import { useState, useEffect } from 'react'
import { AlertCircle, Mail, X, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { resendVerificationEmail } from '@/actions/auth/resend-verification'

/**
 * Auth error types
 */
export type AuthErrorType =
  | 'invalid_credentials'
  | 'unverified_account'
  | 'network_error'
  | 'rate_limit'
  | 'unknown'

/**
 * Auth error display props
 */
export interface AuthErrorDisplayProps {
  /** Error message to display */
  message: string
  /** Type of error for appropriate styling */
  type?: AuthErrorType
  /** Callback when error is dismissed */
  onDismiss?: () => void
  /** Whether to show auto-dismiss timer */
  autoDismiss?: boolean
  /** Auto-dismiss delay in milliseconds */
  autoDismissDelay?: number
}

/**
 * AuthErrorDisplay component
 *
 * Displays error messages with appropriate styling and actions based on error type.
 */
export function AuthErrorDisplay({
  message,
  type = 'unknown',
  onDismiss,
  autoDismiss = false,
  autoDismissDelay = 5000,
}: AuthErrorDisplayProps) {
  const [isResending, setIsResending] = useState(false)
  const [showResendForm, setShowResendForm] = useState(false)
  const [resendEmail, setResendEmail] = useState('')
  const [resendMessage, setResendMessage] = useState<string | null>(null)

  // Auto-dismiss timer
  useEffect(() => {
    if (autoDismiss && !showResendForm) {
      const timer = setTimeout(() => {
        onDismiss?.()
      }, autoDismissDelay)

      return () => clearTimeout(timer)
    }
  }, [autoDismiss, autoDismissDelay, onDismiss, showResendForm])

  /**
   * Handle resend verification email
   */
  const handleResend = async (formData: FormData) => {
    setIsResending(true)
    setResendMessage(null)

    try {
      const result = await resendVerificationEmail(formData)

      if (result.success) {
        setResendMessage(result.message)
        // Hide form after success
        setTimeout(() => {
          setShowResendForm(false)
          onDismiss?.()
        }, 3000)
      } else {
        setResendMessage(result.error)
      }
    } catch (error) {
      setResendMessage('Something went wrong. Please try again.')
    } finally {
      setIsResending(false)
    }
  }

  /**
   * Get error icon based on type
   */
  const getErrorIcon = () => {
    switch (type) {
      case 'unverified_account':
        return <Mail className="h-5 w-5 text-warning-base" />
      case 'network_error':
        return <AlertCircle className="h-5 w-5 text-error-base" />
      default:
        return <AlertCircle className="h-5 w-5 text-error-base" />
    }
  }

  /**
   * Get background color based on type
   */
  const getBackgroundColor = () => {
    switch (type) {
      case 'unverified_account':
        return 'bg-warning/10 border-warning/20'
      case 'network_error':
        return 'bg-error/10 border-error/20'
      default:
        return 'bg-error/10 border-error/20'
    }
  }

  return (
    <div
      className={`rounded-xl border p-4 ${getBackgroundColor()}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0">{getErrorIcon()}</div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          {/* Error Message */}
          <div>
            <p className="text-sm font-medium text-white">{message}</p>

            {/* Type-specific help text */}
            {type === 'unverified_account' && !showResendForm && (
              <p className="mt-1 text-sm text-neutral-400">
                Please verify your email before logging in. Check your inbox for
                the verification link.
              </p>
            )}

            {type === 'network_error' && (
              <p className="mt-1 text-sm text-neutral-400">
                Please check your internet connection and try again.
              </p>
            )}

            {type === 'rate_limit' && (
              <p className="mt-1 text-sm text-neutral-400">
                Please wait a few minutes before trying again.
              </p>
            )}
          </div>

          {/* Resend Verification Button */}
          {type === 'unverified_account' && !showResendForm && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowResendForm(true)}
              className="border-warning/30 text-warning-base hover:bg-warning/10"
            >
              <Mail className="mr-2 h-4 w-4" />
              Resend Verification Email
            </Button>
          )}

          {/* Resend Verification Form */}
          {showResendForm && (
            <div className="space-y-3">
              <form action={handleResend} className="flex gap-2">
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={resendEmail}
                  onChange={(e) => setResendEmail(e.target.value)}
                  className="flex-1 border-neutral-700 bg-neutral-800 text-white placeholder:text-neutral-500"
                  disabled={isResending}
                  required
                />
                <Button
                  type="submit"
                  variant="secondary"
                  size="sm"
                  disabled={isResending}
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send'
                  )}
                </Button>
              </form>

              {/* Resend Message */}
              {resendMessage && (
                <p
                  className={`text-sm ${
                    resendMessage.includes('sent')
                      ? 'text-success-base'
                      : 'text-neutral-400'
                  }`}
                >
                  {resendMessage}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Close Button */}
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="flex-shrink-0 text-neutral-500 hover:text-neutral-300 transition-colors"
            aria-label="Dismiss error"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  )
}

/**
 * Toast notification wrapper for auth errors
 * Can be used with a toast management system
 */
export interface AuthToastOptions {
  message: string
  type?: AuthErrorType
  duration?: number
}

/**
 * Helper function to get error type from Supabase error message
 */
export function getAuthErrorType(error: Error | string): AuthErrorType {
  const errorMessage = typeof error === 'string' ? error : error.message

  if (errorMessage.includes('Email not confirmed')) {
    return 'unverified_account'
  }

  if (
    errorMessage.includes('network') ||
    errorMessage.includes('fetch') ||
    errorMessage.includes('connection')
  ) {
    return 'network_error'
  }

  if (
    errorMessage.includes('rate limit') ||
    errorMessage.includes('too many')
  ) {
    return 'rate_limit'
  }

  if (
    errorMessage.includes('credentials') ||
    errorMessage.includes('password') ||
    errorMessage.includes('email')
  ) {
    return 'invalid_credentials'
  }

  return 'unknown'
}
