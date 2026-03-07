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
 * - /teacher/*
 *
 * @see https://supabase.com/docs/guides/auth/auth-nextjs/using-nextjs-middleware
 */

import { createBrowserClient } from '@supabase/ssr'
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
  '/teacher',
  '/test-setup',
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
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if accessing a protected route
  const isProtectedPath = PROTECTED_PATHS.some(path =>
    pathname.startsWith(path)
  )

  // Check if accessing an auth route (login, register)
  const isAuthPath = AUTH_PATHS.some(path =>
    pathname.startsWith(path)
  )

  // Create Supabase client for middleware
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
            request.cookies.set(name, value)
          })
        },
      },
    }
  )

  // Get current session
  const { data: { session } } = await supabase.auth.getSession()

  console.log('[Middleware] Path:', pathname, 'Has session:', !!session)

  // Redirect authenticated users away from auth pages
  if (isAuthPath && session) {
    console.log('[Middleware] Redirecting to /dashboard')
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Redirect unauthenticated users away from protected routes
  if (isProtectedPath && !session) {
    console.log('[Middleware] Redirecting to /login')
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
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
