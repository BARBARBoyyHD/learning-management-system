## Why

This change implements Essay question creation functionality, a core requirement from the Business Requirements Document (BRD Section 6.4 - Question Management). Essay questions are essential for evaluating students' deep understanding, critical thinking, and written communication skills. Unlike Multiple Choice questions, essays require manual grading by teachers, making this feature important for comprehensive assessment.

Currently, the system only supports Multiple Choice questions (auto-graded). Without Essay questions, teachers cannot assess higher-order thinking skills, writing ability, or detailed explanations. This limits the types of assessments that can be created.

## What Changes

- **Essay Question Editor**: UI component for creating essay questions with rubric and word limits
- **Manual Grading Flag**: Questions marked as requiring manual grading
- **Grading Rubric**: Optional rubric/guidelines for grading essays
- **Word Limit**: Optional word limit for student responses
- **Question Type Selector**: Ability to switch between MC and Essay types

## Capabilities

### New Capabilities
- `essay-questions`: Create and edit Essay questions with rubric, word limits, and manual grading flag. Includes essay question editor UI and database operations.

### Modified Capabilities
- `question-editor`: Enhanced with question type selector (MC, Essay)
- `question-model`: Uses existing schema with questionType = 'essay'

## Impact

**Affected Systems:**
- **Database**: Uses existing Question table with questionType = 'essay'
- **UI**: Question editor with Essay-specific fields (rubric, word limit)
- **Grading**: Manual grading workflow for essay responses (future feature)
- **Question List**: Shows essay icon and "Manual grading" badge

**Dependencies:**
- Requires Question module (M4-01) to be implemented
- Requires authentication (M1) - only teachers can create questions
- No breaking changes to existing Multiple Choice questions

**Future Changes Dependent on This:**
- Manual grading interface for teachers
- Rubric-based scoring
- Student essay submission UI
- Feedback/annotation tools

**Compliance:**
- Implements BRD requirement FR-M4-02 (Essay Questions)
- Implements User Story US-M4-02
- Follows ITA Section 3 (Technology Stack) - Next.js 16, Prisma, Zod
- Follows design system from `/docs/project/05-color-guideline.md`
