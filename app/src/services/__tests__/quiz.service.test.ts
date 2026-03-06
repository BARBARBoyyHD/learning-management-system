/**
 * Quiz Service Unit Tests
 * Tests for access code validation functionality
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { quizService } from '../quiz.service'
import { prisma } from '@/lib/prisma'

// Mock Prisma
vi.mock('@/lib/prisma', () => ({
  prisma: {
    quiz: {
      findFirst: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}))

describe('quizService - Access Code Validation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('findByAccessCode', () => {
    it('should find quiz by access code (case-insensitive)', async () => {
      // Arrange
      const mockQuiz = {
        id: 'quiz-123',
        teacherId: 'teacher-123',
        title: 'Test Quiz',
        description: 'A test quiz',
        timeLimit: 30,
        isPublic: false,
        accessCode: 'ABC123',
        teacher: { name: 'Test Teacher' },
        _count: { questions: 5 },
      }

      vi.mocked(prisma.quiz.findFirst).mockResolvedValue(mockQuiz as any)

      // Act
      const result = await quizService.findByAccessCode('abc123')

      // Assert
      expect(prisma.quiz.findFirst).toHaveBeenCalledWith({
        where: {
          accessCode: {
            equals: 'ABC123',
            mode: 'insensitive',
          },
        },
        include: {
          teacher: { select: { name: true } },
          _count: { select: { questions: true } },
        },
      })
      expect(result).toEqual(mockQuiz)
    })

    it('should return null for non-existent access code', async () => {
      // Arrange
      vi.mocked(prisma.quiz.findFirst).mockResolvedValue(null)

      // Act
      const result = await quizService.findByAccessCode('INVALID')

      // Assert
      expect(result).toBeNull()
    })
  })

  describe('validateAccessCode', () => {
    it('should return quiz details for valid access code', async () => {
      // Arrange
      const mockQuiz = {
        id: 'quiz-123',
        title: 'Test Quiz',
        description: 'A test quiz',
        timeLimit: 30,
        teacher: { name: 'Test Teacher' },
        _count: { questions: 5 },
      }

      vi.mocked(prisma.quiz.findFirst).mockResolvedValue(mockQuiz as any)

      // Act
      const result = await quizService.validateAccessCode('ABC123')

      // Assert
      expect(result).toEqual({
        quizId: 'quiz-123',
        title: 'Test Quiz',
        description: 'A test quiz',
        teacherName: 'Test Teacher',
        questionCount: 5,
        timeLimit: 30,
      })
    })

    it('should throw error for invalid access code format', async () => {
      // Act & Assert
      await expect(quizService.validateAccessCode('AB'))
        .rejects.toThrow()
    })

    it('should throw error for non-existent access code', async () => {
      // Arrange
      vi.mocked(prisma.quiz.findFirst).mockResolvedValue(null)

      // Act & Assert
      await expect(quizService.validateAccessCode('INVALID'))
        .rejects.toThrow('Invalid access code')
    })
  })
})
