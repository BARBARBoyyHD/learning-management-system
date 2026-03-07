## ADDED Requirements

### Requirement: Multiple Choice Question Creation
The system SHALL allow teachers to create Multiple Choice questions with options and correct answers.

#### Scenario: Create MC question
- **GIVEN** I am in the question editor
- **WHEN** I select Multiple Choice type
- **THEN** I can input question text and answer options

#### Scenario: Add multiple options
- **GIVEN** I am creating an MC question
- **WHEN** I add options (A, B, C, D)
- **THEN** each option is stored with its text

#### Scenario: Mark correct answer
- **GIVEN** I have added options
- **WHEN** I mark one option as correct
- **THEN** that option is designated as the correct answer

#### Scenario: Multiple correct answers (optional)
- **GIVEN** I am creating an MC question
- **WHEN** I enable "multiple correct answers" setting
- **THEN** I can mark multiple options as correct

### Requirement: Shuffle Configuration
The system SHALL allow teachers to configure whether options are shuffled for students.

#### Scenario: Enable shuffle
- **GIVEN** I am creating an MC question
- **WHEN** I enable "Shuffle options" setting
- **THEN** students see options in random order

#### Scenario: Disable shuffle
- **GIVEN** I am creating an MC question
- **WHEN** I leave "Shuffle options" disabled
- **THEN** students see options in fixed order (A, B, C, D)

#### Scenario: Shuffle setting storage
- **GIVEN** I set shuffle configuration
- **WHEN** question is saved
- **THEN** shuffle setting is stored in question settings JSON

### Requirement: Question Editor Interface
The system SHALL provide an intuitive interface for creating and editing questions.

#### Scenario: Question text input
- **GIVEN** I am in the question editor
- **WHEN** I enter question text
- **THEN** text accepts up to 2000 characters

#### Scenario: Option management
- **GIVEN** I am creating an MC question
- **WHEN** I add/edit/remove options
- **THEN** changes are reflected immediately

#### Scenario: Minimum options validation
- **GIVEN** I am creating an MC question
- **WHEN** I try to save with less than 2 options
- **THEN** form displays "At least 2 options required" error

#### Scenario: Maximum options limit
- **GIVEN** I am creating an MC question
- **WHEN** I try to add more than 10 options
- **THEN** system prevents adding more options

### Requirement: Question Data Model
The system SHALL store questions with proper structure and relationships.

#### Scenario: Question schema
- **WHEN** MC question is created
- **THEN** it has: id, quizId, questionType, questionText, settings, points, orderIndex

#### Scenario: Question type storage
- **WHEN** question is created
- **THEN** questionType = 'multiple_choice'

#### Scenario: Settings JSON structure
- **WHEN** MC question is saved
- **THEN** settings contains: { shuffle: boolean, multipleAnswers: boolean }

#### Scenario: Options relationship
- **WHEN** question has options
- **THEN** options stored in question_options table with question_id foreign key

### Requirement: Option Data Model
The system SHALL store answer options with correct answer designation.

#### Scenario: Option schema
- **WHEN** option is created
- **THEN** it has: id, questionId, option (text), isCorrect, sortOrder

#### Scenario: Option text
- **WHEN** option is saved
- **THEN** option text accepts up to 500 characters

#### Scenario: Correct answer flag
- **WHEN** option is marked correct
- **THEN** isCorrect = true

#### Scenario: Sort order
- **WHEN** options are added
- **THEN** sortOrder determines display order (0, 1, 2, 3...)

### Requirement: Question Saving
The system SHALL save questions with validation and feedback.

#### Scenario: Save question
- **GIVEN** I have filled question text and options
- **WHEN** I click "Save Question"
- **THEN** question is saved to database

#### Scenario: Required field validation
- **GIVEN** I am creating a question
- **WHEN** I leave question text empty
- **THEN** form displays "Question text is required" error

#### Scenario: At least one correct answer
- **GIVEN** I am creating an MC question
- **WHEN** I try to save without marking any option correct
- **THEN** form displays "At least one correct answer required" error

#### Scenario: Success feedback
- **GIVEN** I save a valid question
- **WHEN** save completes
- **THEN** success message displays "Question saved successfully"

### Requirement: Question Editing
The system SHALL allow teachers to edit existing questions.

#### Scenario: Load question for editing
- **GIVEN** I have an existing MC question
- **WHEN** I open it for editing
- **THEN** all question data and options are loaded

#### Scenario: Update question
- **GIVEN** I am editing a question
- **WHEN** I modify text or options
- **THEN** changes are saved on submit

#### Scenario: Delete question
- **GIVEN** I am viewing a question
- **WHEN** I click "Delete"
- **THEN** question is removed from quiz (with confirmation)
