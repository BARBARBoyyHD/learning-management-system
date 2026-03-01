## ADDED Requirements

### Requirement: Quiz Time Limit Configuration
The system SHALL allow teachers to set an optional time limit for quizzes in minutes.

#### Scenario: Setting time limit during quiz creation
- **GIVEN** I am creating an assessment
- **WHEN** I set time_limit = 30 minutes
- **THEN** the quiz is saved with a 30-minute time limit

#### Scenario: Optional time limit
- **WHEN** teacher leaves time limit field empty
- **THEN** quiz has no time limit (unlimited time)

#### Scenario: Validating time limit input
- **WHEN** teacher enters invalid time (negative, zero, non-numeric)
- **THEN** form displays validation error "Time limit must be a positive number"

#### Scenario: Editing time limit
- **WHEN** teacher edits existing quiz and changes time limit
- **THEN** new time limit applies to all future quiz attempts

### Requirement: Countdown Timer Display
The system SHALL display a countdown timer showing remaining time to students taking the quiz.

#### Scenario: Timer visibility
- **GIVEN** quiz has time_limit = 30 minutes
- **WHEN** student starts the quiz
- **THEN** countdown timer displays showing 30:00 remaining

#### Scenario: Timer format
- **WHEN** timer displays
- **THEN** format is MM:SS (minutes:seconds)

#### Scenario: Timer position
- **WHEN** student takes quiz
- **THEN** timer is visible at all times (sticky header or fixed position)

#### Scenario: Timer for unlimited quiz
- **GIVEN** quiz has no time limit
- **WHEN** student takes quiz
- **THEN** no timer is displayed

### Requirement: Timer Countdown Logic
The system SHALL accurately count down time and sync with server time.

#### Scenario: Timer countdown
- **WHEN** quiz is in progress
- **THEN** timer counts down every second

#### Scenario: Timer synchronization
- **WHEN** student starts quiz
- **THEN** timer is synchronized with server timestamp to prevent manipulation

#### Scenario: Page refresh persistence
- **WHEN** student refreshes page during quiz
- **THEN** timer resumes from correct remaining time (based on server time)

#### Scenario: Multiple tabs
- **WHEN** student opens quiz in multiple tabs
- **THEN** timer shows consistent time across all tabs

### Requirement: Time Warning Alerts
The system SHALL display visual warnings when time is running low.

#### Scenario: 5-minute warning
- **GIVEN** quiz timer reaches 5 minutes remaining
- **WHEN** timer crosses 5:00 threshold
- **THEN** display warning message "5 minutes remaining" with yellow/orange styling

#### Scenario: 1-minute warning
- **GIVEN** quiz timer reaches 1 minute remaining
- **WHEN** timer crosses 1:00 threshold
- **THEN** display urgent warning "1 minute remaining" with red styling

#### Scenario: 30-second warning
- **GIVEN** quiz timer reaches 30 seconds remaining
- **WHEN** timer crosses 0:30 threshold
- **THEN** display critical warning with flashing/red styling

#### Scenario: Warning dismissal
- **WHEN** warning appears
- **THEN** warning remains visible until time expires or quiz is submitted

### Requirement: Auto-Submit on Time Expiry
The system SHALL automatically submit the quiz when time expires.

#### Scenario: Automatic submission
- **GIVEN** quiz timer reaches 0:00
- **WHEN** time expires
- **THEN** quiz is automatically submitted with current answers

#### Scenario: Save answers on expiry
- **GIVEN** time expires
- **WHEN** auto-submit triggers
- **THEN** all current answers are saved before submission

#### Scenario: Expiry notification
- **GIVEN** time expires
- **WHEN** auto-submit completes
- **THEN** display message "Time expired - your quiz has been submitted"

#### Scenario: Prevent further answers
- **GIVEN** quiz auto-submitted due to time expiry
- **WHEN** student tries to answer more questions
- **THEN** quiz is locked, no further answers accepted

### Requirement: Server-Side Time Validation
The system SHALL validate quiz submission time on the server to prevent cheating.

#### Scenario: Server time check
- **WHEN** student submits quiz
- **THEN** server validates submission time against quiz start time + time_limit

#### Scenario: Late submission rejection
- **GIVEN** student submits after time expiry
- **WHEN** server detects late submission
- **THEN** only answers before time expiry are accepted

#### Scenario: Client manipulation prevention
- **WHEN** student tries to manipulate client-side timer
- **THEN** server-side validation uses server timestamp, not client time

#### Scenario: Time spent tracking
- **WHEN** student submits quiz
- **THEN** server records actual time spent for analytics

### Requirement: Time Limit Data Model
The system SHALL store time limit in the database with proper constraints.

#### Scenario: Time limit storage
- **WHEN** quiz is created with time limit
- **THEN** time_limit is stored as INTEGER (minutes), nullable

#### Scenario: Time limit constraints
- **WHEN** setting time limit
- **THEN** minimum is 1 minute, maximum is 180 minutes (3 hours)

#### Scenario: Quiz attempt tracking
- **WHEN** student starts timed quiz
- **THEN** start_time is recorded for time calculation

#### Scenario: Submission time tracking
- **WHEN** student submits quiz
- **THEN** submission_time is recorded for time spent analysis
