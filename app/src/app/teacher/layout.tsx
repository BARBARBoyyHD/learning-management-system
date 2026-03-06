/**
 * Teacher Layout
 *
 * Main layout for all teacher-facing quiz management pages.
 * Full-width centered layout without sidebar for focused editing.
 */

'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

/**
 * Teacher Layout Content with Query Client
 */
function TeacherLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Main Content - Centered */}
      <main className="">
        {children}
      </main>
    </div>
  )
}

/**
 * Create a new QueryClient for each session
 */
function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
      },
    },
  })
}

/**
 * Teacher Layout with QueryClientProvider
 */
export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState(() => createQueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <TeacherLayoutContent>{children}</TeacherLayoutContent>
    </QueryClientProvider>
  )
}
