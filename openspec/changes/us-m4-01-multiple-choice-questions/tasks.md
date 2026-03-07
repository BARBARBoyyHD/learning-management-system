## 1. Database Schema Verification

- [x] 1.1 Verify Question model has all required fields
- [x] 1.2 Verify QuestionOption model has all required fields
- [x] 1.3 Check questionType enum values
- [x] 1.4 Verify settings JSON field exists
- [ ] 1.5 Run `npm run db:generate` to update Prisma types
- [x] 1.6 Verify TypeScript types are correct

## 2. Zod Validation Schema

- [x] 2.1 Create `src/lib/validators/questions.ts`
- [x] 2.2 Define questionCreateSchema with questionText, questionType, points
- [x] 2.3 Define multipleChoiceSchema with options array and settings
- [x] 2.4 Define optionSchema with text, isCorrect, sortOrder
- [x] 2.5 Add validation: min 2 options, max 10 options
- [x] 2.6 Add validation: at least 1 correct answer
- [x] 2.7 Export type inferences

## 3. Question Editor Page

- [x] 3.1 Create `/quizzes/[quizId]/questions/new` route
- [x] 3.2 Create page.tsx with question editor
- [x] 3.3 Add question type selector (MC, Essay, etc.)
- [x] 3.4 Add question text input
- [x] 3.5 Add points input
- [x] 3.6 Apply Theme A (Light) color scheme
- [ ] 3.7 Test page rendering

## 4. Multiple Choice Component

- [x] 4.1 Create `src/components/questions/multiple-choice-editor.tsx`
- [x] 4.2 Add option list with A, B, C, D labels
- [x] 4.3 Add color coding for options (purple, blue, orange, pink)
- [x] 4.4 Add correct answer radio buttons
- [x] 4.5 Add shuffle checkbox
- [x] 4.6 Add "Add Option" button
- [x] 4.7 Add "Remove Option" buttons
- [x] 4.8 Limit to 10 options max
- [ ] 4.9 Test component interaction

## 5. Save Question Server Action

- [x] 5.1 Create `src/actions/questions/create.ts`
- [x] 5.2 Add "use server" directive
- [x] 5.3 Import Zod schema
- [x] 5.4 Implement createQuestion function
- [x] 5.5 Validate form data with Zod
- [x] 5.6 Check teacher authentication
- [x] 5.7 Create question in database
- [x] 5.8 Create options in database
- [x] 5.9 Save settings JSON
- [x] 5.10 Revalidate quiz page
- [x] 5.11 Return success/error result
- [x] 5.12 Handle database errors

## 6. Question List in Quiz

- [x] 6.1 Create `src/components/questions/question-list.tsx`
- [x] 6.2 Display list of questions in quiz
- [x] 6.3 Show question type icon
- [x] 6.4 Show question preview (first 50 chars)
- [x] 6.5 Show points value
- [x] 6.6 Add "Edit" button for each question
- [x] 6.7 Add "Delete" button for each question
- [x] 6.8 Add "Add Question" button
- [x] 6.9 Handle empty state
- [ ] 6.10 Test component

## 7. Edit Question Functionality

- [x] 7.1 Create `/quizzes/[quizId]/questions/[questionId]/edit` route
- [x] 7.2 Load existing question data
- [x] 7.3 Pre-fill form with question data
- [x] 7.4 Implement update question Server Action
- [x] 7.5 Handle save changes
- [ ] 7.6 Test editing flow

## 8. Delete Question Functionality

- [x] 8.1 Create delete question Server Action
- [x] 8.2 Add confirmation dialog
- [ ] 8.3 Implement optimistic update
- [x] 8.4 Handle delete success/error
- [ ] 8.5 Test delete functionality

## 9. Question Settings Helper

- [x] 9.1 Create `src/lib/question-settings.ts`
- [x] 9.2 Add defaultSettings constant
- [x] 9.3 Add validateSettings function
- [x] 9.4 Add mergeSettings function
- [x] 9.5 Add isShuffleEnabled utility
- [x] 9.6 Add getOptionCount utility
- [x] 9.7 Export utilities
- [ ] 9.8 Test helper functions

## 10. Loading and Error States

- [x] 10.1 Add loading spinner during save
- [x] 10.2 Disable submit button while loading
- [ ] 10.3 Show success toast on save
- [x] 10.4 Show error toast on failure
- [x] 10.5 Preserve form data on error
- [ ] 10.6 Test loading states
- [ ] 10.7 Test error scenarios

## 11. Question Reordering

- [ ] 11.1 Add drag-and-drop reordering
- [ ] 11.2 Update orderIndex in database
- [ ] 11.3 Optimistic update for smooth UX
- [ ] 11.4 Save order on drop
- [ ] 11.5 Test reordering

## 12. Testing

- [ ] 12.1 Write unit test: Zod validation for MC questions
- [ ] 12.2 Write unit test: Min/max options validation
- [ ] 12.3 Write unit test: Correct answer validation
- [ ] 12.4 Write integration test: Create question Server Action
- [ ] 12.5 Write integration test: Update question
- [ ] 12.6 Write integration test: Delete question
- [ ] 12.7 Write E2E test: Create MC question from quiz
- [ ] 12.8 Write E2E test: Edit existing question
- [ ] 12.9 Write E2E test: Delete question
- [ ] 12.10 Test shuffle setting
- [ ] 12.11 Test with 2-10 options

## 13. Design System Integration

- [ ] 13.1 Apply Theme A (Light) to question editor
- [ ] 13.2 Use primary color #6467f2 for buttons
- [ ] 13.3 Use option colors (purple, blue, orange, pink)
- [ ] 13.4 Use Lexend font family
- [ ] 13.5 Apply border radius 12px
- [ ] 13.6 Use Shadcn/ui components
- [ ] 13.7 Ensure WCAG 2.1 AA contrast ratios
- [ ] 13.8 Test on light mode

## 14. Documentation

- [ ] 14.1 Add question creation to README.md
- [ ] 14.2 Document question schema
- [ ] 14.3 Document settings JSON structure
- [ ] 14.4 Add usage examples
- [ ] 14.5 Update BRD traceability matrix (FR-M4-01)

## 15. Security Review

- [ ] 15.1 Verify Server Action validates input
- [ ] 15.2 Verify teacher authentication required
- [ ] 15.3 Verify quiz ownership check
- [ ] 15.4 Test SQL injection prevention (Prisma handles)
- [ ] 15.5 Test XSS prevention (React handles)
- [ ] 15.6 Run `npm audit`

## 16. Performance Optimization

- [ ] 16.1 Optimize question list queries
- [ ] 16.2 Add caching for question data
- [ ] 16.3 Debounce option changes
- [ ] 16.4 Lazy load question editor
- [ ] 16.5 Test page load time

## 17. Accessibility Review

- [ ] 17.1 Add labels to all form fields
- [ ] 17.2 Add ARIA attributes for options
- [ ] 17.3 Add keyboard navigation support
- [ ] 17.4 Ensure focus states are visible
- [ ] 17.5 Test with screen readers
- [ ] 17.6 Verify color contrast ratios
- [ ] 17.7 Don't rely on color alone for correct answers

## 18. Deployment Checklist

- [ ] 18.1 Verify database schema is up to date
- [ ] 18.2 Test question creation on staging
- [ ] 18.3 Test editing on staging
- [ ] 18.4 Test deletion on staging
- [ ] 18.5 Monitor server logs for errors
- [ ] 18.6 Set up alerts for failed saves
- [ ] 18.7 Document rollback procedure

---

## Implementation Notes

**BRD Reference:**
- FR-M4-01: Multiple Choice Questions
- US-M4-01: As a Teacher, I want to create Multiple Choice questions so that I can evaluate factual knowledge

**Acceptance Criteria:**
- Given I am in the question editor
- When I select Multiple Choice type and input options
- Then question is saved with shuffle configuration

**Estimated Effort:** 1-2 sprints (3-5 days)

**Dependencies:**
- Quiz module (M3) - for quiz context
- Authentication (M1) - for teacher verification
- Prisma ORM - for database operations
- Question and QuestionOption models exist

**Success Criteria:**
- ✅ Teacher can create MC questions with 2-10 options
- ✅ At least one correct answer required
- ✅ Shuffle setting configurable
- ✅ Questions saved to database with correct structure
- ✅ Questions appear in quiz editor
- ✅ All tests pass (unit, integration, E2E)

**Database Schema:**
```prisma
model Question {
  id           String   @id @default(uuid())
  quizId       String
  questionType String   @db.VarChar(30) // 'multiple_choice', 'essay', etc.
  questionText String   @db.Text
  mediaUrl     String?  @db.Text
  settings     Json     @default("{}")
  points       Int      @default(10)
  orderIndex   Int
  
  quiz    Quiz             @relation(fields: [quizId], references: [id], onDelete: Cascade)
  options QuestionOption[]
  
  @@index([quizId])
  @@map("questions")
}

model QuestionOption {
  id         String  @id @default(uuid())
  questionId String
  option     String  @db.Text // Option text
  sortOrder  Int
  isCorrect  Boolean @default(false)
  
  question Question @relation(fields: [questionId], references: [id], onDelete: Cascade)
  
  @@index([questionId])
  @@map("question_options")
}
```

**Settings JSON Structure:**
```json
{
  "shuffle": true,
  "multipleAnswers": false,
  "optionCount": 4
}
```

**Design System Reference:**
- Theme: Theme A (Light) for question editor
- Primary Color: #6467f2 (Indigo)
- Option Colors: Purple #8b5cf6, Blue #3b82f6, Orange #f97316, Pink #ec4899
- Font: Lexend
- Border Radius: 12px default
- Reference: `/docs/project/05-color-guideline.md`
