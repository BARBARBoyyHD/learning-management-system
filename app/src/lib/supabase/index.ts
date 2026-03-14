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
 * import { createSupabaseMiddlewareClient } from '@/lib/supabase'
 * ```
 */

export { createBrowserClient } from './client'
export { createServerClient } from './server'
export { createSupabaseMiddlewareClient } from './middleware'

// Re-export Supabase types for convenience
export type { User, Session, AuthError } from '@supabase/supabase-js'
