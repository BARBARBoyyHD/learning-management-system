import { describe, it, expect, beforeEach, vi } from 'vitest'
import { subscriptionService, FREE_TIER_LIMITS } from '../subscription.service'
import { prisma } from '@/lib/prisma'
import { SubscriptionTier, SubscriptionStatus } from '@prisma/client'

// Mock Prisma
vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    quiz: {
      count: vi.fn(),
    },
  },
}))

describe('subscriptionService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getSubscription', () => {
    it('should return subscription details for user', async () => {
      const mockUser = {
        subscriptionTier: SubscriptionTier.FREE,
        subscriptionStatus: SubscriptionStatus.trial,
        trialEndsAt: new Date('2026-03-20'),
        subscriptionEndsAt: null,
        mayarCustomerId: null,
      }

      // @ts-ignore - Mock implementation
      vi.mocked(prisma.user.findUnique).mockImplementation(() => Promise.resolve(mockUser as any))

      const result = await subscriptionService.getSubscription('user-123')

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'user-123' },
        select: {
          subscriptionTier: true,
          subscriptionStatus: true,
          trialEndsAt: true,
          subscriptionEndsAt: true,
        },
      })

      expect(result).toEqual({
        tier: SubscriptionTier.FREE,
        status: SubscriptionStatus.trial,
        trialEndsAt: mockUser.trialEndsAt,
        subscriptionEndsAt: null,
        isPremium: false,
        isTrial: true,
      })
    })

    it('should throw error if user not found', async () => {
      // @ts-ignore - Mock implementation
      vi.mocked(prisma.user.findUnique).mockImplementation(() => Promise.resolve(null))

      await expect(subscriptionService.getSubscription('non-existent')).rejects.toThrow(
        'User not found'
      )
    })
  })

  describe('hasPremiumAccess', () => {
    it('should return true for Premium tier user', async () => {
      // @ts-ignore - Mock implementation
      vi.mocked(prisma.user.findUnique).mockImplementation(() => Promise.resolve({
        subscriptionTier: SubscriptionTier.PREMIUM,
        subscriptionStatus: SubscriptionStatus.active,
        trialEndsAt: null,
        subscriptionEndsAt: new Date('2026-04-01'),
        mayarCustomerId: null,
      } as any))

      const result = await subscriptionService.hasPremiumAccess('user-123')
      expect(result).toBe(true)
    })

    it('should return true for user with active trial', async () => {
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 5)

      // @ts-ignore - Mock implementation
      vi.mocked(prisma.user.findUnique).mockImplementation(() => Promise.resolve({
        subscriptionTier: SubscriptionTier.FREE,
        subscriptionStatus: SubscriptionStatus.trial,
        trialEndsAt: futureDate,
        subscriptionEndsAt: null,
        mayarCustomerId: null,
      } as any))

      const result = await subscriptionService.hasPremiumAccess('user-123')
      expect(result).toBe(true)
    })

    it('should return false for expired trial', async () => {
      const pastDate = new Date()
      pastDate.setDate(pastDate.getDate() - 2)

      // @ts-ignore - Mock implementation
      vi.mocked(prisma.user.findUnique).mockImplementation(() => Promise.resolve({
        subscriptionTier: SubscriptionTier.FREE,
        subscriptionStatus: SubscriptionStatus.trial,
        trialEndsAt: pastDate,
        subscriptionEndsAt: null,
        mayarCustomerId: null,
      } as any))

      const result = await subscriptionService.hasPremiumAccess('user-123')
      expect(result).toBe(false)
    })

    it('should return false for Free tier without trial', async () => {
      // @ts-ignore - Mock implementation
      vi.mocked(prisma.user.findUnique).mockImplementation(() => Promise.resolve({
        subscriptionTier: SubscriptionTier.FREE,
        subscriptionStatus: SubscriptionStatus.expired,
        trialEndsAt: null,
        subscriptionEndsAt: null,
        mayarCustomerId: null,
      } as any))

      const result = await subscriptionService.hasPremiumAccess('user-123')
      expect(result).toBe(false)
    })
  })

  describe('canCreateCourse', () => {
    it('should allow Premium user to create unlimited courses', async () => {
      // @ts-ignore - Mock implementation
      vi.mocked(prisma.user.findUnique).mockImplementation(() => Promise.resolve({
        subscriptionTier: SubscriptionTier.PREMIUM,
        subscriptionStatus: SubscriptionStatus.active,
        trialEndsAt: null,
        subscriptionEndsAt: new Date('2026-04-01'),
        mayarCustomerId: null,
      } as any))

      const result = await subscriptionService.canCreateCourse('user-123')

      expect(result.canCreate).toBe(true)
      expect(result.limit).toBe(Infinity)
    })

    it('should allow Free user under limit to create course', async () => {
      // @ts-ignore - Mock implementation
      vi.mocked(prisma.user.findUnique).mockImplementation(() => Promise.resolve({
        subscriptionTier: SubscriptionTier.FREE,
        subscriptionStatus: SubscriptionStatus.trial,
        trialEndsAt: new Date('2026-03-20'),
        subscriptionEndsAt: null,
        mayarCustomerId: null,
      } as any))

      // @ts-ignore - Mock implementation
      vi.mocked(prisma.quiz.count).mockImplementation(() => Promise.resolve(1))

      const result = await subscriptionService.canCreateCourse('user-123')

      expect(result.canCreate).toBe(true)
      expect(result.currentCount).toBe(1)
      expect(result.limit).toBe(FREE_TIER_LIMITS.maxCourses)
    })

    it('should block Free user at limit from creating course', async () => {
      // @ts-ignore - Mock implementation
      vi.mocked(prisma.user.findUnique).mockImplementation(() => Promise.resolve({
        subscriptionTier: SubscriptionTier.FREE,
        subscriptionStatus: SubscriptionStatus.expired,
        trialEndsAt: null,
        subscriptionEndsAt: null,
        mayarCustomerId: null,
      } as any))

      // @ts-ignore - Mock implementation
      vi.mocked(prisma.quiz.count).mockImplementation(() => Promise.resolve(2))

      const result = await subscriptionService.canCreateCourse('user-123')

      expect(result.canCreate).toBe(false)
      expect(result.currentCount).toBe(2)
      expect(result.limit).toBe(FREE_TIER_LIMITS.maxCourses)
      expect(result.reason).toContain('Free tier limited to 2 courses')
    })
  })

  describe('canCreateQuiz', () => {
    it('should allow Premium user to create unlimited quizzes', async () => {
      // @ts-ignore - Mock implementation
      vi.mocked(prisma.user.findUnique).mockImplementation(() => Promise.resolve({
        subscriptionTier: SubscriptionTier.PREMIUM,
        subscriptionStatus: SubscriptionStatus.active,
        trialEndsAt: null,
        subscriptionEndsAt: new Date('2026-04-01'),
        mayarCustomerId: null,
      } as any))

      const result = await subscriptionService.canCreateQuiz('user-123', 'course-123')

      expect(result.canCreate).toBe(true)
      expect(result.limit).toBe(Infinity)
    })

    it('should allow Free user under limit to create quiz', async () => {
      // @ts-ignore - Mock implementation
      vi.mocked(prisma.user.findUnique).mockImplementation(() => Promise.resolve({
        subscriptionTier: SubscriptionTier.FREE,
        subscriptionStatus: SubscriptionStatus.trial,
        trialEndsAt: new Date('2026-03-20'),
        subscriptionEndsAt: null,
        mayarCustomerId: null,
      } as any))

      // @ts-ignore - Mock implementation
      vi.mocked(prisma.quiz.count).mockImplementation(() => Promise.resolve(3))

      const result = await subscriptionService.canCreateQuiz('user-123', 'course-123')

      expect(result.canCreate).toBe(true)
      expect(result.currentCount).toBe(3)
      expect(result.limit).toBe(FREE_TIER_LIMITS.maxQuizzesPerCourse)
    })

    it('should block Free user at quiz limit', async () => {
      // @ts-ignore - Mock implementation
      vi.mocked(prisma.user.findUnique).mockImplementation(() => Promise.resolve({
        subscriptionTier: SubscriptionTier.FREE,
        subscriptionStatus: SubscriptionStatus.expired,
        trialEndsAt: null,
        subscriptionEndsAt: null,
        mayarCustomerId: null,
      } as any))

      // @ts-ignore - Mock implementation
      vi.mocked(prisma.quiz.count).mockImplementation(() => Promise.resolve(5))

      const result = await subscriptionService.canCreateQuiz('user-123', 'course-123')

      expect(result.canCreate).toBe(false)
      expect(result.currentCount).toBe(5)
      expect(result.limit).toBe(FREE_TIER_LIMITS.maxQuizzesPerCourse)
      expect(result.reason).toContain('Free tier limited to 5 quizzes')
    })
  })

  describe('activatePremium', () => {
    it('should upgrade user to Premium', async () => {
      const mockEndDate = new Date('2026-04-01')

      await subscriptionService.activatePremium('user-123', 'mayar-customer-456', mockEndDate)

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-123' },
        data: {
          subscriptionTier: SubscriptionTier.PREMIUM,
          subscriptionStatus: SubscriptionStatus.active,
          mayarCustomerId: 'mayar-customer-456',
          subscriptionEndsAt: mockEndDate,
          trialEndsAt: null,
        },
      })
    })
  })

  describe('cancelPremium', () => {
    it('should mark subscription as cancelled', async () => {
      await subscriptionService.cancelPremium('user-123')

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-123' },
        data: {
          subscriptionStatus: SubscriptionStatus.cancelled,
        },
      })
    })
  })

  describe('downgradeToFree', () => {
    it('should downgrade user to Free tier', async () => {
      await subscriptionService.downgradeToFree('user-123')

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-123' },
        data: {
          subscriptionTier: SubscriptionTier.FREE,
          subscriptionStatus: SubscriptionStatus.expired,
          subscriptionEndsAt: null,
          mayarCustomerId: null,
        },
      })
    })
  })

  describe('initializeTrial', () => {
    it('should initialize 7-day trial for new user', async () => {
      await subscriptionService.initializeTrial('user-123', 7)

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-123' },
        data: {
          subscriptionTier: SubscriptionTier.FREE,
          subscriptionStatus: SubscriptionStatus.trial,
          trialEndsAt: expect.any(Date),
        },
      })
    })
  })
})
