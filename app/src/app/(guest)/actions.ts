/**
 * Guest Student Server Actions
 *
 * Server-side actions for guest student operations.
 */

'use server'

import { prisma } from '@/lib/prisma'
import { z } from 'zod'

/**
 * Name validation schema
 */
const guestNameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .trim()

/**
 * Register guest student
 *
 * Creates a guest user account with UUID and returns user ID.
 * Guest users are auto-created when joining a quiz.
 *
 * @param name - Student's name
 * @param quizId - Quiz ID to join
 * @returns User ID or error
 */
export async function registerGuestStudent(name: string, quizId: string) {
  try {
    // Validate name
    const validatedName = guestNameSchema.parse(name)

    // Verify quiz exists
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      select: { id: true, teacherId: true },
    })

    if (!quiz) {
      return {
        success: false,
        error: 'Quiz not found',
      }
    }

    // Create guest user with UUID
    // Guest users have role 'student' and auto-generated UUID
    const guestUser = await prisma.user.create({
      data: {
        name: validatedName,
        email: `guest-${Date.now()}@quizizz.local`, // Unique email for each guest
        role: 'student',
      },
    })

    // TODO: Create session for guest user (will be implemented in next step)
    // For now, just return the user ID

    return {
      success: true,
      userId: guestUser.id,
      message: 'Guest registered successfully',
    }
  } catch (error) {
    console.error('Failed to register guest student:', error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || 'Invalid name',
      }
    }

    return {
      success: false,
      error: 'Failed to register guest student',
    }
  }
}
