## Context

This design document defines the implementation approach for Multiple Choice question creation. This is the first question type in the Question module (M4), enabling teachers to add questions to their quizzes. Multiple Choice is the foundation question type that other types will build upon.

**Current State:**
- Quiz module (M3) is implemented
- Teachers can create quizzes
- No question creation capability exists
- Question model exists in database but empty
- No question editor UI

**Constraints:**
- Must use Next.js 16 App Router with Server Components
- Must use Prisma ORM for database operations
- Must use Zod for form validation
- Must follow design system from `/docs/project/05-color-guideline.md`
- Must support 5 question types (start with MC, extensible for others)
- JSON settings for question-type-specific configuration

**Stakeholders:**
- Teachers: Need intuitive question editor
- Students: Need clear question display with shuffled options
- Product Team: Requires auto-grading capability

## Goals / Non-Goals

**Goals:**
- Create question editor UI with Multiple Choice interface
- Build option management (add/edit/remove options)
- Implement correct answer marking
- Add shuffle configuration
- Save questions to database with proper structure
- Support 2-10 options per question
- Enable/disable shuffle setting

**Non-Goals:**
- Other question types (Essay, Fill Blank, Match, Reorder) - future changes
- Question preview for students - future change
- Question bank/bulk import - future feature
- Rich text formatting in questions - future enhancement

## Decisions

### Decision 1: Question Schema with JSON Settings

**Decision:** Use existing Question model with JSON settings field.

**Rationale:**
- **Extensible**: JSON settings support different question types
- **Simple**: Single table for all question types
- **Prisma ORM**: Native JSON support in PostgreSQL
- **Future-proof**: Add new question types without schema changes

**Settings JSON Structure:**
```json
{
  "shuffle": true,              // Randomize option order
  "multipleAnswers": false,     // Allow multiple correct answers
  "optionCount": 4              // Number of options (2-10)
}
```

**Alternatives Considered:**
- *Separate table per question type*: Over-normalization, complex queries. Rejected.
- *Individual columns for each setting*: Inflexible for new types. Rejected.

### Decision 2: Option Management UI

**Decision:** Dynamic option list with add/remove buttons.

**Rationale:**
- **Flexible**: Teachers control number of options (2-10)
- **Intuitive**: Visual interface with clear actions
- **Efficient**: No unnecessary clicks for standard 4 options

**UI Pattern:**
```
[Option A text input]  [Correct checkbox]  [Remove button]
[Option B text input]  [Correct checkbox]  [Remove button]
[Option C text input]  [Correct checkbox]  [Remove button]
[Option D text input]  [Correct checkbox]  [Remove button]
[+ Add Option]
```

**Alternatives Considered:**
- *Fixed 4 options only*: Too limiting. Rejected.
- *Separate page for options*: Too many clicks. Rejected.

### Decision 3: Client-Side Question Editor

**Decision:** Use Client Component for question editor with React Hook Form.

**Rationale:**
- **Interactivity**: Dynamic option add/remove
- **Validation**: Immediate feedback on errors
- **State Management**: Complex form state (options, correct answers)
- **UX**: Smooth user experience without page reloads

**Implementation:**
```typescript
'use client'

export function QuestionEditor({ quizId }: { quizId: string }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(questionSchema)
  })
  
  const [options, setOptions] = useState<Option[]>([])
  
  // Add/remove options dynamically
  // Mark correct answers
  // Save to server
}
```

**Alternatives Considered:**
- *Server Component with progressive enhancement*: Complex for dynamic UI. Rejected.
- *Pure Server Action form*: Poor UX for option management. Rejected.

### Decision 4: Color-Coded Options

**Decision:** Use distinct colors for options (A, B, C, D) following design system.

**Rationale:**
- **Visual Clarity**: Easy to distinguish options
- **Consistency**: Matches Quizizz-style interface
- **Accessibility**: Color + letter labels

**Color Mapping:**
- Option A: Purple (#8b5cf6)
- Option B: Blue (#3b82f6)
- Option C: Orange (#f97316)
- Option D: Pink (#ec4899)

**Alternatives Considered:**
- *Monochrome options*: Less engaging. Rejected.
- *User-selectable colors*: Unnecessary complexity. Rejected.

### Decision 5: Shuffle as Default Setting

**Decision:** Shuffle disabled by default, teacher enables if needed.

**Rationale:**
- **Control**: Teacher decides if shuffle is appropriate
- **Predictability**: Same order for all students by default
- **Common Use Case**: Most quizzes don't need shuffle

**Implementation:**
```typescript
const settings = {
  shuffle: false,  // Default
  multipleAnswers: false,
}
```

**Alternatives Considered:**
- *Shuffle enabled by default*: Might break some question types (e.g., "all of the above"). Rejected.
- *No shuffle option*: Limits question variety. Rejected.

## Risks / Trade-offs

### Risk 1: JSON Settings Complexity

**Risk:** JSON schema not enforced, potential for invalid settings.

**Mitigation:**
- Zod schema validation on server
- TypeScript types for settings
- Default values for missing fields
- Migration scripts for schema changes

### Risk 2: Option Order Management

**Risk:** Managing option order with shuffle can be confusing.

**Mitigation:**
- Store original order (sortOrder)
- Shuffle only for student display
- Teacher always sees original order
- Clear UI indicators

### Risk 3: Multiple Correct Answers Complexity

**Risk:** Supporting multiple correct answers adds grading complexity.

**Mitigation:**
- Start with single correct answer (MVP)
- Add multipleAnswers setting for future
- Grading logic handles both cases
- Document behavior clearly

## Migration Plan

### Phase 1: Database Schema Verification

1. Verify Question model has required fields
2. Verify QuestionOption model has required fields
3. Check JSON settings support
4. Run Prisma generate

### Phase 2: Question Editor UI

1. Create question editor page
2. Build Multiple Choice component
3. Add option management
4. Implement correct answer marking

### Phase 3: Server Actions

1. Create save question action
2. Create update question action
3. Create delete question action
4. Add validation

### Phase 4: Integration

1. Add questions to quiz editor
2. Display question list in quiz
3. Reorder questions
4. Preview questions

### Phase 5: Testing

1. Test question creation
2. Test option management
3. Test shuffle functionality
4. Test editing/deleting

## Open Questions

1. **Rich Text in Questions:** Support formatting (bold, italic, images)?
   - *Recommendation:* Plain text for MVP, rich text later
   - *Decision:* Start with plain text, add media URL field

2. **Option Limit:** What's reasonable max options?
   - *Options:* 6, 8, 10, unlimited
   - *Recommendation:* 10 options max

3. **Minimum Options:** Require 2, 3, or 4 options?
   - *Options:* 2 (true/false), 3 (minimum), 4 (standard)
   - *Recommendation:* 2 minimum (supports true/false)

4. **Question Bank:** Reuse questions across quizzes?
   - *Options:* No (per quiz), Yes (shared bank)
   - *Recommendation:* Per quiz for MVP, bank later

---

*This design document is part of the `us-m4-01-multiple-choice-questions` change*
*Created: 1 March 2026*
*Updated: 1 March 2026*
