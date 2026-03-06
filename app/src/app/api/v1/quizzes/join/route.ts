import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { quizService } from '@/services/quiz.service'
import { quizJoinRequestSchema } from '@/lib/validators/quiz'

/**
 * Rate limiting store (in-memory for now, use Redis in production)
 * Key: IP address, Value: { count: number, resetTime: number }
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

/**
 * POST /api/v1/quizzes/join
 * Validate access code and return quiz information for guest students
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'

    // Rate limiting: 10 requests per minute per IP
    const now = Date.now()
    const rateLimit = rateLimitStore.get(ip)

    if (rateLimit) {
      if (now > rateLimit.resetTime) {
        // Reset window
        rateLimitStore.set(ip, { count: 1, resetTime: now + 60000 })
      } else if (rateLimit.count >= 10) {
        return NextResponse.json(
          { success: false, error: 'Too many attempts. Please try again later.' },
          { status: 429 }
        )
      } else {
        rateLimit.count++
        rateLimitStore.set(ip, rateLimit)
      }
    } else {
      rateLimitStore.set(ip, { count: 1, resetTime: now + 60000 })
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = quizJoinRequestSchema.parse(body)

    // Validate access code and get quiz details
    const quizDetails = await quizService.validateAccessCode(validatedData.accessCode)

    return NextResponse.json({
      success: true,
      data: quizDetails,
    })
  } catch (error) {
    // Handle Zod validation errors (invalid format)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid access code format. Code must be 6 alphanumeric characters.',
        },
        { status: 400 }
      )
    }

    // Handle invalid access code (quiz not found)
    if (error instanceof Error && error.message === 'Invalid access code') {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid access code. Please check and try again.',
        },
        { status: 404 }
      )
    }

    // Generic error for other issues (don't expose details)
    console.error('Error validating access code:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Unable to process request. Please try again.',
      },
      { status: 500 }
    )
  }
}
