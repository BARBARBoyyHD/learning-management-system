## ADDED Requirements

### Requirement: Registration API Endpoint
The system SHALL provide POST /api/v1/auth/register endpoint for teacher registration.

#### Scenario: Successful registration
- **WHEN** client POSTs valid registration data to /api/v1/auth/register
- **THEN** system creates user, sends verification email, returns 201 with user data (excluding password)

#### Scenario: Invalid request body
- **WHEN** client POSTs invalid data (missing fields, invalid email)
- **THEN** system returns 400 Bad Request with validation errors

#### Scenario: Duplicate email
- **WHEN** client POSTs registration with existing email
- **THEN** system returns 409 Conflict with "Email already registered" message

### Requirement: Email Verification API Endpoint
The system SHALL provide GET /api/v1/auth/verify endpoint for email verification.

#### Scenario: Valid token verification
- **WHEN** client GETs /api/v1/auth/verify?token=valid-token
- **THEN** system verifies token, sets isVerified=true, returns 200 with success message

#### Scenario: Invalid or expired token
- **WHEN** client GETs /api/v1/auth/verify with invalid/expired token
- **THEN** system returns 400 Bad Request with appropriate error message

### Requirement: Resend Verification API Endpoint
The system SHALL provide POST /api/v1/auth/resend-verification endpoint.

#### Scenario: Resend verification email
- **WHEN** client POSTs email to /api/v1/auth/resend-verification
- **THEN** system sends new verification email if user exists and is not verified

#### Scenario: Rate limit exceeded
- **WHEN** client exceeds rate limit (3 requests/hour)
- **THEN** system returns 429 Too Many Requests with retry-after header

### Requirement: User Repository Methods
The system SHALL implement repository methods for user operations.

#### Scenario: Create user
- **WHEN** authService calls userRepository.create()
- **THEN** new user record is created with hashed password, role='teacher', isVerified=false

#### Scenario: Find user by email
- **WHEN** system needs to check for duplicate email or login
- **THEN** userRepository.findByEmail() returns user with email match or null

#### Scenario: Update verification status
- **WHEN** user verifies email
- **THEN** userRepository.updateVerificationStatus() sets isVerified=true and clears token

### Requirement: Email Service Integration
The system SHALL integrate with SMTP email service for sending verification emails.

#### Scenario: Send verification email
- **WHEN** authService calls emailService.sendVerificationEmail()
- **THEN** email is sent via SMTP with verification link and welcome message

#### Scenario: SMTP configuration error
- **WHEN** SMTP credentials are missing or invalid
- **THEN** system logs error and returns descriptive error message in development
