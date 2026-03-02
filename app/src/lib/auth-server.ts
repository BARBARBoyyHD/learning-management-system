/**
 * Server-side authentication helper
 *
 * Use this in Server Components to get the current user session.
 * Middleware already protects routes, but we need this to get user data.
 */

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Get current user session from Supabase
 * Call this in any server component that needs user data
 */
export async function getSession() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          // Cookies can only be set in Route Handlers or Server Actions
          // This is a no-op for read-only session retrieval in Server Components
          // For cookie updates, use Server Actions or Route Handlers instead
        },
      },
    }
  )
  return supabase.auth.getSession()
}

/**
 * Get current user, redirect to login if not authenticated
 * Use this in pages that require authentication
 */
export async function requireAuth() {
  const { data: { session } } = await getSession()
  
  if (!session?.user) {
    const { redirect } = await import('next/navigation')
    redirect('/login')
  }
  
  return session
}
