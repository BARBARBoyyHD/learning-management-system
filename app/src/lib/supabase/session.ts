/**
 * Supabase Session Utilities
 *
 * Helper functions for session management and authentication checks.
 * Used in Server Components, Server Actions, and API routes.
 *
 * @example
 * ```typescript
 * // In a Server Component
 * import { getSession, requireAuth } from '@/lib/supabase/session'
 *
 * export default async function ProtectedPage() {
 *   const session = await getSession()
 *   if (!session) {
 *     redirect('/login')
 *   }
 *
 *   return <div>Welcome, {session.user.email}!</div>
 * }
 * ```
 */

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { Session, User } from '@supabase/supabase-js'

/**
 * Get current session from server-side context
 *
 * @returns Session object or null if not authenticated
 *
 * @example
 * ```typescript
 * const session = await getSession()
 * if (session) {
 *   // User is authenticated
 * }
 * ```
 */
export async function getSession(): Promise<Session | null> {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

/**
 * Get current user from server-side context
 *
 * @returns User object or null if not authenticated
 *
 * @example
 * ```typescript
 * const user = await getUser()
 * if (user) {
 *   // User is authenticated
 * }
 * ```
 */
export async function getUser(): Promise<User | null> {
  const session = await getSession()
  return session?.user ?? null
}

/**
 * Require authentication - redirects to login if not authenticated
 *
 * @returns Session object (never returns null)
 * @throws Redirects to /login if not authenticated
 *
 * @example
 * ```typescript
 * // In a Server Component
 * const session = await requireAuth()
 * // Session is guaranteed to exist here
 * ```
 */
export async function requireAuth(): Promise<Session> {
  const session = await getSession()

  if (!session) {
    redirect('/login')
  }

  return session
}

/**
 * Require authentication and return user
 *
 * @returns User object (never returns null)
 * @throws Redirects to /login if not authenticated
 *
 * @example
 * ```typescript
 * // In a Server Component
 * const user = await requireUser()
 * // User is guaranteed to exist here
 * ```
 */
export async function requireUser(): Promise<User> {
  const session = await requireAuth()
  return session.user
}

/**
 * Check if user is authenticated
 *
 * @returns true if authenticated, false otherwise
 *
 * @example
 * ```typescript
 * const isAuthenticated = await isAuthenticated()
 * ```
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return !!session
}

/**
 * Auth result with user data for API responses
 */
export interface AuthResult {
  session: Session | null
  user: User | null
  isAuthenticated: boolean
}

/**
 * Get auth state for API responses
 *
 * @returns Auth result object with session, user, and isAuthenticated flag
 *
 * @example
 * ```typescript
 * // In an API route
 * const auth = await getAuthState()
 * if (!auth.isAuthenticated) {
 *   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
 * }
 * ```
 */
export async function getAuthState(): Promise<AuthResult> {
  const session = await getSession()
  return {
    session,
    user: session?.user ?? null,
    isAuthenticated: !!session,
  }
}
