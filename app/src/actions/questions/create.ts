/**
 * Create Question Server Action
 *
 * Handles question creation with validation and database operations.
 * Supports Multiple Choice and other question types.
 */

'use server'

import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

/**
 * Create question result type
 */
export type CreateQuestionResult =
  | { success: true; questionId: string }
  | { success: false; error: string }

/**
 * Create Question Server Action
 *
 * Creates a new question in the database.
 *
 * @param formData - Form data with question details
 * @returns Result with question ID or error message
 */
export async function createQuestion(formData: FormData): Promise<CreateQuestionResult> {
  try {
    // Get authenticated user
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return {
        success: false,
        error: 'You must be logged in to create a question',
      }
    }

    // Parse form data
    const quizId = formData.get('quizId') as string
    const questionType = formData.get('questionType') as string
    const questionText = formData.get('questionText') as string
    const points = parseInt(formData.get('points') as string, 10)
    const shuffle = formData.get('shuffle') === 'on' || formData.get('shuffle') === 'true'
    const optionsJson = formData.get('options') as string

    // Validate required fields
    if (!quizId || !questionType || !questionText) {
      return {
        success: false,
        error: 'Missing required fields',
      }
    }

    // Verify quiz ownership
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      select: { teacherId: true },
    })

    if (!quiz || quiz.teacherId !== user.id) {
      return {
        success: false,
        error: 'You do not have permission to add questions to this quiz',
      }
    }

    // Get the next order index
    const maxOrder = await prisma.question.aggregate({
      where: { quizId },
      _max: { orderIndex: true },
    })
    const orderIndex = (maxOrder._max.orderIndex ?? -1) + 1

    // Parse options
    const options = JSON.parse(optionsJson) as Array<{
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

    // Create question with options in a transaction
    const question = await prisma.question.create({
      data: {
        quizId,
        questionType,
        questionText,
        points,
        orderIndex,
        settings,
        options: {
          create: options.map((opt) => ({
            option: opt.text,
            isCorrect: opt.isCorrect,
            sortOrder: opt.sortOrder,
          })),
        },
      },
      select: { id: true },
    })

    // Revalidate quiz page
    revalidatePath(`/quizzes/${quizId}`)

    return { success: true, questionId: question.id }
  } catch (error) {
    console.error('Create question error:', error)
    return {
      success: false,
      error: 'Something went wrong. Please try again.',
    }
  }
}
