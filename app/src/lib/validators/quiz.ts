/**
 * Quiz Validation Schemas
 *
 * Zod schemas for validating quiz metadata updates.
 * Used for both client-side and server-side validation.
 */

import { z } from 'zod'

/**
 * Quiz metadata update schema
 * - Title is required, min 1, max 200 characters
 * - Description is optional, max 2000 characters
 * - TimeLimit is optional nullable number (minutes)
 * - isPublic is boolean
 * - accessCode is optional 6-character string
 */
export const quizMetadataUpdateSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters'),
  description: z
    .string()
    .max(2000, 'Description must be less than 2000 characters')
    .optional()
    .nullable(),
  timeLimit: z
    .number()
    .min(1, 'Time limit must be at least 1 minute')
    .positive('Time limit must be a positive number')
    .optional()
    .nullable(),
  isPublic: z.boolean(),
  accessCode: z
    .string()
    .length(6, 'Access code must be exactly 6 characters')
    .regex(/^[A-Z0-9]+$/, 'Access code must be alphanumeric uppercase')
    .optional()
    .nullable(),
})

/**
 * Quiz metadata partial update schema (for PATCH operations)
 */
export const quizMetadataPartialUpdateSchema = quizMetadataUpdateSchema.partial()

/**
 * Access code generation schema
 */
export const accessCodeSchema = z
  .string()
  .length(6)
  .regex(/^[A-Z0-9]+$/)

/**
 * Type inferences for TypeScript
 */
export type QuizMetadataUpdateInput = z.infer<typeof quizMetadataUpdateSchema>
export type QuizMetadataPartialUpdateInput = z.infer<typeof quizMetadataPartialUpdateSchema>
