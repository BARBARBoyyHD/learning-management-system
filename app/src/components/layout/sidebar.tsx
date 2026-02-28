'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface SidebarNavItem {
  title: string
  href: string
  icon: string
}

const navItems: SidebarNavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
  },
  {
    title: 'My Quizzes',
    href: '/quizzes',
    icon: 'quiz',
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: 'analytics',
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: 'settings',
  },
]

/**
 * Sidebar Component
 * 
 * Main navigation sidebar with menu items
 */
export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-72 flex-shrink-0 border-r border-border-primary bg-bg-primary flex flex-col">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="bg-primary-base p-2 rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-white">school</span>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-text-primary">LearnWeb LMS</h1>
          <p className="text-xs text-primary-base font-medium uppercase tracking-wider">Teacher Portal</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors',
              pathname === item.href
                ? 'bg-primary-base text-white'
                : 'text-text-secondary hover:bg-bg-tertiary hover:text-primary-base'
            )}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border-primary">
        <div className="flex items-center gap-3 p-2">
          <div className="size-10 rounded-full bg-primary-lighter flex items-center justify-center">
            <span className="material-symbols-outlined text-primary-base">account_circle</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate text-text-primary">Teacher</p>
            <p className="text-xs text-text-tertiary truncate">Premium Educator</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
