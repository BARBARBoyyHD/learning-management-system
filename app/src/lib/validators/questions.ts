/**
 * Question Validation Schemas
 *
 * Zod schemas for validating question creation and updates.
 * Supports Multiple Choice, Essay, and other question types.
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
 * Essay settings schema
 */
export const essaySettingsSchema = z.object({
  requiresManualGrading: z.boolean().default(true),
  rubric: z.string().max(2000, 'Rubric too long').optional().nullable(),
  wordLimit: z.number().int().min(0).max(5000).default(0),
  wordLimitMin: z.number().int().min(0).default(0),
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
 * Essay question schema
 */
export const essayQuestionSchema = z.object({
  questionType: z.literal('essay'),
  questionText: z.string().min(1, 'Question text is required').max(2000, 'Question text too long'),
  points: z.number().int().min(1).default(10),
  settings: essaySettingsSchema,
})

/**
 * Generic question create schema (union of all question types)
 */
export const questionCreateSchema = z.discriminatedUnion('questionType', [
  multipleChoiceSchema,
  essayQuestionSchema,
  // Add other question types later
])

/**
 * Question update schema (partial of create schema)
 */
export const questionUpdateSchema = z.object({
  questionText: z.string().min(1).max(2000).optional(),
  points: z.number().int().min(1).optional(),
  settings: z.any().optional(),
})

/**
 * Type inferences
 */
export type QuestionType = z.infer<typeof questionTypeEnum>
export type Option = z.infer<typeof optionSchema>
export type MultipleChoiceSettings = z.infer<typeof multipleChoiceSettingsSchema>
export type EssaySettings = z.infer<typeof essaySettingsSchema>
export type MultipleChoiceQuestion = z.infer<typeof multipleChoiceSchema>
export type EssayQuestion = z.infer<typeof essayQuestionSchema>
export type QuestionCreateInput = z.infer<typeof questionCreateSchema>
export type QuestionUpdateInput = z.infer<typeof questionUpdateSchema>
