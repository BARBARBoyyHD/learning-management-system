import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for conflict resolution
 * 
 * @example
 * cn('px-2 py-1', 'bg-red-500', { 'text-white': true })
 * // => 'px-2 py-1 bg-red-500 text-white'
 * 
 * cn('p-4', 'p-2') // tailwind-merge resolves to 'p-2'
 * // => 'p-2'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
