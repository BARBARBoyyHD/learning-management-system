/**
 * useAuth Hook
 *
 * React hook for accessing authentication state and session data.
 * Uses TanStack Query for efficient session fetching and caching.
 *
 * @example
 * ```typescript
 * // In a Client Component
 * 'use client'
 * import { useAuth } from '@/hooks/use-auth'
 *
 * function MyComponent() {
 *   const { user, session, isLoading, isAuthenticated } = useAuth()
 *
 *   if (isLoading) return <Spinner />
 *   if (!isAuthenticated) return <LoginPrompt />
 *
 *   return <div>Welcome, {user?.email}!</div>
 * }
 * ```
 */

'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import type { User, Session } from '@supabase/supabase-js'

/**
 * Auth state returned by useAuth hook
 */
export interface UseAuthReturn {
  /** Current user object (null if not logged in) */
  user: User | null
  /** Current session object (null if not logged in) */
  session: Session | null
  /** Whether auth state is being loaded */
  isLoading: boolean
  /** Whether user is authenticated */
  isAuthenticated: boolean
  /** Error if session fetch failed */
  error: Error | null
  /** Refresh session manually */
  refresh: () => void
  /** Sign out user */
  signOut: () => Promise<void>
}

/**
 * Query key for auth session
 */
export const AUTH_QUERY_KEY = ['auth', 'session'] as const

/**
 * useAuth hook for client-side authentication
 *
 * Provides:
 * - Current user and session state
 * - Loading status
 * - Authentication check
 * - Session refresh
 * - Sign out functionality
 *
 * @returns Auth state and actions
 */
export function useAuth(): UseAuthReturn {
  const supabase = createClient()
  const queryClient = useQueryClient()

  // Query for fetching session
  const {
    data,
    isLoading,
    error,
    refetch: refresh,
  } = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: async () => {
      const { data: { session }, error } = await supabase.auth.getSession()

      if (error) {
        throw error
      }

      return session
    },
    // Don't retry on error - session might just be expired
    retry: false,
    // Stale time: consider session fresh for 5 minutes
    staleTime: 5 * 60 * 1000,
    // Refetch on window focus to catch tab switches
    refetchOnWindowFocus: true,
  })

  // Mutation for signing out
  const signOutMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    },
    onSuccess: () => {
      // Invalidate auth query to update UI
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY })
    },
  })

  const session = data ?? null
  const user = session?.user ?? null

  return {
    user,
    session,
    isLoading,
    isAuthenticated: !!session,
    error,
    refresh,
    signOut: async () => {
      await signOutMutation.mutateAsync()
    },
  }
}

/**
 * Hook to check if user is authenticated
 * Returns redirect flag if not authenticated
 *
 * @returns Auth state with redirect flag
 */
export function useRequireAuth() {
  const { isAuthenticated, isLoading } = useAuth()

  return {
    isAuthenticated,
    isLoading,
    shouldRedirect: !isLoading && !isAuthenticated,
  }
}
