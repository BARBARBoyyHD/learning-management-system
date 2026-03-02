## 1. Layout and Navigation

- [x] 1.1 Create `src/app/(dashboard)/layout.tsx` with sidebar navigation
- [x] 1.2 Create `src/components/layout/dashboard-sidebar.tsx` with navigation links
- [x] 1.3 Add responsive sidebar (collapsible on mobile/tablet)
- [x] 1.4 Apply Theme B (Dark) CSS variables to dashboard layout
- [x] 1.5 Add active state highlighting for current page

## 2. Dashboard Page

- [x] 2.1 Create `src/app/(dashboard)/dashboard/page.tsx` as Server Component
- [x] 2.2 Fetch initial quiz data server-side
- [x] 2.3 Create `src/components/dashboard/statistics-cards.tsx` component
- [x] 2.4 Display counts: total, published, draft, archived quizzes
- [ ] 2.5 Add loading skeletons for statistics cards
- [x] 2.6 Handle empty state (no quizzes)

## 3. Quiz List Component

- [x] 3.1 Create `src/components/quizzes/quiz-list.tsx` as Client Component
- [ ] 3.2 Set up TanStack Query for quiz data fetching
- [x] 3.3 Create `src/components/quizzes/quiz-card.tsx` for individual quiz display
- [x] 3.4 Display quiz title, status badge, question count, last modified
- [x] 3.5 Show access code for private quizzes
- [ ] 3.6 Implement pagination (20 quizzes per page)
- [ ] 3.7 Add loading skeletons for quiz cards

## 4. Search and Filter

- [x] 4.1 Create `src/components/quizzes/quiz-filters.tsx` with tab navigation
- [x] 4.2 Implement status filter tabs: All | Draft | Published | Archived
- [x] 4.3 Create search input component with debouncing
- [x] 4.4 Implement client-side search by quiz title
- [ ] 4.5 Combine filter and search functionality
- [ ] 4.6 Preserve filter state in URL query params

## 5. Quiz Actions

- [ ] 5.1 Create `src/components/quizzes/quiz-actions.tsx` component
- [ ] 5.2 Implement edit button (navigates to placeholder edit page)
- [ ] 5.3 Implement duplicate action with API call
- [ ] 5.4 Implement delete action with confirmation dialog
- [ ] 5.5 Implement publish/unpublish toggle
- [ ] 5.6 Add optimistic updates for all actions
- [ ] 5.7 Handle action errors with toast notifications

## 6. API and Data Layer

- [ ] 6.1 Create `src/repositories/quiz.repository.ts` with Prisma methods
- [ ] 6.2 Create `src/services/quiz.service.ts` with business logic
- [ ] 6.3 Create `GET /api/v1/quizzes` route handler
- [ ] 6.4 Create `POST /api/v1/quizzes/:id/duplicate` route handler
- [ ] 6.5 Create `DELETE /api/v1/quizzes/:id` route handler
- [ ] 6.6 Create `PUT /api/v1/quizzes/:id/publish` route handler
- [ ] 6.7 Add Zod validation for all API endpoints
- [ ] 6.8 Add error handling and proper HTTP status codes

## 7. Hooks and Utilities

- [ ] 7.1 Create `src/hooks/use-quizzes.ts` with TanStack Query hooks
- [ ] 7.2 Create `src/hooks/use-quiz-actions.ts` for mutation hooks
- [ ] 7.3 Create `src/lib/validators/quiz.ts` with Zod schemas
- [ ] 7.4 Create `src/types/quiz.ts` with TypeScript type definitions
- [ ] 7.5 Create `src/lib/api/quizzes.ts` with API client functions

## 8. Styling and Theme

- [x] 8.1 Apply Theme B (Dark) to all dashboard components
- [x] 8.2 Use Deep Purple (#6a25f4) for primary actions
- [x] 8.3 Style status badges (draft=gray, published=green, archived=gray)
- [x] 8.4 Add hover states and transitions for interactive elements
- [x] 8.5 Ensure responsive layout works on tablet and desktop
- [x] 8.6 Add Lexend font to dashboard pages

## 9. Testing

- [ ] 9.1 Write unit tests for quiz repository methods
- [ ] 9.2 Write unit tests for quiz service methods
- [ ] 9.3 Write integration tests for quiz API endpoints
- [ ] 9.4 Write E2E test: Teacher views dashboard with quizzes
- [ ] 9.5 Write E2E test: Teacher filters quizzes by status
- [ ] 9.6 Write E2E test: Teacher searches quizzes by title
- [ ] 9.7 Write E2E test: Teacher deletes quiz with confirmation
- [ ] 9.8 Write E2E test: Teacher duplicates quiz
- [ ] 9.9 Run all tests and fix failures

## 10. Documentation and Cleanup

- [ ] 10.1 Add JSDoc comments to all public functions
- [ ] 10.2 Add inline comments for complex logic
- [ ] 10.3 Update README.md with dashboard feature documentation
- [ ] 10.4 Add API documentation for new endpoints
- [ ] 10.5 Run `npm run lint` and fix all issues
- [ ] 10.6 Run `npm run typecheck` and resolve all type errors
- [ ] 10.7 Run `npm run build` and ensure no compile errors
- [ ] 10.8 Create commit with conventional commit message

---

## Implementation Notes

**BRD Reference:**
- FR-M2-01: Teacher Dashboard
- BO-03: Support 1000+ concurrent quiz takers (scalable dashboard)

**Dependencies:**
- Requires `teacher-email-registration` change to be implemented first
- Requires teacher authentication to access dashboard

**Database:**
- Uses existing `quizzes` table
- No new migrations required

**API Endpoints:**
```
GET    /api/v1/quizzes              - List teacher's quizzes
POST   /api/v1/quizzes/:id/duplicate - Duplicate quiz
DELETE /api/v1/quizzes/:id          - Delete quiz
PUT    /api/v1/quizzes/:id/publish   - Publish/unpublish quiz
```

**Success Criteria:**
- ✅ Dashboard loads with quiz statistics
- ✅ Quiz list displays with search and filter
- ✅ All quiz actions work (edit, delete, duplicate, publish)
- ✅ Optimistic updates provide instant feedback
- ✅ Theme B (Dark) applied consistently
- ✅ All tests pass (unit, integration, E2E)
- ✅ Build completes without errors
