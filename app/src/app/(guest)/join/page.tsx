/**
 * Join Page - Student Guest Access
 *
 * Public page for students to enter quiz access code.
 * No authentication required.
 *
 * Route: /join
 */

import { JoinForm } from '@/components/guest/join-form'

/**
 * Metadata for SEO
 */
export const metadata = {
  title: 'Join Quiz - Quizizz Clone',
  description: 'Enter the access code to join a quiz',
}

/**
 * Join Page Component
 */
export default function JoinPage() {
  return (
    <div className="w-full">
      {/* Join Form */}
      <JoinForm />
    </div>
  )
}
