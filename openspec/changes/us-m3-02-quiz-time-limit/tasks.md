## 1. Database Schema Update

- [ ] 1.1 Add `timeLimit` field to Assessment model in Prisma schema
- [ ] 1.2 Set field type as Int?, nullable (null = unlimited)
- [ ] 1.3 Add min/max validation documentation (1-180 minutes)
- [ ] 1.4 Run `npm run db:generate` to update Prisma types
- [ ] 1.5 Run `npm run db:migrate` to apply schema changes
- [ ] 1.6 Verify migration in database
- [ ] 1.7 Update TypeScript types if needed

## 2. Assessment Editor Time Limit Input

- [ ] 2.1 Create `src/components/assessments/time-limit-input.tsx`
- [ ] 2.2 Add number input field for time in minutes
- [ ] 2.3 Add validation: min 1, max 180
- [ ] 2.4 Add "No time limit" option (checkbox or empty value)
- [ ] 2.5 Integrate with existing assessment form
- [ ] 2.6 Add helper text: "Enter time in minutes (leave empty for unlimited)"
- [ ] 2.7 Add error display for invalid values
- [ ] 2.8 Apply design system tokens (Theme A - Light for editor)
- [ ] 2.9 Test input validation

## 3. Quiz Timer Hook

- [ ] 3.1 Create `src/hooks/use-quiz-timer.ts`
- [ ] 3.2 Implement countdown logic with setInterval
- [ ] 3.3 Calculate remaining time from server timestamp
- [ ] 3.4 Handle page refresh (recalculate from start time)
- [ ] 3.5 Return remaining time in milliseconds
- [ ] 3.6 Return formatted time (MM:SS)
- [ ] 3.7 Return time expired flag
- [ ] 3.8 Add cleanup on unmount
- [ ] 3.9 Test timer accuracy

## 4. Countdown Timer Display Component

- [ ] 4.1 Create `src/components/quiz/countdown-timer.tsx`
- [ ] 4.2 Display time in MM:SS format
- [ ] 4.3 Add color coding: normal (white), 5min (yellow), 1min (orange), 30sec (red)
- [ ] 4.4 Add flashing animation for final 30 seconds
- [ ] 4.5 Position as sticky header or fixed overlay
- [ ] 4.6 Hide when no time limit
- [ ] 4.7 Apply design system tokens
- [ ] 4.8 Ensure visibility on mobile
- [ ] 4.9 Test component rendering

## 5. Time Warning Alerts

- [ ] 5.1 Create `src/components/quiz/time-warning.tsx`
- [ ] 5.2 Display warning at 5 minutes remaining
- [ ] 5.3 Display urgent warning at 1 minute remaining
- [ ] 5.4 Display critical warning at 30 seconds remaining
- [ ] 5.5 Use semantic colors from design system
- [ ] 5.6 Add toast/notification style
- [ ] 5.7 Auto-dismiss after time expires
- [ ] 5.8 Test warning thresholds

## 6. Auto-Submit Logic

- [ ] 6.1 Create `src/hooks/use-quiz-auto-submit.ts`
- [ ] 6.2 Detect when timer reaches zero
- [ ] 6.3 Trigger quiz submission automatically
- [ ] 6.4 Save all current answers before submit
- [ ] 6.5 Handle submission in progress (prevent duplicate)
- [ ] 6.6 Show "Time expired - submitting..." message
- [ ] 6.7 Handle submission errors gracefully
- [ ] 6.8 Lock quiz after auto-submit
- [ ] 6.9 Test auto-submit flow

## 7. Server-Side Time Validation

- [ ] 7.1 Create `src/services/quiz-time.service.ts`
- [ ] 7.2 Record quiz start time when student begins
- [ ] 7.3 Calculate elapsed time on submission
- [ ] 7.4 Validate submission against time limit
- [ ] 7.5 Reject answers submitted after time expiry
- [ ] 7.6 Return time spent in response
- [ ] 7.7 Handle unlimited time quizzes (no validation)
- [ ] 7.8 Add server-side time limit constants
- [ ] 7.9 Test validation logic

## 8. Quiz Attempt Schema Updates

- [ ] 8.1 Add `startTime` field to student_responses table
- [ ] 8.2 Add `submissionTime` field to student_responses table
- [ ] 8.3 Add `timeSpent` field (calculated, in seconds)
- [ ] 8.4 Add `expiryReason` field ('time_expired' | 'manual' | null)
- [ ] 8.5 Update Prisma schema
- [ ] 8.6 Run migration
- [ ] 8.7 Update TypeScript types
- [ ] 8.8 Test data persistence

## 9. Quiz Taking UI Integration

- [ ] 9.1 Integrate timer component into quiz taking page
- [ ] 9.2 Add timer to quiz header (always visible)
- [ ] 9.3 Pass start time and time limit to timer hook
- [ ] 9.4 Handle time expiry state
- [ ] 9.5 Disable questions after time expiry
- [ ] 9.6 Show expiry notification
- [ ] 9.7 Test UI integration

## 10. Auto-Save Answers

- [ ] 10.1 Implement auto-save on every answer change
- [ ] 10.2 Add background save with debounce (30s)
- [ ] 10.3 Handle save errors (retry logic)
- [ ] 10.4 Show save status indicator
- [ ] 10.5 Ensure answers saved before auto-submit
- [ ] 10.6 Test auto-save reliability

## 11. Page Refresh Handling

- [ ] 11.1 Persist quiz state to database
- [ ] 11.2 Restore quiz state on page load
- [ ] 11.3 Resume timer from correct time
- [ ] 11.4 Restore answered questions
- [ ] 11.5 Test refresh scenario

## 12. Time Limit Helper Utilities

- [ ] 12.1 Create `src/lib/quiz-time.ts` utilities
- [ ] 12.2 Add `formatTime(ms: number): string` function
- [ ] 12.3 Add `calculateRemaining(start: Date, limit: number): number` function
- [ ] 12.4 Add `isValidTimeLimit(minutes: number): boolean` function
- [ ] 12.5 Add `getTimeWarnings(remaining: number): TimeWarning[]` function
- [ ] 12.6 Export utilities
- [ ] 12.7 Test utility functions

## 13. Testing

- [ ] 13.1 Write unit test: time limit validation
- [ ] 13.2 Write unit test: timer format function
- [ ] 13.3 Write unit test: remaining time calculation
- [ ] 13.4 Write integration test: timer counts down correctly
- [ ] 13.5 Write integration test: auto-submit at zero
- [ ] 13.6 Write integration test: server-side time validation
- [ ] 13.7 Write E2E test: teacher sets time limit
- [ ] 13.8 Write E2E test: student sees timer
- [ ] 13.9 Write E2E test: auto-submit on expiry
- [ ] 13.10 Test page refresh persistence
- [ ] 13.11 Test warning thresholds
- [ ] 13.12 Test unlimited time quiz (no timer)

## 14. Design System Integration

- [ ] 14.1 Apply Theme A (Light) to assessment editor
- [ ] 14.2 Apply Theme B (Dark) to quiz taking UI
- [ ] 14.3 Use semantic colors for warnings
- [ ] 14.4 Use Lexend font for timer display
- [ ] 14.5 Apply border radius 12px to timer container
- [ ] 14.6 Ensure WCAG 2.1 AA contrast ratios
- [ ] 14.7 Test on light and dark modes

## 15. Documentation

- [ ] 15.1 Add time limit feature to README.md
- [ ] 15.2 Document database schema changes
- [ ] 15.3 Document timer component props
- [ ] 15.4 Document server-side validation
- [ ] 15.5 Add usage examples
- [ ] 15.6 Update BRD traceability matrix (FR-M3-02)

## 16. Security Review

- [ ] 16.1 Verify server-side time validation
- [ ] 16.2 Test client-side timer manipulation
- [ ] 16.3 Verify timestamp storage in UTC
- [ ] 16.4 Test time zone handling
- [ ] 16.5 Verify anti-cheating measures
- [ ] 16.6 Log suspicious activity

## 17. Performance Optimization

- [ ] 17.1 Optimize timer interval (1000ms)
- [ ] 17.2 Minimize re-renders in timer component
- [ ] 17.3 Use requestAnimationFrame for smooth countdown
- [ ] 17.4 Debounce auto-save (30s)
- [ ] 17.5 Test timer accuracy over long periods
- [ ] 17.6 Monitor memory usage

## 18. Accessibility Review

- [ ] 18.1 Add ARIA labels to timer display
- [ ] 18.2 Add screen reader announcements for warnings
- [ ] 18.3 Ensure color is not only indicator (add icons)
- [ ] 18.4 Test with screen readers
- [ ] 18.5 Add keyboard navigation for time limit input
- [ ] 18.6 Verify focus states

## 19. Deployment Checklist

- [ ] 19.1 Run database migration on production
- [ ] 19.2 Verify schema changes applied
- [ ] 19.3 Test time limit feature on staging
- [ ] 19.4 Test auto-submit on staging
- [ ] 19.5 Monitor server logs for time validation errors
- [ ] 19.6 Set up alerts for auto-submit failures
- [ ] 19.7 Document rollback procedure

---

## Implementation Notes

**BRD Reference:**
- FR-M3-02: Quiz Time Limit
- US-M3-02: As a Teacher, I want to set time limit for quiz so that students have time constraints

**Acceptance Criteria:**
- Given I am creating an assessment
- When I set time_limit = 30 minutes
- Then countdown timer displays when students take quiz

**Estimated Effort:** 1-2 sprints (3-5 days)

**Dependencies:**
- Assessment module (M3) - for editor integration
- Quiz taking module - for timer integration
- Database access via Prisma

**Success Criteria:**
- ✅ Teacher can set optional time limit (1-180 minutes)
- ✅ Student sees countdown timer in MM:SS format
- ✅ Timer persists across page refreshes
- ✅ Auto-submit triggers at time expiry
- ✅ Warnings display at 5min, 1min, 30sec
- ✅ Server validates submission time
- ✅ All tests pass (unit, integration, E2E)

**Database Schema:**
```prisma
model Assessment {
  // ... existing fields
  timeLimit Int? // Time limit in minutes, null = unlimited
}

model StudentResponse {
  // ... existing fields
  startTime DateTime
  submissionTime DateTime?
  timeSpent Int? // in seconds
  expiryReason String? // 'time_expired' | 'manual'
}
```

**Design System Reference:**
- Timer colors: Use semantic colors (warning, error)
- Font: Lexend for timer display
- Border radius: 12px default
- Reference: `/docs/project/05-color-guideline.md`
