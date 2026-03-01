/**
 * Login Server Action
 *
 * Handles teacher authentication with email and password using Supabase Auth.
 * Implements secure sign-in with proper error handling and validation.
 */

'use server'

import { createClient } from '@/lib/supabase/server'
import { loginSchema } from '@/lib/validators/auth'
import { redirect } from 'next/navigation'

/**
 * Login action result type
 */
export type LoginResult =
  | { success: true }
  | { success: false; error: string }

/**
 * Login Server Action
 *
 * Authenticates a teacher with email and password.
 * On success, creates a session and redirects to dashboard.
 * On failure, returns an error message.
 *
 * @param formData - Form data containing email and password
 * @returns LoginResult with success status or error message
 *
 * @example
 * ```typescript
 * // In a form action
 * const result = await login(formData)
 * if (!result.success) {
 *   // Display error to user
 * }
 * ```
 */
export async function login(formData: FormData): Promise<LoginResult> {
  try {
    // Parse form data
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Validate input with Zod schema
    const validation = loginSchema.safeParse({ email, password })

    if (!validation.success) {
      // Return first error message
      const errorMessage = validation.error.issues[0]?.message || 'Invalid input'
      return { success: false, error: errorMessage }
    }

    // Create Supabase client
    const supabase = await createClient()

    // Attempt sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: validation.data.email,
      password: validation.data.password,
    })

    // Handle Supabase auth errors
    if (error) {
      // Generic error message for invalid credentials
      // (Security best practice: don't reveal if email exists)
      return {
        success: false,
        error: 'Invalid email or password',
      }
    }

    // Ensure user data exists
    if (!data.user) {
      return {
        success: false,
        error: 'Authentication failed. Please try again.',
      }
    }

    // Success - session is automatically stored in HTTP-only cookies
    // by the Supabase SSR client
    redirect('/dashboard')
  } catch (error) {
    // Handle unexpected errors
    console.error('Login error:', error)
    return {
      success: false,
      error: 'Something went wrong. Please try again.',
    }
  }
}
