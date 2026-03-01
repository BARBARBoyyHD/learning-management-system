/**
 * Create Assessment Server Action
 *
 * Handles assessment/quiz creation with validation and permission checks.
 * Creates assessments in draft status (isPublic = false) by default.
 */

'use server'

import { createClient } from '@/lib/supabase/server'
import { assessmentCreateSchema } from '@/lib/validators/assessment'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

/**
 * Create assessment result type
 */
export type CreateAssessmentResult =
  | { success: true; assessmentId: string }
  | { success: false; error: string }

/**
 * Generate a random 6-character access code
 */
function generateAccessCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Exclude similar chars (I, O, 1, 0)
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

/**
 * Create Assessment Server Action
 *
 * Creates a new assessment with validation and authentication.
 * Assessment is created as draft (isPublic = false) by default.
 *
 * @param formData - Form data with title, description, settings
 * @returns Result with assessment ID or error message
 */
export async function createAssessment(formData: FormData): Promise<CreateAssessmentResult> {
  try {
    // Parse form data
    const title = formData.get('title') as string
    const description = formData.get('description') as string | null
    const timeLimit = formData.get('timeLimit') ? Number(formData.get('timeLimit')) : null
    const shuffleQuestions = formData.get('shuffleQuestions') === 'on'
    const maxAttempts = formData.get('maxAttempts') ? Number(formData.get('maxAttempts')) : null

    // Validate input with Zod schema
    const validation = assessmentCreateSchema.safeParse({
      title,
      description,
      timeLimit,
      shuffleQuestions,
      maxAttempts,
    })

    if (!validation.success) {
      const errorMessage = validation.error.issues[0]?.message || 'Invalid input'
      return { success: false, error: errorMessage }
    }

    // Get authenticated user
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return {
        success: false,
        error: 'You must be logged in to create an assessment',
      }
    }

    // Note: For quiz-only creation (no course dependency), we don't need course permission check
    // If you want course-based assessments later, add course ownership verification here

    // Generate access code for private quizzes
    const accessCode = generateAccessCode()

    // Create assessment in database
    // Note: Quiz model doesn't have settings field yet, so we'll add it to schema later
    const assessment = await prisma.quiz.create({
      data: {
        teacherId: user.id,
        title: validation.data.title,
        description: validation.data.description,
        isPublic: false, // Draft by default
        accessCode,
      },
      select: {
        id: true,
        title: true,
        isPublic: true,
      },
    })

    // Revalidate dashboard page to show new assessment
    revalidatePath('/dashboard')

    // Return success with assessment ID
    // Client will handle the redirect
    return { success: true, assessmentId: assessment.id }
  } catch (error) {
    // Handle unexpected errors
    console.error('Create assessment error:', error)
    return {
      success: false,
      error: 'Something went wrong. Please try again.',
    }
  }
}
