## Why

This change implements the student guest access code entry feature, a core requirement from the Business Requirements Document (BRD Section 6.6 - Guest Student Experience, FR-M6-01). This enables students to join quizzes as guest users by simply entering a 6-character access code without formal registration, fulfilling business objective BO-01 (student onboarding < 2 minutes). The feature validates access codes against private courses/quizzes and displays course/quiz information before allowing students to proceed.

## What Changes

- **Join Page UI**: New guest join page at `/join` with access code input field
- **Access Code Validation**: Server-side validation of 6-character alphanumeric codes
- **Course/Quiz Display**: Shows quiz title, description, and teacher info after valid code entry
- **Error Handling**: Invalid code, expired quiz, and not-found states
- **Navigation Flow**: From join page → quiz info → name input → quiz start
- **Responsive Design**: Mobile-first design for student accessibility

## Capabilities

### New Capabilities
- `student-guest-join`: Student guest join flow with access code validation. Includes code input form, validation logic, course/quiz info display, and navigation to name input screen.

### Modified Capabilities
- `quiz-access`: Enhanced to support guest student access code validation and quiz lookup by code.

## Impact

**Affected Systems:**
- **UI**: New join page at `/join`, guest student flow layout
- **API**: New endpoint `/api/v1/quizzes/join` for access code validation
- **Database**: Quiz lookup by access_code (requires index for performance)
- **Session**: Guest student session initiation after successful join
- **Navigation**: Public route accessible without authentication

**Dependencies:**
- Requires quiz/course creation feature (teacher can create private quizzes with access codes)
- Requires database index on `access_code` column for fast lookups
- Requires guest student auto-registration feature (US-M6-02) as next step

**Future Changes Dependent on This:**
- Guest name input & auto-registration (US-M6-02)
- Quiz taking interface for students (US-M6-03 through US-M6-09)
- Guest student response tracking
- Result display for guest students

**Compliance:**
- Implements BRD requirement FR-M6-01 (Access Code Entry)
- Implements User Story US-M6-01 (Student Guest Access Code Entry)
- Supports BO-01 (onboarding < 2 minutes from entering code to starting quiz)
- Follows ITA Section 9 (Security Architecture) - access codes not exposed in public APIs
- Complies with NFR-SEC-04 (Access Code Protection)
- Follows Color Guideline for guest student experience design (Theme B - Dark mode for quiz screens)
