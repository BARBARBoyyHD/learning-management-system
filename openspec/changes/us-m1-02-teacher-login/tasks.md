## 1. Supabase Login Server Action

- [x] 1.1 Create `src/actions/auth/login.ts` Server Action
- [x] 1.2 Import Supabase server client from `@/lib/supabase/server`
- [x] 1.3 Import Zod validation schema from `@/lib/validators/auth`
- [x] 1.4 Implement formData parsing with email and password fields
- [x] 1.5 Call supabase.auth.signInWithPassword() with credentials
- [x] 1.6 Handle Supabase errors (invalid credentials, unverified account)
- [x] 1.7 Return success response with redirect to dashboard
- [x] 1.8 Add "use server" directive at top of file
- [ ] 1.9 Test Server Action in development environment

## 2. Zod Validation Schema

- [x] 2.1 Create `src/lib/validators/auth.ts`
- [x] 2.2 Define loginSchema with email (email format) and password (min 8 chars)
- [x] 2.3 Export type inference: LoginInput
- [x] 2.4 Add custom error messages for validation failures
- [x] 2.5 Export schema for use in client and server
- [ ] 2.6 Test schema with valid and invalid inputs

## 3. Login Form Component

- [x] 3.1 Create `src/components/auth/login-form.tsx` Client Component
- [x] 3.2 Import useForm from react-hook-form and zodResolver
- [x] 3.3 Implement form with email and password fields
- [x] 3.4 Add client-side validation with Zod schema
- [x] 3.5 Add error display for server-side errors
- [x] 3.6 Add loading state during form submission
- [ ] 3.7 Add "Remember me" checkbox (optional, future enhancement)
- [ ] 3.8 Add "Forgot password?" link (future feature)
- [x] 3.9 Add "Don't have an account? Register" link
- [x] 3.10 Apply design system tokens (Theme B - Dark: primary #6a25f4)
- [ ] 3.11 Use Lexend font family
- [x] 3.12 Use Shadcn/ui components (Input, Button, Label, Form)
- [ ] 3.13 Test form submission and error handling

## 4. Login Page

- [x] 4.1 Create `src/app/(auth)/login/page.tsx`
- [x] 4.2 Import login form component
- [x] 4.3 Add page title: "Teacher Login"
- [ ] 4.4 Add app logo/branding
- [x] 4.5 Apply auth layout from `(auth)` route group
- [x] 4.6 Use Theme B (Dark) color scheme
- [x] 4.7 Add responsive design for mobile/tablet/desktop
- [ ] 4.8 Test page rendering and form display

## 5. Supabase Session Utilities

- [x] 5.1 Create `src/hooks/use-auth.ts` React hook
- [x] 5.2 Implement useAuth hook for client-side session access
- [x] 5.3 Use useQuery from TanStack Query for session fetching
- [x] 5.4 Implement session refresh logic
- [x] 5.5 Export useAuth for use in components
- [x] 5.6 Create `src/lib/supabase/session.ts` utilities
- [x] 5.7 Add getSession() utility function
- [x] 5.8 Add requireAuth() utility for protected routes
- [x] 5.9 Test session utilities in development

## 6. Middleware for Protected Routes

- [x] 6.1 Create `src/middleware.ts` at project root
- [x] 6.2 Import createServerClient from @supabase/ssr
- [x] 6.3 Implement Supabase session check in middleware
- [x] 6.4 Define protected route paths: /dashboard, /courses, /assessments
- [x] 6.5 Redirect unauthenticated users to /login
- [x] 6.6 Redirect authenticated users away from /login to /dashboard
- [x] 6.7 Add matcher configuration for route filtering
- [x] 6.8 Handle cookie forwarding to Supabase client
- [x] 6.9 Test middleware on all protected routes
- [x] 6.10 Test redirect logic for authenticated/unauthenticated users

## 7. Error Handling Components

- [x] 7.1 Create `src/components/auth/auth-error.tsx`
- [x] 7.2 Implement error display with toast/notification
- [x] 7.3 Add error types: invalid credentials, unverified, network
- [x] 7.4 Add "Resend verification email" button for unverified accounts
- [x] 7.5 Create resend verification Server Action
- [x] 7.6 Implement resend verification UI component
- [x] 7.7 Add loading state for resend action
- [x] 7.8 Test error scenarios and user feedback

## 8. API Route Protection

- [x] 8.1 Create `src/lib/auth.ts` authentication utilities
- [x] 8.2 Implement requireAuth() function for API routes
- [x] 8.3 Add session validation for /api/v1/* routes
- [x] 8.4 Return 401 Unauthorized for invalid/missing sessions
- [x] 8.5 Add user object to request for authenticated routes
- [x] 8.6 Test API route protection with/without sessions

## 9. Testing

- [ ] 9.1 Write unit test: Zod validation rejects invalid email format
- [ ] 9.2 Write unit test: Zod validation rejects empty email
- [ ] 9.3 Write unit test: Zod validation rejects password < 8 chars
- [ ] 9.4 Write unit test: Zod validation rejects empty password
- [ ] 9.5 Write integration test: Supabase signInWithPassword creates session
- [ ] 9.6 Write integration test: Invalid credentials returns error
- [ ] 9.7 Write integration test: Unverified account returns specific error
- [ ] 9.8 Write E2E test: Full login flow (navigate → login → dashboard)
- [ ] 9.9 Write E2E test: Protected route redirects to login
- [ ] 9.10 Write E2E test: Authenticated user redirected from login to dashboard
- [ ] 9.11 Test error scenario: Network failure handling
- [ ] 9.12 Test error scenario: Rate limiting (too many attempts)
- [ ] 9.13 Verify session persistence across page refresh
- [ ] 9.14 Verify session expiry after 24 hours

## 10. Design System Integration

- [ ] 10.1 Apply Theme B (Dark) color scheme to login page
- [ ] 10.2 Use primary color #6a25f4 for buttons and accents
- [ ] 10.3 Use Lexend font for all text
- [ ] 10.4 Apply border radius 12px default to inputs and buttons
- [ ] 10.5 Use Material Symbols Outlined icons (visibility toggle)
- [ ] 10.6 Implement password visibility toggle with eye icon
- [ ] 10.7 Add hover/active states for interactive elements
- [ ] 10.8 Ensure WCAG 2.1 AA contrast ratios
- [ ] 10.9 Test design on light and dark mode (if applicable)

## 11. Documentation

- [ ] 11.1 Add login flow diagram to README.md
- [ ] 11.2 Document environment variables required (already set from registration)
- [ ] 11.3 Add Supabase login integration guide
- [ ] 11.4 Document protected routes and middleware configuration
- [ ] 11.5 Update BRD traceability matrix (FR-M1-02, US-M1-02)
- [ ] 11.6 Add error handling guide for authentication
- [ ] 11.7 Document session management and expiry

## 12. Security Review

- [ ] 12.1 Verify Supabase anon key is public (NEXT_PUBLIC_ prefix)
- [ ] 12.2 Verify service role key is NOT exposed (server-side only)
- [ ] 12.3 Verify HTTPS is enforced in production (Vercel default)
- [ ] 12.4 Verify HTTP-only cookies are set correctly
- [ ] 12.5 Verify SameSite=strict cookie attribute
- [ ] 12.6 Verify Secure cookie attribute in production
- [ ] 12.7 Run `npm audit` and fix any security vulnerabilities
- [ ] 12.8 Test rate limiting on Supabase auth endpoints (built-in)
- [ ] 12.9 Verify password is never logged or exposed in errors
- [ ] 12.10 Verify generic error messages (don't reveal if email exists)

## 13. Performance Optimization

- [ ] 13.1 Implement session caching in Server Components
- [ ] 13.2 Optimize middleware for edge runtime
- [ ] 13.3 Add session prefetch for faster navigation
- [ ] 13.4 Test middleware latency (< 50ms target)
- [ ] 13.5 Test login API response time (< 500ms p95)
- [ ] 13.6 Monitor Supabase auth performance in dashboard
- [ ] 13.7 Optimize bundle size for login page

## 14. Deployment Checklist

- [ ] 14.1 Verify Supabase environment variables in Vercel
- [ ] 14.2 Update Supabase site URL to production URL
- [ ] 14.3 Add production redirect URLs in Supabase dashboard
- [ ] 14.4 Test login flow on staging environment
- [ ] 14.5 Verify session persistence on staging
- [ ] 14.6 Test middleware on production-like environment
- [ ] 14.7 Monitor Supabase dashboard for auth errors
- [ ] 14.8 Set up Supabase alerts for auth failures
- [ ] 14.9 Test concurrent login from multiple devices
- [ ] 14.10 Verify production HTTPS enforcement

## 15. Accessibility Review

- [ ] 15.1 Add proper labels for form fields
- [ ] 15.2 Implement ARIA attributes for error messages
- [ ] 15.3 Add keyboard navigation support (Tab, Enter)
- [ ] 15.4 Ensure focus states are visible
- [ ] 15.5 Test with screen readers (NVDA, VoiceOver)
- [ ] 15.6 Verify color contrast ratios (WCAG 2.1 AA)
- [ ] 15.7 Add skip link for keyboard users
- [ ] 15.8 Test with browser zoom (200%)

---

## Implementation Notes

**BRD Reference:**
- FR-M1-02: Teacher Login
- US-M1-02: As a Teacher, I want to login with email and password so that I can access the dashboard

**Acceptance Criteria:**
- Given I have a verified account
- When I enter correct credentials
- Then I am redirected to the dashboard

**Estimated Effort:** 1 sprint (2-3 days)

**Dependencies:**
- teacher-email-registration change (Supabase setup complete)
- @supabase/supabase-js and @supabase/ssr packages (already installed)
- Environment variables configured (from registration setup)

**Success Criteria:**
- ✅ Teacher can login with verified email and password
- ✅ Session is created with HTTP-only cookies (24h expiry)
- ✅ Authenticated users are redirected to dashboard
- ✅ Unauthenticated users cannot access protected routes
- ✅ Invalid credentials show generic error message
- ✅ Unverified accounts show specific error with resend option
- ✅ All tests pass (unit, integration, E2E)
- ✅ Security review passes (no vulnerabilities)
- ✅ Design system applied correctly (Theme B - Dark)

**Supabase Session Configuration:**
- Session expiry: 24 hours (default)
- Auto-refresh: Enabled
- Cookie attributes: HTTP-only, Secure, SameSite=strict
- Rate limiting: Built-in to Supabase Auth

**Design System Reference:**
- Theme: Theme B (Dark) for teacher-facing screens
- Primary Color: #6a25f4 (Deep Purple)
- Font: Lexend (Google Fonts)
- Icons: Material Symbols Outlined
- Border Radius: 12px default
- Reference: `/docs/project/05-color-guideline.md`

**Security Best Practices:**
- Password never logged or exposed
- Generic error messages (don't reveal if email exists)
- HTTPS enforced in production
- HTTP-only cookies (XSS protection)
- SameSite=strict (CSRF protection)
- Rate limiting (brute force protection)
