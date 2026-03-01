/**
 * Assessment/Quiz Validation Schemas
 *
 * Zod schemas for validating assessment creation and updates.
 * Used for both client-side and server-side validation.
 */

import { z } from 'zod'

/**
 * Assessment creation schema
 * - Title is required, max 200 characters
 * - Description is optional, max 2000 characters
 * - Settings are optional with defaults
 */
export const assessmentCreateSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters'),
  description: z
    .string()
    .max(2000, 'Description must be less than 2000 characters')
    .optional()
    .nullable(),
  // Settings for quiz configuration
  timeLimit: z
    .number()
    .min(1, 'Time limit must be at least 1 minute')
    .max(180, 'Time limit must be at most 180 minutes')
    .optional()
    .nullable(),
  shuffleQuestions: z.boolean().default(false),
  maxAttempts: z
    .number()
    .min(1, 'Max attempts must be at least 1')
    .optional()
    .nullable(),
})

/**
 * Assessment update schema (partial of create schema)
 */
export const assessmentUpdateSchema = assessmentCreateSchema.partial()

/**
 * Settings schema for type safety
 */
export const assessmentSettingsSchema = z.object({
  timeLimit: z.number().optional().nullable(),
  shuffleQuestions: z.boolean().default(false),
  maxAttempts: z.number().optional().nullable(),
  showCorrectAnswers: z.boolean().default(true),
  passingScore: z.number().min(0).max(100).default(70),
})

/**
 * Type inferences for TypeScript
 */
export type AssessmentCreateInput = z.infer<typeof assessmentCreateSchema>
export type AssessmentUpdateInput = z.infer<typeof assessmentUpdateSchema>
export type AssessmentSettings = z.infer<typeof assessmentSettingsSchema>
