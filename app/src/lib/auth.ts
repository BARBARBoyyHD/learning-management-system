/**
 * Authentication Utilities for API Routes
 *
 * Provides authentication checking and session validation for API endpoints.
 * Use these utilities to protect API routes and access user data.
 *
 * @example
 * ```typescript
 * // In an API route handler
 * import { requireAuth, getAuthState } from '@/lib/auth'
 * import { NextRequest, NextResponse } from 'next/server'
 *
 * export async function GET(request: NextRequest) {
 *   const auth = await requireAuth(request)
 *   // auth.user is guaranteed to exist
 *   return NextResponse.json({ user: auth.user })
 * }
 * ```
 */

import { createServerClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import type { Session, User } from '@supabase/supabase-js'

/**
 * Auth result object returned by authentication utilities
 */
export interface AuthResult {
  /** Current session object */
  session: Session
  /** Current user object */
  user: User
  /** Whether user is authenticated (always true for requireAuth) */
  isAuthenticated: true
}

/**
 * Auth result with optional session (for optional auth)
 */
export interface OptionalAuthResult {
  /** Current session object (null if not authenticated) */
  session: Session | null
  /** Current user object (null if not authenticated) */
  user: User | null
  /** Whether user is authenticated */
  isAuthenticated: boolean
}

/**
 * Require authentication for API route
 *
 * Returns 401 Unauthorized if not authenticated.
 * Use this in API route handlers to protect endpoints.
 *
 * @param request - Next.js request object
 * @returns AuthResult with session and user (guaranteed to exist)
 * @throws NextResponse with 401 status if not authenticated
 *
 * @example
 * ```typescript
 * export async function GET(request: NextRequest) {
 *   const auth = await requireAuth(request)
 *   // auth.user.email is available
 *   return NextResponse.json({ user: auth.user })
 * }
 * ```
 */
export async function requireAuth(_request: NextRequest): Promise<AuthResult> {
  const supabase = await createServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    throw unauthorizedResponse('Authentication required. Please log in.')
  }

  return {
    session,
    user: session.user,
    isAuthenticated: true,
  }
}

/**
 * Get optional authentication state
 *
 * Returns auth state without throwing 401.
 * Use this for routes that work for both authenticated and anonymous users.
 *
 * @param request - Next.js request object
 * @returns OptionalAuthResult with session and user (may be null)
 *
 * @example
 * ```typescript
 * export async function GET(request: NextRequest) {
 *   const auth = await getOptionalAuth(request)
 *   if (auth.isAuthenticated) {
 *     // User is logged in, personalize response
 *   } else {
 *     // Anonymous user, show public content
 *   }
 *   return NextResponse.json({ data: publicData })
 * }
 * ```
 */
export async function getOptionalAuth(
  _request: NextRequest
): Promise<OptionalAuthResult> {
  const supabase = await createServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  return {
    session,
    user: session?.user ?? null,
    isAuthenticated: !!session,
  }
}

/**
 * Get current user from request
 *
 * Convenience wrapper around requireAuth that returns just the user.
 *
 * @param request - Next.js request object
 * @returns User object
 * @throws NextResponse with 401 status if not authenticated
 */
export async function requireUser(request: NextRequest): Promise<User> {
  const auth = await requireAuth(request)
  return auth.user
}

/**
 * Check if request is authenticated
 *
 * Simple boolean check without throwing or returning session data.
 *
 * @param request - Next.js request object
 * @returns true if authenticated, false otherwise
 */
export async function isAuthenticated(_request: NextRequest): Promise<boolean> {
  const supabase = await createServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  return !!session
}

/**
 * Create unauthorized response
 *
 * Helper function to create consistent 401 responses.
 *
 * @param message - Optional custom error message
 * @returns NextResponse with 401 status
 */
export function unauthorizedResponse(message?: string): NextResponse {
  return NextResponse.json(
    {
      error: 'Unauthorized',
      message: message || 'Authentication required. Please log in.',
    },
    { status: 401 }
  )
}

/**
 * Create forbidden response
 *
 * Helper function to create consistent 403 responses.
 * Use when user is authenticated but lacks permission.
 *
 * @param message - Optional custom error message
 * @returns NextResponse with 403 status
 */
export function forbiddenResponse(message?: string): NextResponse {
  return NextResponse.json(
    {
      error: 'Forbidden',
      message: message || 'You do not have permission to access this resource.',
    },
    { status: 403 }
  )
}

/**
 * API Response wrapper with authentication
 *
 * Helper for creating consistent API responses.
 */
export interface ApiResponse<T> {
  /** Success flag */
  success: boolean
  /** Response data (if successful) */
  data?: T
  /** Error message (if failed) */
  error?: string
  /** HTTP status code */
  status?: number
}

/**
 * Create success response
 *
 * @param data - Response data
 * @param status - HTTP status code (default: 200)
 * @returns NextResponse with JSON data
 */
export function successResponse<T>(data: T, status = 200): NextResponse {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  )
}

/**
 * Create error response
 *
 * @param message - Error message
 * @param status - HTTP status code (default: 400)
 * @returns NextResponse with error JSON
 */
export function errorResponse(
  message: string,
  status = 400
): NextResponse<ApiResponse<never>> {
  return NextResponse.json(
    {
      success: false,
      error: message,
    } as ApiResponse<never>,
    { status }
  )
}
