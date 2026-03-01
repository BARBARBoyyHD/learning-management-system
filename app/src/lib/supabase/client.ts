/**
 * Supabase Browser Client
 *
 * Client-side Supabase client for use in Client Components.
 * Uses createBrowserClient from @supabase/ssr for proper cookie handling.
 *
 * @example
 * ```typescript
 * // In a Client Component
 * 'use client'
 * import { createClient } from '@/lib/supabase/client'
 *
 * const supabase = createClient()
 * const { data, error } = await supabase.auth.signUp({ email, password })
 * ```
 */

import { createBrowserClient as createSupabaseBrowserClient } from '@supabase/ssr'

/**
 * Creates a Supabase client for browser (client-side) usage
 *
 * @returns Supabase client instance
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. ' +
      'Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local'
    )
  }

  return createSupabaseBrowserClient(supabaseUrl, supabaseAnonKey)
}
