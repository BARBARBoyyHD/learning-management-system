## Why

Teachers need a secure way to end their session when using shared devices or when stepping away from their workstation. Currently, the application has authentication (via `teacher-email-registration` change) but no logout functionality. This change implements teacher logout to ensure session security and addresses BRD requirement **US-M1-04** (Teacher Logout).

## What Changes

- **Logout button in sidebar** - Visible sign out option in the dashboard navigation
- **Logout Server Action** - Server-side session cleanup via Supabase Auth
- **Session invalidation** - Proper cleanup of Supabase session cookies
- **Redirect to login** - Navigate to login page after successful logout
- **Confirmation (optional)** - Optional confirmation dialog before logout

## Capabilities

### New Capabilities

- `teacher-logout`: Teacher logout functionality including logout button, Server Action for session cleanup, Supabase Auth signOut integration, and redirect to login page. Ensures secure session termination.

### Modified Capabilities

- *(None - this is a new feature, no existing specs to modify)*

## Impact

**Affected Systems:**
- **UI**: Logout button in sidebar navigation
- **Actions**: New Server Action for logout operation
- **Navigation**: Redirect to login page after logout
- **Security**: Session tokens invalidated via Supabase Auth

**Dependencies:**
- Requires teacher authentication (completed in `teacher-email-registration` change)
- Uses Supabase Auth SDK for session management
- Uses existing Supabase client utilities

**Scope Boundaries:**
- **Must Have (MVP)**: Logout button, Server Action, session cleanup, redirect
- **Should Have (Next)**: Logout confirmation dialog, activity logging
- **Nice to Have**: Session timeout warning, multiple device management

**BRD Traceability:**
- Implements **US-M1-04**: Teacher Logout
- Supports **FR-M1-02**: Session Security
- Follows **ITA Section 9**: Security Architecture (Supabase Auth)
