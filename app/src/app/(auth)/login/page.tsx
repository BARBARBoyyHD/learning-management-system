/**
 * Teacher Login Page
 *
 * Main login page for teachers to authenticate with email and password.
 * Uses the LoginForm component for the authentication UI.
 *
 * Acceptance Criteria (US-M1-02):
 * - Given I have a verified account
 * - When I enter correct credentials
 * - Then I am redirected to the dashboard
 */

import { LoginForm } from '@/components/auth/login-form'
import { redirect } from 'next/navigation'
import { getSupabaseServerClient } from '@/lib/supabase/server'

export default async function LoginPage() {
  // Check if user is already logged in
  const supabase = await getSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  // Redirect to dashboard if already authenticated
  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="flex flex-col items-center">
      {/* Logo/Branding - Optional */}
      {/* <div className="mb-8">
        <Logo className="h-12 w-12" />
      </div> */}

      {/* Login Form */}
      <LoginForm />

      {/* Footer text */}
      <p className="mt-8 text-center text-sm text-neutral-500">
        Protected by Supabase Auth
      </p>
    </div>
  )
}
