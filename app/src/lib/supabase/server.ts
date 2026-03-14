/**
 * Supabase Server Client
 *
 * Server-side Supabase client for use in Server Components and Server Actions.
 * Uses createServerClient from @supabase/ssr for proper HTTP-only cookie handling.
 *
 * @example
 * ```typescript
 * // In a Server Component or Server Action
 * import { createServerClient } from '@/lib/supabase/server'
 *
 * const supabase = await createServerClient()
 * const { data: { user } } = await supabase.auth.getUser()
 * ```
 */

import { createServerClient as createSupabaseServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Creates a Supabase client for server-side usage
 * Handles HTTP-only cookies for secure session management
 *
 * @returns Supabase client instance
 */
export async function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. ' +
      'Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env'
    )
  }

  const cookieStore = await cookies()

  return createSupabaseServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      /**
       * Get all cookies from the request
       */
      getAll() {
        return cookieStore.getAll()
      },

      /**
       * Set multiple cookies
       * Supabase will set cookies for session management
       */
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options)
        })
      },
    },
  })
}
