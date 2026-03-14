'use client'

import Link from 'next/link'

/**
 * Header Component
 * 
 * Main application header with logo and navigation
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-primary bg-bg-primary/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="size-10 bg-primary-base rounded-lg flex items-center justify-center shadow-lg shadow-primary-base/20">
            <span className="material-symbols-outlined text-white text-2xl">rocket_launch</span>
          </div>
          <div>
            <h2 className="text-text-primary text-lg font-bold leading-tight">BrainBlitz</h2>
            <p className="text-primary-base text-xs font-medium uppercase tracking-widest">LearnWeb LMS</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-text-secondary hover:text-primary-base transition-colors"
          >
            Dashboard
          </Link>
          <button className="inline-flex items-center justify-center rounded-xl bg-primary-base text-white font-medium hover:bg-primary-hover transition-colors h-10 px-4 py-2">
            Get Started
          </button>
        </nav>
      </div>
    </header>
  )
}
