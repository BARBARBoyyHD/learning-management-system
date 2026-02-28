## ADDED Requirements

### Requirement: Supabase Email Configuration
The system SHALL configure Supabase email settings for verification email delivery.

#### Scenario: Supabase email sender
- **WHEN** Supabase sends verification email
- **THEN** email is sent from configured MAIL_FROM address

#### Scenario: Email template customization
- **WHEN** verification email is received
- **THEN** email contains app branding, verification link, and expiry information

### Requirement: Verification Redirect Configuration
The system SHALL configure Supabase to redirect to app's verification page after email confirmation.

#### Scenario: Email redirect URL
- **WHEN** user clicks verification link
- **THEN** Supabase redirects to NEXT_PUBLIC_APP_URL/auth/verify

#### Scenario: Mobile deep linking (future)
- **WHEN** user clicks link on mobile device
- **THEN** Supabase can redirect to mobile app (if configured later)
