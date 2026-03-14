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
const MAYAR_WEBHOOK_SECRET = process.env.MAYAR_WEBHOOK_SECRET
const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

// Use sandbox for development, production for production
const MAYAR_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.mayar.id/hl/v1'
  : 'https://api.mayar.club/hl/v1'

// Premium subscription price in IDR (Rp 49,000)
const PREMIUM_PRICE = 49000

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
    const userEmail = auth.user.email || ''
    const userName = userEmail.split('@')[0]

    // Check if user already has premium
    const hasPremium = await subscriptionService.hasPremiumAccess(userId)
    if (hasPremium) {
      return errorResponse('User already has Premium access', 400)
    }

    // Validate Mayar configuration
    if (!MAYAR_API_KEY) {
      console.error('Mayar.id credentials not configured')
      console.error('MAYAR_API_KEY set:', !!MAYAR_API_KEY)
      return errorResponse('Payment gateway not configured. Please add Mayar.id credentials to .env', 500)
    }

    // Set invoice expiration to 24 hours from now
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 24)

    // Create invoice with Mayar.id using direct invoice creation
    // https://docs.mayar.id/api-reference/reqpayment/create
    const invoiceData = {
      name: userName,
      email: userEmail,
      amount: PREMIUM_PRICE,
      mobile: '081234567890', // Default phone, user can update later
      redirectUrl: `${NEXT_PUBLIC_SITE_URL}/pricing?status=success`,
      description: 'BrainBlitz Premium Subscription - Monthly',
      expiredAt: expiresAt.toISOString(),
      metadata: {
        user_id: userId,
        subscription_tier: 'PREMIUM',
        action: 'subscription_upgrade',
      },
      callbackUrl: `${NEXT_PUBLIC_SITE_URL}/api/v1/subscription/webhook`,
    }

    console.log('Creating Mayar.id invoice:', {
      customer_email: userEmail,
      amount: PREMIUM_PRICE,
      environment: process.env.NODE_ENV,
      base_url: MAYAR_BASE_URL,
    })

    // Call Mayar.id API to create invoice
    // Endpoint: POST /invoice/create
    const mayarResponse = await fetch(`${MAYAR_BASE_URL}/invoice/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAYAR_API_KEY}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify(invoiceData),
    })

    const responseText = await mayarResponse.text()
    console.log('Mayar.id response status:', mayarResponse.status)
    console.log('Mayar.id response body:', responseText)

    if (!mayarResponse.ok) {
      let errorData = {}
      try {
        errorData = JSON.parse(responseText)
      } catch {
        // Response is not JSON
      }
      
      console.error('Mayar.id API error:', {
        status: mayarResponse.status,
        statusText: mayarResponse.statusText,
        error: errorData,
      })
      
      return errorResponse(
        `Failed to create checkout session: ${mayarResponse.status} ${mayarResponse.statusText}`,
        502
      )
    }

    let checkoutSession
    try {
      checkoutSession = JSON.parse(responseText)
    } catch (parseError) {
      console.error('Failed to parse Mayar.id response:', parseError)
      return errorResponse('Invalid response from payment gateway', 502)
    }

    // Return checkout URL
    // Mayar returns: { id, invoiceUrl, ... }
    return successResponse({
      checkoutUrl: checkoutSession.invoiceUrl || checkoutSession.checkout_url || checkoutSession.url,
      sessionId: checkoutSession.id || checkoutSession.invoice_id,
    })
  } catch (error) {
    console.error('Error creating subscription checkout:', error)

    if (error instanceof Response) {
      return error
    }

    return errorResponse('Internal server error', 500)
  }
}
