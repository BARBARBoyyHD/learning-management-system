# Tasks: Student Guest Access Code Entry (US-M6-01)

## Module: Guest Student Experience (M6)
**Sprint:** S6 (Guest Student Module)
**Priority:** P0 (Must Have - Foundation for all guest features)
**Estimated Effort:** 5 story points

---

## Task Breakdown

### Task 1: Database Schema Verification
**ID:** T-M6-01-01
**Type:** Backend
**Status:** Complete

**Description:**
Verify that the `access_code` column exists in the `quizzes` table with proper constraints and indexes as per ERD Guideline.

**Acceptance Criteria:**
- [x] `access_code` column exists in `quizzes` table (VARCHAR(10) or CHAR(6))
- [x] UNIQUE constraint on `access_code`
- [x] Index exists: `quizzes_access_code_idx`
- [x] Column allows NULL (for public quizzes without codes)
- [x] Migration script verified in production schema

**Dependencies:**
- Course/quiz creation feature (US-M3-01) must be complete

**Estimated Time:** 1 hour

**Notes:**
✅ Verified in `prisma/schema.prisma` - Quiz model has `accessCode String? @unique @db.Char(6)` with `@@index([accessCode])`

---

### Task 2: Zod Validation Schema
**ID:** T-M6-01-02
**Type:** Backend
**Status:** Complete

**Description:**
Create Zod validation schema for access code input in `src/lib/validators/quiz.ts`.

**Acceptance Criteria:**
- [x] Schema validates 6-character alphanumeric string
- [x] Schema is case-insensitive (accepts lowercase, converts to uppercase)
- [x] Schema rejects special characters
- [x] Schema provides clear error messages
- [x] Export schema as `accessCodeSchema`

**Code Location:**
- `src/lib/validators/quiz.ts`

**Estimated Time:** 2 hours

**Implementation Notes:**
✅ Added `accessCodeInputSchema` with trim, toUpperCase, length and regex validation
✅ Added `quizJoinRequestSchema` for API request validation
✅ Added `QuizJoinRequestInput` type export

---

### Task 3: Quiz Service Method - Find by Access Code
**ID:** T-M6-01-03
**Type:** Backend
**Status:** Complete

**Description:**
Add `findByAccessCode` method to quiz service for case-insensitive lookup.

**Acceptance Criteria:**
- [x] Method accepts access code string parameter
- [x] Query uses `UPPER(access_code)` for case-insensitive comparison
- [x] Returns quiz with teacher relation (for teacher name)
- [x] Returns quiz with question count
- [x] Returns null if not found
- [x] Uses index for O(1) lookup performance

**Code Location:**
- `src/services/quiz.service.ts`

**Estimated Time:** 2 hours

**Implementation Notes:**
✅ Added `findByAccessCode` method with case-insensitive Prisma query
✅ Added `validateAccessCode` method with Zod validation
✅ Returns quiz details with teacher name and question count

---

### Task 4: API Route Handler - Join Quiz
**ID:** T-M6-01-04
**Type:** Backend
**Status:** Complete

**Description:**
Create POST `/api/v1/quizzes/join` route handler for access code validation.

**Acceptance Criteria:**
- [x] Route at `/api/v1/quizzes/join` accepts POST requests
- [x] Validates request body with Zod schema
- [x] Calls `quizService.validateAccessCode`
- [x] Returns 200 OK with quiz details on success
- [x] Returns 400 Bad Request for invalid format
- [x] Returns 404 Not Found for non-existent code
- [x] Implements rate limiting (10 requests/minute per IP)
- [x] Error responses are generic (no information leakage)

**Code Location:**
- `src/app/api/v1/quizzes/join/route.ts`

**Request/Response:**
```typescript
// POST /api/v1/quizzes/join
// Request: { "accessCode": "ABC123" }
// Response: { success: true, data: { quizId, title, ... } }
```

**Estimated Time:** 4 hours

**Implementation Notes:**
✅ Created route with POST handler
✅ Implemented rate limiting (10 req/min per IP, in-memory)
✅ Generic error messages (no info leakage)
✅ Proper HTTP status codes (200, 400, 404, 429, 500)

---

### Task 5: Guest Layout
**ID:** T-M6-01-05
**Type:** Frontend
**Status:** Complete

**Description:**
Create guest layout for join and quiz-taking pages (no authentication UI).

**Acceptance Criteria:**
- [x] Layout at `/app/(guest)/layout.tsx`
- [x] Minimal design (no sidebar, no auth navigation)
- [x] Includes logo/branding
- [x] Uses Theme B (Dark mode) colors
- [x] Responsive container for content
- [x] Includes Toaster for notifications

**Code Location:**
- `src/app/(guest)/layout.tsx`

**Estimated Time:** 2 hours

**Implementation Notes:**
✅ Created minimal guest layout with dark theme
✅ Logo/branding with Material Icons
✅ Centered content layout (max-w-md)
✅ Toaster for notifications
✅ Footer with helpful text

---

### Task 6: Join Page Server Component
**ID:** T-M6-01-06
**Type:** Frontend
**Status:** Complete

**Description:**
Create `/join` page as Server Component with access code form.

**Acceptance Criteria:**
- [x] Page at `/app/(guest)/join/page.tsx`
- [x] Public route (no authentication required)
- [x] Uses guest layout (minimal, no sidebar)
- [x] Renders JoinForm client component
- [x] SEO metadata (title, description)
- [x] Responsive design (mobile-first)

**Code Location:**
- `src/app/(guest)/join/page.tsx`

**Design Reference:**
- `/docs/stitch-asset/student-join-screen.html`

**Estimated Time:** 3 hours

**Implementation Notes:**
✅ Created join page at `/app/(guest)/join/page.tsx`
✅ Public route (not in PROTECTED_PATHS)
✅ Uses guest layout
✅ Renders JoinForm client component
✅ SEO metadata (title, description)

---

### Task 7: Access Code Input Component
**ID:** T-M6-01-07
**Type:** Frontend
**Status:** Complete

**Description:**
Create reusable access code input component with 6-character boxes.

**Acceptance Criteria:**
- [x] Component at `src/components/guest/access-code-input.tsx`
- [x] 6 individual input boxes (one per character)
- [x] Auto-focus next box on input
- [x] Backspace moves to previous box
- [x] Only accepts alphanumeric characters
- [x] Converts to uppercase automatically
- [x] Accessible (ARIA labels, keyboard navigation)

**Code Location:**
- `src/components/guest/access-code-input.tsx`

**Estimated Time:** 5 hours

**Implementation Notes:**
✅ Created with all required features
✅ Paste support for 6-character codes
✅ ARIA labels for accessibility
✅ Error state styling
**ID:** T-M6-01-07
**Type:** Frontend
**Status:** Pending

**Description:**
Create guest layout for join and quiz-taking pages (no authentication UI).

**Acceptance Criteria:**
- [ ] Layout at `/app/(guest)/layout.tsx`
- [ ] Minimal design (no sidebar, no auth navigation)
- [ ] Includes logo/branding
- [ ] Uses Theme B (Dark mode) colors
- [ ] Responsive container for content
- [ ] Includes Toaster for notifications

**Code Location:**
- `src/app/(guest)/layout.tsx`

**Estimated Time:** 2 hours

---

### Task 8: Access Code Input Component
**ID:** T-M6-01-08
**Type:** Frontend
**Status:** Pending

**Description:**
Create reusable access code input component with 6-character boxes.

**Acceptance Criteria:**
- [ ] Component at `src/components/guest/access-code-input.tsx`
- [ ] 6 individual input boxes (one per character)
- [ ] Auto-focus next box on input
- [ ] Auto-submit when 6th character entered (optional)
- [ ] Backspace moves to previous box
- [ ] Only accepts alphanumeric characters
- [ ] Converts to uppercase automatically
- [ ] Visual feedback for invalid characters
- [ ] Accessible (ARIA labels, keyboard navigation)

**Code Location:**
- `src/components/guest/access-code-input.tsx`

**Design Reference:**
- Game code input from Quizizz reference screens

**Estimated Time:** 5 hours

---

### Task 9: Join Form Client Component
**ID:** T-M6-01-09
**Type:** Frontend
**Status:** Pending

**Description:**
Create client component for join form with API integration.

**Acceptance Criteria:**
- [ ] Component at `src/components/guest/join-form.tsx`
- [ ] Uses AccessCodeInput component
- [ ] Handles form submission
- [ ] Calls POST /api/v1/quizzes/join
- [ ] Shows loading state during validation
- [ ] Displays error messages from API
- [ ] Navigates to next step on success
- [ ] Uses toast notifications
- [ ] Implements 'use client' directive

**Code Location:**
- `src/components/guest/join-form.tsx`

**State Management:**
- React useState for loading, error states
- React Hook Form (optional, for form handling)
- useRouter for navigation

**Estimated Time:** 4 hours

---

### Task 10: Quiz Info Card Component
**ID:** T-M6-01-10
**Type:** Frontend
**Status:** Pending

**Description:**
Create component to display quiz information after successful code validation.

**Acceptance Criteria:**
- [ ] Component at `src/components/guest/quiz-info-card.tsx`
- [ ] Displays quiz title, teacher name, question count
- [ ] Shows time limit (or "No time limit")
- [ ] Shows description (if available)
- [ ] "Join Quiz" button to proceed
- [ ] Card design with Theme B colors
- [ ] Responsive layout
- [ ] Loading skeleton while fetching data

**Code Location:**
- `src/components/guest/quiz-info-card.tsx`

**Props:**
```typescript
interface QuizInfoCardProps {
  quizId: string
  title: string
  description?: string | null
  teacherName: string
  questionCount: number
  timeLimit?: number | null
}
```

**Estimated Time:** 4 hours

---

### Task 11: Error State Components
**ID:** T-M6-01-11
**Type:** Frontend
**Status:** Pending

**Description:**
Create reusable error state components for invalid codes and network errors.

**Acceptance Criteria:**
- [ ] Component at `src/components/guest/error-state.tsx`
- [ ] Invalid code error with retry option
- [ ] Network error with retry button
- [ ] Generic error with helpful message
- [ ] Consistent with design system
- [ ] Accessible error announcements

**Code Location:**
- `src/components/guest/error-state.tsx`

**Estimated Time:** 2 hours

---

### Task 12: Type Definitions
**ID:** T-M6-01-12
**Type:** Backend
**Status:** Pending

**Description:**
Add TypeScript type definitions for guest student join flow.

**Acceptance Criteria:**
- [ ] Types at `src/types/guest.ts` or `src/types/quiz.ts`
- [ ] `QuizJoinInput` interface (access code input)
- [ ] `QuizJoinResult` interface (API response)
- [ ] `QuizJoinError` interface (error responses)
- [ ] Export all types from `src/types/index.ts`

**Code Location:**
- `src/types/guest.ts` or `src/types/quiz.ts`

**Estimated Time:** 1 hour

---

### Task 13: Unit Tests - Backend
**ID:** T-M6-01-13
**Type:** Testing
**Status:** Pending

**Description:**
Write unit tests for backend validation and service logic.

**Acceptance Criteria:**
- [ ] Test file: `src/services/__tests__/quiz.service.test.ts`
- [ ] Test access code validation (valid/invalid formats)
- [ ] Test case-insensitive lookup
- [ ] Test quiz not found scenario
- [ ] Test error handling
- [ ] Test rate limiting logic
- [ ] All tests pass with 100% coverage for new code

**Code Location:**
- `src/services/__tests__/quiz.service.test.ts`
- `src/lib/validators/__tests__/quiz.test.ts`

**Estimated Time:** 4 hours

---

### Task 14: Unit Tests - Frontend
**ID:** T-M6-01-14
**Type:** Testing
**Status:** Pending

**Description:**
Write unit tests for frontend components.

**Acceptance Criteria:**
- [ ] Test access code input component
- [ ] Test join form submission
- [ ] Test error state display
- [ ] Test quiz info card rendering
- [ ] Mock API calls
- [ ] All tests pass

**Code Location:**
- `src/components/guest/__tests__/`

**Estimated Time:** 4 hours

---

### Task 15: Integration Tests
**ID:** T-M6-01-15
**Type:** Testing
**Status:** Pending

**Description:**
Write integration tests for API endpoint.

**Acceptance Criteria:**
- [ ] Test file: `tests/integration/api/quizzes/join.test.ts`
- [ ] Test valid code returns quiz details
- [ ] Test invalid code returns 404
- [ ] Test rate limiting
- [ ] Test request validation
- [ ] All tests pass

**Code Location:**
- `tests/integration/api/quizzes/join.test.ts`

**Estimated Time:** 3 hours

---

### Task 16: E2E Tests (Playwright)
**ID:** T-M6-01-16
**Type:** Testing
**Status:** Pending

**Description:**
Write E2E tests for complete student join flow.

**Acceptance Criteria:**
- [ ] Test file: `tests/e2e/student-join.spec.ts`
- [ ] Test successful join with valid code
- [ ] Test invalid code shows error
- [ ] Test form validation
- [ ] Test navigation to next step
- [ ] Test responsive design on mobile viewport
- [ ] All tests pass

**Code Location:**
- `tests/e2e/student-join.spec.ts`

**Estimated Time:** 4 hours

---

### Task 17: Accessibility Testing
**ID:** T-M6-01-17
**Type:** Testing
**Status:** Pending

**Description:**
Ensure join page meets WCAG 2.1 AA accessibility standards.

**Acceptance Criteria:**
- [ ] Keyboard navigation works
- [ ] Screen reader announces form correctly
- [ ] ARIA labels on all interactive elements
- [ ] Color contrast meets 4.5:1 ratio
- [ ] Focus indicators visible
- [ ] Error messages announced to screen readers
- [ ] Axe DevTools passes with no violations

**Estimated Time:** 2 hours

---

### Task 18: Performance Testing
**ID:** T-M6-01-18
**Type:** Testing
**Status:** Pending

**Description:**
Test access code lookup performance under load.

**Acceptance Criteria:**
- [ ] Query executes in < 50ms (p95)
- [ ] Index is used (verify with EXPLAIN ANALYZE)
- [ ] Test with 10,000+ quizzes in database
- [ ] Rate limiting prevents abuse
- [ ] No N+1 query issues

**Estimated Time:** 2 hours

---

### Task 19: Documentation
**ID:** T-M6-01-19
**Type:** Documentation
**Status:** Pending

**Description:**
Update documentation for the new feature.

**Acceptance Criteria:**
- [ ] API documentation for `/api/v1/quizzes/join`
- [ ] Component documentation (Storybook or MDX)
- [ ] Update user guide for students
- [ ] Update teacher guide (how to share access codes)
- [ ] Add to CHANGELOG.md

**Estimated Time:** 2 hours

---

### Task 20: Code Review and Cleanup
**ID:** T-M6-01-20
**Type:** Code Review
**Status:** Pending

**Acceptance Criteria:**
- [ ] Code reviewed by team member
- [ ] All linting passes (`npm run lint`)
- [ ] Type checking passes (`npm run typecheck`)
- [ ] No console errors or warnings
- [ ] Code formatted with Prettier
- [ ] Remove all TODO comments or convert to tasks
- [ ] Delete unused code and imports

**Estimated Time:** 2 hours

---

## Summary

| Category | Tasks | Estimated Hours |
|----------|-------|-----------------|
| Backend | 6 | 13 hours |
| Frontend | 5 | 18 hours |
| Testing | 6 | 19 hours |
| Documentation | 1 | 2 hours |
| Code Review | 1 | 2 hours |
| **Total** | **20** | **54 hours** |

**Sprint Allocation:** ~3 sprints (assuming 2-week sprints with multiple team members)

**Dependencies:**
- US-M3-01 (Create Assessment) - Must be complete for access codes to exist
- US-M6-02 (Guest Name Input) - Next step in flow, can be parallel

**Definition of Done:**
- ✅ All 20 tasks complete
- ✅ All tests passing (unit, integration, E2E)
- ✅ Accessibility audit passed
- ✅ Performance benchmarks met
- ✅ Code reviewed and merged
- ✅ Documentation updated
