## ADDED Requirements

### Requirement: Essay Question Creation
The system SHALL allow teachers to create Essay questions with optional rubric and word limits.

#### Scenario: Create essay question
- **GIVEN** I am in the question editor
- **WHEN** I select Essay type
- **THEN** I can input question text and grading settings

#### Scenario: Manual grading flag
- **GIVEN** I create an essay question
- **WHEN** question is saved
- **THEN** it is marked as requiring manual grading

#### Scenario: Grading rubric
- **GIVEN** I am creating an essay question
- **WHEN** I enter grading rubric
- **THEN** rubric is stored for grader reference

#### Scenario: Word limit
- **GIVEN** I am creating an essay question
- **WHEN** I set word limit
- **THEN** students see word limit when taking quiz

### Requirement: Question Type Selection
The system SHALL allow teachers to select between Multiple Choice and Essay question types.

#### Scenario: Select question type
- **GIVEN** I am creating a question
- **WHEN** I select question type
- **THEN** appropriate fields are shown for that type

#### Scenario: Type-specific settings
- **GIVEN** I select Essay type
- **WHEN** editor loads
- **THEN** rubric and word limit fields are displayed

#### Scenario: Type-specific validation
- **GIVEN** I select Essay type
- **WHEN** I save question
- **THEN** validation checks for essay-specific requirements

### Requirement: Essay Question Data Model
The system SHALL store essay questions with proper structure in settings JSON.

#### Scenario: Essay settings schema
- **WHEN** essay question is created
- **THEN** settings contains: { rubric: string, wordLimit: number, requiresManualGrading: true }

#### Scenario: Rubric storage
- **WHEN** rubric is provided
- **THEN** it is stored in settings JSON

#### Scenario: Word limit storage
- **WHEN** word limit is set
- **THEN** it is stored as number in settings

#### Scenario: Manual grading flag
- **WHEN** essay question is saved
- **THEN** requiresManualGrading is set to true

### Requirement: Question Editor Integration
The system SHALL integrate essay questions into the existing question editor.

#### Scenario: Question type selector
- **GIVEN** I am creating a question
- **WHEN** editor loads
- **THEN** I can select between MC and Essay types

#### Scenario: Dynamic form fields
- **GIVEN** I switch to Essay type
- **WHEN** type changes
- **THEN** form shows essay-specific fields

#### Scenario: Save essay question
- **GIVEN** I fill essay question form
- **WHEN** I click "Save Question"
- **THEN** question is saved with essay type

#### Scenario: Edit essay question
- **GIVEN** I have an essay question
- **WHEN** I open it for editing
- **THEN** all essay settings are loaded

### Requirement: Question List Display
The system SHALL display essay questions with appropriate indicators in the question list.

#### Scenario: Essay question icon
- **GIVEN** quiz has essay questions
- **WHEN** viewing question list
- **THEN** essay questions show essay icon

#### Scenario: Manual grading badge
- **GIVEN** question is essay type
- **WHEN** viewing question list
- **THEN** "Manual grading" badge is displayed

#### Scenario: Question preview
- **GIVEN** essay question has text
- **WHEN** viewing question list
- **THEN** first 50 characters are shown

### Requirement: Validation
The system SHALL validate essay questions before saving.

#### Scenario: Required question text
- **GIVEN** I am creating an essay question
- **WHEN** I leave question text empty
- **THEN** form displays "Question text is required" error

#### Scenario: Optional rubric
- **GIVEN** I am creating an essay question
- **WHEN** I leave rubric empty
- **THEN** question saves successfully (rubric is optional)

#### Scenario: Word limit validation
- **GIVEN** I am creating an essay question
- **WHEN** I enter negative word limit
- **THEN** form displays "Word limit must be positive" error

#### Scenario: Maximum word limit
- **GIVEN** I am creating an essay question
- **WHEN** I enter word limit over 5000
- **THEN** form displays "Word limit too high" error
