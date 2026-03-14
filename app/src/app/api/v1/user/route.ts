/**
 * Get Current User API Route
 *
 * Protected endpoint that returns the authenticated user's information.
 * Demonstrates API route protection using requireAuth.
 *
 * @see https://brainblitz.learnweb.local/docs/api#user
 */

import { requireAuth, successResponse, unauthorizedResponse } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/v1/user
 *
 * Returns the current authenticated user's information.
 * Requires authentication - returns 401 if not logged in.
 *
 * @param request - Next.js request object
 * @returns User object or 401 error
 *
 * @example
 * ```typescript
 * const response = await fetch('/api/v1/user', {
 *   credentials: 'include', // Include cookies
 * })
 *
 * if (response.ok) {
 *   const { data } = await response.json()
 *   console.log('User:', data.user)
 * } else if (response.status === 401) {
 *   console.log('Not authenticated')
 * }
 * ```
 */
export async function GET(request: NextRequest) {
  try {
    // Require authentication
    const auth = await requireAuth(request)

    // Return user data (exclude sensitive fields)
    const { id, email, created_at } = auth.user

    return successResponse({
      user: {
        id,
        email,
        createdAt: created_at,
      },
    })
  } catch (error) {
    // Handle unexpected errors
    console.error('Error fetching user:', error)

    // If it's already a NextResponse (from requireAuth), return it
    if (error instanceof NextResponse) {
      return error
    }

    return unauthorizedResponse('Failed to authenticate request')
  }
}
