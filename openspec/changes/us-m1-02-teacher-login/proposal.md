## Why

This change implements teacher login functionality with email and password authentication, a core requirement from the Business Requirements Document (BRD Section 6.2 - Authentication & User Management). Building on the teacher registration feature, this enables verified teachers to access their dashboard and course creation tools. The login flow integrates with Supabase Auth for secure session management, password verification, and token-based authentication, ensuring a seamless and secure user experience.

## What Changes

- **Login UI**: New login page with email and password input fields
- **Authentication Flow**: Supabase signIn with email/password, session creation
- **Session Management**: HTTP-only cookies via Supabase SSR, 24-hour session expiry
- **Dashboard Access**: Protected routes redirect unauthenticated users to login
- **Error Handling**: Invalid credentials, unverified accounts, network errors
- **Validation**: Zod schemas for login form validation
- **Redirect Logic**: Successful login redirects to teacher dashboard

## Capabilities

### New Capabilities
- `teacher-login`: Teacher authentication with email and password using Supabase Auth SDK. Includes form validation, Supabase signIn, session management, and dashboard redirect.

### Modified Capabilities
- `supabase-auth`: Enhanced from teacher-email-registration change to include session management utilities and protected route helpers.

## Impact

**Affected Systems:**
- **UI**: New login page at `/login`, protected dashboard routes
- **API**: Supabase Auth endpoints handle authentication and session creation
- **Session**: HTTP-only cookies store session tokens (24h expiry)
- **Security**: Supabase manages password verification, rate limiting, and session tokens
- **Navigation**: Redirect unauthenticated users away from protected routes

**Dependencies:**
- Requires teacher-email-registration change (Supabase setup complete)
- Requires `@supabase/supabase-js` and `@supabase/ssr` packages
- Requires Supabase URL and anon key in environment variables

**Future Changes Dependent on This:**
- Course creation and management (requires authenticated teacher)
- Assessment/quiz creation (requires authenticated teacher)
- Logout functionality (Supabase signOut)
- Password reset flow (Supabase resetPasswordForEmail)
- Student guest access (separate from teacher auth)

**Compliance:**
- Implements BRD requirement FR-M1-02 (Teacher Login)
- Implements User Story US-M1-02
- Follows ITA Section 9 (Security Architecture) with Supabase security best practices
- Follows ITA Section 3 (Technology Stack) for authentication approach
- Complies with BO-01 (onboarding < 2 minutes) via streamlined login flow
