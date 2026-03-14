'use client'

/**
 * Pricing Page
 *
 * Displays Free vs Premium subscription tiers.
 * Allows teachers to upgrade to Premium for unlimited quiz creation and Excel export.
 */

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Check, X, Sparkles } from 'lucide-react'

function PricingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const status = searchParams.get('status')

  // Show success/cancel messages based on checkout result
  const getStatusMessage = () => {
    if (status === 'success') {
      return {
        type: 'success',
        message: 'Payment successful! Your Premium subscription is now active.',
      }
    }
    if (status === 'cancelled') {
      return {
        type: 'info',
        message: 'Checkout was cancelled. You can upgrade anytime.',
      }
    }
    return null
  }

  const statusMessage = getStatusMessage()

  const handleUpgrade = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/v1/subscription/upgrade', {
        method: 'POST',
        credentials: 'include',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create checkout session')
      }

      // Redirect to Mayar.id checkout
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (err) {
      console.error('Upgrade error:', err)
      setError(err instanceof Error ? err.message : 'Failed to start upgrade process')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="container mx-auto px-4 pt-16 pb-8 text-center">
        <h1 className="text-4xl font-bold text-indigo-900 dark:text-white mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Start for free, upgrade for unlimited quiz creation and advanced features
        </p>
      </div>

      {/* Status Messages */}
      {statusMessage && (
        <div className="container mx-auto px-4 mb-8">
          <div
            className={`max-w-2xl mx-auto p-4 rounded-xl ${
              statusMessage.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-blue-50 border border-blue-200 text-blue-800'
            }`}
          >
            {statusMessage.message}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="container mx-auto px-4 mb-8">
          <div className="max-w-2xl mx-auto p-4 rounded-xl bg-red-50 border border-red-200 text-red-800">
            {error}
          </div>
        </div>
      )}

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <PricingCard
            title="Free"
            price="Rp 0"
            period="forever"
            description="Perfect for trying out the platform"
            features={[
              { text: 'Up to 2 courses', included: true },
              { text: 'Up to 30 students per course', included: true },
              { text: 'Up to 5 quizzes per course', included: true },
              { text: 'Multiple Choice questions', included: true },
              { text: 'Essay questions', included: true },
              { text: 'Basic reporting', included: true },
              { text: 'Unlimited courses', included: false },
              { text: 'All 5 question types', included: false },
              { text: 'Excel export', included: false },
              { text: 'Advanced analytics', included: false },
            ]}
            buttonText="Get Started"
            buttonVariant="outline"
            onClick={() => router.push('/dashboard')}
          />

          {/* Premium Tier */}
          <PricingCard
            title="Premium"
            price="Rp 49.000"
            period="per month"
            description="For serious teachers who want it all"
            highlight
            features={[
              { text: 'Unlimited courses', included: true },
              { text: 'Unlimited students', included: true },
              { text: 'Unlimited quizzes', included: true },
              { text: 'All 5 question types', included: true },
              { text: 'Excel export for scores', included: true },
              { text: 'Advanced analytics', included: true },
              { text: 'Priority support', included: true },
              { text: '7-day free trial', included: true },
            ]}
            buttonText="Upgrade Now"
            buttonVariant="primary"
            loading={isLoading}
            onClick={handleUpgrade}
          />
        </div>

        {/* Feature Comparison Table */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-center text-indigo-900 dark:text-white mb-8">
            What's Included?
          </h2>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-3 gap-4 p-6 bg-indigo-50 dark:bg-slate-700 font-semibold">
              <div className="text-gray-700 dark:text-gray-200">Feature</div>
              <div className="text-center text-gray-700 dark:text-gray-200">Free</div>
              <div className="text-center text-indigo-600 dark:text-indigo-400">Premium</div>
            </div>

            <FeatureRow
              feature="Courses"
              freeValue="2"
              premiumValue="Unlimited"
              highlight
            />
            <FeatureRow
              feature="Students per course"
              freeValue="30"
              premiumValue="Unlimited"
            />
            <FeatureRow
              feature="Quizzes per course"
              freeValue="5"
              premiumValue="Unlimited"
            />
            <FeatureRow
              feature="Question types"
              freeValue="2 (MC, Essay)"
              premiumValue="5 (All types)"
              highlight
            />
            <FeatureRow
              feature="Export to Excel"
              freeValue={<X className="w-5 h-5 text-red-500 mx-auto" />}
              premiumValue={<Check className="w-5 h-5 text-green-500 mx-auto" />}
              highlight
            />
            <FeatureRow
              feature="Advanced analytics"
              freeValue={<X className="w-5 h-5 text-red-500 mx-auto" />}
              premiumValue={<Check className="w-5 h-5 text-green-500 mx-auto" />}
            />
            <FeatureRow
              feature="Priority support"
              freeValue={<X className="w-5 h-5 text-red-500 mx-auto" />}
              premiumValue={<Check className="w-5 h-5 text-green-500 mx-auto" />}
            />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-center text-indigo-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <FaqItem
              question="Can I try Premium before buying?"
              answer="Yes! All new users get a 7-day free trial with full access to Premium features. No payment required to start."
            />
            <FaqItem
              question="What payment methods are accepted?"
              answer="We accept QRIS, Virtual Account, GoPay, OVO, DANA, and other Indonesian payment methods via Mayar.id"
            />
            <FaqItem
              question="Can I cancel anytime?"
              answer="Yes, you can cancel your subscription anytime. You'll retain Premium access until the end of your billing period."
            />
            <FaqItem
              question="What happens to my quizzes if I downgrade?"
              answer="Your quizzes remain accessible. You can still view and edit existing quizzes, but won't be able to create new ones beyond Free tier limits."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Pricing Card Component
interface PricingCardProps {
  title: string
  price: string
  period: string
  description: string
  features: Array<{ text: string; included: boolean }>
  buttonText: string
  buttonVariant: 'primary' | 'outline'
  highlight?: boolean
  loading?: boolean
  onClick?: () => void
}

function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonVariant,
  highlight = false,
  loading = false,
  onClick,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl p-8 transition-all duration-300 ${
        highlight
          ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-2xl scale-105'
          : 'bg-white dark:bg-slate-800 shadow-lg border border-gray-200 dark:border-slate-700'
      }`}
    >
      {highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <Sparkles className="w-4 h-4" />
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3
          className={`text-2xl font-bold mb-2 ${
            highlight ? 'text-white' : 'text-gray-900 dark:text-white'
          }`}
        >
          {title}
        </h3>
        <div className="flex items-baseline justify-center gap-1">
          <span
            className={`text-4xl font-bold ${
              highlight ? 'text-white' : 'text-gray-900 dark:text-white'
            }`}
          >
            {price}
          </span>
          <span
            className={`text-sm ${
              highlight ? 'text-indigo-100' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            /{period}
          </span>
        </div>
        <p
          className={`mt-2 text-sm ${
            highlight ? 'text-indigo-100' : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          {description}
        </p>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            {feature.included ? (
              <Check
                className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  highlight ? 'text-green-300' : 'text-green-500'
                }`}
              />
            ) : (
              <X
                className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  highlight ? 'text-red-300' : 'text-red-400'
                }`}
              />
            )}
            <span
              className={`text-sm ${
                !feature.included
                  ? 'text-gray-400 dark:text-gray-500 line-through'
                  : highlight
                    ? 'text-white'
                    : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={onClick}
        disabled={loading}
        className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
          buttonVariant === 'primary'
            ? 'bg-white text-indigo-600 hover:bg-indigo-50 disabled:opacity-50'
            : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200 dark:bg-slate-700 dark:text-indigo-400 dark:hover:bg-slate-600'
        }`}
      >
        {loading ? 'Processing...' : buttonText}
      </button>
    </div>
  )
}

// Feature Row Component
interface FeatureRowProps {
  feature: string
  freeValue: string | React.ReactNode
  premiumValue: string | React.ReactNode
  highlight?: boolean
}

function FeatureRow({ feature, freeValue, premiumValue, highlight }: FeatureRowProps) {
  return (
    <div
      className={`grid grid-cols-3 gap-4 p-4 border-t border-gray-100 dark:border-slate-700 ${
        highlight ? 'bg-indigo-50/50 dark:bg-slate-700/50' : ''
      }`}
    >
      <div className="text-gray-700 dark:text-gray-300 font-medium">{feature}</div>
      <div className="text-center text-gray-600 dark:text-gray-400">{freeValue}</div>
      <div className="text-center text-indigo-600 dark:text-indigo-400 font-semibold">
        {premiumValue}
      </div>
    </div>
  )
}

// FAQ Item Component
interface FaqItemProps {
  question: string
  answer: string
}

function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
      >
        <span className="font-semibold text-gray-900 dark:text-white">{question}</span>
        <span
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-600 dark:text-gray-400">{answer}</div>
      )}
    </div>
  )
}

export default function PricingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PricingContent />
    </Suspense>
  )
}
