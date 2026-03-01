## ADDED Requirements

### Requirement: Supabase Sign In Integration
The system SHALL use Supabase Auth's signInWithPassword() method for teacher authentication.

#### Scenario: Supabase sign-in client setup
- **WHEN** login form is submitted
- **THEN** Supabase server client is initialized with HTTP-only cookie management

#### Scenario: Session token storage
- **WHEN** authentication succeeds
- **THEN** Supabase creates session with access token and refresh token stored in HTTP-only cookies

### Requirement: Teacher Login with Email and Password
The system SHALL allow teachers to log in using their registered email and password.

#### Scenario: Successful login
- **GIVEN** I have a verified account
- **WHEN** I enter correct credentials (email and password)
- **THEN** I am authenticated and redirected to the dashboard

#### Scenario: Invalid email
- **WHEN** teacher enters email that doesn't exist in Supabase auth
- **THEN** Supabase returns error "Invalid login credentials", system displays "Invalid email or password"

#### Scenario: Incorrect password
- **WHEN** teacher enters wrong password for existing email
- **THEN** Supabase returns error "Invalid login credentials", system displays "Invalid email or password"

#### Scenario: Unverified account login attempt
- **WHEN** teacher tries to login before verifying email
- **THEN** Supabase returns error "Email not verified", system displays "Please verify your email before logging in" with resend option

### Requirement: Form Validation
The system SHALL validate login form inputs using Zod schemas before submitting to Supabase.

#### Scenario: Email format validation
- **WHEN** teacher enters email without @ symbol or invalid format
- **THEN** Zod validation fails, form displays "Please enter a valid email address"

#### Scenario: Empty field validation
- **WHEN** teacher submits form with empty email or password
- **THEN** Zod validation fails, form displays "Email is required" or "Password is required"

#### Scenario: Password length validation
- **WHEN** teacher enters password less than 8 characters
- **THEN** Zod validation fails, form displays "Password must be at least 8 characters"

### Requirement: Session Management
The system SHALL manage authenticated sessions using Supabase SSR with HTTP-only cookies.

#### Scenario: Session creation on login
- **WHEN** teacher successfully logs in
- **THEN** Supabase creates session with 24-hour expiry, stores in HTTP-only cookie

#### Scenario: Session retrieval
- **WHEN** teacher navigates to protected route
- **THEN** server retrieves session from cookie, validates token, grants access if valid

#### Scenario: Session expiry
- **WHEN** session expires after 24 hours
- **THEN** Supabase returns null session, user is redirected to login page

#### Scenario: Automatic session refresh
- **WHEN** access token expires but session is still valid
- **THEN** Supabase automatically refreshes access token using refresh token

### Requirement: Protected Routes
The system SHALL protect teacher dashboard and course creation routes from unauthenticated access.

#### Scenario: Unauthenticated access to dashboard
- **WHEN** unauthenticated user navigates to /dashboard
- **THEN** middleware detects no session, redirects to /login

#### Scenario: Authenticated access to login
- **WHEN** authenticated teacher navigates to /login
- **THEN** middleware detects valid session, redirects to /dashboard

#### Scenario: Protected API route access
- **WHEN** unauthenticated request made to /api/v1/courses
- **THEN** API route handler checks session, returns 401 Unauthorized if no valid session

### Requirement: Error Handling and User Feedback
The system SHALL provide clear error messages for login failures.

#### Scenario: Network error handling
- **WHEN** Supabase API is unreachable
- **THEN** system displays "Unable to connect. Please check your internet connection."

#### Scenario: Too many failed attempts
- **WHEN** teacher fails login multiple times
- **THEN** Supabase rate limits, system displays "Too many attempts. Please try again later."

#### Scenario: Generic error message
- **WHEN** unknown error occurs during login
- **THEN** system displays "Something went wrong. Please try again." without exposing technical details

### Requirement: Security Best Practices
The system SHALL follow Supabase security recommendations for authentication.

#### Scenario: Password never logged
- **WHEN** login fails or succeeds
- **THEN** password is never included in logs, error messages, or debug output

#### Scenario: HTTPS enforcement
- **WHEN** in production environment
- **THEN** all Supabase auth requests use HTTPS (Vercel default)

#### Scenario: Anon key exposure
- **WHEN** Supabase client initialized
- **THEN** only anon key (NEXT_PUBLIC_SUPABASE_ANON_KEY) is exposed, never service role key

#### Scenario: CSRF protection
- **WHEN** session cookie created
- **THEN** cookie has SameSite=strict attribute to prevent CSRF attacks
