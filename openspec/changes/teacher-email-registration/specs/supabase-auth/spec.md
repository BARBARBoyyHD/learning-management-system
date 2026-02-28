## ADDED Requirements

### Requirement: Supabase SDK Integration
The system SHALL integrate Supabase JavaScript SDK with Next.js 16 App Router.

#### Scenario: Client-side Supabase client
- **WHEN** client components need Supabase
- **THEN** createBrowserClient is used with environment variables

#### Scenario: Server-side Supabase client
- **WHEN** Server Actions or Server Components need Supabase
- **THEN** createServerClient is used with cookie management

#### Scenario: Middleware Supabase client
- **WHEN** middleware needs to check auth status
- **THEN** createMiddlewareClient is used for cookie handling

### Requirement: Registration Server Action
The system SHALL implement Server Action for teacher registration using Supabase.

#### Scenario: Valid registration submission
- **WHEN** client calls register Server Action with valid data
- **THEN** Server Action calls supabase.auth.signUp(), returns success or error

#### Scenario: Server Action error handling
- **WHEN** Supabase returns error (duplicate email, weak password)
- **THEN** Server Action throws error with friendly message for UI

### Requirement: Environment Variables
The system SHALL require Supabase configuration in environment variables.

#### Scenario: Supabase URL configuration
- **WHEN** application starts
- **THEN** NEXT_PUBLIC_SUPABASE_URL is required for client and server

#### Scenario: Supabase anon key configuration
- **WHEN** application starts
- **THEN** NEXT_PUBLIC_SUPABASE_ANON_KEY is required for authentication

#### Scenario: App URL configuration
- **WHEN** registration occurs
- **THEN** NEXT_PUBLIC_APP_URL is used for email redirect

### Requirement: Database Schema for Supabase Integration
The system SHALL maintain local users table linked to Supabase auth.users.

#### Scenario: User ID synchronization
- **WHEN** local users record is created
- **THEN** users.id matches Supabase auth.users.id (UUID)

#### Scenario: Teacher-specific data
- **WHEN** user registers
- **THEN** local users table stores name, role='teacher', createdAt

#### Scenario: Foreign key relationship (optional)
- **WHEN** Supabase auth.users is queried
- **THEN** local users.id references auth.users.id
