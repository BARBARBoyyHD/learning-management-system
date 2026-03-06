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

  // Get user display name and email
  const displayName = user?.user_metadata?.name || user?.email || 'Teacher'
  const displayEmail = user?.email || ''
  const userInitial = displayName.charAt(0).toUpperCase()

  return (
    <aside className="w-72 flex-shrink-0 border-r border-neutral-800 bg-neutral-900 flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 flex items-center gap-3">
        <div className="bg-primary-base p-2 rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-white">school</span>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">LearnWeb LMS</h1>
          <p className="text-xs text-primary-base/60 font-medium uppercase tracking-wider">Teacher Portal</p>
        </div>
      </div>

      {/* Navigation */}
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
                  : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
              )}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-neutral-800">
        <div className="flex items-center gap-3 p-2">
          <div className="size-10 rounded-full bg-primary-base/20 flex items-center justify-center">
            {isLoading ? (
              <span className="material-symbols-outlined text-primary-base">account_circle</span>
            ) : (
              <span className="text-sm font-medium text-primary-base">{userInitial}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate text-white">
              {isLoading ? 'Loading...' : displayName}
            </p>
            <p className="text-xs text-neutral-500 truncate">
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
