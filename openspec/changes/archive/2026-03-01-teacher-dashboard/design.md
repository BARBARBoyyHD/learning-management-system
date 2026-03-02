## Context

This design document defines the implementation approach for the teacher dashboard. The project currently has teacher authentication implemented (via `teacher-email-registration` change) but no landing page after login. Teachers can register and log in, but have nowhere to go. The dashboard serves as the main entry point for all quiz management workflows.

**Current State:**
- Teacher authentication working (Supabase Auth + local users table)
- No dashboard or landing page exists
- No quiz listing or management UI
- Database has `quizzes` table defined but no UI to interact with it

**Constraints:**
- Must use Theme B (Dark) with Deep Purple primary color for teacher screens
- Must follow Next.js 16 App Router patterns (Server Components default)
- Must use TanStack Query for client-side state management
- Must be responsive (desktop and tablet)
- Quiz creation is a separate change (this change is dashboard-only)

**Stakeholders:**
- Teachers: Need quick overview of their quizzes and easy navigation
- Development Team: Wants clean architecture for future quiz creation feature

## Goals / Non-Goals

**Goals:**
- Implement teacher dashboard as Server Component at `/dashboard`
- Display quiz statistics (total, published, draft, archived counts)
- Show quiz listing with search and status filtering
- Provide quick actions (edit, delete, duplicate, publish/unpublish)
- Apply Theme B (Dark) styling consistently
- Implement sidebar navigation for teacher area

**Non-Goals:**
- Quiz creation form (separate change: `quiz-creation`)
- Question editor (separate change)
- Quiz analytics or performance metrics (future enhancement)
- Student-facing dashboard (separate epic)
- Course grouping (future change)

## Decisions

### Decision 1: Dashboard as Hybrid Server/Client Component

**Decision:** Implement dashboard page as Server Component with client-side QuizList component using TanStack Query.

**Rationale:**
- Initial page load is read-only (quiz list, stats) - perfect for Server Components
- Search, filter, and actions need client-side interactivity
- Reduces initial bundle size by keeping heavy interactions client-side
- Follows Next.js 16 best practices

**Implementation:**
```tsx
// src/app/(dashboard)/dashboard/page.tsx - Server Component
import { getQuizzes } from '@/lib/api/quizzes'

export default async function DashboardPage() {
  const quizzes = await getQuizzes()
  
  return (
    <DashboardLayout>
      <StatisticsCards quizzes={quizzes} />
      <QuizList initialQuizzes={quizzes} /> {/* Client Component */}
    </DashboardLayout>
  )
}
```

**Alternatives Considered:**
- *Full Client Component*: More re-renders, larger bundle, worse SEO. Rejected.
- *Full Server Component*: Poor UX for search/filter (full page reloads). Rejected.

### Decision 2: TanStack Query for Quiz State

**Decision:** Use TanStack Query for client-side quiz state management with optimistic updates.

**Rationale:**
- Automatic caching and refetching
- Optimistic updates for instant UI feedback
- Built-in loading and error states
- Standard pattern in the codebase

**Implementation:**
```tsx
// src/hooks/use-quizzes.ts
export function useQuizzes() {
  return useQuery({
    queryKey: ['quizzes'],
    queryFn: () => fetchQuizzes(),
  })
}

export function useDeleteQuiz() {
  return useMutation({
    mutationFn: deleteQuiz,
    onMutate: async (quizId) => {
      // Optimistic update
    },
  })
}
```

**Alternatives Considered:**
- *Zustand/Jotai*: More boilerplate, no built-in server sync. Rejected.
- *React Context*: No caching, manual state management. Rejected.

### Decision 3: Sidebar Navigation Layout

**Decision:** Implement fixed sidebar navigation for teacher dashboard area.

**Rationale:**
- Consistent navigation across all teacher pages
- Easy to add new sections (Quizzes, Reports, Settings)
- Standard pattern for admin/teacher dashboards
- Works well with responsive design (collapsible on mobile)

**Implementation:**
```tsx
// src/app/(dashboard)/layout.tsx
export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  )
}
```

**Alternatives Considered:**
- *Top navigation bar*: Less space for content, harder to scale. Rejected.
- *No layout (per-page nav)*: Inconsistent UX, code duplication. Rejected.

### Decision 4: Theme B (Dark) via CSS Variables

**Decision:** Apply Theme B using CSS variables and data-theme attribute.

**Rationale:**
- Consistent with design system
- Easy to switch themes if needed
- CSS variables for runtime theme switching
- Tailwind CSS 4 supports CSS variables natively

**Implementation:**
```css
/* globals.css */
:root[data-theme="dark"] {
  --color-primary-base: #6a25f4;
  --color-bg-primary: #0f172a;
  --color-text-primary: #f8fafc;
}
```

```tsx
// src/app/(dashboard)/layout.tsx
<html data-theme="dark">
```

**Alternatives Considered:**
- *Tailwind dark mode class*: Less flexible, harder to customize. Rejected.
- *CSS-in-JS themes*: More runtime overhead. Rejected.

### Decision 5: API Endpoint for Quiz Listing

**Decision:** Create `GET /api/v1/quizzes` endpoint for fetching teacher's quizzes.

**Rationale:**
- RESTful pattern consistent with API versioning
- Server-side filtering and pagination support
- Easy to test independently
- Supports future mobile app integration

**Implementation:**
```tsx
// src/app/api/v1/quizzes/route.ts
export async function GET(request: NextRequest) {
  const user = await requireAuth(request)
  const quizzes = await quizService.getByTeacher(user.id)
  return NextResponse.json(quizzes)
}
```

**Alternatives Considered:**
- *Server Action*: Tightly coupled to React, harder to test. Rejected.
- *Direct Prisma in component*: No separation of concerns. Rejected.

### Decision 6: Status Filter as Tabs

**Decision:** Implement quiz status filter as tab navigation (All | Draft | Published | Archived).

**Rationale:**
- Clear visual indication of current filter
- Easy to switch between statuses
- Standard pattern for filtered lists
- Works well with client-side filtering

**Implementation:**
```tsx
<Tabs defaultValue="all">
  <TabsList>
    <TabsTrigger value="all">All</TabsTrigger>
    <TabsTrigger value="draft">Draft</TabsTrigger>
    <TabsTrigger value="published">Published</TabsTrigger>
    <TabsTrigger value="archived">Archived</TabsTrigger>
  </TabsList>
</Tabs>
```

**Alternatives Considered:**
- *Dropdown select*: Less visible, more clicks. Rejected.
- *Checkbox filters*: Confusing for mutually exclusive statuses. Rejected.

## Risks / Trade-offs

### Risk 1: Large Quiz List Performance

**Risk:** Teachers with 100+ quizzes may experience slow initial load.

**Mitigation:**
- Implement pagination (20 quizzes per page)
- Add virtual scrolling for long lists
- Add database indexes on `teacher_id` and `created_at`

### Risk 2: Optimistic Update Rollback

**Risk:** If delete fails after optimistic update, UI may be inconsistent.

**Mitigation:**
- Implement proper `onError` rollback in TanStack Query
- Show toast notification on failure
- Add retry logic for transient failures

### Trade-off: No Real-time Updates

**Trade-off:** Dashboard won't show real-time changes from other devices.

**Rationale:**
- Adds complexity (WebSockets/polling)
- Not critical for MVP
- Can add later with Supabase Realtime

**Future Enhancement:**
- Add Supabase Realtime subscription for live updates
- Invalidate TanStack Query on real-time events

### Trade-off: Client-side Search

**Trade-off:** Search is client-side (filters existing data) not server-side.

**Rationale:**
- Simpler implementation for MVP
- Fast enough for <100 quizzes
- No API calls on every keystroke

**Future Enhancement:**
- Move to server-side search for large datasets
- Add debounced API calls
- Implement full-text search

## Migration Plan

### Phase 1: Setup
1. Create dashboard layout with sidebar
2. Set up Theme B (Dark) CSS variables
3. Create basic page structure

### Phase 2: Data Layer
1. Create quiz repository methods
2. Create quiz service layer
3. Create API route `GET /api/v1/quizzes`

### Phase 3: UI Components
1. Create StatisticsCards component
2. Create QuizList component with TanStack Query
3. Create QuizCard component
4. Create search and filter UI

### Phase 4: Actions
1. Implement delete action with confirmation
2. Implement duplicate action
3. Implement publish/unpublish toggle
4. Add optimistic updates

### Phase 5: Polish
1. Add loading states and skeletons
2. Add error handling and retry
3. Add empty state
4. Test responsive layout

### Rollback Strategy
- No database migrations = easy rollback
- Simply don't deploy new pages
- Existing authentication continues to work

## Open Questions

1. **Quiz Creation Navigation**: Where does "Create Quiz" button navigate to?
   - *Recommendation*: Navigate to `/quizzes/create` (placeholder page for now)
   - *Decision*: Will be implemented in `quiz-creation` change

2. **Edit Quiz Navigation**: Where does "Edit" button navigate to?
   - *Recommendation*: Navigate to `/quizzes/:id/edit` (placeholder for now)
   - *Decision*: Will be implemented in `quiz-creation` change

3. **Quiz Creation Dependency**: Should we wait for quiz creation feature?
   - *Recommendation*: No, dashboard provides value even with empty state
   - *Decision*: Implement dashboard first, quiz creation later

---

*This design document is part of the `teacher-dashboard` change*
*Created: 1 March 2026*
