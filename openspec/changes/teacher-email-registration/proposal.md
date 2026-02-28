## Why

This change implements teacher registration with email verification using Supabase Auth, a core requirement from the Business Requirements Document (BRD Section 6.2 - Authentication & User Management). Currently, the application has no user authentication system, preventing teachers from creating accounts and accessing course creation features. By leveraging Supabase Auth, we get battle-tested authentication with email verification, password hashing, and security best practices out of the box, reducing implementation complexity and security risks.

## What Changes

- **Supabase Integration**: Install @supabase/supabase-js and @supabase/ssr packages
- **Registration UI**: New registration page with email and password input fields
- **Email Verification**: Supabase-managed email verification with customizable templates
- **Authentication Flow**: Account creation → Supabase sends verification email → user clicks link → account activated
- **Database Updates**: Link Supabase auth.users to local users table via user_id
- **Environment Configuration**: Supabase URL and anon key configuration
- **Password Security**: Handled by Supabase (bcrypt with automatic salt)
- **Validation**: Zod schemas for registration form validation

## Capabilities

### New Capabilities
- `teacher-registration`: Teacher account creation with email and password using Supabase Auth SDK. Includes form validation, Supabase signup, and automatic email verification flow.
- `supabase-auth`: Supabase authentication integration with SSR support, client/server clients, and session management utilities.

### Modified Capabilities
- *(None - this is the first authentication feature, no existing specs to modify)*

## Impact

**Affected Systems:**
- **Database**: User table links to Supabase auth.users via foreign key (user_id references auth.users.id)
- **API**: Supabase Auth endpoints handle registration and verification
- **UI**: New registration page at `/register`, verification pages at `/auth/verify`
- **Email**: Supabase Email API handles verification emails (configurable templates)
- **Security**: Supabase manages password hashing, rate limiting, and token generation

**Dependencies:**
- Requires Supabase project setup (free tier available)
- Requires `@supabase/supabase-js` and `@supabase/ssr` packages
- Requires Supabase URL and anon key in environment variables

**Future Changes Dependent on This:**
- Teacher login functionality (Supabase signIn)
- Password reset flow (Supabase resetPasswordForEmail)
- Session management (Supabase getSession)
- Course and quiz creation (requires authenticated teacher)

**Compliance:**
- Implements BRD requirement FR-M1-01 (Teacher Registration)
- Implements BRD requirement FR-M1-03 (Email Verification)
- Follows ITA Section 9 (Security Architecture) with Supabase security best practices
- Follows ITA Section 3 (Technology Stack) for authentication approach
