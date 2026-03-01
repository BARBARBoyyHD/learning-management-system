/**
 * Supabase Middleware Client
 *
 * Supabase client for use in Next.js Middleware.
 * Uses createServerClient from @supabase/ssr for edge runtime compatibility.
 *
 * This is used to:
 * - Refresh auth tokens before they expire
 * - Check if user is authenticated on protected routes
 * - Inject user data into requests
 *
 * @example
 * ```typescript
 * // middleware.ts
 * import { getSupabaseMiddlewareClient } from '@/lib/supabase/middleware'
 * import { NextResponse } from 'next/server'
 * import type { NextRequest } from 'next/server'
 *
 * export async function middleware(request: NextRequest) {
 *   const response = NextResponse.next()
 *   const supabase = getSupabaseMiddlewareClient(request, response)
 *   await supabase.auth.getSession()
 *   return response
 * }
 * ```
 */

import { createServerClient } from '@supabase/ssr'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/**
 * Creates a Supabase client for middleware usage
 * Handles cookie operations in edge runtime
 *
 * @param request - Next.js request object
 * @param response - Next.js response object
 * @returns Supabase client instance
 */
export function createSupabaseMiddlewareClient(
  request: NextRequest,
  response: NextResponse
) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. ' +
      'Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set'
    )
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value)
          response.cookies.set(name, value)
        })
      },
    },
  })
}
