## ADDED Requirements

### Requirement: Teacher Dashboard Landing Page
The system SHALL display a dashboard page as the main landing page after teacher login.

#### Scenario: Redirect to dashboard after login
- **WHEN** teacher successfully logs in
- **THEN** system redirects to `/dashboard` page

#### Scenario: View dashboard layout
- **WHEN** teacher navigates to `/dashboard`
- **THEN** system displays dashboard with sidebar navigation, statistics cards, and quiz listing

#### Scenario: Protected route
- **WHEN** unauthenticated user tries to access `/dashboard`
- **THEN** system redirects to login page

### Requirement: Quiz Statistics Display
The system SHALL display statistics about teacher's quizzes.

#### Scenario: View quiz counts
- **WHEN** teacher views dashboard
- **THEN** system displays counts for: total quizzes, published quizzes, draft quizzes, archived quizzes

#### Scenario: Statistics update on quiz changes
- **WHEN** teacher creates or deletes a quiz
- **THEN** statistics cards reflect updated counts immediately

#### Scenario: Empty state statistics
- **WHEN** teacher has no quizzes
- **THEN** all statistics show "0"

### Requirement: Quiz Listing
The system SHALL display a list of all quizzes owned by the teacher.

#### Scenario: View all quizzes
- **WHEN** teacher views dashboard
- **THEN** system displays list of quizzes with title, status badge, question count, last modified date, and access code (if private)

#### Scenario: Quiz status badges
- **WHEN** quiz status is draft
- **THEN** system displays gray/neutral badge

#### Scenario: Quiz status badges
- **WHEN** quiz status is published
- **THEN** system displays green/success badge

#### Scenario: Quiz status badges
- **WHEN** quiz status is archived
- **THEN** system displays gray/neutral badge with archived label

#### Scenario: Empty quiz list
- **WHEN** teacher has no quizzes
- **THEN** system displays empty state with "Create your first quiz" call-to-action button

### Requirement: Quiz Search and Filter
The system SHALL allow teachers to search and filter their quizzes.

#### Scenario: Filter by status
- **WHEN** teacher selects "Published" filter tab
- **THEN** system shows only published quizzes

#### Scenario: Filter by status
- **WHEN** teacher selects "Draft" filter tab
- **THEN** system shows only draft quizzes

#### Scenario: Filter by status
- **WHEN** teacher selects "Archived" filter tab
- **THEN** system shows only archived quizzes

#### Scenario: Filter by status
- **WHEN** teacher selects "All" filter tab
- **THEN** system shows all quizzes regardless of status

#### Scenario: Search by title
- **WHEN** teacher types in search box
- **THEN** system filters quizzes by title match (case-insensitive)

#### Scenario: Clear search
- **WHEN** teacher clears search box
- **THEN** system shows all quizzes again

#### Scenario: Combined filter and search
- **WHEN** teacher uses both status filter and search
- **THEN** system applies both filters (intersection)

### Requirement: Quiz Quick Actions
The system SHALL provide quick actions for each quiz in the list.

#### Scenario: Navigate to edit quiz
- **WHEN** teacher clicks "Edit" button on a quiz
- **THEN** system navigates to quiz edit page (future feature)

#### Scenario: Duplicate quiz
- **WHEN** teacher clicks "Duplicate" button
- **THEN** system creates a copy of the quiz with "(Copy)" appended to title

#### Scenario: Delete quiz confirmation
- **WHEN** teacher clicks "Delete" button
- **THEN** system shows confirmation dialog before permanent deletion

#### Scenario: Cancel delete
- **WHEN** teacher confirms delete then cancels
- **THEN** system keeps quiz and closes dialog

#### Scenario: Confirm delete
- **WHEN** teacher confirms delete
- **THEN** system removes quiz and updates statistics

#### Scenario: Publish quiz
- **WHEN** teacher clicks "Publish" on a draft quiz with at least one question
- **THEN** system changes status to published and quiz becomes accessible to students

#### Scenario: Publish without questions
- **WHEN** teacher tries to publish quiz with no questions
- **THEN** system shows error "Quiz must have at least one question before publishing"

#### Scenario: Unpublish quiz
- **WHEN** teacher clicks "Unpublish" on a published quiz
- **THEN** system changes status back to draft

### Requirement: Dashboard Navigation
The system SHALL provide consistent navigation for teacher-facing screens.

#### Scenario: Sidebar navigation
- **WHEN** teacher views dashboard
- **THEN** system displays sidebar with navigation links (Dashboard, Quizzes, Settings)

#### Scenario: Create quiz button
- **WHEN** teacher clicks "Create Quiz" button in sidebar or header
- **THEN** system navigates to quiz creation page (future feature)

#### Scenario: Active navigation state
- **WHEN** teacher is on dashboard page
- **THEN** "Dashboard" navigation item shows active state

### Requirement: Dark Theme Application
The system SHALL apply Theme B (Dark) for teacher dashboard.

#### Scenario: Dark theme styling
- **WHEN** teacher views dashboard
- **THEN** system applies Deep Purple (#6a25f4) primary color with dark background

#### Scenario: Responsive layout
- **WHEN** teacher accesses dashboard on desktop
- **THEN** system displays full sidebar navigation

#### Scenario: Responsive layout
- **WHEN** teacher accesses dashboard on tablet
- **THEN** system displays responsive layout with collapsible sidebar
