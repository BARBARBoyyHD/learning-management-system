## ADDED Requirements

### Requirement: Teacher Logout
The system SHALL allow teachers to log out and end their session securely.

#### Scenario: Logout from sidebar
- **WHEN** teacher clicks "Sign out" button in sidebar
- **THEN** system invalidates session and redirects to login page

#### Scenario: Session cleanup
- **WHEN** teacher logs out
- **THEN** Supabase Auth session is properly cleared and cookies are removed

#### Scenario: Redirect after logout
- **WHEN** logout is complete
- **THEN** teacher is redirected to login page

#### Scenario: Cannot access dashboard after logout
- **WHEN** logged-out user tries to access /dashboard
- **THEN** system redirects to login page

### Requirement: Logout Button Visibility
The system SHALL display a logout button in the teacher dashboard sidebar.

#### Scenario: Logout button in sidebar
- **WHEN** teacher views dashboard
- **THEN** logout button is visible in the bottom section of sidebar

#### Scenario: Logout button styling
- **WHEN** teacher views sidebar
- **THEN** logout button has distinct styling with logout icon

### Requirement: Logout Security
The system SHALL ensure secure session termination.

#### Scenario: Server-side session invalidation
- **WHEN** teacher logs out
- **THEN** server-side Supabase session is invalidated

#### Scenario: Client-side cleanup
- **WHEN** logout completes
- **THEN** all client-side auth state is cleared

#### Scenario: Token invalidation
- **WHEN** teacher logs out
- **THEN** Supabase auth tokens are invalidated and cannot be reused
