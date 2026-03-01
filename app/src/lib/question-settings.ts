/**
 * Question Settings Utilities
 *
 * Helper functions for managing question settings JSON.
 * Provides defaults, validation, and utility getters.
 */

/**
 * Default settings for Multiple Choice questions
 */
export const defaultSettings = {
  shuffle: false,
  multipleAnswers: false,
  optionCount: 4,
}

/**
 * Question settings type
 */
export interface QuestionSettings {
  shuffle: boolean
  multipleAnswers: boolean
  optionCount?: number
  [key: string]: any // Allow additional settings for other question types
}

/**
 * Validate settings object
 * Ensures all required fields are present and valid
 *
 * @param settings - Settings to validate
 * @returns Validated settings with defaults applied
 */
export function validateSettings(settings: any): QuestionSettings {
  return {
    shuffle: settings?.shuffle ?? defaultSettings.shuffle,
    multipleAnswers: settings?.multipleAnswers ?? defaultSettings.multipleAnswers,
    optionCount: settings?.optionCount ?? defaultSettings.optionCount,
  }
}

/**
 * Merge settings with defaults
 * Useful when loading from database where some fields might be missing
 *
 * @param settings - Settings to merge
 * @returns Merged settings with defaults
 */
export function mergeSettings(settings: any): QuestionSettings {
  return {
    ...defaultSettings,
    ...settings,
  }
}

/**
 * Check if shuffle is enabled
 *
 * @param settings - Question settings
 * @returns true if shuffle is enabled
 */
export function isShuffleEnabled(settings: any): boolean {
  return settings?.shuffle ?? false
}

/**
 * Get option count
 *
 * @param settings - Question settings
 * @returns Number of options
 */
export function getOptionCount(settings: any): number {
  return settings?.optionCount ?? defaultSettings.optionCount
}

/**
 * Check if multiple answers are allowed
 *
 * @param settings - Question settings
 * @returns true if multiple answers are allowed
 */
export function allowsMultipleAnswers(settings: any): boolean {
  return settings?.multipleAnswers ?? false
}

/**
 * Create settings for Multiple Choice question
 *
 * @param options - Optional settings to override defaults
 * @returns Question settings object
 */
export function createSettings(options?: Partial<QuestionSettings>): QuestionSettings {
  return {
    ...defaultSettings,
    ...options,
  }
}
