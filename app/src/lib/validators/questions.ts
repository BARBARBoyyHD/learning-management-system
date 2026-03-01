/**
 * Question Validation Schemas
 *
 * Zod schemas for validating question creation and updates.
 * Supports Multiple Choice and other question types.
 */

import { z } from 'zod'

/**
 * Question type enum
 */
export const questionTypeEnum = z.enum([
  'multiple_choice',
  'essay',
  'fill_blank',
  'match',
  'reorder',
])

/**
 * Multiple Choice option schema
 */
export const optionSchema = z.object({
  id: z.string().uuid().optional(),
  text: z.string().min(1, 'Option text cannot be empty').max(500, 'Option text too long'),
  isCorrect: z.boolean().default(false),
  sortOrder: z.number().int().min(0),
})

/**
 * Multiple Choice settings schema
 */
export const multipleChoiceSettingsSchema = z.object({
  shuffle: z.boolean().default(false),
  multipleAnswers: z.boolean().default(false),
  optionCount: z.number().int().min(2).max(10).optional(),
})

/**
 * Multiple Choice question schema
 */
export const multipleChoiceSchema = z.object({
  questionType: z.literal('multiple_choice'),
  questionText: z.string().min(1, 'Question text is required').max(2000, 'Question text too long'),
  points: z.number().int().min(1).default(10),
  options: z
    .array(optionSchema)
    .min(2, 'At least 2 options required')
    .max(10, 'Maximum 10 options allowed')
    .refine(
      (options) => options.some((opt) => opt.isCorrect),
      'At least one correct answer required'
    ),
  settings: multipleChoiceSettingsSchema,
})

/**
 * Generic question create schema (union of all question types)
 */
export const questionCreateSchema = z.discriminatedUnion('questionType', [
  multipleChoiceSchema,
  // Add other question types later
])

/**
 * Question update schema (partial of create schema)
 */
export const questionUpdateSchema = z.object({
  questionText: multipleChoiceSchema.shape.questionText.optional(),
  points: multipleChoiceSchema.shape.points.optional(),
  options: multipleChoiceSchema.shape.options.optional(),
  settings: multipleChoiceSchema.shape.settings.optional(),
})

/**
 * Type inferences
 */
export type QuestionType = z.infer<typeof questionTypeEnum>
export type Option = z.infer<typeof optionSchema>
export type MultipleChoiceSettings = z.infer<typeof multipleChoiceSettingsSchema>
export type MultipleChoiceQuestion = z.infer<typeof multipleChoiceSchema>
export type QuestionCreateInput = z.infer<typeof questionCreateSchema>
export type QuestionUpdateInput = z.infer<typeof questionUpdateSchema>
