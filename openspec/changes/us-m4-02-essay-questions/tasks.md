## 1. Update Zod Validation Schema

- [x] 1.1 Add essayQuestionSchema to questions.ts
- [x] 1.2 Define essaySettingsSchema with rubric, wordLimit, requiresManualGrading
- [x] 1.3 Add validation: wordLimit 0-5000
- [x] 1.4 Add requiresManualGrading: true default
- [x] 1.5 Update questionCreateSchema union to include essay
- [x] 1.6 Export EssayQuestion type
- [x] 1.7 Test schema validation

## 2. Question Type Selector

- [x] 2.1 Add question type state to editor
- [x] 2.2 Create type selector UI (tabs or dropdown)
- [x] 2.3 Add MC and Essay options
- [x] 2.4 Show/hide fields based on type
- [x] 2.5 Update form submission to include type
- [ ] 2.6 Test type switching

## 3. Essay Fields Component

- [x] 3.1 Create `src/components/questions/essay-fields.tsx`
- [x] 3.2 Add rubric text area (optional)
- [x] 3.3 Add word limit input (0-5000)
- [x] 3.4 Add helper text for each field
- [x] 3.5 Add validation feedback
- [x] 3.6 Apply design system tokens
- [ ] 3.7 Test component

## 4. Update Multiple Choice Editor

- [x] 4.1 Extract MC-specific fields to component
- [x] 4.2 Accept questionType prop
- [x] 4.3 Conditionally render MC fields
- [x] 4.4 Test MC creation still works

## 5. Update Save Question Server Action

- [x] 5.1 Update createQuestion to handle essay type
- [x] 5.2 Parse essay settings from formData
- [x] 5.3 Validate essay-specific fields
- [x] 5.4 Save requiresManualGrading flag
- [ ] 5.5 Test essay question creation

## 6. Update Question List Display

- [x] 6.1 Add essay question type icon
- [x] 6.2 Add "Manual grading" badge for essays
- [x] 6.3 Add essay color coding (blue)
- [x] 6.4 Update getQuestionTypeDisplay function
- [ ] 6.5 Test question list display

## 7. Edit Essay Question

- [x] 7.1 Load essay question data
- [x] 7.2 Pre-fill essay fields
- [x] 7.3 Update updateQuestion Server Action
- [ ] 7.4 Test editing essay questions

## 8. Validation and Error States

- [x] 8.1 Validate word limit range (0-5000)
- [x] 8.2 Show error for negative word limit
- [x] 8.3 Show error for word limit > 5000
- [x] 8.4 Validate question text required
- [ ] 8.5 Test error scenarios

## 9. Question Type Icons

- [x] 9.1 Add essay icon (FileText or Edit)
- [x] 9.2 Add MC icon (already exists)
- [x] 9.3 Map types to colors
- [x] 9.4 Test icon display

## 10. Testing

- [ ] 10.1 Write unit test: Essay schema validation
- [ ] 10.2 Write unit test: Word limit validation
- [ ] 10.3 Write integration test: Create essay question
- [ ] 10.4 Write integration test: Update essay question
- [ ] 10.5 Write E2E test: Create essay from quiz
- [ ] 10.6 Write E2E test: Edit essay question
- [ ] 10.7 Test question type switching
- [ ] 10.8 Test question list display

## 11. Documentation

- [ ] 11.1 Add essay questions to README.md
- [ ] 11.2 Document essay settings schema
- [ ] 11.3 Add usage examples
- [ ] 11.4 Update BRD traceability matrix (FR-M4-02)

## 12. Design System Integration

- [x] 12.1 Apply Theme A (Light) to essay fields
- [x] 12.2 Use primary color #6467f2 for buttons
- [x] 12.3 Use blue for essay type indicator
- [x] 12.4 Use Lexend font family
- [x] 12.5 Apply border radius 12px
- [ ] 12.6 Ensure WCAG 2.1 AA contrast ratios

---

## Implementation Notes

**BRD Reference:**
- FR-M4-02: Essay Questions
- US-M4-02: As a Teacher, I want to create Essay questions so that I can evaluate deep understanding

**Acceptance Criteria:**
- Given I am in the question editor
- When I select Essay type
- Then question is marked as requiring manual grading

**Estimated Effort:** 1 sprint (2-3 days)

**Dependencies:**
- Multiple Choice questions (M4-01) - for question editor foundation
- Authentication (M1) - for teacher verification
- Prisma ORM - for database operations

**Success Criteria:**
- ✅ Teacher can create essay questions
- ✅ Essay questions marked as requiring manual grading
- ✅ Rubric and word limit fields available
- ✅ Question list shows essay indicator
- ✅ All tests pass (unit, integration, E2E)

**Database Schema:**
```prisma
model Question {
  // ... existing fields
  questionType String @db.VarChar(30) // 'multiple_choice' | 'essay' | ...
  settings     Json  @default("{}")
}

// Essay settings structure:
{
  "requiresManualGrading": true,
  "rubric": "string",
  "wordLimit": 500
}
```

**Design System Reference:**
- Theme: Theme A (Light) for question editor
- Primary Color: #6467f2 (Indigo)
- Essay Type Color: Blue (#3b82f6)
- Font: Lexend
- Border Radius: 12px default
- Reference: `/docs/project/05-color-guideline.md`
