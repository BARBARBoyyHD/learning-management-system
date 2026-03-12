/**
 * Subscription Upgrade API Route
 *
 * Creates a Mayar.id checkout session for Premium subscription.
 * Requires authentication - only teachers can upgrade.
 *
 * @see https://docs.mayar.id/api-reference/introduction
 */

import { requireAuth, successResponse, errorResponse } from '@/lib/auth'
import { NextRequest } from 'next/server'
import { subscriptionService } from '@/services/subscription.service'

const MAYAR_API_KEY = process.env.MAYAR_API_KEY
const MAYAR_PRODUCT_ID = process.env.MAYAR_PRODUCT_ID
const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

/**
 * POST /api/v1/subscription/upgrade
 *
 * Creates a Mayar.id checkout session for Premium subscription.
 * Returns checkout URL for redirect.
 *
 * @param request - Next.js request object
 * @returns Checkout URL or error
 */
export async function POST(request: NextRequest) {
  try {
    // Require authentication
    const auth = await requireAuth(request)
    const userId = auth.user.id

    // Check if user already has premium
    const hasPremium = await subscriptionService.hasPremiumAccess(userId)
    if (hasPremium) {
      return errorResponse('User already has Premium access', 400)
    }

    // Validate Mayar configuration
    if (!MAYAR_API_KEY || !MAYAR_PRODUCT_ID) {
      console.error('Mayar.id credentials not configured')
      return errorResponse('Payment gateway not configured. Please add Mayar.id credentials to .env.local', 500)
    }

    // Create checkout session with Mayar.id
    const checkoutData = {
      product_id: MAYAR_PRODUCT_ID,
      customer: {
        id: userId,
        email: auth.user.email || '',
        name: (auth.user.email || '').split('@')[0], // Use email prefix as name
      },
      metadata: {
        user_id: userId,
        subscription_tier: 'PREMIUM',
      },
      success_url: `${NEXT_PUBLIC_SITE_URL}/pricing?status=success`,
      cancel_url: `${NEXT_PUBLIC_SITE_URL}/pricing?status=cancelled`,
      webhook_url: `${NEXT_PUBLIC_SITE_URL}/api/v1/subscription/webhook`,
    }

    // Call Mayar.id API to create checkout session
    const mayarResponse = await fetch('https://api.mayar.id/v1/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MAYAR_API_KEY}`,
      },
      body: JSON.stringify(checkoutData),
    })

    if (!mayarResponse.ok) {
      const errorData = await mayarResponse.json().catch(() => ({}))
      console.error('Mayar.id API error:', errorData)
      return errorResponse('Failed to create checkout session', 502)
    }

    const checkoutSession = await mayarResponse.json()

    // Return checkout URL
    return successResponse({
      checkoutUrl: checkoutSession.checkout_url,
      sessionId: checkoutSession.id,
    })
  } catch (error) {
    console.error('Error creating subscription checkout:', error)

    if (error instanceof Response) {
      return error
    }

    return errorResponse('Internal server error', 500)
  }
}
