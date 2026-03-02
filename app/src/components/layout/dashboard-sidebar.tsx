'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { logout } from '@/actions/auth/logout'
import { useTransition, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'

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
    href: '/teacher/quizzes',
    icon: 'library_books',
  },
  {
    name: 'Create Quiz',
    href: '/teacher/quizzes/new',
    icon: 'add_circle_outline',
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: 'settings',
  },
]

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
      // Note: redirect will naturally clear client state
    })
  }

  // Get user display name and email
  const displayName = user?.user_metadata?.name || user?.email || 'Teacher'
  const displayEmail = user?.email || ''
  const userInitial = displayName.charAt(0).toUpperCase()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-neutral-900 border-r border-neutral-800">
      {/* Logo/Brand */}
      <div className="flex h-16 items-center border-b border-neutral-800 px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-base">
            <span className="text-white font-bold text-sm">Q</span>
          </div>
          <span className="text-lg font-bold text-white">Quizizz</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-primary-base/10 text-primary-base'
                  : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
              )}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined h-5 w-5">{item.icon}</span>
                {item.name}
              </div>
              {isActive && (
                <span className="material-symbols-outlined h-4 w-4 text-primary-base">chevron_right</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-800">
        <div className="flex items-center gap-3 rounded-lg bg-neutral-800/50 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-base/20">
            {isLoading ? (
              <span className="material-symbols-outlined text-primary-base">person</span>
            ) : (
              <span className="text-sm font-medium text-primary-base">{userInitial}</span>
            )}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-white">
              {isLoading ? 'Loading...' : displayName}
            </p>
            <p className="truncate text-xs text-neutral-500">
              {isLoading ? '' : displayEmail}
            </p>
          </div>
        </div>

        <button
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white disabled:opacity-50"
          onClick={handleLogout}
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
    </aside>
  )
}
