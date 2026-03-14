/**
 * Subscription Webhook API Route
 *
 * Handles Mayar.id webhook notifications for payment events.
 * Updates user subscription status based on payment success/failure.
 *
 * Mayar sends webhook to callbackUrl with payment status.
 * Expected payload formats:
 * - { status: 'success' | 'failed', customer_email, metadata: { user_id } }
 * - { event: 'payment.success', data: { ... } }
 *
 * @see https://docs.mayar.id/api-reference/webhook/registerurlhook
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { SubscriptionTier, SubscriptionStatus } from '@prisma/client'

const MAYAR_WEBHOOK_SECRET = process.env.MAYAR_WEBHOOK_SECRET

/**
 * POST /api/v1/subscription/webhook
 *
 * Receives webhook events from Mayar.id
 *
 * @param request - Next.js request object
 * @returns 200 OK or error
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const payload = JSON.parse(body)

    console.log('Received Mayar webhook:', JSON.stringify(payload, null, 2))

    // Extract user ID from metadata or customer data
    const userId = 
      payload?.metadata?.user_id ||
      payload?.customer_id ||
      payload?.user_id ||
      payload?.customer?.id

    if (!userId) {
      console.error('Webhook missing user identification:', payload)
      return NextResponse.json({ error: 'Missing user ID' }, { status: 400 })
    }

    // Determine payment status from various possible field names
    const status = 
      payload?.status ||
      payload?.event ||
      payload?.payment_status ||
      payload?.type

    console.log(`Processing webhook for user ${userId}, status: ${status}`)

    // Handle different status values
    if (status === 'success' || status === 'payment.success' || status === 'checkout.completed' || status === 'paid') {
      await handlePaymentSuccess(userId, payload)
    } else if (status === 'failed' || status === 'payment.failed' || status === 'checkout.failed') {
      await handlePaymentFailed(userId)
    } else if (status === 'cancelled' || status === 'subscription.cancelled') {
      await handleSubscriptionCancelled(userId)
    } else {
      console.log('Webhook status not recognized, treating as info:', status)
    }

    // Acknowledge webhook
    return NextResponse.json({ received: true, userId })
  } catch (error) {
    console.error('Error processing webhook:', error)

    // Return 200 to prevent Mayar from retrying (we don't want to lose the event)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 200 })
  }
}

/**
 * Handle successful payment event
 */
async function handlePaymentSuccess(userId: string, payload: any) {
  // Calculate subscription end date (1 month from now for monthly subscription)
  const subscriptionEndsAt = new Date()
  subscriptionEndsAt.setMonth(subscriptionEndsAt.getMonth() + 1)

  // Update user to Premium
  await prisma.user.update({
    where: { id: userId },
    data: {
      subscriptionTier: SubscriptionTier.PREMIUM,
      subscriptionStatus: SubscriptionStatus.active,
      subscriptionEndsAt,
      trialEndsAt: null,
    },
  })

  console.log(`User ${userId} upgraded to Premium, expires: ${subscriptionEndsAt.toISOString()}`)
}

/**
 * Handle failed payment event
 */
async function handlePaymentFailed(userId: string) {
  // Keep user on trial/free, don't upgrade
  console.log(`Payment failed for user ${userId}, keeping current status`)
}

/**
 * Handle subscription cancellation event
 */
async function handleSubscriptionCancelled(userId: string) {
  // Mark as cancelled (user retains access until end of billing period)
  await prisma.user.update({
    where: { id: userId },
    data: {
      subscriptionStatus: SubscriptionStatus.cancelled,
    },
  })

  console.log(`User ${userId} subscription cancelled`)
}

/**
 * GET handler for webhook testing
 */
export function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Mayar.id webhook endpoint is active',
    webhookUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/subscription/webhook`,
  })
}
