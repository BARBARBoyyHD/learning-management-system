'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { logout } from '@/actions/auth/logout'
import { useTransition, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

interface NavItem {
  name: string
  href: string
  icon: string
}

const navigation: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
  },
  {
    name: 'My Quizzes',
    href: '/teacher/quizzes/new',
    icon: 'quiz',
  },
  {
    name: 'Reports',
    href: '/dashboard/reports',
    icon: 'analytics',
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: 'settings',
  },
]

/**
 * Dashboard Navigation Component
 */
function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="flex-1 px-4 py-4 space-y-2">
      {navigation.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium',
              isActive
                ? 'bg-primary-base text-white'
                : 'text-text-secondary hover:bg-bg-tertiary hover:text-primary-base'
            )}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}

/**
 * Dashboard Sidebar Content (reusable)
 */
function DashboardSidebarContent({
  user,
  isLoading,
  isPending,
  onLogout,
}: {
  user: SupabaseUser | null
  isLoading: boolean
  isPending: boolean
  onLogout: () => void
}) {
  // Get user display name and email
  const displayName = user?.user_metadata?.name || user?.email || 'Teacher'
  const displayEmail = user?.email || ''
  const userInitial = displayName.charAt(0).toUpperCase()

  return (
    <>
      {/* Logo/Brand */}
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
      <DashboardNav />

      {/* User Section */}
      <div className="p-4 border-t border-border-primary">
        <div className="flex items-center gap-3 p-2">
          <div className="size-10 rounded-full bg-primary-lighter flex items-center justify-center">
            {isLoading ? (
              <span className="material-symbols-outlined text-primary-base">account_circle</span>
            ) : (
              <span className="text-sm font-medium text-primary-base">{userInitial}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate text-text-primary">
              {isLoading ? 'Loading...' : displayName}
            </p>
            <p className="text-xs text-text-tertiary truncate">
              {isLoading ? '' : displayEmail}
            </p>
          </div>
        </div>

        <button
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-bg-tertiary hover:text-text-primary disabled:opacity-50"
          onClick={onLogout}
          disabled={isPending}
        >
          {isPending ? (
            <span className="material-symbols-outlined h-4 w-4 animate-spin">progress_activity</span>
          ) : (
            <span className="material-symbols-outlined h-4 w-4">logout</span>
          )}
          {isPending ? 'Signing out...' : 'Sign out'}
        </button>
      </div>
    </>
  )
}

/**
 * Dashboard Sidebar Component
 *
 * Desktop: Fixed sidebar
 * Mobile: Hamburger menu with Sheet drawer
 */
export function DashboardSidebar() {
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch current user from Supabase Auth
    const fetchUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setIsLoading(false)
    }

    fetchUser()
  }, [])

  const handleLogout = () => {
    startTransition(async () => {
      await logout()
    })
  }

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
            <Button variant="ghost" size="icon" className="md:hidden text-text-primary hover:bg-bg-tertiary">
              <span className="material-symbols-outlined">menu</span>
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0 bg-bg-primary border-border-primary">
            <SheetHeader className="sr-only">
              <SheetTitle>LearnWeb LMS Navigation</SheetTitle>
            </SheetHeader>
            <DashboardSidebarContent
              user={user}
              isLoading={isLoading}
              isPending={isPending}
              onLogout={handleLogout}
            />
          </SheetContent>
        </Sheet>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 w-72 h-screen flex-shrink-0 border-r border-border-primary bg-bg-primary flex flex-col z-40">
        <DashboardSidebarContent
          user={user}
          isLoading={isLoading}
          isPending={isPending}
          onLogout={handleLogout}
        />
      </aside>
    </>
  )
}
