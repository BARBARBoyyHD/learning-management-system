import { prisma } from '@/lib/prisma'
import { SubscriptionTier, SubscriptionStatus } from '@prisma/client'

/**
 * Subscription Service
 *
 * Business logic for subscription tiers and limits.
 * Handles FREE vs PREMIUM tier enforcement.
 */

// Free tier limits
export const FREE_TIER_LIMITS = {
  maxCourses: 2,
  maxQuizzesPerCourse: 5,
} as const

export const subscriptionService = {
  /**
   * Get user's subscription details
   */
  async getSubscription(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        subscriptionTier: true,
        subscriptionStatus: true,
        trialEndsAt: true,
        subscriptionEndsAt: true,
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    return {
      tier: user.subscriptionTier,
      status: user.subscriptionStatus,
      trialEndsAt: user.trialEndsAt,
      subscriptionEndsAt: user.subscriptionEndsAt,
      isPremium: user.subscriptionTier === SubscriptionTier.PREMIUM,
      isTrial: user.subscriptionStatus === SubscriptionStatus.trial,
    }
  },

  /**
   * Check if user has Premium access (including active trial)
   */
  async hasPremiumAccess(userId: string): Promise<boolean> {
    const subscription = await this.getSubscription(userId)

    // Premium tier always has access
    if (subscription.isPremium) {
      return true
    }

    // Check if trial is still active
    if (subscription.isTrial && subscription.trialEndsAt) {
      return subscription.trialEndsAt > new Date()
    }

    return false
  },

  /**
   * Check if user can create a course based on tier limits
   */
  async canCreateCourse(userId: string): Promise<{
    canCreate: boolean
    reason?: string
    currentCount: number
    limit: number
  }> {
    const hasPremium = await this.hasPremiumAccess(userId)

    if (hasPremium) {
      return {
        canCreate: true,
        currentCount: 0,
        limit: Infinity,
      }
    }

    // Count existing courses for free tier user
    const courseCount = await prisma.quiz.count({
      where: { teacherId: userId },
    })

    // Note: We're counting quizzes as proxy for courses since schema uses quizzes
    // In a real app, you'd have a separate courses table
    const limit = FREE_TIER_LIMITS.maxCourses

    return {
      canCreate: courseCount < limit,
      reason: courseCount >= limit ? `Free tier limited to ${limit} courses. Upgrade to Premium for unlimited.` : undefined,
      currentCount: courseCount,
      limit,
    }
  },

  /**
   * Check if user can create a quiz in a specific course
   */
  async canCreateQuiz(userId: string, _courseId: string): Promise<{
    canCreate: boolean
    reason?: string
    currentCount: number
    limit: number
  }> {
    const hasPremium = await this.hasPremiumAccess(userId)

    if (hasPremium) {
      return {
        canCreate: true,
        currentCount: 0,
        limit: Infinity,
      }
    }

    // Count existing quizzes in this course
    const quizCount = await prisma.quiz.count({
      where: { teacherId: userId },
    })

    const limit = FREE_TIER_LIMITS.maxQuizzesPerCourse

    return {
      canCreate: quizCount < limit,
      reason: quizCount >= limit ? `Free tier limited to ${limit} quizzes per course. Upgrade to Premium for unlimited.` : undefined,
      currentCount: quizCount,
      limit,
    }
  },

  /**
   * Enforce course creation limit - throws if limit exceeded
   */
  async enforceCourseLimit(userId: string): Promise<void> {
    const result = await this.canCreateCourse(userId)

    if (!result.canCreate) {
      throw new Error(
        `Course limit exceeded. ${result.reason}`,
      )
    }
  },

  /**
   * Enforce quiz creation limit - throws if limit exceeded
   */
  async enforceQuizLimit(userId: string, courseId: string): Promise<void> {
    const result = await this.canCreateQuiz(userId, courseId)

    if (!result.canCreate) {
      throw new Error(
        `Quiz limit exceeded. ${result.reason}`,
      )
    }
  },

  /**
   * Update user subscription after successful payment
   */
  async activatePremium(
    userId: string,
    mayarCustomerId: string,
    subscriptionEndsAt?: Date,
  ): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionTier: SubscriptionTier.PREMIUM,
        subscriptionStatus: SubscriptionStatus.active,
        mayarCustomerId,
        subscriptionEndsAt: subscriptionEndsAt ?? null,
        trialEndsAt: null, // Clear trial when upgrading to paid
      },
    })
  },

  /**
   * Cancel user's premium subscription
   */
  async cancelPremium(userId: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionStatus: SubscriptionStatus.cancelled,
      },
    })
  },

  /**
   * Downgrade user to FREE tier (after subscription ends)
   */
  async downgradeToFree(userId: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionTier: SubscriptionTier.FREE,
        subscriptionStatus: SubscriptionStatus.expired,
        subscriptionEndsAt: null,
        mayarCustomerId: null,
      },
    })
  },

  /**
   * Initialize trial for new user
   */
  async initializeTrial(userId: string, trialDays: number = 7): Promise<void> {
    const trialEndsAt = new Date()
    trialEndsAt.setDate(trialEndsAt.getDate() + trialDays)

    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionTier: SubscriptionTier.FREE,
        subscriptionStatus: SubscriptionStatus.trial,
        trialEndsAt,
      },
    })
  },
}
