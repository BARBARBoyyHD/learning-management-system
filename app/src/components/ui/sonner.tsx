/**
 * Sonner Toast Component
 *
 * Toast notification component using sonner.
 * Add this to your root layout to enable toast notifications.
 *
 * @example
 * ```tsx
 * // In root layout
 * import { Toaster } from '@/components/ui/sonner'
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         {children}
 *         <Toaster />
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 */

'use client'

import { Toaster as Sonner } from 'sonner'

/**
 * Toaster component
 *
 * Global toast notification provider.
 * Place once in your root layout.
 */
export function Toaster() {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white group-[.toaster]:text-neutral-950 group-[.toaster]:border-neutral-200 group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-neutral-500',
          actionButton:
            'group-[.toast]:bg-primary-base group-[.toast]:text-white group-[.toast]:font-medium',
          cancelButton:
            'group-[.toast]:bg-neutral-100 group-[.toast]:text-neutral-500 group-[.toast]:font-medium',
          success:
            'group-[.toast]:border-success/20 group-[.toast]:bg-success/10 group-[.toast]:text-success-base',
          error:
            'group-[.toast]:border-error/20 group-[.toast]:bg-error/10 group-[.toast]:text-error-base',
          warning:
            'group-[.toast]:border-warning/20 group-[.toast]:bg-warning/10 group-[.toast]:text-warning-base',
          info:
            'group-[.toast]:border-info/20 group-[.toast]:bg-info/10 group-[.toast]:text-info-base',
        },
      }}
    />
  )
}
