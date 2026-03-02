## Why

Teachers need to edit existing quiz metadata (title, description, time limit, visibility) after creation to fix errors or update settings. Currently, the Edit button in the quiz card UI is non-functional, preventing teachers from updating their quizzes post-creation. This change adds metadata edit functionality without question editing.

## What Changes

- Edit button in quiz cards becomes functional
- New quiz edit page/route for modifying quiz metadata only
- Ability to update quiz title, description, time limit, and visibility settings
- Ability to change quiz visibility (public/private) and access code
- Form validation for quiz metadata updates
- Persist changes to the database via quiz service
- **Out of Scope**: Question editing (add, modify, delete, reorder) - questions are set at creation time

## Capabilities

### New Capabilities
- `quiz-metadata-edit`: Quiz metadata editing capability (title, description, time limit, visibility)

### Modified Capabilities
- None (no existing specs to modify)

## Impact

- **New Routes**: `/quizzes/[id]/edit` - Quiz metadata edit page
- **New Components**: Quiz metadata edit form (no question editor)
- **New API**: `PUT /api/v1/quizzes/:id` - Update quiz metadata endpoint
- **Service Updates**: `quiz.service.ts` - Add update method for metadata only
- **Existing Components**: QuizCard edit button becomes functional
- **Database**: Updates to `quizzes` table only (no `questions` table changes)
- **Validation**: Zod schemas for quiz metadata update operations
- **Schema Changes**: May need to add `timeLimit` field to quizzes table if not exists
