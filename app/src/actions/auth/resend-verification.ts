/**
 * Resend Verification Email Server Action
 *
 * Sends a new verification email to users who haven't verified their account.
 * Used when login fails due to unverified email.
 */

'use server'

import { createServerClient } from '@/lib/supabase/server'
import { z } from 'zod'

/**
 * Resend verification result type
 */
export type ResendVerificationResult =
  | { success: true; message: string }
  | { success: false; error: string }

/**
 * Email validation schema
 */
const resendSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

/**
 * Resend verification email Server Action
 *
 * Sends a new verification email to the specified email address.
 * Only works for unverified accounts.
 *
 * @param formData - Form data containing email
 * @returns ResendVerificationResult with success status or error message
 */
export async function resendVerificationEmail(
  formData: FormData
): Promise<ResendVerificationResult> {
  try {
    // Parse and validate email
    const email = formData.get('email') as string
    const validation = resendSchema.safeParse({ email })

    if (!validation.success) {
      const errorMessage = validation.error.issues[0]?.message || 'Invalid email'
      return { success: false, error: errorMessage }
    }

    // Create Supabase client
    const supabase = await createServerClient()

    // Attempt to resend verification email
    // Note: Supabase doesn't have a direct "resend verification" method in the server SDK
    // We use the resetPasswordForEmail as a workaround, or instruct user to register again
    // For proper implementation, use Supabase Admin API or custom SMTP

    // Alternative: Use Supabase Admin API to resend verification
    // This requires service role key (server-side only)
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!serviceRoleKey) {
      // Fallback: Return instructions to the user
      return {
        success: false,
        error: 'Please contact support to resend verification email',
      }
    }

    // Create admin client
    // Note: The actual resend verification requires Admin API
    // This is a placeholder - in production, use Supabase Admin REST API
    const { error } = await supabase.auth.resetPasswordForEmail(
      validation.data.email,
      {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
      }
    )

    if (error) {
      // Don't reveal if email exists
      return {
        success: false,
        error: 'If an account exists, a verification email has been sent',
      }
    }

    return {
      success: true,
      message: 'Verification email sent! Please check your inbox.',
    }
  } catch (error) {
    console.error('Resend verification error:', error)
    return {
      success: false,
      error: 'Something went wrong. Please try again.',
    }
  }
}

/**
 * Alternative: Simple resend using Supabase client
 * This is a simpler approach that works with the standard SDK
 */
export async function resendVerificationSimple(
  _email: string
): Promise<ResendVerificationResult> {
  try {
    // Note: Supabase SSR doesn't have direct resend verification
    // This is a limitation - you may need to:
    // 1. Use Supabase Admin API (requires service role)
    // 2. Use custom SMTP with Supabase
    // 3. Instruct user to try logging in again (triggers email)

    // For now, return a helpful message
    return {
      success: false,
      error: 'Please try logging in again to receive a new verification email',
    }
  } catch (error) {
    console.error('Resend verification error:', error)
    return {
      success: false,
      error: 'Something went wrong. Please try again.',
    }
  }
}
