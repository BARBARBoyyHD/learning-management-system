/**
 * Delete Question Server Action
 *
 * Handles question deletion with permission checks.
 */

'use server'

import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

/**
 * Delete question result type
 */
export type DeleteQuestionResult =
  | { success: true }
  | { success: false; error: string }

/**
 * Delete Question Server Action
 *
 * Deletes a question from the database.
 *
 * @param formData - Form data with question ID and quiz ID
 * @returns Result with success status or error message
 */
export async function deleteQuestion(formData: FormData): Promise<DeleteQuestionResult> {
  try {
    // Get authenticated user
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return {
        success: false,
        error: 'You must be logged in to delete a question',
      }
    }

    // Parse form data
    const questionId = formData.get('questionId') as string
    const quizId = formData.get('quizId') as string

    // Validate required fields
    if (!questionId || !quizId) {
      return {
        success: false,
        error: 'Missing required fields',
      }
    }

    // Verify question ownership
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      include: {
        quiz: {
          select: { teacherId: true },
        },
      },
    })

    if (!question || question.quiz.teacherId !== user.id) {
      return {
        success: false,
        error: 'You do not have permission to delete this question',
      }
    }

    // Delete question (cascade will delete options and response details)
    await prisma.question.delete({
      where: { id: questionId },
    })

    // Revalidate quiz edit page
    revalidatePath(`/quizzes/${quizId}/edit`)

    return { success: true }
  } catch (error) {
    console.error('Delete question error:', error)
    return {
      success: false,
      error: 'Something went wrong. Please try again.',
    }
  }
}
