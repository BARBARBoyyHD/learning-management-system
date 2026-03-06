/**
 * Auth Layout
 *
 * Layout for authentication pages (login, register, etc.)
 * Uses Theme B (Dark) color scheme for teacher-facing screens.
 * Centered layout with clean, focused design.
 */

import { Lexend } from 'next/font/google'

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  weight: ['300', '400', '500', '600', '700'],
})

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${lexend.variable} font-sans`}>
      <div className="flex min-h-screen flex-col items-center justify-center bg-bg-primary px-4 py-12">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 -top-1/4 h-96 w-96 rounded-full bg-primary-base/10 blur-3xl" />
          <div className="absolute -right-1/4 -bottom-1/4 h-96 w-96 rounded-full bg-primary-base/5 blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full">
          {children}
        </div>
      </div>
    </div>
  )
}
