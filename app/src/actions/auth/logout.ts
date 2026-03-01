'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

/**
 * Teacher logout Server Action
 * 
 * Signs out the current user and redirects to login page.
 * Properly invalidates Supabase Auth session and clears cookies.
 */
export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
