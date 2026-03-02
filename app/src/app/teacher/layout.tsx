/**
 * Teacher Layout
 *
 * Main layout for all teacher-facing quiz management pages.
 * Full-width centered layout without sidebar for focused editing.
 */

import { requireAuth } from '@/lib/auth-server'

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Require authentication for all teacher routes
  await requireAuth()

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-sm">
        <div className="flex h-16 items-center justify-between px-6">
          <a
            href="/dashboard"
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="text-sm font-medium">Back to Dashboard</span>
          </a>
        </div>
      </header>

      {/* Main Content - Centered */}
      <main className="container mx-auto max-w-5xl px-6 py-8">
        {children}
      </main>
    </div>
  )
}
