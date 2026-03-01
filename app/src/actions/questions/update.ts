/**
 * Update Question Server Action
 *
 * Handles question updates with validation and database operations.
 * Supports Multiple Choice and other question types.
 */

'use server'

import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

/**
 * Update question result type
 */
export type UpdateQuestionResult =
  | { success: true; questionId: string }
  | { success: false; error: string }

/**
 * Update Question Server Action
 *
 * Updates an existing question in the database.
 *
 * @param formData - Form data with question details
 * @returns Result with question ID or error message
 */
export async function updateQuestion(formData: FormData): Promise<UpdateQuestionResult> {
  try {
    // Get authenticated user
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return {
        success: false,
        error: 'You must be logged in to update a question',
      }
    }

    // Parse form data
    const questionId = formData.get('questionId') as string
    const quizId = formData.get('quizId') as string
    const questionText = formData.get('questionText') as string
    const points = parseInt(formData.get('points') as string, 10)
    const shuffle = formData.get('shuffle') === 'on' || formData.get('shuffle') === 'true'
    const optionsJson = formData.get('options') as string

    // Validate required fields
    if (!questionId || !quizId || !questionText) {
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
        error: 'You do not have permission to update this question',
      }
    }

    // Parse options
    const options = JSON.parse(optionsJson) as Array<{
      id?: string
      text: string
      isCorrect: boolean
      sortOrder: number
    }>

    // Create settings JSON
    const settings = {
      shuffle,
      multipleAnswers: false,
      optionCount: options.length,
    }

    // Update question with options in a transaction
    await prisma.question.update({
      where: { id: questionId },
      data: {
        questionText,
        points,
        settings,
        options: {
          deleteMany: {}, // Delete all existing options
          create: options.map((opt) => ({
            option: opt.text,
            isCorrect: opt.isCorrect,
            sortOrder: opt.sortOrder,
          })),
        },
      },
    })

    // Revalidate quiz page
    revalidatePath(`/quizzes/${quizId}`)

    return { success: true, questionId }
  } catch (error) {
    console.error('Update question error:', error)
    return {
      success: false,
      error: 'Something went wrong. Please try again.',
    }
  }
}
