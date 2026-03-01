## 1. Server Action

- [x] 1.1 Create `src/actions/auth/logout.ts` Server Action
- [x] 1.2 Import Supabase server client
- [x] 1.3 Implement `supabase.auth.signOut()` call
- [x] 1.4 Add redirect to `/login` after logout
- [x] 1.5 Add error handling for logout failures

## 2. UI Integration

- [x] 2.1 Update `src/components/layout/dashboard-sidebar.tsx` logout button
- [x] 2.2 Import logout Server Action
- [x] 2.3 Add onClick handler to call logout action
- [x] 2.4 Add loading state during logout
- [x] 2.5 Clear TanStack Query cache after logout (via redirect)

## 3. Testing

- [ ] 3.1 Write unit test: Server Action calls signOut
- [ ] 3.2 Write integration test: Logout redirects to login
- [ ] 3.3 Write E2E test: Teacher can logout from dashboard
- [ ] 3.4 Write E2E test: Protected routes redirect after logout
- [ ] 3.5 Run all tests and fix failures

## 4. Documentation and Cleanup

- [ ] 4.1 Add JSDoc comments to logout Server Action
- [ ] 4.2 Run `npm run lint` and fix all issues
- [x] 4.3 Run `npm run typecheck` and resolve all type errors
- [ ] 4.4 Run `npm run build` and ensure no compile errors
- [ ] 4.5 Create commit with conventional commit message

---

## Implementation Notes

**BRD Reference:**
- US-M1-04: Teacher Logout
- FR-M1-02: Session Security

**Dependencies:**
- Requires `teacher-email-registration` change to be implemented first
- Uses existing Supabase Auth configuration

**Success Criteria:**
- ✅ Teacher can click logout button in sidebar
- ✅ Session is properly invalidated via Supabase Auth
- ✅ User is redirected to login page
- ✅ Protected routes redirect to login after logout
- ✅ All tests pass (unit, integration, E2E)
- ✅ Build completes without errors
