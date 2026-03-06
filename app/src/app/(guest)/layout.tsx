import { Toaster } from '@/components/ui/sonner'

/**
 * Guest Layout
 *
 * Minimal layout for guest student pages (join quiz, take quiz).
 * No sidebar, no authentication navigation.
 * Uses Theme B (Dark mode) for quiz screens.
 */
export default function GuestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 p-6">
      {/* Logo/Branding */}
      <div className="mb-8 text-center">
        <div className="flex items-center gap-3 justify-center mb-2">
          <span className="material-symbols-outlined h-10 w-10 text-primary-base">school</span>
          <h1 className="text-2xl font-bold text-white">Quizizz Clone</h1>
        </div>
        <p className="text-sm text-neutral-400">Guest Student Access</p>
      </div>

      {/* Page Content */}
      <main className="w-full max-w-md">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-8 text-center text-xs text-neutral-500">
        <p>Join a quiz with your teacher&apos;s access code</p>
      </footer>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  )
}
