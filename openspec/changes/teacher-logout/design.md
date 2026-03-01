## Context

This design document defines the implementation approach for teacher logout. The project currently has teacher authentication implemented (via `teacher-email-registration` change) with Supabase Auth, but no logout functionality. Teachers can log in and access the dashboard, but cannot securely end their session. This is a security requirement for any authentication system.

**Current State:**
- Teacher authentication working (Supabase Auth + local users table)
- Dashboard with sidebar navigation exists
- Logout button placeholder exists in sidebar but not functional
- No Server Action for logout

**Constraints:**
- Must use Supabase Auth for session management
- Must properly invalidate server-side session
- Must clear client-side auth state
- Must redirect to login page after logout

**Stakeholders:**
- Teachers: Need secure session termination
- Security: Proper token invalidation required

## Goals / Non-Goals

**Goals:**
- Implement logout Server Action using Supabase Auth signOut
- Add functional logout button in sidebar
- Properly invalidate session cookies
- Redirect to login page after logout
- Clear client-side auth state

**Non-Goals:**
- Logout confirmation dialog (can be added later)
- Session timeout warning (separate feature)
- Multiple device session management (future enhancement)
- Activity logging for logout events (future enhancement)

## Decisions

### Decision 1: Server Action for Logout

**Decision:** Implement logout as a Server Action rather than API route.

**Rationale:**
- Simpler integration with React forms
- Automatic CSRF protection
- Better integration with Next.js navigation
- Reduced client-side code
- Follows Next.js 16 best practices

**Implementation:**
```typescript
// src/actions/auth/logout.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
```

**Alternatives Considered:**
- *API Route*: More verbose, requires fetch call. Rejected.
- *Client-side only*: Security concerns, cookies not properly cleared. Rejected.

### Decision 2: Supabase Auth signOut Method

**Decision:** Use Supabase Auth's built-in `signOut()` method for session invalidation.

**Rationale:**
- Properly clears HTTP-only cookies
- Invalidates tokens server-side
- Handles all session cleanup automatically
- Battle-tested by Supabase

**Implementation:**
```typescript
const supabase = await createClient()
await supabase.auth.signOut()
```

**Alternatives Considered:**
- *Manual cookie deletion*: Error-prone, might miss server-side session. Rejected.
- *Token invalidation only*: Doesn't clear cookies properly. Rejected.

### Decision 3: Redirect to Login Page

**Decision:** Redirect to `/login` page after successful logout.

**Rationale:**
- Standard UX pattern
- Clear indication that session has ended
- Easy to implement with Next.js `redirect()`
- Consistent with authentication flow

**Implementation:**
```typescript
import { redirect } from 'next/navigation'

export async function logout() {
  // ... signOut logic
  redirect('/login')
}
```

**Alternatives Considered:**
- *Redirect to homepage*: Less clear, user might expect to still be logged in. Rejected.
- *Show logout confirmation page*: Extra step, unnecessary friction. Rejected.

### Decision 4: Client-Side Auth State Clearing

**Decision:** Clear client-side auth state by calling `useQuery` invalidation after logout.

**Rationale:**
- TanStack Query may have cached auth state
- Ensures UI reflects logged-out state immediately
- Prevents stale data display

**Implementation:**
```typescript
// In sidebar component
const queryClient = useQueryClient()
const handleLogout = async () => {
  await logout() // Server Action
  queryClient.clear() // Clear all cached data
}
```

**Alternatives Considered:**
- *Rely on redirect only*: May have stale cached state. Rejected.
- *Manual state reset*: More complex, error-prone. Rejected.

## Risks / Trade-offs

### Risk 1: Logout Fails Silently

**Risk:** If `signOut()` fails, user might think they logged out but session is still active.

**Mitigation:**
- Add error handling in Server Action
- Show error toast if logout fails
- Log error for debugging

### Risk 2: Client Navigates Away During Logout

**Risk:** User navigates away before logout completes.

**Mitigation:**
- Server Action is atomic - either completes or doesn't
- Supabase handles session cleanup on server
- Token expiry ensures eventual invalidation

### Trade-off: No Confirmation Dialog

**Trade-off:** Logout happens immediately without confirmation.

**Rationale:**
- Faster UX (one click vs two)
- Accidental logout is rare and easily fixed (just log in again)
- Standard pattern for most web apps

**Future Enhancement:**
- Add optional confirmation dialog in settings
- Show confirmation for unsaved work only

## Migration Plan

### Phase 1: Server Action
1. Create `src/actions/auth/logout.ts`
2. Implement Supabase `signOut()` call
3. Add redirect to `/login`

### Phase 2: UI Integration
1. Update sidebar logout button to call Server Action
2. Add loading state during logout
3. Clear TanStack Query cache after logout

### Phase 3: Testing
1. Test logout from various pages
2. Verify redirect works correctly
3. Verify session is properly invalidated
4. Test that protected routes redirect after logout

### Rollback Strategy
- Simply remove logout button from sidebar
- Existing authentication continues to work
- No database changes to rollback

## Open Questions

1. **Loading State**: Should we show a loading spinner during logout?
   - *Recommendation*: Yes, brief feedback that action is processing
   - *Decision*: Implement with simple loading state

2. **Error Handling**: What if logout fails?
   - *Recommendation*: Show error toast, force redirect anyway
   - *Decision*: Implement basic error handling

---

*This design document is part of the `teacher-logout` change*
*Created: 1 March 2026*
