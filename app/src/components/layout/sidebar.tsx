'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

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
    href: '/teacher/quizzes/new',
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
 * Sidebar Navigation Component
 */
function SidebarNav() {
  const pathname = usePathname()

  return (
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
  )
}

/**
 * Sidebar Content (reusable for both desktop and mobile)
 */
function SidebarContent() {
  return (
    <>
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
      <SidebarNav />

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
    </>
  )
}

/**
 * Main Sidebar Component
 *
 * Desktop: Fixed sidebar
 * Mobile: Hamburger menu with Sheet drawer
 */
export function Sidebar() {
  return (
    <>
      {/* Mobile Header with Hamburger */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-bg-primary border-b border-border-primary px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary-base p-2 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-xl">school</span>
          </div>
          <h1 className="text-lg font-bold text-text-primary">LearnWeb LMS</h1>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <span className="material-symbols-outlined">menu</span>
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>LearnWeb LMS Navigation</SheetTitle>
            </SheetHeader>
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </header>


      <aside className="hidden md:fixed w-72 flex-shrink-0 border-r border-border-primary bg-bg-primary flex flex-col">
        <SidebarContent />
      </aside>
    </>
  )
}
