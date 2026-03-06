/**
 * Essay Fields Component
 *
 * Component for editing Essay question-specific fields.
 * Includes rubric and word limit configuration.
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { EssaySettings } from '@/lib/validators/questions'

/**
 * EssayFields props
 */
export interface EssayFieldsProps {
  /** Essay settings */
  settings: EssaySettings
  /** Update settings callback */
  onSettingsChange: (settings: EssaySettings) => void
  /** Error message */
  error?: string | null
}

/**
 * EssayFields component
 */
export function EssayFields({ settings, onSettingsChange, error }: EssayFieldsProps) {
  return (
    <Card className="border-border-primary bg-bg-secondary">
      <CardHeader>
        <CardTitle className="text-text-primary">Essay Settings</CardTitle>
        <CardDescription className="text-text-secondary">
          Configure grading rubric and word limits for your essay question
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Grading Rubric */}
        <div className="space-y-2">
          <Label htmlFor="rubric" className="text-text-secondary">
            Grading Rubric (Optional)
          </Label>
          <textarea
            id="rubric"
            rows={4}
            className="flex w-full rounded-md border border-border-primary bg-bg-primary px-3 py-2 text-sm text-text-primary focus:border-primary-base focus:outline-none focus:ring-2 focus:ring-primary-base"
            placeholder="Describe what you're looking for in a good answer. E.g., 'Students should mention: 1) Key concept A, 2) Example B, 3) Analysis C...'"
            value={settings.rubric ?? ''}
            onChange={(e) => onSettingsChange({ ...settings, rubric: e.target.value })}
          />
          <p className="text-xs text-text-tertiary">
            Guidelines for grading this essay (optional)
          </p>
        </div>

        {/* Word Limit */}
        <div className="space-y-2">
          <Label htmlFor="wordLimit" className="text-text-secondary">
            Word Limit
          </Label>
          <Input
            id="wordLimit"
            type="number"
            min="0"
            max="5000"
            value={settings.wordLimit}
            onChange={(e) => onSettingsChange({ ...settings, wordLimit: Number(e.target.value) })}
            className="w-32 border-border-primary bg-bg-primary text-text-primary"
          />
          <p className="text-xs text-text-tertiary">
            Maximum words allowed (0 = unlimited, max 5000)
          </p>
          {error && (
            <p className="text-sm text-error-base" role="alert">
              {error}
            </p>
          )}
        </div>

        {/* Minimum Word Count */}
        <div className="space-y-2">
          <Label htmlFor="wordLimitMin" className="text-text-secondary">
            Minimum Word Count (Optional)
          </Label>
          <Input
            id="wordLimitMin"
            type="number"
            min="0"
            value={settings.wordLimitMin ?? 0}
            onChange={(e) => onSettingsChange({ ...settings, wordLimitMin: Number(e.target.value) })}
            className="w-32 border-border-primary bg-bg-primary text-text-primary"
          />
          <p className="text-xs text-text-tertiary">
            Minimum words required (optional)
          </p>
        </div>

        {/* Manual Grading Info */}
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
              <span className="text-sm font-bold">!</span>
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">Manual Grading Required</p>
              <p className="mt-1 text-sm text-text-secondary">
                Essay questions require manual grading by the teacher. Students will be notified that this question needs manual review.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
