## ADDED Requirements

### Requirement: Supabase Authentication Integration
The system SHALL use Supabase Auth for all teacher authentication operations including registration and email verification.

#### Scenario: Supabase client initialization
- **WHEN** application starts
- **THEN** Supabase client is initialized with URL and anon key from environment variables

#### Scenario: Server-side Supabase client
- **WHEN** Server Action or Server Component needs Supabase
- **THEN** server client is created with HTTP-only cookie management

### Requirement: Teacher Registration with Supabase
The system SHALL allow teachers to register using Supabase signUp() method with email and password.

#### Scenario: Successful registration
- **WHEN** teacher submits form with valid email, password (min 8 chars), and name
- **THEN** Supabase creates auth.users record, sends verification email, returns user object

#### Scenario: Duplicate email handling
- **WHEN** teacher submits form with email that already exists in Supabase auth
- **THEN** Supabase returns error "User already registered", system displays friendly message

#### Scenario: Weak password rejection
- **WHEN** teacher submits form with password less than 8 characters
- **THEN** Zod validation fails, form displays "Password must be at least 8 characters"

### Requirement: Email Verification via Supabase
The system SHALL use Supabase's built-in email verification flow with customizable templates.

#### Scenario: Verification email sent
- **WHEN** teacher completes registration
- **THEN** Supabase sends verification email with unique link

#### Scenario: Email verification link
- **WHEN** teacher clicks verification link in email
- **THEN** Supabase verifies email, redirects to app's verification success page

#### Scenario: Expired verification link
- **WHEN** teacher clicks expired link (default 24 hours)
- **THEN** Supabase displays error, offers resend verification option

### Requirement: User Data Synchronization
The system SHALL create local users table record after Supabase email verification.

#### Scenario: Local user creation on verification
- **WHEN** teacher verifies email via Supabase
- **THEN** database trigger or hook creates users record with Supabase auth.users.id

#### Scenario: Teacher name storage
- **WHEN** teacher registers with name
- **THEN** name is stored in Supabase auth.users.metadata and local users.name

### Requirement: Password Security
The system SHALL rely on Supabase for password hashing and security.

#### Scenario: Password hashing
- **WHEN** teacher registers with password
- **THEN** Supabase automatically hashes password with bcrypt before storage

#### Scenario: Password never exposed
- **WHEN** system logs or debugs user data
- **THEN** password field is never included in logs or responses
