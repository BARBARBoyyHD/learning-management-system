/**
 * Authentication Validation Schemas
 *
 * Zod schemas for validating authentication-related forms and inputs.
 * Used for both client-side and server-side validation.
 */

import { z } from 'zod'

/**
 * Login form validation schema
 * - Email must be valid format
 * - Password must be at least 8 characters
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
})

/**
 * Registration form validation schema
 * - Email must be valid format
 * - Password must be at least 8 characters
 * - Name must be at least 2 characters
 */
export const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
})

/**
 * Type inferences for TypeScript
 */
export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
