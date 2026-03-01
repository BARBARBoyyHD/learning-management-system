## Context

This design document defines the implementation approach for assessment creation functionality. This is a foundational feature for the Assessment module (M3), enabling teachers to create assessments within their courses. The feature includes an assessment editor UI, form validation, API endpoint, and database schema.

**Current State:**
- Course module (M2) is implemented or being implemented
- Teachers can create and manage courses
- No assessment creation capability exists
- No assessments table in database
- No assessment editor UI

**Constraints:**
- Must use Next.js 16 App Router with Server Components
- Must use Prisma ORM for database operations
- Must use Zod for form validation
- Must follow design system from `/docs/project/05-color-guideline.md`
- Must integrate with existing course structure
- Only course owners can create assessments in their courses

**Stakeholders:**
- Teachers: Need simple, intuitive assessment creation
- Product Team: Requires draft workflow for quality control
- Development Team: Wants extensible schema for future features

## Goals / Non-Goals

**Goals:**
- Create assessments table with proper schema
- Build assessment editor UI with form validation
- Implement API endpoint for assessment creation
- Add "Create Assessment" button to course detail
- Display assessment list on course detail page
- Default to draft status for new assessments
- Store assessment settings as JSON for extensibility

**Non-Goals:**
- Question creation and management (separate change: M3-03)
- Time limit configuration (separate change: M3-02, but schema supports it)
- Assessment publishing workflow (future change)
- Student quiz taking (M4 module)
- Grading and reporting (M5 module)

## Decisions

### Decision 1: Database Schema - Assessments Table

**Decision:** Create `assessments` table with course and teacher relationships.

**Rationale:**
- **course_id**: Links assessment to parent course
- **teacher_id**: Tracks assessment owner for permissions
- **status**: draft/published/archived for workflow management
- **settings JSON**: Extensible for time_limit, shuffle, attempts, etc.
- **Prisma ORM**: Follows existing project conventions

**Schema:**
```prisma
model Assessment {
  id          String   @id @default(uuid())
  courseId    String
  teacherId   String
  title       String
  description String?
  status      String   @default("draft") // draft, published, archived
  settings    Json     @default("{}")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  course      Course   @relation(fields: [courseId], references: [id])
  teacher     User     @relation(fields: [teacherId], references: [id])
  questions   Question[]
  
  @@map("assessments")
}
```

**Settings JSON Structure:**
```json
{
  "timeLimit": 30,           // minutes, null = unlimited
  "shuffleQuestions": true,   // randomize question order
  "maxAttempts": 3,          // null = unlimited attempts
  "showCorrectAnswers": true, // show after submission
  "passingScore": 70         // percentage
}
```

**Alternatives Considered:**
- *Separate settings table*: Over-normalization for MVP. Rejected.
- *Individual columns for each setting*: Inflexible for future additions. Rejected.

### Decision 2: Assessment Editor as Separate Route

**Decision:** Create assessment editor at `/courses/:courseId/assessments/new`.

**Rationale:**
- **Clear URL structure**: Indicates course context
- **Next.js conventions**: Follows App Router patterns
- **Easy navigation**: Back to course detail is simple
- **Future-proof**: Can add `/assessments/:id/edit` later

**Route Structure:**
```
/courses/:courseId/assessments/new   - Create assessment
/courses/:courseId/asssemblies       - List assessments
/assessments/:id                     - View/take assessment (future)
```

**Alternatives Considered:**
- *Modal dialog*: Limited space, poor UX for complex forms. Rejected.
- *Same page inline edit*: Clutters course detail. Rejected.

### Decision 3: Form Validation with Zod + React Hook Form

**Decision:** Use React Hook Form with Zod schema validation.

**Rationale:**
- **Client-side validation**: Immediate feedback
- **Server-side validation**: Security, data integrity
- **Shared schemas**: Same Zod schema on both sides
- **Type inference**: TypeScript types from schema
- **Project standard**: Consistent with auth module

**Implementation:**
```typescript
// Schema
const assessmentSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(2000).optional(),
  timeLimit: z.number().min(1).max(180).nullish(),
  shuffleQuestions: z.boolean().default(false),
  maxAttempts: z.number().min(1).nullish(),
})

// Form
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(assessmentSchema)
})
```

**Alternatives Considered:**
- *Manual validation*: Repetitive, error-prone. Rejected.
- *Formik*: More boilerplate, React Hook Form is project standard. Rejected.

### Decision 4: Server Action for Form Submission

**Decision:** Use Next.js 16 Server Action for assessment creation.

**Rationale:**
- **Security**: Server-side validation, no exposed API keys
- **Simplicity**: No separate API route needed
- **Performance**: Direct database access, no HTTP overhead
- **Error handling**: Clear error messages to UI
- **Best practices**: Follows Next.js 16 patterns

**Implementation:**
```typescript
// src/actions/assessments/create.ts
'use server'

export async function createAssessment(
  courseId: string,
  formData: FormData
): Promise<Result<Assessment>> {
  // Validate with Zod
  // Check permissions (teacher owns course)
  // Create assessment in database
  // Revalidate course page cache
}
```

**Alternatives Considered:**
- *API Route*: More verbose, separate endpoint. Rejected for MVP.
- *Client-side fetch*: Unnecessary for same-origin requests. Rejected.

### Decision 5: Draft Status by Default

**Decision:** New assessments are created with status = 'draft'.

**Rationale:**
- **Quality control**: Teachers can review before publishing
- **Workflow**: Create → Add questions → Test → Publish
- **Safety**: Prevents accidental student access
- **Flexibility**: Can publish when ready

**Status Workflow:**
```
draft → published → archived
  ↑         ↓
  └─────────┘ (can unpublish)
```

**Visibility Rules:**
- **Draft**: Only teacher sees
- **Published**: Teacher and students see
- **Archived**: Teacher sees (read-only), students cannot access

**Alternatives Considered:**
- *Published by default*: Risk of incomplete assessments. Rejected.
- *Explicit publish step*: Adds friction. Rejected for MVP.

### Decision 6: Course Permission Check

**Decision:** Verify teacher owns course before creating assessment.

**Rationale:**
- **Security**: Prevents unauthorized assessment creation
- **Data integrity**: Only course owner can modify
- **Clear ownership**: Avoids confusion about who manages assessments

**Implementation:**
```typescript
// Check permissions
const course = await prisma.course.findUnique({
  where: { id: courseId },
  select: { teacherId: true }
})

if (course.teacherId !== currentUser.id) {
  throw new Error('Unauthorized')
}
```

**Alternatives Considered:**
- *Co-teachers can create*: More complex permissions. Future feature.
- *Any teacher can create*: Security risk. Rejected.

### Decision 7: Design System - Theme A for Editor

**Decision:** Use Theme A (Light, Indigo #6467f2) for assessment editor.

**Rationale:**
- **Consistency**: Matches assessment editor reference UI
- **Student-facing vs Teacher-facing**: Editor uses light theme
- **Design system**: Follows `/docs/project/05-color-guideline.md`

**Color Tokens:**
- Primary: `#6467f2` (Indigo)
- Background: `#ffffff` (White)
- Secondary background: `#f9fafb`
- Text: `#111827` (Gray 900)

**Alternatives Considered:**
- *Theme B (Dark)*: Used for quiz taking, not editor. Rejected.
- *Custom colors*: Violates design system. Rejected.

## Risks / Trade-offs

### Risk 1: Schema Changes for Future Features

**Risk:** Settings JSON may need restructuring as features grow.

**Mitigation:**
- Design JSON schema with extensibility in mind
- Version settings if major changes needed
- Migrate existing assessments when schema changes
- Acceptable trade-off for MVP flexibility

### Risk 2: Draft/Published Confusion

**Risk:** Teachers may forget to publish assessments.

**Mitigation:**
- Clear "Draft" badges on assessment list
- Reminder to publish before sharing with students
- "Publish" button prominently displayed
- Email notification option when publishing

### Risk 3: Course Permission Complexity

**Risk:** Co-teaching scenarios not supported initially.

**Mitigation:**
- Start with single owner model
- Add co-teacher roles in future iteration
- Document limitation clearly
- Acceptable for MVP

### Risk 4: Form State Loss on Navigation

**Risk:** Teachers lose work if they navigate away.

**Mitigation:**
- Auto-save draft periodically
- BeforeUnload warning if form has changes
- LocalStorage backup (optional)
- Clear "Save Draft" button

## Migration Plan

### Phase 1: Database Schema

1. Add Assessment model to Prisma schema
2. Add relationships to Course and User
3. Run `npm run db:migrate`
4. Verify tables created correctly

### Phase 2: Server Action

1. Create `src/actions/assessments/create.ts`
2. Implement Zod validation
3. Implement permission check
4. Create assessment in database
5. Handle errors

### Phase 3: Assessment Editor UI

1. Create `/courses/:courseId/assessments/new/page.tsx`
2. Build assessment form component
3. Add form fields (title, description, settings)
4. Implement validation display
5. Add loading state

### Phase 4: Course Detail Integration

1. Add "Create Assessment" button to course detail
2. Create assessment list component
3. Display draft/published status
4. Handle empty state
5. Link to assessment editor

### Phase 5: Testing

1. Test form validation
2. Test permission checks
3. Test assessment creation flow
4. Test draft visibility
5. Test error scenarios

## Open Questions

1. **Assessment Settings:** Which settings for MVP?
   - *Recommendation:* timeLimit, shuffleQuestions, maxAttempts
   - *Decision:* Start with these three, add more later

2. **Rich Text Description:** Should description support formatting?
   - *Options:* Plain text, Markdown, Rich text editor
   - *Recommendation:* Plain text for MVP, Markdown later

3. **Auto-save:** Should we auto-save drafts?
   - *Options:* Manual save only, auto-save every 30s, auto-save on blur
   - *Recommendation:* Manual save for MVP, auto-save later

4. **Assessment Type:** Support different assessment types?
   - *Options:* Quiz only, Quiz + Assignment, Multiple types
   - *Recommendation:* Quiz only for MVP, extensible schema

---

*This design document is part of the `us-m3-01-create-assessment` change*
*Created: 1 March 2026*
*Updated: 1 March 2026*
