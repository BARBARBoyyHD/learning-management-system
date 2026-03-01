## Context

This design document defines the implementation approach for quiz time limit functionality. Building on the assessment module (M3), this feature enables teachers to set time constraints on quizzes and provides students with a countdown timer and auto-submission when time expires.

**Current State:**
- Assessment creation flow exists (or is being implemented)
- Quiz-taking UI exists (or is being implemented)
- No time limit field in assessments table
- No timer functionality in quiz UI
- No auto-submission logic

**Constraints:**
- Must use Prisma ORM for database operations
- Must follow design system from `/docs/project/05-color-guideline.md`
- Must implement server-side validation to prevent cheating
- Timer must persist across page refreshes
- Must work with existing quiz submission flow

**Stakeholders:**
- Teachers: Need control over quiz duration
- Students: Need clear timer display and fair time tracking
- Product Team: Requires anti-cheating measures

## Goals / Non-Goals

**Goals:**
- Add time_limit field to assessments table (INTEGER, nullable, minutes)
- Create time limit input UI in assessment editor
- Implement countdown timer component for quiz-taking
- Auto-submit quiz when time expires
- Display time warnings (5 min, 1 min, 30 sec)
- Server-side time validation
- Persist timer across page refreshes

**Non-Goals:**
- Extended time accommodations for specific students (future feature)
- Pause/resume timer functionality (future feature)
- Time-based analytics dashboard (future feature)
- Proctoring or cheating detection beyond time validation

## Decisions

### Decision 1: Database Schema - Nullable Integer for Time Limit

**Decision:** Add `timeLimit` field to Assessment model as nullable Integer.

**Rationale:**
- **Nullable**: Existing quizzes shouldn't break, default to unlimited
- **Integer (minutes)**: Simple, human-readable, easy to validate
- **Prisma ORM**: Follows existing schema conventions

**Schema:**
```prisma
model Assessment {
  // ... existing fields
  timeLimit Int? // Time limit in minutes, null = unlimited
  
  @@map("assessments")
}
```

**Alternatives Considered:**
- *Separate table for time limits*: Over-engineering for single field. Rejected.
- *Store as seconds*: Less intuitive for teachers. Rejected.
- *Required field*: Would break existing quizzes. Rejected.

### Decision 2: Client-Side Timer with Server-Side Validation

**Decision:** Use React hook for countdown timer, validate on server.

**Rationale:**
- **Client-side**: Responsive UI, real-time updates
- **Server validation**: Prevents cheating via timer manipulation
- **Sync on start**: Record start timestamp, calculate remaining on server

**Implementation:**
```typescript
// Client-side timer
function useQuizTimer(startTime: Date, timeLimitMinutes: number) {
  const [remaining, setRemaining] = useState(calculateRemaining())
  
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const elapsed = now.getTime() - startTime.getTime()
      const remaining = (timeLimitMinutes * 60 * 1000) - elapsed
      setRemaining(Math.max(0, remaining))
    }, 1000)
    
    return () => clearInterval(interval)
  }, [startTime, timeLimitMinutes])
  
  return remaining
}

// Server-side validation
const elapsed = submissionTime - startTime
if (elapsed > timeLimit * 60 * 1000) {
  // Reject or truncate answers after time limit
}
```

**Alternatives Considered:**
- *Server-side timer only*: Requires constant polling, poor UX. Rejected.
- *WebSocket for real-time sync*: Over-engineering for this use case. Rejected.

### Decision 3: Timer Persistence via Server Timestamp

**Decision:** Calculate remaining time from server timestamp, not client state.

**Rationale:**
- **Page refresh**: Timer resumes correctly from server time
- **Anti-cheating**: Can't manipulate by changing system clock
- **Simple**: Just store start_time, calculate on load

**Implementation:**
```typescript
// On quiz start
const quizAttempt = await createAttempt({
  quizId,
  startTime: new Date(), // Server timestamp
})

// On page load/refresh
const attempt = await getAttempt(attemptId)
const elapsed = Date.now() - attempt.startTime.getTime()
const remaining = timeLimit * 60000 - elapsed
```

**Alternatives Considered:**
- *Store remaining time in localStorage*: Vulnerable to manipulation. Rejected.
- *Constant server polling*: Adds load, latency. Rejected.

### Decision 4: Auto-Submit with Graceful Degradation

**Decision:** Auto-submit when timer reaches zero, save all current answers.

**Rationale:**
- **Fair**: Student's work is preserved
- **Automatic**: No manual submission needed
- **Graceful**: Handles network issues, page close

**Implementation:**
```typescript
useEffect(() => {
  if (remaining <= 0) {
    // Auto-submit
    handleSubmitQuiz({
      reason: 'time_expired',
      saveCurrentAnswers: true,
    })
  }
}, [remaining])
```

**Alternatives Considered:**
- *Lock quiz but require manual submit*: Confusing UX. Rejected.
- *Stop accepting answers immediately*: Loses work. Rejected.

### Decision 5: Visual Warnings with Color Coding

**Decision:** Display warnings at 5min (yellow), 1min (orange), 30sec (red).

**Rationale:**
- **Progressive urgency**: Escalating visual cues
- **Color system**: Follows design system semantic colors
- **Non-intrusive**: Warnings don't block quiz taking

**Color Mapping:**
- 5 minutes: `--color-warning-base` (#f59e0b)
- 1 minute: `--color-error-base` (#ef4444)
- 30 seconds: Flash red animation

**Alternatives Considered:**
- *Audio alerts*: Could be disruptive, accessibility concerns. Rejected.
- *Popup alerts*: Blocks quiz taking. Rejected.

### Decision 6: Timer Display Format MM:SS

**Decision:** Display timer as MM:SS (e.g., "29:45").

**Rationale:**
- **Standard format**: Familiar to students
- **Clear**: Shows minutes and seconds precisely
- **Compact**: Fits in header without taking much space

**Implementation:**
```typescript
function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}
```

**Alternatives Considered:**
- *Hours:Minutes:Seconds*: Unnecessary for max 3-hour quizzes. Rejected.
- *Minutes only*: Not precise enough for final seconds. Rejected.

## Risks / Trade-offs

### Risk 1: Client-Side Timer Manipulation

**Risk:** Students may try to manipulate timer via browser dev tools.

**Mitigation:**
- Server-side validation on submission
- Calculate remaining from server timestamp
- Reject answers submitted after time expiry
- Log suspicious activity for review

### Risk 2: Network Latency Affecting Timer

**Risk:** Slow network may cause timer to show incorrect time.

**Mitigation:**
- Sync with server on quiz start
- Recalculate on every page load
- Use server timestamp as source of truth
- Grace period (5 seconds) for submission

### Risk 3: Time Zone Issues

**Risk:** Server and client in different time zones.

**Mitigation:**
- Use UTC timestamps everywhere
- Store timestamps in database as UTC
- Calculate elapsed time, not absolute time

### Risk 4: Page Close Before Auto-Submit

**Risk:** Student closes tab right before time expires.

**Mitigation:**
- BeforeUnload handler to trigger submit
- Server-side timeout as fallback
- Save answers continuously (auto-save)

## Migration Plan

### Phase 1: Database Schema Update

1. Add `timeLimit` field to Assessment model
2. Create migration: `npm run db:migrate`
3. Update Prisma types

### Phase 2: Assessment Editor UI

1. Add time limit input field (optional, in minutes)
2. Add validation (1-180 minutes)
3. Save time limit with assessment

### Phase 3: Timer Component

1. Create `useQuizTimer` hook
2. Create `CountdownTimer` display component
3. Add to quiz-taking UI

### Phase 4: Auto-Submit Logic

1. Implement timer expiry detection
2. Trigger auto-submit at zero
3. Save current answers
4. Show expiry notification

### Phase 5: Server-Side Validation

1. Record quiz start time
2. Validate submission time on server
3. Reject/truncate late answers
4. Record time spent

### Phase 6: Testing

1. Test timer accuracy
2. Test page refresh persistence
3. Test auto-submit
4. Test server validation
5. Test edge cases (network loss, etc.)

## Open Questions

1. **Minimum/Maximum Time Limit:** What are reasonable bounds?
   - *Recommendation:* Min 1 minute, Max 180 minutes (3 hours)
   - *Decision:* Configurable, default 1-180

2. **Grace Period:** Should there be a grace period for submission?
   - *Options:* None, 5 seconds, 30 seconds
   - *Recommendation:* 5 seconds for network latency

3. **Auto-Save Frequency:** How often to auto-save answers?
   - *Options:* Every answer, every 30s, every 60s
   - *Recommendation:* Every answer + every 30s backup

4. **Timer Visibility:** Can teachers hide timer from students?
   - *Options:* Always visible, optional, always hidden
   - *Recommendation:* Always visible for fairness

---

*This design document is part of the `us-m3-02-quiz-time-limit` change*
*Created: 1 March 2026*
*Updated: 1 March 2026*
