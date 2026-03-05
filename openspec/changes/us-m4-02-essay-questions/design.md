## Context

This design document defines the implementation approach for Essay question creation. This is the second question type in the Question module (M4), building upon the Multiple Choice foundation. Essay questions enable teachers to assess deep understanding and critical thinking, but require manual grading.

**Current State:**
- Multiple Choice questions implemented (M4-01)
- Question editor exists with MC support
- Question model supports multiple types via questionType field
- Settings JSON available for type-specific configuration
- No essay question UI or grading workflow

**Constraints:**
- Must use existing Question model with questionType field
- Must use JSON settings for essay-specific fields
- Must integrate with existing question editor
- Must follow design system from `/docs/project/05-color-guideline.md`
- Manual grading interface is out of scope (future feature)

**Stakeholders:**
- Teachers: Need to assess higher-order thinking
- Students: Need clear essay prompts and word limits
- Graders: Need rubrics for consistent grading

## Goals / Non-Goals

**Goals:**
- Add Essay question type to question editor
- Create essay-specific fields (rubric, word limit)
- Mark essays as requiring manual grading
- Display essay indicator in question list
- Integrate with existing question creation flow
- Support 0-5000 word limit range

**Non-Goals:**
- Manual grading interface - future change
- Auto-grading essays - not feasible with current tech
- Rubric scoring system - future feature
- Essay submission UI for students - future change
- Annotation/feedback tools - future enhancement

## Decisions

### Decision 1: Question Type Selector

**Decision:** Add dropdown/tabs to select question type (MC, Essay).

**Rationale:**
- **Clear**: Obvious which type is selected
- **Extensible**: Easy to add more types later
- **Dynamic**: Form fields change based on type
- **Pattern**: Common UX pattern for multi-type forms

**Implementation:**
```typescript
const [questionType, setQuestionType] = useState<'multiple_choice' | 'essay'>('multiple_choice')

{questionType === 'essay' && <EssayFields />}
{questionType === 'multiple_choice' && <MultipleChoiceFields />}
```

**Alternatives Considered:**
- *Separate pages per type*: More navigation, harder to switch. Rejected.
- *All fields always shown*: Confusing, cluttered. Rejected.

### Decision 2: Essay Settings JSON Structure

**Decision:** Store essay-specific settings in JSON field.

**Rationale:**
- **Consistent**: Same pattern as MC shuffle settings
- **Flexible**: Easy to add new essay settings
- **Queryable**: Can query by settings fields if needed

**Settings Structure:**
```json
{
  "requiresManualGrading": true,
  "rubric": "Look for key points: A, B, C...",
  "wordLimit": 500,
  "wordLimitMin": 0
}
```

**Alternatives Considered:**
- *Separate columns*: Inflexible for future types. Rejected.
- *Separate table*: Over-engineering for simple settings. Rejected.

### Decision 3: Manual Grading Flag

**Decision:** Set `requiresManualGrading: true` for all essay questions.

**Rationale:**
- **Clear**: Explicit flag for grading system
- **Query-able**: Easy to find questions needing grading
- **Extensible**: MC can have manual grading too (if needed)

**Implementation:**
```typescript
const settings = {
  requiresManualGrading: true, // Always true for essays
  rubric,
  wordLimit,
}
```

**Alternatives Considered:**
- *Infer from questionType*: Less explicit, requires type check. Rejected.
- *Separate gradingType field*: Redundant with requiresManualGrading. Rejected.

### Decision 4: Rubric as Optional Text Area

**Decision:** Rubric is optional multi-line text field.

**Rationale:**
- **Flexible**: Teachers can write any grading guidelines
- **Optional**: Not all essays need detailed rubrics
- **Simple**: No complex rubric builder for MVP

**UI Pattern:**
```
Grading Rubric (Optional)
[Multi-line text area]
Describe what you're looking for in a good answer...
```

**Alternatives Considered:**
- *Required rubric*: Too restrictive. Rejected.
- *Rubric builder UI*: Too complex for MVP. Rejected.
- *Rich text editor*: Unnecessary for MVP. Rejected.

### Decision 5: Word Limit Range 0-5000

**Decision:** Word limit optional, range 0-5000 words.

**Rationale:**
- **Flexible**: Can be unlimited (0) or restricted
- **Reasonable max**: 5000 words covers even long essays
- **Student guidance**: Helps students know expectations

**Validation:**
- Min: 0 (unlimited)
- Max: 5000
- Default: 0 (unlimited)

**Alternatives Considered:**
- *Required word limit*: Too restrictive. Rejected.
- *Lower max (1000)*: Too short for some essays. Rejected.
- *Character limit instead*: Less intuitive for teachers. Rejected.

### Decision 6: Question List Indicators

**Decision:** Show essay icon + "Manual grading" badge.

**Rationale:**
- **Visual distinction**: Easy to spot essay questions
- **Grading info**: Teachers know what needs manual grading
- **Consistent**: Follows MC badge pattern

**UI Design:**
- Icon: 📝 (FileText or Edit icon)
- Color: Blue (different from MC purple)
- Badge: "Manual grading" or "Essay"

**Alternatives Considered:**
- *No special indicator*: Hard to distinguish from MC. Rejected.
- *Different list section*: Fragments question list. Rejected.

## Risks / Trade-offs

### Risk 1: Manual Grading Workload

**Risk:** Teachers may not realize essays require manual grading.

**Mitigation:**
- Clear "Manual grading" badge on question list
- Warning on save: "This question requires manual grading"
- Future: Grading queue/notification system

### Risk 2: Inconsistent Grading

**Risk:** Without rubric, grading may be inconsistent.

**Mitigation:**
- Rubric field (optional) encourages consistency
- Future: Rubric scoring templates
- Future: Multiple grader support

### Risk 3: Word Limit Enforcement

**Risk:** Students may exceed word limit.

**Mitigation:**
- Word limit is guidance for MVP
- Future: Hard enforcement with counter
- Future: Warning at 90% of limit

## Migration Plan

### Phase 1: Update Question Editor

1. Add question type selector
2. Create EssayFields component
3. Update validation for essay type
4. Test type switching

### Phase 2: Server Actions

1. Update createQuestion to handle essay type
2. Update updateQuestion to handle essay type
3. Add essay-specific validation
4. Test save/update

### Phase 3: Question List

1. Update question list to show essay icon
2. Add "Manual grading" badge
3. Test display

### Phase 4: Testing

1. Test essay creation
2. Test editing
3. Test question list display
4. Test validation

## Open Questions

1. **Rich Text for Rubric:** Support formatting in rubric?
   - *Recommendation:* Plain text for MVP, rich text later
   - *Decision:* Plain text

2. **Suggested Word Count:** Show suggested vs. hard limit?
   - *Options:* Suggested (soft), Hard (enforced)
   - *Recommendation:* Suggested for MVP

3. **Sample Answer:** Allow teachers to add sample answer?
   - *Options:* Yes (for graders), No
   - *Recommendation:* Future feature

4. **Grading Time Estimate:** Estimate grading time based on word limit?
   - *Options:* Yes, No
   - *Recommendation:* Future feature

---

*This design document is part of the `us-m4-02-essay-questions` change*
*Created: 1 March 2026*
*Updated: 1 March 2026*
