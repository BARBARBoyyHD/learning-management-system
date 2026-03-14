import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'

/**
 * Guest Layout
 *
 * Minimal layout for guest student pages (join quiz, take quiz).
 * No sidebar, no authentication navigation.
 * Uses Theme B (Dark mode) for quiz screens with purple accent.
 */
export default function GuestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="font-display bg-bg-primary text-text-primary min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Pattern */}
      <div className={cn(
        'absolute inset-0 pointer-events-none opacity-10',
        'bg-[radial-gradient(#6a25f4_0.5px,transparent_0.5px),radial-gradient(#6a25f4_0.5px,transparent_0.5px)]',
        'bg-[size:20px_20px] bg-[position:0_0,10px_10px]'
      )}/>

      {/* Decorative Blurs */}
      <div className="absolute -bottom-24 -left-24 size-64 bg-primary-base/20 rounded-full blur-[100px] pointer-events-none"/>
      <div className="absolute -top-24 -right-24 size-64 bg-primary-base/10 rounded-full blur-[100px] pointer-events-none"/>

      {/* Top Branding */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-primary-base rounded-lg flex items-center justify-center shadow-lg shadow-primary-base/20">
            <span className="material-symbols-outlined text-white text-2xl">rocket_launch</span>
          </div>
          <div>
            <h2 className="text-text-primary text-xl font-bold leading-tight tracking-tight">BrainBlitz</h2>
            <p className="text-primary-base/80 text-xs font-medium uppercase tracking-widest">LearnWeb LMS</p>
          </div>
        </div>
        <button className="flex items-center justify-center rounded-full size-10 bg-bg-tertiary text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-colors">
          <span className="material-symbols-outlined">help</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-6 text-center text-text-tertiary text-xs">
        <p>© 2024 LearnWeb LMS Ecosystem. High-speed educational connectivity.</p>
      </footer>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  )
}
