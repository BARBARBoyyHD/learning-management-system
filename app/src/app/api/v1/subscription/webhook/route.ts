/**
 * Subscription Webhook API Route
 *
 * Handles Mayar.id webhook notifications for payment events.
 * Updates user subscription status based on payment success/failure.
 *
 * @see https://docs.mayar.id/api-reference/introduction
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { SubscriptionTier, SubscriptionStatus } from '@prisma/client'

const MAYAR_WEBHOOK_SECRET = process.env.MAYAR_WEBHOOK_SECRET

/**
 * POST /api/v1/subscription/webhook
 *
 * Receives webhook events from Mayar.id
 * Events: payment.success, payment.failed, subscription.cancelled
 *
 * @param request - Next.js request object
 * @returns 200 OK or error
 */
export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature (if Mayar provides signature verification)
    const body = await request.text()

    // TODO: Implement signature verification when Mayar docs specify it
    // For now, we'll process the webhook without verification
    // In production, add: verifyWebhookSignature(body, signature, MAYAR_WEBHOOK_SECRET)

    if (!MAYAR_WEBHOOK_SECRET) {
      console.warn('MAYAR_WEBHOOK_SECRET not configured')
    }

    // Parse webhook payload
    const event = JSON.parse(body)

    console.log('Received Mayar webhook event:', event.type)

    // Handle different event types
    switch (event.type) {
      case 'payment.success':
      case 'checkout.completed':
        await handlePaymentSuccess(event.data)
        break

      case 'payment.failed':
      case 'checkout.failed':
        await handlePaymentFailed(event.data)
        break

      case 'subscription.cancelled':
        await handleSubscriptionCancelled(event.data)
        break

      default:
        console.log('Unhandled webhook event type:', event.type)
    }

    // Acknowledge webhook
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)

    // Return 200 to prevent Mayar from retrying (we don't want to lose the event)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 200 })
  }
}

/**
 * Handle successful payment event
 */
async function handlePaymentSuccess(data: {
  customer_id?: string
  user_id?: string
  subscription_id?: string
  ends_at?: string
}) {
  const userId = data.customer_id || data.user_id

  if (!userId) {
    console.error('Webhook missing customer_id or user_id')
    return
  }

  // Calculate subscription end date (1 month from now for monthly subscription)
  const subscriptionEndsAt = data.ends_at ? new Date(data.ends_at) : new Date()
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

  console.log(`User ${userId} upgraded to Premium`)
}

/**
 * Handle failed payment event
 */
async function handlePaymentFailed(data: { customer_id?: string; user_id?: string }) {
  const userId = data.customer_id || data.user_id

  if (!userId) {
    console.error('Webhook missing customer_id or user_id')
    return
  }

  // Keep user on trial/free, don't upgrade
  console.log(`Payment failed for user ${userId}, keeping current status`)
}

/**
 * Handle subscription cancellation event
 */
async function handleSubscriptionCancelled(data: { customer_id?: string; user_id?: string }) {
  const userId = data.customer_id || data.user_id

  if (!userId) {
    console.error('Webhook missing customer_id or user_id')
    return
  }

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
  })
}
