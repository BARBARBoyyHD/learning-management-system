/**
 * Next.js Middleware for Authentication
 *
 * Protects routes by checking Supabase session.
 * - Redirects unauthenticated users to /login
 * - Redirects authenticated users away from /login to /dashboard
 * - Refreshes session tokens before expiry
 *
 * Protected routes:
 * - /dashboard/*
 * - /courses/*
 * - /assessments/*
 *
 * @see https://supabase.com/docs/guides/auth/auth-nextjs/using-nextjs-middleware
 */

import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Protected route paths that require authentication
 */
const PROTECTED_PATHS = [
  '/dashboard',
  '/courses',
  '/assessments',
  '/quizzes',
]

/**
 * Auth paths that should redirect to dashboard if already logged in
 */
const AUTH_PATHS = [
  '/login',
  '/register',
]

/**
 * Middleware function
 *
 * Runs on every request before it reaches the page or API route.
 * Checks authentication and redirects as needed.
 *
 * @param request - Next.js request object
 * @returns Next.js response object (possibly with redirect)
 */
export async function middleware(request: NextRequest) {
  // Create Supabase client for middleware
  // Uses createServerClient for edge runtime compatibility
  let response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        /**
         * Get all cookies from the request
         */
        getAll() {
          return request.cookies.getAll()
        },
        /**
         * Set cookies on the response
         * Important: This refreshes session tokens
         */
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // Get current session
  // This also refreshes the session if token is about to expire
  const { data: { session } } = await supabase.auth.getSession()

  const { pathname } = request.nextUrl

  // Check if accessing a protected route
  const isProtectedPath = PROTECTED_PATHS.some(path =>
    pathname.startsWith(path)
  )

  // Check if accessing an auth route (login, register)
  const isAuthPath = AUTH_PATHS.some(path =>
    pathname.startsWith(path)
  )

  // Redirect authenticated users away from auth pages
  if (isAuthPath && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Redirect unauthenticated users away from protected routes
  if (isProtectedPath && !session) {
    // Save the intended URL for post-login redirect
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Continue to the requested page
  return response
}

/**
 * Matcher configuration
 *
 * Defines which routes the middleware should run on.
 * - Runs on: protected routes, auth routes, API routes
 * - Skips: static files, _next, api/auth (handled by Supabase)
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (robots.txt, sitemap.xml, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
