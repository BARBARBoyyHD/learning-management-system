## ADDED Requirements

### Requirement: Teacher can navigate to quiz edit page
The system SHALL allow teachers to access the edit page for any quiz they own by clicking the Edit button on the quiz card.

#### Scenario: Teacher clicks Edit button on quiz card
- **WHEN** teacher clicks the Edit button on a quiz card in the dashboard
- **THEN** system navigates to `/quizzes/[id]/edit` page for that quiz

#### Scenario: Teacher accesses edit page directly via URL
- **WHEN** teacher navigates directly to `/quizzes/[id]/edit` for a quiz they own
- **THEN** system displays the quiz edit form with current quiz data pre-filled

#### Scenario: Teacher tries to edit quiz they don't own
- **WHEN** teacher attempts to access edit page for a quiz owned by another teacher
- **THEN** system shows "Access denied" error and redirects to dashboard

### Requirement: Teacher can edit quiz title
The system SHALL allow teachers to modify the quiz title.

#### Scenario: Teacher updates quiz title
- **WHEN** teacher changes the quiz title and saves
- **THEN** system updates the title and displays success message

#### Scenario: Teacher saves with empty title
- **WHEN** teacher submits form with empty title
- **THEN** system shows validation error "Title is required" and prevents save

#### Scenario: Teacher saves with very long title
- **WHEN** teacher enters a title longer than 200 characters
- **THEN** system shows validation error "Title must be less than 200 characters"

### Requirement: Teacher can edit quiz description
The system SHALL allow teachers to modify or clear the quiz description.

#### Scenario: Teacher updates quiz description
- **WHEN** teacher modifies the description and saves
- **THEN** system updates the description and displays success message

#### Scenario: Teacher clears quiz description
- **WHEN** teacher deletes all text from description field and saves
- **THEN** system saves as null/empty and displays success message

### Requirement: Teacher can edit quiz time limit
The system SHALL allow teachers to set, modify, or remove the quiz time limit.

#### Scenario: Teacher sets a time limit
- **WHEN** teacher enters a time limit in minutes and saves
- **THEN** system saves the time limit value

#### Scenario: Teacher removes time limit
- **WHEN** teacher clears the time limit field (sets to null/no limit) and saves
- **THEN** system removes the time limit constraint

#### Scenario: Teacher enters invalid time limit
- **WHEN** teacher enters a negative number or non-numeric value
- **THEN** system shows validation error "Time limit must be a positive number"

#### Scenario: Teacher changes time limit with active attempts
- **WHEN** teacher modifies time limit while students have active attempts
- **THEN** system shows warning that this may affect in-progress quizzes

### Requirement: Teacher can change quiz visibility
The system SHALL allow teachers to toggle quiz visibility between public and private.

#### Scenario: Teacher changes quiz from public to private
- **WHEN** teacher changes quiz visibility from public to private
- **THEN** system generates a 6-character access code if one doesn't exist

#### Scenario: Teacher changes quiz from private to public
- **WHEN** teacher changes quiz visibility from private to public
- **THEN** system marks quiz as public (access code retained but not required)

#### Scenario: Teacher regenerates access code
- **WHEN** teacher requests a new access code for a private quiz
- **THEN** system generates a new unique 6-character code

### Requirement: System validates quiz metadata before saving
The system SHALL validate quiz metadata before persisting changes to ensure data integrity.

#### Scenario: Quiz with invalid title
- **WHEN** teacher attempts to save with empty or too-long title
- **THEN** system shows validation errors and prevents save

#### Scenario: Quiz with invalid time limit
- **WHEN** teacher attempts to save with negative time limit
- **THEN** system shows validation error and prevents save

### Requirement: System provides save feedback
The system SHALL provide clear feedback when saving quiz metadata changes.

#### Scenario: Successful save
- **WHEN** quiz metadata is saved successfully
- **THEN** system shows toast notification "Quiz updated successfully"

#### Scenario: Save fails due to server error
- **WHEN** save operation encounters a server error
- **THEN** system shows error message and preserves form data for retry

#### Scenario: Concurrent edit conflict
- **WHEN** another teacher has modified the quiz since this session started
- **THEN** system shows conflict warning and offers to reload latest version

### Requirement: System confirms before discarding changes
The system SHALL warn teachers before they leave the edit page with unsaved changes.

#### Scenario: Teacher tries to navigate away with unsaved changes
- **WHEN** teacher has made changes but not saved and tries to navigate away
- **THEN** system shows browser confirmation dialog "You have unsaved changes"

#### Scenario: Teacher cancels edit without saving
- **WHEN** teacher clicks Cancel button with unsaved changes
- **THEN** system shows confirmation dialog before discarding changes
