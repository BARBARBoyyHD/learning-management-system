/**
 * Supabase Client Module
 *
 * Re-exports all Supabase client utilities for easy importing
 *
 * @example
 * ```typescript
 * // Server Component or Server Action
 * import { createServerClient } from '@/lib/supabase'
 *
 * // Client Component
 * import { createBrowserClient } from '@/lib/supabase'
 *
 * // Middleware
 * import { createMiddlewareClient } from '@/lib/supabase'
 * ```
 */

export { createClient as createBrowserClient } from './client'
export { createClient as createServerClient } from './server'
export { createSupabaseMiddlewareClient as createMiddlewareClient } from './middleware'

// Re-export Supabase types for convenience
export type { User, Session, AuthError } from '@supabase/supabase-js'
