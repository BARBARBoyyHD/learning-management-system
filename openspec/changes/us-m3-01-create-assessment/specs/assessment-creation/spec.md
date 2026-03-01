## ADDED Requirements

### Requirement: Quiz Creation
The system SHALL allow teachers to create quizzes independently.

#### Scenario: Create quiz button
- **GIVEN** I am a teacher
- **WHEN** I view my dashboard
- **THEN** I see a "Create Quiz" button

#### Scenario: Navigate to quiz editor
- **GIVEN** I am on my dashboard
- **WHEN** I click "Create Quiz"
- **THEN** I am navigated to the quiz editor page

#### Scenario: Quiz ownership
- **GIVEN** I create a quiz
- **WHEN** quiz is saved
- **THEN** I am set as the quiz owner (teacherId)

### Requirement: Quiz Form Fields
The system SHALL provide a form with required and optional fields for quiz creation.

#### Scenario: Required fields
- **GIVEN** I am creating a quiz
- **WHEN** I submit the form
- **THEN** title is required, description is optional

#### Scenario: Quiz title
- **GIVEN** I am creating a quiz
- **WHEN** I enter a title
- **THEN** title accepts up to 200 characters

#### Scenario: Quiz description
- **GIVEN** I am creating a quiz
- **WHEN** I enter a description
- **THEN** description accepts up to 2000 characters

#### Scenario: Form validation
- **WHEN** I submit with empty title
- **THEN** form displays "Title is required" error

### Requirement: Draft Status (isPublic)
The system SHALL create quizzes as draft (private) by default.

#### Scenario: Default draft status
- **GIVEN** I create a new quiz
- **WHEN** I save the quiz
- **THEN** isPublic is set to false automatically

#### Scenario: Draft visibility
- **GIVEN** a quiz isPrivate (isPublic = false)
- **WHEN** students browse quizzes
- **THEN** private quizzes are not visible to students

#### Scenario: Teacher sees drafts
- **GIVEN** I am a teacher who created a draft quiz
- **WHEN** I view my dashboard
- **THEN** I can see my draft quizzes with "Draft" label

### Requirement: Quiz Settings
The system SHALL allow teachers to configure basic quiz settings.

#### Scenario: Time limit setting
- **GIVEN** I am creating a quiz
- **WHEN** I set a time limit
- **THEN** time limit is stored in minutes (optional, 1-180)

#### Scenario: No time limit option
- **GIVEN** I am creating a quiz
- **WHEN** I leave time limit empty
- **THEN** quiz has unlimited time

#### Scenario: Shuffle questions setting
- **GIVEN** I am creating a quiz
- **WHEN** I enable "Shuffle questions"
- **THEN** questions will be randomized for students

#### Scenario: Multiple attempts setting
- **GIVEN** I am creating a quiz
- **WHEN** I set number of attempts
- **THEN** students can take quiz that many times

### Requirement: Quiz Creation API
The system SHALL provide an API endpoint for creating quizzes.

#### Scenario: Create quiz endpoint
- **GIVEN** I am authenticated as a teacher
- **WHEN** I POST to /api/v1/quizzes
- **THEN** quiz is created and returned

#### Scenario: Unauthorized access
- **GIVEN** I am not authenticated
- **WHEN** I try to create a quiz
- **THEN** I receive 401 Unauthorized

#### Scenario: Non-owner access
- **GIVEN** I am a teacher
- **WHEN** I try to edit another teacher's quiz
- **THEN** I receive 403 Forbidden

### Requirement: Form Submission and Feedback
The system SHALL provide clear feedback during and after quiz creation.

#### Scenario: Saving quiz
- **GIVEN** I am filling the quiz form
- **WHEN** I click "Save"
- **THEN** loading indicator displays while saving

#### Scenario: Success notification
- **GIVEN** I submit a valid quiz form
- **WHEN** quiz is created
- **THEN** success message displays "Quiz created successfully"

#### Scenario: Error handling
- **GIVEN** I submit the form
- **WHEN** server error occurs
- **THEN** error message displays what went wrong

#### Scenario: Redirect after save
- **GIVEN** I create a quiz
- **WHEN** save is successful
- **THEN** I am redirected to dashboard or quiz list

### Requirement: Quiz Data Model
The system SHALL store quizzes with proper relationships and constraints.

#### Scenario: Quiz schema
- **WHEN** quiz is created
- **THEN** it has: id, teacherId, title, description, isPublic, accessCode, createdAt

#### Scenario: Teacher relationship
- **WHEN** quiz is created
- **THEN** teacherId is set to current user's ID

#### Scenario: Public/Private status
- **WHEN** quiz is created
- **THEN** isPublic defaults to false (draft)

#### Scenario: Access code for private quizzes
- **WHEN** teacher makes quiz private
- **THEN** 6-character access code is generated for students to join

#### Scenario: Settings JSON
- **WHEN** quiz is created
- **THEN** settings field can store JSON with time_limit, shuffle, attempts, etc.

### Requirement: Dashboard Integration
The system SHALL display quizzes on the teacher dashboard.

#### Scenario: Quiz list
- **GIVEN** I have created quizzes
- **WHEN** I view my dashboard
- **THEN** I see a list of my quizzes (draft and published)

#### Scenario: Create button placement
- **GIVEN** I am on my dashboard
- **WHEN** I view the page
- **THEN** "Create Quiz" button is prominently displayed

#### Scenario: Empty state
- **GIVEN** I have no quizzes
- **WHEN** I view my dashboard
- **THEN** I see a message "No quizzes yet" with create button

#### Scenario: Draft indicator
- **GIVEN** a quiz is private (draft)
- **WHEN** I view the quiz list
- **THEN** private quizzes show "Draft" badge/label
