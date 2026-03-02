/**
 * Assessment Settings Helper Utilities
 *
 * Provides utilities for managing assessment/quiz settings stored as JSON.
 * Includes default settings, validation, merging, and utility functions.
 *
 * @example
 * ```typescript
 * import {
 *   defaultSettings,
 *   validateSettings,
 *   mergeSettings,
 *   getTimeLimit,
 *   isShuffleEnabled
 * } from '@/lib/assessment-settings'
 *
 * // Get settings with defaults
 * const settings = mergeSettings(userSettings)
 *
 * // Check if time limit is set
 * const hasTimeLimit = getTimeLimit(settings) !== null
 * ```
 */

import { z } from 'zod'

/**
 * Assessment settings schema
 *
 * Validates the structure of assessment settings stored as JSON.
 */
export const assessmentSettingsSchema = z.object({
  /** Time limit in minutes (null = unlimited) */
  timeLimit: z.number().min(1).max(180).nullish(),
  /** Shuffle question order */
  shuffleQuestions: z.boolean().default(false),
  /** Maximum attempts (null = unlimited) */
  maxAttempts: z.number().min(1).nullish(),
  /** Show correct answers after submission */
  showCorrectAnswers: z.boolean().default(true),
  /** Passing score percentage */
  passingScore: z.number().min(0).max(100).default(70),
  /** Allow students to see results after submission */
  allowReview: z.boolean().default(true),
  /** Randomize option order for multiple choice */
  shuffleOptions: z.boolean().default(false),
})

/**
 * Default assessment settings
 *
 * These values are used when settings are not specified.
 */
export const defaultSettings = {
  timeLimit: null,
  shuffleQuestions: false,
  maxAttempts: null,
  showCorrectAnswers: true,
  passingScore: 70,
  allowReview: true,
  shuffleOptions: false,
} as const

/**
 * Type inference for AssessmentSettings
 */
export type AssessmentSettings = z.infer<typeof assessmentSettingsSchema>

/**
 * Partial settings for updates (all fields optional)
 */
export type AssessmentSettingsUpdate = Partial<AssessmentSettings>

/**
 * Validate settings object
 *
 * Validates that settings conform to the expected schema.
 * Returns the validated settings or throws a ZodError.
 *
 * @param settings - Settings object to validate
 * @returns Validated settings object
 * @throws z.ZodError if validation fails
 *
 * @example
 * ```typescript
 * try {
 *   const valid = validateSettings({ timeLimit: 30, shuffleQuestions: true })
 *   // valid.timeLimit is number, valid.shuffleQuestions is boolean
 * } catch (error) {
 *   // Handle validation error
 * }
 * ```
 */
export function validateSettings(settings: unknown): AssessmentSettings {
  return assessmentSettingsSchema.parse(settings)
}

/**
 * Safely validate settings with fallback to defaults
 *
 * Returns validated settings or defaults if validation fails.
 * Does not throw errors.
 *
 * @param settings - Settings object to validate
 * @returns Validated settings or defaults
 */
export function safeValidateSettings(
  settings: unknown
): AssessmentSettings {
  const result = assessmentSettingsSchema.safeParse(settings)
  return result.success ? result.data : defaultSettings
}

/**
 * Merge user settings with defaults
 *
 * Combines user-provided settings with default values.
 * User settings override defaults.
 *
 * @param userSettings - User-provided settings (partial or full)
 * @returns Merged settings object
 *
 * @example
 * ```typescript
 * const settings = mergeSettings({ timeLimit: 60 })
 * // Result: { timeLimit: 60, shuffleQuestions: false, maxAttempts: null, ... }
 * ```
 */
export function mergeSettings(
  userSettings?: AssessmentSettingsUpdate | null
): AssessmentSettings {
  if (!userSettings) {
    return { ...defaultSettings }
  }

  return {
    ...defaultSettings,
    ...userSettings,
  }
}

/**
 * Get time limit in minutes
 *
 * Returns the time limit or null if unlimited.
 *
 * @param settings - Settings object
 * @returns Time limit in minutes or null
 *
 * @example
 * ```typescript
 * const timeLimit = getTimeLimit(settings)
 * if (timeLimit) {
 *   console.log(`Quiz duration: ${timeLimit} minutes`)
 * } else {
 *   console.log('No time limit')
 * }
 * ```
 */
export function getTimeLimit(settings: AssessmentSettings): number | null {
  return settings.timeLimit ?? null
}

/**
 * Check if shuffle questions is enabled
 *
 * @param settings - Settings object
 * @returns true if shuffling is enabled
 */
export function isShuffleEnabled(settings: AssessmentSettings): boolean {
  return settings.shuffleQuestions
}

/**
 * Get maximum attempts
 *
 * @param settings - Settings object
 * @returns Maximum attempts or null for unlimited
 */
export function getMaxAttempts(settings: AssessmentSettings): number | null {
  return settings.maxAttempts ?? null
}

/**
 * Check if time limit is set
 *
 * @param settings - Settings object
 * @returns true if time limit is configured
 */
export function hasTimeLimit(settings: AssessmentSettings): boolean {
  return settings.timeLimit !== null && settings.timeLimit !== undefined
}

/**
 * Check if max attempts is limited
 *
 * @param settings - Settings object
 * @returns true if max attempts is configured
 */
export function hasMaxAttempts(settings: AssessmentSettings): boolean {
  return settings.maxAttempts !== null && settings.maxAttempts !== undefined
}

/**
 * Format time limit for display
 *
 * @param settings - Settings object
 * @returns Formatted time string (e.g., "30 minutes" or "No limit")
 */
export function formatTimeLimit(settings: AssessmentSettings): string {
  const timeLimit = getTimeLimit(settings)
  if (timeLimit === null) {
    return 'No time limit'
  }
  return timeLimit === 1 ? '1 minute' : `${timeLimit} minutes`
}

/**
 * Format max attempts for display
 *
 * @param settings - Settings object
 * @returns Formatted attempts string (e.g., "3 attempts" or "Unlimited")
 */
export function formatMaxAttempts(settings: AssessmentSettings): string {
  const maxAttempts = getMaxAttempts(settings)
  if (maxAttempts === null) {
    return 'Unlimited attempts'
  }
  return maxAttempts === 1 ? '1 attempt' : `${maxAttempts} attempts`
}

/**
 * Convert settings to JSON string
 *
 * @param settings - Settings object
 * @returns JSON string
 */
export function settingsToJson(settings: AssessmentSettings): string {
  return JSON.stringify(settings)
}

/**
 * Parse settings from JSON string
 *
 * @param jsonString - JSON string
 * @returns Parsed settings or defaults if invalid
 */
export function settingsFromJson(jsonString: string): AssessmentSettings {
  try {
    const parsed = JSON.parse(jsonString)
    return safeValidateSettings(parsed)
  } catch {
    return { ...defaultSettings }
  }
}
