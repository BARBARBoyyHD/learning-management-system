## Context

The dashboard currently displays quizzes with an Edit button in each quiz card, but the button is non-functional. Teachers need to modify existing quiz metadata to:
- Fix typos in title or description
- Update time limit settings
- Change quiz visibility (public/private)
- Regenerate access codes for private quizzes

**Current State:**
- QuizCard component has an Edit button with no handler
- No quiz edit page exists
- Quiz service lacks update methods
- No API endpoint for updating quizzes
- Quiz schema may need `timeLimit` field added

**Constraints:**
- Must work with existing Prisma schema (quizzes table)
- Questions are NOT editable - set at creation time only
- Must maintain data integrity for existing student responses
- Must follow Next.js 16 App Router patterns
- Simple metadata-only edit flow

## Goals / Non-Goals

**Goals:**
- Functional Edit button that navigates to quiz metadata edit page
- Edit quiz metadata (title, description, time limit, visibility, access code)
- Form validation with Zod schemas
- Persist changes to database
- Maintain existing student responses (don't break completed quizzes)
- Simple, focused UI without question editing complexity

**Non-Goals:**
- Question editing (add, modify, delete, reorder) - questions are immutable after creation
- Version history/revision tracking for quizzes
- Collaborative editing (multiple teachers editing same quiz)
- Bulk operations on multiple quizzes
- Quiz templates or cloning (separate feature)

## Decisions

### 1. Route Structure: `/quizzes/[id]/edit`
**Rationale:** Follows Next.js App Router conventions for resource editing. Alternative: modal editor. Chose separate page for clarity and future extensibility.

### 2. Metadata-Only Edit Form
**Rationale:** Since questions are not editable, the form focuses on quiz settings only. Simpler UX, faster implementation, clearer mental model for teachers.

### 3. Client-Side Form with Server Actions
**Rationale:** Form requires validation and interactivity. Client component with React Hook Form + Server Actions for mutations provides best UX.

### 4. Update API: `PUT /api/v1/quizzes/:id`
**Rationale:** RESTful pattern consistent with existing API conventions. Supports partial updates for metadata fields only.

### 5. Time Limit Field
**Rationale:** If `timeLimit` doesn't exist in schema, add it as nullable integer (minutes). Null means no time limit.

## Risks / Trade-offs

**[Risk]** Editing quiz metadata while students are taking quiz may cause confusion
→ **Mitigation:** Metadata changes (except time limit) don't affect in-progress quizzes. Time limit changes show warning.

**[Risk]** Schema migration needed for timeLimit field
→ **Mitigation:** Add field as nullable with default null. Migration is backward compatible.

**[Trade-off]** Metadata-only vs full quiz editing
→ **Decision:** Metadata-only is simpler, faster, and matches requirement that questions are immutable. Can extend later if needed.

**[Trade-off]** Inline editing vs separate page
→ **Decision:** Separate page provides better context for multiple field edits and validation feedback.
