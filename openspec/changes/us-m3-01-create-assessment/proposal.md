## Why

This change implements quiz creation functionality, a core requirement from the Business Requirements Document (BRD Section 6.3 - Assessment & Quiz Management). Teachers need the ability to create quizzes to evaluate student learning. This feature enables teachers to create, configure, and manage quizzes as drafts before publishing them to students.

Currently, the system has no quiz creation capability. Without this feature, teachers cannot create quizzes or evaluations for their students, blocking the core learning management workflow. This is a foundational feature that enables all subsequent quiz-related functionality (questions, time limits, student attempts).

## What Changes

- **Quiz Editor UI**: New page and form for creating quizzes
- **Quiz Form**: Fields for title, description, settings (time limit, shuffle, etc.)
- **Draft Status**: Quizzes created as draft by default (not visible to students)
- **API Endpoint**: POST /api/v1/quizzes
- **Database**: Uses existing Quiz table with teacher relationship

## Capabilities

### New Capabilities
- `quiz-creation`: Teacher can create quizzes with title, description, settings, and draft status. Includes quiz editor UI, form validation, API endpoint, and database operations.

### Modified Capabilities
- `teacher-dashboard`: Enhanced to show "Create Quiz" button and list of teacher's quizzes
- `quiz-model`: Uses existing Quiz schema with isPublic for draft/published status

## Impact

**Affected Systems:**
- **UI**: Teacher dashboard adds quiz list and create button
- **API**: New endpoint for quiz creation
- **Navigation**: New routes for quiz editor

**Dependencies:**
- Requires authentication (M1) - only teachers can create quizzes
- Uses existing Quiz model (no course dependency)
- No breaking changes to existing functionality

**Future Changes Dependent on This:**
- Question creation and management (M3-03)
- Time limit configuration (M3-02)
- Quiz publishing workflow
- Student quiz taking (M4)
- Grading and reporting (M5)

**Compliance:**
- Implements BRD requirement FR-M3-01 (Quiz Creation)
- Implements User Story US-M3-01
- Follows ITA Section 3 (Technology Stack) - Next.js 16, Prisma, Zod
- Follows design system from `/docs/project/05-color-guideline.md`
