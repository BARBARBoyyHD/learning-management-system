/**
 * Supabase Client Module
 *
 * Re-exports all Supabase client utilities for easy importing
 *
 * @example
 * ```typescript
 * // Server Component or Server Action
 * import { getSupabaseServerClient } from '@/lib/supabase'
 *
 * // Client Component
 * import { getSupabaseBrowserClient } from '@/lib/supabase'
 *
 * // Middleware
 * import { getSupabaseMiddlewareClient } from '@/lib/supabase'
 * ```
 */

export { getSupabaseBrowserClient } from './client'
export { getSupabaseServerClient } from './server'
export { getSupabaseMiddlewareClient } from './middleware'

// Re-export Supabase types for convenience
export type { User, Session, AuthError } from '@supabase/supabase-js'
