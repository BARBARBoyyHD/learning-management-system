## 1. Database Schema

- [x] 1.1 Add Assessment model to Prisma schema
- [x] 1.2 Define fields: id, courseId, teacherId, title, description, status, settings, createdAt, updatedAt
- [x] 1.3 Add course relationship with foreign key
- [x] 1.4 Add teacher relationship with foreign key
- [x] 1.5 Add questions relation (one-to-many)
- [x] 1.6 Set default status to "draft"
- [x] 1.7 Set default settings to empty JSON object
- [x] 1.8 Add indexes on courseId and teacherId
- [x] 1.9 Run `npm run db:generate` to update Prisma types
- [x] 1.10 Run `npm run db:migrate` to apply schema changes
- [x] 1.11 Verify migration in database
- [x] 1.12 Update TypeScript types

**Note:** Current schema uses `Quiz` model (standalone, no course dependency). Quiz has: id, teacherId, title, description, isPublic, accessCode. 
For MVP quiz creation, the existing schema is sufficient. Add `settings` JSON field later for timeLimit, shuffleQuestions, maxAttempts.

## 2. Zod Validation Schema

- [x] 2.1 Create `src/lib/validators/assessment.ts`
- [x] 2.2 Define assessmentCreateSchema with title (required, max 200), description (optional, max 2000)
- [x] 2.3 Add settings schema: timeLimit, shuffleQuestions, maxAttempts
- [x] 2.4 Add assessmentUpdateSchema (partial of create schema)
- [x] 2.5 Export type inferences: AssessmentCreateInput, AssessmentUpdateInput
- [x] 2.6 Add custom error messages
- [x] 2.7 Test schema with valid and invalid inputs

## 3. Create Assessment Server Action

- [x] 3.1 Create `src/actions/assessments/create.ts`
- [x] 3.2 Add "use server" directive
- [x] 3.3 Import Zod schema and Prisma client
- [x] 3.4 Implement createAssessment function with formData parameters
- [x] 3.5 Parse and validate form data with Zod
- [x] 3.6 Check current user is authenticated (requireAuth)
- [x] 3.7 Verify user owns the course (permission check)
- [x] 3.8 Create assessment in database with draft status (isPublic = false)
- [x] 3.9 Revalidate dashboard page cache
- [x] 3.10 Return success with assessment or error
- [x] 3.11 Handle database errors
- [x] 3.12 Test Server Action

## 4. Assessment Editor Page

- [x] 4.1 Create directory `/quizzes/new`
- [x] 4.2 Create `page.tsx` for quiz editor
- [x] 4.3 Add page header "Create Quiz"
- [x] 4.4 Import quiz form component
- [x] 4.5 Handle success redirect (via Server Action)
- [x] 4.6 Apply Theme A (Light) color scheme
- [x] 4.7 Test page rendering

## 5. Assessment Form Component

- [x] 5.1 Create `src/components/assessments/assessment-form.tsx`
- [x] 5.2 Set up React Hook Form with zodResolver
- [x] 5.3 Add title input field with validation
- [x] 5.4 Add description textarea (optional)
- [x] 5.5 Add time limit input (optional, number field)
- [x] 5.6 Add shuffle questions checkbox
- [x] 5.7 Add max attempts input (optional)
- [x] 5.8 Add submit button ("Save Quiz")
- [x] 5.9 Add cancel button (back to dashboard)
- [x] 5.10 Display form errors inline
- [x] 5.11 Add loading state during submission
- [x] 5.12 Apply design system tokens

## 6. Dashboard Integration

- [ ] 6.1 Add "Create Quiz" button to teacher dashboard page
- [ ] 6.2 Position button prominently (near dashboard header)
- [ ] 6.3 Link to `/quizzes/new`
- [ ] 6.4 Create quiz list section on dashboard
- [ ] 6.5 Display quiz cards with title, description, status (isPublic)
- [ ] 6.6 Add "Draft" badge for private quizzes (isPublic = false)
- [ ] 6.7 Handle empty state (no quizzes yet)
- [ ] 6.8 Add "Edit/View" links for each quiz
- [ ] 6.9 Show success message when quiz created (?created=<id>)
- [ ] 6.10 Test integration

## 7. Quiz List Component

- [ ] 7.1 Create `src/components/quizzes/quiz-list.tsx`
- [ ] 7.2 Accept quizzes array as prop
- [ ] 7.3 Display grid of quiz cards
- [ ] 7.4 Show title, description preview, status (isPublic)
- [ ] 7.5 Add draft/published badge
- [ ] 7.6 Add "Edit" button for each quiz
- [ ] 7.7 Add "View" button for published quizzes
- [ ] 7.8 Responsive layout (mobile/desktop)
- [ ] 7.9 Test component rendering

## 8. Quiz Card Component

- [ ] 8.1 Create `src/components/quizzes/quiz-card.tsx`
- [ ] 8.2 Display quiz title
- [ ] 8.3 Show description preview (truncated)
- [ ] 8.4 Show status badge (draft/published)
- [ ] 8.5 Show question count (if available)
- [ ] 8.6 Show access code (for private quizzes)
- [ ] 8.7 Add hover effects
- [ ] 8.8 Apply design system tokens
- [ ] 8.9 Test component

## 9. Permission Checks

- [ ] 9.1 Implement course ownership check in Server Action
- [ ] 9.2 Return 403 Forbidden for non-owners
- [ ] 9.3 Add authentication check (requireAuth)
- [ ] 9.4 Handle unauthorized errors in UI
- [ ] 9.5 Test permission scenarios
- [ ] 9.6 Test with course owner
- [ ] 9.7 Test with non-owner
- [ ] 9.8 Test with unauthenticated user

## 10. Settings JSON Helper

- [ ] 10.1 Create `src/lib/assessment-settings.ts`
- [ ] 10.2 Add defaultSettings constant
- [ ] 10.3 Add validateSettings function
- [ ] 10.4 Add mergeSettings function (for updates)
- [ ] 10.5 Add getTimeLimit utility
- [ ] 10.6 Add isShuffleEnabled utility
- [ ] 10.7 Export utilities
- [ ] 10.8 Test helper functions

## 11. Loading and Error States

- [ ] 11.1 Add loading spinner during form submission
- [ ] 11.2 Disable submit button while loading
- [ ] 11.3 Show success toast on save
- [ ] 11.4 Show error toast on failure
- [ ] 11.5 Add retry mechanism for network errors
- [ ] 11.6 Preserve form data on error
- [ ] 11.7 Test loading states
- [ ] 11.8 Test error scenarios

## 12. Form Auto-Save (Optional)

- [ ] 12.1 Implement auto-save draft every 30 seconds
- [ ] 12.2 Add "Saving..." indicator
- [ ] 12.3 Add "Saved" confirmation
- [ ] 12.4 Debounce save calls
- [ ] 12.5 Handle auto-save errors silently
- [ ] 12.6 Test auto-save functionality

## 13. Navigation and Routing

- [ ] 13.1 Add breadcrumb navigation
- [ ] 13.2 "Back to Course" link
- [ ] 13.3 Redirect to course detail on cancel
- [ ] 13.4 Redirect to course detail on success
- [ ] 13.5 Handle browser back button
- [ ] 13.6 Test navigation flow

## 14. Testing

- [ ] 14.1 Write unit test: Zod validation rejects empty title
- [ ] 14.2 Write unit test: Zod validation accepts valid data
- [ ] 14.3 Write unit test: Settings schema validation
- [ ] 14.4 Write integration test: Server Action creates assessment
- [ ] 14.5 Write integration test: Permission check works
- [ ] 14.6 Write E2E test: Teacher creates assessment from course
- [ ] 14.7 Write E2E test: Form validation displays errors
- [ ] 14.8 Write E2E test: Draft assessment appears in list
- [ ] 14.9 Test with invalid course ID
- [ ] 14.10 Test with non-owner teacher
- [ ] 14.11 Test redirect after save

## 15. Design System Integration

- [ ] 15.1 Apply Theme A (Light) to assessment editor
- [ ] 15.2 Use primary color #6467f2 for buttons
- [ ] 15.3 Use Lexend font family
- [ ] 15.4 Apply border radius 12px to inputs and cards
- [ ] 15.5 Use Shadcn/ui components
- [ ] 15.6 Ensure WCAG 2.1 AA contrast ratios
- [ ] 15.7 Test on light mode
- [ ] 15.8 Test responsive design

## 16. Documentation

- [ ] 16.1 Add assessment creation to README.md
- [ ] 16.2 Document database schema
- [ ] 16.3 Document API endpoint (if using API routes)
- [ ] 16.4 Document Server Action usage
- [ ] 16.5 Add usage examples
- [ ] 16.6 Update BRD traceability matrix (FR-M3-01)

## 17. Security Review

- [ ] 17.1 Verify Server Action validates input
- [ ] 17.2 Verify permission checks in place
- [ ] 17.3 Verify authentication required
- [ ] 17.4 Test SQL injection prevention (Prisma handles)
- [ ] 17.5 Test XSS prevention (React handles)
- [ ] 17.6 Verify CSRF protection
- [ ] 17.7 Run `npm audit`

## 18. Performance Optimization

- [ ] 18.1 Add database indexes on courseId and teacherId
- [ ] 18.2 Optimize Prisma queries (select only needed fields)
- [ ] 18.3 Add caching for assessment list
- [ ] 18.4 Debounce form validation
- [ ] 18.5 Lazy load assessment editor if needed
- [ ] 18.6 Test page load time

## 19. Accessibility Review

- [ ] 19.1 Add labels to all form fields
- [ ] 19.2 Add ARIA attributes for error messages
- [ ] 19.3 Add keyboard navigation support
- [ ] 19.4 Ensure focus states are visible
- [ ] 19.5 Test with screen readers
- [ ] 19.6 Verify color contrast ratios
- [ ] 19.7 Add skip links

## 20. Deployment Checklist

- [ ] 20.1 Run database migration on production
- [ ] 20.2 Verify schema changes applied
- [ ] 20.3 Test assessment creation on staging
- [ ] 20.4 Test permission checks on staging
- [ ] 20.5 Monitor server logs for errors
- [ ] 20.6 Set up alerts for failed creations
- [ ] 20.7 Document rollback procedure

---

## Implementation Notes

**BRD Reference:**
- FR-M3-01: Quiz Creation
- US-M3-01: As a Teacher, I want to create a quiz so that I can evaluate students

**Acceptance Criteria:**
- Given I am a teacher
- When I click "Create Quiz" and fill the form
- Then quiz is created with me as owner

**Estimated Effort:** 1 sprint (2-3 days)

**Dependencies:**
- Authentication (M1) - for teacher verification
- Prisma ORM - for database operations
- Quiz model exists (no course dependency)

**Success Criteria:**
- ✅ Teacher can create quiz from dashboard
- ✅ Quiz form validates input correctly
- ✅ Quiz is created with draft status (isPublic = false)
- ✅ Only quiz owner can edit/delete their quizzes
- ✅ Quiz appears in teacher's quiz list
- ✅ All tests pass (unit, integration, E2E)

**Database Schema:**
```prisma
model Quiz {
  id          String   @id @default(uuid())
  teacherId   String
  title       String   @db.VarChar(200)
  description String?  @db.Text
  isPublic    Boolean  @default(false)
  accessCode  String?  @unique @db.Char(6)
  createdAt   DateTime @default(now())
  
  teacher   User      @relation(fields: [teacherId], references: [id])
  questions Question[]
  
  @@index([teacherId])
  @@map("quizzes")
}
```

**Design System Reference:**
- Theme: Theme A (Light) for teacher-facing editor
- Primary Color: #6467f2 (Indigo)
- Font: Lexend
- Border Radius: 12px default
- Reference: `/docs/project/05-color-guideline.md`
