## Why

This change implements Multiple Choice question creation functionality, a core requirement from the Business Requirements Document (BRD Section 6.4 - Question Management). Multiple Choice is the most common question type for quizzes and is essential for teachers to evaluate factual knowledge efficiently. This feature enables teachers to create questions with multiple answer options, designate correct answers, and configure shuffle settings.

Currently, the system has quizzes but no question creation capability. Without this feature, teachers cannot add questions to their quizzes, making the quiz feature unusable. Multiple Choice questions are the foundation question type that must be implemented first before other question types (Essay, Fill in Blank, Match, Reorder).

## What Changes

- **Question Editor UI**: New interface for creating and editing questions
- **Multiple Choice Component**: Specialized UI for MC questions with options
- **Question Bank**: Database storage for questions with JSON-based settings
- **Shuffle Configuration**: Option to randomize answer order for students
- **Correct Answer Marking**: UI to designate which options are correct

## Capabilities

### New Capabilities
- `multiple-choice-questions`: Create and edit Multiple Choice questions with options, correct answers, and shuffle settings. Includes question editor UI, option management, and database operations.

### Modified Capabilities
- `quiz-editor`: Enhanced to add questions to quizzes
- `question-model`: Database schema for questions with JSON settings

## Impact

**Affected Systems:**
- **Database**: Questions table with question_type, settings (JSON), options relation
- **UI**: Question editor with Multiple Choice interface
- **Quiz Management**: Add/remove questions from quizzes
- **Student Taking**: Shuffle options display based on settings

**Dependencies:**
- Requires Quiz module (M3) to be implemented
- Requires authentication (M1) - only teachers can create questions
- No breaking changes to existing functionality

**Future Changes Dependent on This:**
- Other question types (Essay, Fill Blank, Match, Reorder)
- Question preview for students
- Auto-grading for MC questions
- Question bank/import features

**Compliance:**
- Implements BRD requirement FR-M4-01 (Multiple Choice Questions)
- Implements User Story US-M4-01
- Follows ITA Section 3 (Technology Stack) - Next.js 16, Prisma, Zod
- Follows design system from `/docs/project/05-color-guideline.md`
