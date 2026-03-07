/**
 * Login Form Component
 *
 * Teacher login form with email and password authentication.
 * Uses React Hook Form for form management and Zod for validation.
 * Implements Theme B (Dark) design system for teacher-facing screens.
 */

'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginInput } from '@/lib/validators/auth'
import { login } from '@/actions/auth/login'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { AuthErrorDisplay, getAuthErrorType } from '@/components/auth/auth-error'

/**
 * LoginForm component
 *
 * Handles teacher authentication with:
 * - Client-side validation using Zod
 * - Server-side validation via Server Action
 * - Password visibility toggle
 * - Loading state during submission
 * - Error message display
 */
export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errorType, setErrorType] = useState<'unverified_account' | 'invalid_credentials' | 'network_error' | 'unknown'>('unknown')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  /**
   * Handle form submission
   * Calls the login Server Action and handles the response
   */
  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true)
    setError(null)

    try {
      // Create FormData from form values
      const formData = new FormData()
      formData.set('email', data.email)
      formData.set('password', data.password)

      // Call login Server Action
      const result = await login(formData)

      if (!result.success) {
        setError(result.error)
        // Determine error type for appropriate display
        const type = getAuthErrorType(result.error)
        setErrorType(
          type === 'unverified_account'
            ? 'unverified_account'
            : type === 'network_error'
            ? 'network_error'
            : 'invalid_credentials'
        )
      }
      // On success, the Server Action redirects to dashboard
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setErrorType('network_error')
      console.error('Login form error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl bg-neutral-900 p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-white">
            Teacher Login
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            Enter your credentials to access the dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Error Message */}
          {error && (
            <AuthErrorDisplay
              message={error}
              type={errorType}
              onDismiss={() => {
                setError(null)
                setErrorType('unknown')
              }}
            />
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-neutral-200">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="teacher@example.com"
              className="border-neutral-700 bg-neutral-800 text-white placeholder:text-neutral-500 focus:border-primary-base focus:ring-primary-base"
              disabled={isLoading}
              {...register('email')}
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-sm text-error-light" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-neutral-200">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="border-neutral-700 bg-neutral-800 text-white placeholder:text-neutral-500 focus:border-primary-base focus:ring-primary-base pr-10"
                disabled={isLoading}
                {...register('password')}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                disabled={isLoading}
              >
                <span className="material-symbols-outlined text-lg">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-error-light" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-11 text-base font-medium bg-primary-base hover:bg-primary-hover active:bg-primary-active shadow-lg shadow-primary/20"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined h-5 w-5 animate-spin">progress_activity</span>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>

          {/* Links */}
          <div className="space-y-4 pt-2">
            {/* Forgot Password - Future Feature */}
            {/* <div className="text-center">
              <Link
                href="/forgot-password"
                className="text-sm text-primary-light hover:text-primary-lighter transition-colors"
              >
                Forgot password?
              </Link>
            </div> */}

            {/* Register Link */}
            <div className="text-center">
              <p className="text-sm text-neutral-400">
                Don&apos;t have an account?{' '}
                <Link
                  href="/register"
                  className="text-primary-base hover:text-primary-light font-medium transition-colors"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
