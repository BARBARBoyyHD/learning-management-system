/**
 * Supabase Server Client
 *
 * Server-side Supabase client for use in Server Components and Server Actions.
 * Uses createServerClient from @supabase/ssr for proper HTTP-only cookie handling.
 *
 * Note: In Next.js 16, cookies can only be modified in Server Actions or Route Handlers.
 * For Server Components, this client only reads cookies (getSession, getUser).
 * For session modification (signIn, signUp, signOut), use Server Actions.
 *
 * @example
 * ```typescript
 * // In a Server Component (read-only)
 * import { createClient } from '@/lib/supabase/server'
 *
 * const supabase = await createClient()
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
export async function createClient() {
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
       * Note: In Next.js 16+, this only works in Server Actions and Route Handlers
       * For Server Components, cookie modifications are ignored
       */
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch (error) {
          // In Server Components, cookie modification throws
          // This is expected - session refresh happens in Server Actions
          // Silently ignore to prevent crashes in read-only operations
          console.debug('Cookie modification not allowed in this context:', error)
        }
      },
    },
  })
}
