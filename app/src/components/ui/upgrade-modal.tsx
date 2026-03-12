'use client'

/**
 * Upgrade Modal Component
 *
 * Displays a modal prompting users to upgrade to Premium.
 * Used when free tier limits are reached.
 */

import { useState } from 'react'
import { X, Sparkles, Check } from 'lucide-react'

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  reason?: string
  limitType?: 'courses' | 'quizzes' | 'export'
}

export function UpgradeModal({
  isOpen,
  onClose,
  reason,
  limitType = 'courses',
}: UpgradeModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen) return null

  const getTitle = () => {
    switch (limitType) {
      case 'courses':
        return 'Course Limit Reached'
      case 'quizzes':
        return 'Quiz Limit Reached'
      case 'export':
        return 'Premium Feature'
      default:
        return 'Upgrade to Premium'
    }
  }

  const getMessage = () => {
    if (reason) return reason

    switch (limitType) {
      case 'courses':
        return "You've created the maximum number of courses (2) allowed on the Free tier."
      case 'quizzes':
        return "You've created the maximum number of quizzes (5) allowed on the Free tier."
      case 'export':
        return 'Excel export is available for Premium users only.'
      default:
        return 'Upgrade to unlock unlimited features.'
    }
  }

  const handleUpgrade = async () => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/v1/subscription/upgrade', {
        method: 'POST',
        credentials: 'include',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create checkout session')
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      }
    } catch (err) {
      console.error('Upgrade error:', err)
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">{getTitle()}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-400 mb-6">{getMessage()}</p>

          {/* Premium Benefits */}
          <div className="bg-indigo-50 dark:bg-slate-700 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-indigo-900 dark:text-white mb-3">
              With Premium you get:
            </h3>
            <ul className="space-y-2">
              <PremiumBenefit text="Unlimited courses" />
              <PremiumBenefit text="Unlimited quizzes" />
              <PremiumBenefit text="All 5 question types" />
              <PremiumBenefit text="Excel export for scores" />
              <PremiumBenefit text="Advanced analytics" />
              <PremiumBenefit text="Priority support" />
            </ul>
          </div>

          {/* Price */}
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              Rp 49.000
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              per month • 7-day free trial
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleUpgrade}
              disabled={isLoading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Upgrade to Premium'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-3 text-gray-600 dark:text-gray-400 font-medium hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
            >
              Maybe Later
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3 text-green-500" />
              Secure payment
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3 text-green-500" />
              Cancel anytime
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3 text-green-500" />
              7-day free trial
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function PremiumBenefit({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
      {text}
    </li>
  )
}
