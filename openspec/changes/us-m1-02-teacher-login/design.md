## Context

This design document defines the implementation approach for teacher login functionality using **Supabase Auth**. Building on the `teacher-email-registration` change, this feature enables verified teachers to authenticate and access their dashboard, courses, and assessment creation tools.

**Current State:**
- Supabase Auth is already configured from teacher-email-registration change
- Teacher registration with email verification is functional
- Supabase SSR package is installed with HTTP-only cookie support
- No login UI or authentication flow exists yet
- Protected routes need middleware implementation

**Constraints:**
- Must use Supabase Auth's signInWithPassword() method
- Must follow ITA Section 9 (Security Architecture) - Supabase provides this
- Must use HTTP-only cookies for session management (Supabase SSR)
- Must protect dashboard and course creation routes
- Must use Zod validation on client side
- Must follow design system from `/docs/project/05-color-guideline.md`

**Stakeholders:**
- Teachers: Need quick, secure access to dashboard
- Product Team: Requires seamless login experience (< 2 minutes per BO-01)
- Development Team: Wants reusable auth patterns for future features

## Goals / Non-Goals

**Goals:**
- Implement login UI with email and password fields
- Use Supabase signInWithPassword() for authentication
- Create session management with HTTP-only cookies (24h expiry)
- Implement protected route middleware for dashboard
- Handle login errors gracefully (invalid credentials, unverified accounts)
- Redirect authenticated users away from login page
- Provide clear error messages for failed login attempts

**Non-Goals:**
- Teacher registration (already implemented in teacher-email-registration)
- Password reset flow (separate change: password-reset)
- Google OAuth authentication (separate change: google-oauth)
- Session persistence beyond 24 hours (Supabase default)
- Multi-device session management (Supabase handles this)
- Two-factor authentication (future enhancement)

## Decisions

### Decision 1: Supabase signInWithPassword() for Authentication

**Decision:** Use Supabase Auth's signInWithPassword() method for teacher login.

**Rationale:**
- **Security**: Supabase handles password verification, rate limiting, brute force protection
- **Simplicity**: Single method call handles authentication and session creation
- **Session Management**: Automatic HTTP-only cookie handling via Supabase SSR
- **Error Handling**: Standardized error messages for common scenarios
- **Compliance**: Follows OWASP authentication best practices

**Implementation:**
```typescript
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const result = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (result.error) throw result.error
  return { success: true }
}
```

**Alternatives Considered:**
- *Custom password verification*: Would need to store password hashes, verify manually. Rejected (security risk).
- *OAuth only*: Excludes teachers without Google/GitHub accounts. Rejected for MVP.
- *Magic link login*: Good UX but different flow than traditional login. Can add later.

### Decision 2: Server Action for Login Form Submission

**Decision:** Use Next.js 16 Server Action with Supabase server client.

**Rationale:**
- **Security**: Password never exposed to client-side code
- **Performance**: Direct server-to-server communication with Supabase
- **Simplicity**: No API route needed, form submission handled in same component
- **Error Handling**: Server-side error handling with user-friendly messages
- **Best Practices**: Follows Next.js 16 App Router patterns

**Implementation:**
```typescript
// src/actions/auth/login.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const result = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (result.error) {
    return { error: 'Invalid email or password' }
  }

  redirect('/dashboard')
}
```

**Alternatives Considered:**
- *API Route*: More verbose, separate endpoint. Rejected.
- *Client-side only*: Security issues, password exposed. Rejected.

### Decision 3: HTTP-only Cookies for Session Storage

**Decision:** Use Supabase SSR with HTTP-only cookies for session management.

**Rationale:**
- **Security**: Cookies inaccessible to JavaScript (XSS protection)
- **Automatic**: Supabase SSR handles cookie creation, refresh, deletion
- **SSR Support**: Sessions available in Server Components and Server Actions
- **Middleware Integration**: Next.js middleware can validate sessions
- **Best Practice**: Industry standard for web authentication

**Implementation:**
```typescript
// src/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}
```

**Session Configuration:**
- Expiry: 24 hours (Supabase default)
- Auto-refresh: Enabled (Supabase handles token refresh)
- Cookie attributes: HTTP-only, Secure (production), SameSite=strict

**Alternatives Considered:**
- *LocalStorage*: XSS vulnerable, not SSR-compatible. Rejected.
- *SessionStorage*: Lost on tab close, not SSR-compatible. Rejected.
- *JWT in Authorization header*: More complex, manual token management. Rejected.

### Decision 4: Middleware for Protected Routes

**Decision:** Use Next.js 16 middleware to protect dashboard and course routes.

**Rationale:**
- **Early Validation**: Check session before rendering page
- **Redirect Unauthenticated**: Prevent access to protected routes
- **Redirect Authenticated**: Skip login page if already logged in
- **Performance**: Middleware runs at edge, fast validation
- **Centralized**: Single place for route protection logic

**Implementation:**
```typescript
// src/middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // Protected routes
  const protectedPaths = ['/dashboard', '/courses', '/assessments']
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  // Login page redirect
  if (request.nextUrl.pathname === '/login' && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Protect routes
  if (isProtectedPath && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}
```

**Protected Routes:**
- `/dashboard` - Teacher dashboard
- `/courses` - Course management
- `/assessments` - Assessment creation
- `/api/v1/*` - API endpoints (handled in route handlers)

**Alternatives Considered:**
- *HOC for each page*: Repetitive, error-prone. Rejected.
- *Client-side redirect*: Flash of unauthenticated content. Rejected.
- *API route validation*: Too late, page already rendered. Rejected.

### Decision 5: Zod Validation for Login Form

**Decision:** Use Zod schema validation for login form inputs.

**Rationale:**
- **Type Safety**: TypeScript types inferred from schema
- **Client + Server Validation**: Same schema on both sides
- **User Feedback**: Clear error messages for invalid input
- **Security**: Prevent malformed data from reaching Supabase

**Implementation:**
```typescript
// src/lib/validators/auth.ts
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type LoginInput = z.infer<typeof loginSchema>
```

**Validation Rules:**
- Email: Valid email format (RFC 5322)
- Password: Minimum 8 characters (match registration requirement)
- Both fields: Required (non-empty)

**Alternatives Considered:**
- *Manual validation*: Repetitive, error-prone. Rejected.
- *Yup/Joi*: Similar functionality, but Zod is project standard. Rejected.

### Decision 6: Error Message Strategy

**Decision:** Use generic error messages for authentication failures.

**Rationale:**
- **Security**: Don't reveal if email exists in system
- **User Experience**: Clear but not overly specific
- **Best Practice**: OWASP recommendation for authentication

**Error Messages:**
- Invalid credentials: "Invalid email or password" (generic)
- Unverified account: "Please verify your email before logging in"
- Network error: "Unable to connect. Please check your internet connection."
- Rate limit: "Too many attempts. Please try again later."
- Unknown error: "Something went wrong. Please try again."

**Alternatives Considered:**
- *Specific errors*: "Email not found" or "Wrong password". Rejected (security risk).
- *Verbose errors*: Expose technical details. Rejected (security risk).

## Risks / Trade-offs

### Risk 1: Session Hijacking

**Risk:** HTTP-only cookies can still be stolen via network attacks.

**Mitigation:**
- Enforce HTTPS in production (Vercel default)
- SameSite=strict cookie attribute (CSRF protection)
- 24-hour session expiry limits exposure window
- Acceptable trade-off for usability

### Risk 2: Unverified Account Login

**Risk:** Teachers might try to login before verifying email.

**Mitigation:**
- Supabase returns specific error for unverified accounts
- Display clear message with "Resend verification email" option
- Link to verification resend functionality
- Consider allowing login but blocking dashboard access

### Risk 3: Session Persistence Across Devices

**Risk:** Teachers expect to stay logged in on multiple devices.

**Mitigation:**
- Supabase creates separate session per device
- 24-hour expiry with automatic refresh
- Acceptable for MVP, can add "Remember me" later
- Future: Extend session expiry with user preference

### Risk 4: Middleware Performance

**Risk:** Middleware adds latency to every request.

**Mitigation:**
- Supabase SSR is optimized for edge runtime
- Session validation is fast (JWT verification)
- Vercel Edge Network caches validation
- Monitor performance, optimize if needed

## Migration Plan

### Phase 1: Create Login UI Components

1. Create `src/components/auth/login-form.tsx` with React Hook Form
2. Implement Zod validation on client side
3. Add error display for server-side errors
4. Add loading state during form submission
5. Apply design system tokens (Theme B - Dark for teacher screens)

### Phase 2: Implement Login Server Action

1. Create `src/actions/auth/login.ts` Server Action
2. Import Supabase server client
3. Implement formData parsing with Zod validation
4. Call supabase.auth.signInWithPassword()
5. Handle Supabase errors (invalid credentials, unverified)
6. Redirect to dashboard on success

### Phase 3: Create Login Page

1. Create `src/app/(auth)/login/page.tsx`
2. Import login form component
3. Add "Forgot password?" link (future feature)
4. Add "Don't have an account? Register" link
5. Apply layout from `(auth)` route group

### Phase 4: Implement Middleware

1. Create `src/middleware.ts`
2. Implement Supabase session check
3. Define protected route paths
4. Redirect unauthenticated users to login
5. Redirect authenticated users away from login
6. Test middleware on all protected routes

### Phase 5: Session Management Utilities

1. Create `src/hooks/use-auth.ts` for client-side session access
2. Create `src/lib/supabase/session.ts` for session utilities
3. Implement session refresh logic (Supabase handles automatically)
4. Add logout functionality (future: separate change)

### Phase 6: Error Handling and UX

1. Implement error boundary for login form
2. Add toast notifications for errors
3. Implement "Resend verification email" flow
4. Add loading spinner during authentication
5. Test error scenarios (invalid, unverified, network)

### Phase 7: Testing

1. Write unit test: Zod validation rejects invalid email
2. Write unit test: Zod validation rejects empty password
3. Write integration test: Supabase signInWithPassword creates session
4. Write E2E test: Full login flow (login → dashboard)
5. Test error scenario: Invalid credentials
6. Test error scenario: Unverified account
7. Test middleware: Protected route access denied

### Phase 8: Deployment Checklist

1. Add Supabase environment variables to Vercel
2. Update Supabase site URL to production URL
3. Add production redirect URLs in Supabase dashboard
4. Test login flow on staging environment
5. Verify session persistence on staging
6. Test middleware on production-like environment
7. Monitor Supabase dashboard for auth errors

## Open Questions

1. **"Remember Me" Feature:** Should we add extended session expiry?
   - *Options:* 24h (default), 7 days, 30 days
   - *Recommendation:* Stick with 24h for MVP, add later

2. **Unverified Account Handling:** Block login or allow login with limited access?
   - *Option A:* Block login entirely (current design)
   - *Option B:* Allow login but block dashboard, show verification prompt
   - *Recommendation:* Option A for simplicity, Option B for better UX (future)

3. **Password Reset Link:** Show on login page or separate flow?
   - *Options:* Link on login page, separate "/forgot-password" route
   - *Recommendation:* Add "Forgot password?" link on login page (future change)

4. **Concurrent Sessions:** Limit number of active sessions per user?
   - *Options:* No limit, limit to 5, limit to 1 (kick out others)
   - *Recommendation:* No limit for MVP, Supabase handles this

---

*This design document is part of the `us-m1-02-teacher-login` change*
*Created: 1 March 2026*
*Updated: 1 March 2026*
