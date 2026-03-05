import { prisma } from '@/lib/prisma'
import { Quiz } from '@/types/quiz'
import { QuizMetadataUpdateInput } from '@/lib/validators/quiz'

/**
 * Quiz Service
 *
 * Business logic for quiz operations.
 * Uses Prisma to interact with the quizzes table.
 */
export const quizService = {
  /**
   * Get all quizzes for a teacher with stats
   */
  async getByTeacher(teacherId: string): Promise<Quiz[]> {
    const quizzes = await prisma.quiz.findMany({
      where: { teacherId },
      include: {
        _count: {
          select: { questions: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return quizzes.map((quiz) => ({
      id: quiz.id,
      teacherId: quiz.teacherId,
      title: quiz.title,
      description: quiz.description,
      timeLimit: quiz.timeLimit,
      questionCount: quiz._count.questions,
      accessCode: quiz.accessCode,
      isPublic: quiz.isPublic,
      createdAt: quiz.createdAt.toISOString(),
      updatedAt: quiz.updatedAt?.toISOString() ?? quiz.createdAt.toISOString(),
    }))
  },

  /**
   * Get quiz statistics for a teacher
   */
  async getStats(teacherId: string): Promise<{
    total: number
    published: number
    draft: number
  }> {
    const quizzes = await prisma.quiz.findMany({
      where: { teacherId },
      select: {
        isPublic: true,
      },
    })

    const stats = {
      total: quizzes.length,
      published: 0,
      draft: 0,
    }

    quizzes.forEach((quiz) => {
      if (quiz.isPublic) {
        stats.published++
      } else {
        stats.draft++
      }
    })

    return stats
  },

  /**
   * Get a single quiz by ID
   */
  async getById(id: string): Promise<Quiz | null> {
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: {
        _count: {
          select: { questions: true },
        },
      },
    })

    if (!quiz) return null

    return {
      id: quiz.id,
      teacherId: quiz.teacherId,
      title: quiz.title,
      description: quiz.description,
      timeLimit: quiz.timeLimit,
      questionCount: quiz._count.questions,
      accessCode: quiz.accessCode,
      isPublic: quiz.isPublic,
      createdAt: quiz.createdAt.toISOString(),
      updatedAt: quiz.updatedAt ? quiz.updatedAt.toISOString() : quiz.createdAt.toISOString(),
    }
  },

  /**
   * Update quiz metadata
   */
  async updateMetadata(id: string, teacherId: string, data: QuizMetadataUpdateInput): Promise<Quiz> {
    // First verify the quiz belongs to this teacher
    const existingQuiz = await prisma.quiz.findUnique({
      where: { id },
      select: { teacherId: true },
    })

    if (!existingQuiz) {
      throw new Error('Quiz not found')
    }

    if (existingQuiz.teacherId !== teacherId) {
      throw new Error('Unauthorized: You can only update your own quizzes')
    }

    // Handle access code generation if changing from public to private
    const updateData: Record<string, unknown> = {
      title: data.title,
      description: data.description,
      timeLimit: data.timeLimit,
      isPublic: data.isPublic,
    }

    // Generate access code if making private and no code exists
    if (!data.isPublic && !data.accessCode) {
      updateData.accessCode = generateAccessCode()
    } else if (data.accessCode) {
      updateData.accessCode = data.accessCode
    } else if (data.isPublic) {
      updateData.accessCode = null
    }

    const updatedQuiz = await prisma.quiz.update({
      where: { id },
      data: updateData,
      include: {
        _count: {
          select: { questions: true },
        },
      },
    })

    return {
      id: updatedQuiz.id,
      teacherId: updatedQuiz.teacherId,
      title: updatedQuiz.title,
      description: updatedQuiz.description,
      timeLimit: updatedQuiz.timeLimit,
      questionCount: updatedQuiz._count.questions,
      accessCode: updatedQuiz.accessCode,
      isPublic: updatedQuiz.isPublic,
      createdAt: updatedQuiz.createdAt.toISOString(),
      updatedAt: updatedQuiz.updatedAt.toISOString(),
    }
  },

  /**
   * Check for concurrent edits (returns last modified time)
   */
  async getLastModified(id: string): Promise<Date | null> {
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      select: { updatedAt: true },
    })
    return quiz?.updatedAt ?? null
  },

  /**
   * Delete a quiz by ID
   */
  async delete(id: string, teacherId: string): Promise<void> {
    // First verify the quiz belongs to this teacher
    const existingQuiz = await prisma.quiz.findUnique({
      where: { id },
      select: { teacherId: true },
    })

    if (!existingQuiz) {
      throw new Error('Quiz not found')
    }

    if (existingQuiz.teacherId !== teacherId) {
      throw new Error('Unauthorized: You can only delete your own quizzes')
    }

    // Delete the quiz (cascade will handle related questions, options, etc.)
    await prisma.quiz.delete({
      where: { id },
    })
  },
}

/**
 * Generate a random 6-character alphanumeric access code
 */
function generateAccessCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}
