## 1. Database Schema Updates

- [x] 1.1 Check if timeLimit field exists in quizzes table schema
- [x] 1.2 Add timeLimit field to Prisma schema if missing (Int?, nullable)
- [x] 1.3 Run Prisma migration to add timeLimit column
- [x] 1.4 Update Quiz type definition to include timeLimit field

## 2. API and Service Layer

- [x] 2.1 Create Zod validation schema for quiz metadata update
- [x] 2.2 Add updateQuizMetadata method to quiz.service.ts
- [x] 2.3 Create API route PUT /api/v1/quizzes/:id for metadata updates
- [x] 2.4 Add access code generation utility function
- [x] 2.5 Add concurrent edit detection (lastModified timestamp check)

## 3. Quiz Edit Page

- [x] 3.1 Create route structure /quizzes/[id]/edit/page.tsx
- [x] 3.2 Create quiz metadata edit form component (QuizMetadataForm.tsx)
- [x] 3.3 Implement title input field with validation
- [x] 3.4 Implement description textarea field
- [x] 3.5 Implement time limit input (minutes, nullable)
- [x] 3.6 Implement visibility toggle (public/private switch)
- [x] 3.7 Implement access code display and regenerate button
- [x] 3.8 Add form validation with React Hook Form and Zod
- [x] 3.9 Implement save/loading/success states
- [x] 3.10 Add error handling and conflict detection
- [x] 3.11 Implement unsaved changes warning on navigation

## 4. QuizCard Integration

- [x] 4.1 Update QuizCard component to make Edit button functional
- [x] 4.2 Add navigation handler to /quizzes/[id]/edit route
- [x] 4.3 Style Edit button hover state in quiz card actions

## 5. Testing

- [ ] 5.1 Write unit tests for quiz service update method
- [ ] 5.2 Write unit tests for access code generation
- [ ] 5.3 Write integration tests for quiz update API endpoint
- [ ] 5.4 Write E2E test for editing quiz title
- [ ] 5.5 Write E2E test for editing quiz description
- [ ] 5.6 Write E2E test for setting time limit
- [ ] 5.7 Write E2E test for changing visibility
- [ ] 5.8 Write E2E test for form validation errors
- [ ] 5.9 Write E2E test for unsaved changes warning

## 6. Documentation and Cleanup

- [x] 6.1 Add JSDoc comments to service methods
- [x] 6.2 Update API documentation with new endpoint
- [x] 6.3 Run typecheck and fix any TypeScript errors
- [x] 6.4 Run ESLint and fix code style issues
- [x] 6.5 Test build and verify no compilation errors
