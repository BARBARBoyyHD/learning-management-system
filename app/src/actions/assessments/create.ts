/**
 * Create Assessment Server Action
 *
 * Handles assessment/quiz creation with validation and permission checks.
 * Creates assessments in draft status (isPublic = false) by default.
 */

'use server'

import { createServerClient } from '@/lib/supabase/server'
import { assessmentCreateSchema } from '@/lib/validators/assessment'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'

/**
 * Create assessment result type
 */
export type CreateAssessmentResult =
  | { success: true; assessmentId: string }
  | { success: false; error: string; code?: 'UNAUTHORIZED' | 'FORBIDDEN' }

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
 * Verify course ownership
 *
 * Checks if the authenticated user owns the specified course.
 * Returns true if user is owner, false otherwise.
 *
 * Note: Course model not yet implemented in current schema.
 * This function is a placeholder for future course-based permissions.
 * For now, we only verify that the user is authenticated.
 *
 * @param courseId - The course ID to verify ownership for
 * @param userId - The user ID to check ownership against
 * @returns True if user owns the course, false otherwise
 */
async function verifyCourseOwnership(
  courseId: string,
  userId: string
): Promise<boolean> {
  // TODO: Implement course ownership check when Course model is added
  // For now, we allow any authenticated user to create standalone quizzes
  // When Course model is added, this should query:
  // const course = await prisma.course.findUnique({
  //   where: { id: courseId },
  //   select: { teacherId: true },
  // })
  // return course?.teacherId === userId
  
  // Placeholder: Allow all authenticated users for standalone quizzes
  // This will be replaced with actual course permission check later
  console.log('Course ownership check requested for courseId:', courseId, 'userId:', userId)
  return true // Allow for now - will be implemented when Course model exists
}

/**
 * Create Assessment Server Action
 *
 * Creates a new assessment with validation and authentication.
 * Assessment is created as draft (isPublic = false) by default.
 *
 * @param formData - Form data with title, description, settings
 * @param courseId - Optional course ID for course-based assessments
 * @returns Result with assessment ID or error message
 */
export async function createAssessment(
  formData: FormData,
  courseId?: string
): Promise<CreateAssessmentResult> {
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
    const supabase = await createServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    // 9.3 Add authentication check (requireAuth)
    if (authError || !user) {
      return {
        success: false,
        error: 'You must be logged in to create an assessment',
        code: 'UNAUTHORIZED',
      }
    }

    // 9.1 Implement course ownership check in Server Action
    // If courseId is provided, verify user owns the course
    if (courseId) {
      const isOwner = await verifyCourseOwnership(courseId, user.id)

      // 9.2 Return 403 Forbidden for non-owners
      if (!isOwner) {
        return {
          success: false,
          error: 'You do not have permission to create assessments in this course',
          code: 'FORBIDDEN',
        }
      }
    }

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
    // Handle database errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Database error:', error.code, error.message)
      return {
        success: false,
        error: 'Database error. Please try again.',
      }
    }

    // Handle unexpected errors
    console.error('Create assessment error:', error)
    return {
      success: false,
      error: 'Something went wrong. Please try again.',
    }
  }
}
