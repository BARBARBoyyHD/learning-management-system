/**
 * Quiz Server Actions
 *
 * Server-side actions for quiz operations.
 * Used by client components to perform mutations.
 */

'use server'

import { quizService } from '@/services/quiz.service'
import { requireAuth } from '@/lib/auth-server'
import { revalidatePath } from 'next/cache'

/**
 * Delete a quiz by ID
 *
 * @param quizId - The ID of the quiz to delete
 * @returns Success or error message
 */
export async function deleteQuiz(quizId: string) {
  try {
    // Authenticate user
    const user = await requireAuth()

    if (!user) {
      return {
        success: false,
        error: 'Unauthorized',
      }
    }

    // Delete the quiz
    await quizService.delete(quizId, user.id)

    // Revalidate the dashboard to reflect the deletion
    revalidatePath('/dashboard')

    return {
      success: true,
      message: 'Quiz deleted successfully',
    }
  } catch (error) {
    console.error('Failed to delete quiz:', error)

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: false,
      error: 'Failed to delete quiz',
    }
  }
}
