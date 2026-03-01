## Why

This change implements quiz time limit functionality, a core requirement from the Business Requirements Document (BRD Section 6.3 - Assessment & Quiz Management). Teachers need the ability to set time constraints on quizzes to ensure fair assessment conditions and prevent cheating. This feature adds a countdown timer display for students during quiz-taking and enforces automatic submission when time expires.

Currently, assessments have no time limit capability, allowing students unlimited time to complete quizzes. This undermines assessment integrity and doesn't match real-world testing scenarios. By adding time limit support, we enable teachers to create more controlled assessment environments.

## What Changes

- **Database Schema**: Add `time_limit` field to quizzes/assessments table (integer, minutes, nullable)
- **Assessment Editor**: UI component to set time limit (optional, in minutes)
- **Quiz Taking UI**: Countdown timer display showing remaining time
- **Timer Logic**: Client-side timer with server-side validation
- **Auto-Submit**: Automatic quiz submission when time expires
- **Warning Alerts**: Visual warnings at 5 minutes and 1 minute remaining
- **Time Expiry Handling**: Graceful submission with answers saved at time expiry

## Capabilities

### New Capabilities
- `quiz-time-limit`: Time limit configuration for assessments with countdown timer and auto-submission. Includes database schema updates, assessment editor UI, timer component, and auto-submit logic.

### Modified Capabilities
- `assessment-editor`: Enhanced to include time limit configuration field
- `quiz-taking`: Enhanced with countdown timer display and time expiry handling

## Impact

**Affected Systems:**
- **Database**: Assessments table adds `time_limit` column (INTEGER, nullable, minutes)
- **Assessment Editor**: New optional field to set time limit in minutes
- **Quiz UI**: Countdown timer overlay/header showing remaining time
- **Quiz Submission**: Auto-submit triggered when timer reaches zero
- **Validation**: Server-side time validation to prevent cheating

**Dependencies:**
- Requires assessment module (M3) to be implemented
- Requires quiz-taking UI to be functional
- No breaking changes to existing quizzes (time_limit is nullable)

**Future Changes Dependent on This:**
- Quiz attempt review with time spent analysis
- Extended time accommodations for specific students
- Time-based analytics for teachers
- Pause/resume timer functionality (if allowed)

**Compliance:**
- Implements BRD requirement FR-M3-02 (Quiz Time Limit)
- Implements User Story US-M3-02
- Follows ITA Section 3 (Technology Stack) - React for timer, Prisma for database
- Follows design system from `/docs/project/05-color-guideline.md`
