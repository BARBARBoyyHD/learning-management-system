## ADDED Requirements

### Requirement: Access Code Entry Page
The system SHALL provide a public join page at `/join` for guest students to enter quiz access codes.

#### Scenario: Student accesses join page
- **GIVEN** I am a student guest
- **WHEN** I navigate to `/join`
- **THEN** I see a form with 6-character access code input and continue button

#### Scenario: Join page is publicly accessible
- **WHEN** unauthenticated user navigates to `/join`
- **THEN** page loads without redirect (no authentication required)

#### Scenario: Join page responsive design
- **WHEN** accessed from mobile, tablet, or desktop
- **THEN** form is properly displayed and usable on all screen sizes

### Requirement: Access Code Input Validation
The system SHALL validate access code format before submission using Zod schema.

#### Scenario: Valid access code format
- **WHEN** student enters 6 alphanumeric characters (e.g., "ABC123", "xyz789")
- **THEN** validation passes, form can be submitted

#### Scenario: Invalid format - too short
- **WHEN** student enters less than 6 characters
- **THEN** validation fails, displays "Code must be 6 characters"

#### Scenario: Invalid format - too long
- **WHEN** student enters more than 6 characters
- **THEN** validation fails, displays "Code must be 6 characters"

#### Scenario: Invalid format - special characters
- **WHEN** student enters special characters (e.g., "ABC-123", "ABC_123")
- **THEN** validation fails, displays "Code can only contain letters and numbers"

#### Scenario: Case-insensitive input
- **WHEN** student enters lowercase "abc123"
- **THEN** validation treats it as valid (converted to uppercase for lookup)

### Requirement: Access Code Lookup API
The system SHALL provide an API endpoint to validate access codes and retrieve quiz information.

#### Scenario: Valid access code lookup
- **GIVEN** a quiz exists with access code "ABC123"
- **WHEN** POST /api/v1/quizzes/join with `{ "accessCode": "abc123" }`
- **THEN** returns 200 OK with quiz details (id, title, description, teacher, questionCount)

#### Scenario: Invalid access code lookup
- **WHEN** code does not exist in database
- **THEN** returns 404 Not Found with error "Invalid access code"

#### Scenario: Case-insensitive lookup
- **GIVEN** quiz with access code "ABC123"
- **WHEN** lookup with "abc123" or "AbC123"
- **THEN** finds the quiz (case-insensitive comparison)

#### Scenario: Expired or deleted quiz
- **WHEN** access code exists but quiz was deleted
- **THEN** returns 404 Not Found (code automatically invalid)

### Requirement: Quiz Information Display
The system SHALL display quiz details after successful access code validation.

#### Scenario: Quiz info shows title
- **GIVEN** valid access code entered
- **WHEN** quiz lookup succeeds
- **THEN** displays quiz title prominently

#### Scenario: Quiz info shows teacher name
- **WHEN** quiz lookup succeeds
- **THEN** displays teacher name (from quiz.teacher relation)

#### Scenario: Quiz info shows question count
- **WHEN** quiz lookup succeeds
- **THEN** displays number of questions in quiz

#### Scenario: Quiz info shows time limit (if applicable)
- **GIVEN** quiz has timeLimit set
- **WHEN** quiz lookup succeeds
- **THEN** displays time limit in minutes

#### Scenario: Quiz without time limit
- **GIVEN** quiz has timeLimit = null
- **WHEN** quiz lookup succeeds
- **THEN** displays "No time limit" or hides time info

### Requirement: Error Handling and User Feedback
The system SHALL provide clear error messages for access code validation failures.

#### Scenario: Invalid code error
- **WHEN** student enters non-existent code
- **THEN** displays "Invalid access code. Please check and try again."

#### Scenario: Network error handling
- **WHEN** API is unreachable
- **THEN** displays "Unable to connect. Please check your internet connection."

#### Scenario: Generic error message
- **WHEN** unknown error occurs
- **THEN** displays "Something went wrong. Please try again." without technical details

#### Scenario: Error with retry option
- **WHEN** error occurs
- **THEN** student can edit code and try again (no page reload needed)

### Requirement: Navigation to Next Step
The system SHALL navigate to name input screen after successful code validation.

#### Scenario: Proceed to name input
- **GIVEN** valid access code entered
- **WHEN** student clicks "Continue" or "Join Quiz"
- **THEN** navigates to `/quiz/[quizId]/start` or `/join/name` with quiz context

#### Scenario: Preserve quiz context
- **WHEN** navigating to next step
- **THEN** quiz ID and details are preserved (via URL params or state)

### Requirement: Database Query Optimization
The system SHALL use indexed queries for fast access code lookups.

#### Scenario: Index usage for access code lookup
- **WHEN** querying by access_code
- **THEN** uses `quizzes_access_code_idx` index (O(1) lookup)

#### Scenario: Case-insensitive query
- **WHEN** looking up "abc123"
- **THEN** query uses `WHERE UPPER(access_code) = 'ABC123'` with functional index

### Requirement: Security and Rate Limiting
The system SHALL implement security measures for access code validation.

#### Scenario: Rate limiting
- **WHEN** more than 10 failed attempts from same IP in 1 minute
- **THEN** returns 429 Too Many Requests, "Too many attempts. Please try again later."

#### Scenario: No information leakage
- **WHEN** invalid code entered
- **THEN** error message doesn't reveal if code format is valid or if code exists

#### Scenario: Input sanitization
- **WHEN** access code contains SQL injection attempts
- **THEN** Prisma parameterized queries prevent injection attacks

#### Scenario: HTTPS enforcement
- **WHEN** in production
- **THEN** all API requests use HTTPS (Vercel default)

### Requirement: Logging and Analytics
The system SHALL log access code validation attempts for monitoring.

#### Scenario: Successful join logged
- **WHEN** student successfully joins quiz
- **THEN** logs quiz ID, timestamp, and IP (for analytics, not PII)

#### Scenario: Failed attempts logged
- **WHEN** invalid code entered
- **THEN** logs attempt count (for rate limiting, not storing code)

#### Scenario: No sensitive data in logs
- **WHEN** logging
- **THEN** access codes are hashed or truncated, never stored in plain text
