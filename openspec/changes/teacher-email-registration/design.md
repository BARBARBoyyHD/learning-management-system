## Context

This design document defines the implementation approach for teacher registration with email verification using **Supabase Auth**. The project currently has a working Next.js 16 application with database schema but no authentication system. This is the first authentication feature, enabling teachers to create accounts and access the platform.

**Current State:**
- User model exists in Prisma schema but will be simplified (Supabase auth.users is source of truth)
- No authentication endpoints or UI
- No email service integration
- Supabase project needs to be created (free tier)

**Constraints:**
- Must use Supabase Auth for email/password authentication only (no OAuth yet)
- Must follow ITA Section 9 (Security Architecture) - Supabase provides this
- Must use Supabase's email verification flow (customizable templates)
- Must follow API versioning pattern for any custom endpoints
- Must use Zod validation on client side

**Stakeholders:**
- Teachers: Need simple, secure registration flow
- Product Team: Requires email verification to prevent spam accounts
- Development Team: Wants reduced complexity with managed auth service

## Goals / Non-Goals

**Goals:**
- Install and configure Supabase SDK (@supabase/supabase-js, @supabase/ssr)
- Create Supabase project and configure email authentication
- Implement registration UI with form validation (email, password, name)
- Use Supabase signUp() for user registration with auto-email verification
- Configure Supabase email templates for verification emails
- Link Supabase auth.users to local users table via user_id foreign key
- Handle email verification redirect from Supabase

**Non-Goals:**
- Teacher login functionality (separate change: `teacher-login`)
- Password reset flow (separate change: `password-reset`)
- Google OAuth authentication (separate change: `google-oauth`)
- Custom email service (Supabase Email handles this)
- Custom token generation (Supabase manages this)

## Decisions

### Decision 1: Supabase Auth (Not Custom Authentication)

**Decision:** Use Supabase Auth managed service instead of building custom authentication.

**Rationale:**
- **Security**: Supabase handles password hashing (bcrypt), token generation, rate limiting, email delivery
- **Reduced Complexity**: No need for custom email service, token management, or password policies
- **Email Verification Built-in**: Automatic email templates, configurable expiry, resend functionality
- **Scalability**: Supabase handles email delivery at scale (1000+ concurrent users per BRD)
- **Compliance**: GDPR, SOC2 compliant out of the box
- **Future-proof**: Easy to add OAuth (Google, GitHub) later

**Implementation:**
```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Sign up with email verification
await supabase.auth.signUp({
  email,
  password,
  options: {
    data: { name }, // Store teacher name
    emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify`
  }
})
```

**Alternatives Considered:**
- *Custom auth with bcrypt + Nodemailer*: More control but high complexity, security risks. Rejected.
- *NextAuth.js*: Good but still need email service. Supabase is more integrated. Rejected.
- *Auth0/Clerk*: Vendor lock-in, more expensive at scale. Supabase is open source. Rejected.

### Decision 2: Supabase SSR Package for Next.js 16

**Decision:** Use `@supabase/ssr` package for proper Next.js 16 App Router integration.

**Rationale:**
- Cookie-based session management (HTTP-only cookies)
- Server Component and Server Action support
- Automatic token refresh
- Middleware integration for protected routes
- Official Supabase package for Next.js

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
        setAll(cookiesToSet) { cookiesToSet.forEach(({ name, value }) => cookieStore.set(name, value)) }
      }
    }
  )
}
```

**Alternatives Considered:**
- *Plain @supabase/supabase-js*: Manual cookie handling, more error-prone. Rejected.
- *Client-side only*: Security issues, no SSR support. Rejected.

### Decision 3: Minimal User Schema (Supabase auth.users is Source of Truth)

**Decision:** Store only teacher-specific data in local users table, reference Supabase auth.users.id.

**Rationale:**
- Supabase auth.users manages: email, password hash, email verification, created_at
- Local users table manages: name, role, teacher-specific data
- Single source of truth for authentication (Supabase)
- Easy to query teacher data with Prisma

**Schema:**
```prisma
model User {
  id        String   @id @default(uuid()) // Same as Supabase auth.users.id
  name      String
  role      String   @default("teacher")
  createdAt DateTime @default(now())
  
  // Relations
  quizzes   Quiz[]
  
  @@map("users")
}
```

**After signup flow:**
1. User signs up via Supabase Auth
2. Supabase creates auth.users record
3. Email verified → trigger fires
4. Create local users record with same ID

**Alternatives Considered:**
- *Duplicate all data in local table*: Sync complexity, potential inconsistency. Rejected.
- *Only use Supabase, no local table*: Need Prisma for quizzes anyway. Rejected.

### Decision 4: Supabase Email Templates (Not Custom SMTP)

**Decision:** Use Supabase's built-in email templates with customization.

**Rationale:**
- No SMTP configuration needed
- Customizable HTML templates in Supabase dashboard
- Automatic rate limiting and delivery optimization
- Supports custom SMTP later if needed
- Free tier: 100 emails/month (sufficient for MVP)

**Template Configuration:**
- Configure in Supabase Dashboard → Authentication → Email Templates
- Customize verification email with branding
- Include verification link (handled automatically)

**Alternatives Considered:**
- *Custom SMTP with Nodemailer*: More control but complex setup. Rejected for MVP.
- *Resend/SendGrid*: Additional cost, complexity. Supabase Email is sufficient. Rejected.

### Decision 5: Server Actions for Registration Form

**Decision:** Use Next.js 16 Server Actions with Supabase server client.

**Rationale:**
- Better integration with React Hook Form
- Automatic CSRF protection
- Reduced client-side code
- Follows Next.js 16 best practices

**Implementation:**
```typescript
// src/actions/auth/register.ts
'use server'

export async function register(formData: FormData) {
  const supabase = await createClient()
  
  const result = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: { name: formData.get('name') as string },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify`
    }
  })
  
  if (result.error) throw result.error
  return { success: true }
}
```

**Alternatives Considered:**
- *API Routes*: More verbose, separate fetch call. Rejected.
- *Client-side only*: Security concerns, exposed credentials. Rejected.

## Risks / Trade-offs

### Risk 1: Vendor Lock-in with Supabase

**Risk:** Migrating away from Supabase Auth would be complex.

**Mitigation:**
- Use standard email/password flow (not Supabase-specific features)
- Store user data in local database (not just Supabase)
- Abstract Supabase client behind interfaces
- Acceptable trade-off for reduced complexity

### Risk 2: Email Delivery Limits

**Risk:** Supabase free tier limits to 100 emails/month.

**Mitigation:**
- Monitor email usage
- Upgrade to paid tier ($25/month) for 1000 emails
- Configure custom SMTP later if needed
- Sufficient for MVP testing

### Risk 3: Database Trigger Complexity

**Risk:** Syncing Supabase auth.users to local users table requires database triggers.

**Mitigation:**
- Use Supabase Auth Hooks (onSignup trigger)
- Simple INSERT trigger, well-documented
- Test trigger on staging first
- Fallback: Create local user record manually after verification

### Risk 4: Email Template Customization Limits

**Risk:** Supabase email templates have limited customization options.

**Mitigation:**
- Use HTML email templates (supported)
- Add branding via logo and colors
- Acceptable for MVP, can use custom SMTP later

## Migration Plan

### Phase 1: Supabase Project Setup

1. Create Supabase project (free tier)
2. Configure Authentication → Email settings
3. Enable email confirmations
4. Customize email template with branding
5. Get SUPABASE_URL and SUPABASE_ANON_KEY

### Phase 2: Install Dependencies

```bash
npm install @supabase/supabase-js @supabase/ssr
```

### Phase 3: Environment Configuration

```bash
# Add to .env.local
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJxxx"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Phase 4: Create Supabase Utilities

1. Create `src/lib/supabase/server.ts` (server client)
2. Create `src/lib/supabase/client.ts` (client client)
3. Create `src/lib/supabase/middleware.ts` (optional)

### Phase 5: Update Database Schema

1. Simplify User model (remove password, isVerified, etc.)
2. Add foreign key reference to Supabase auth.users (optional)
3. Run migration: `npm run db:migrate`

### Phase 6: Implement Registration

1. Create Zod validation schema
2. Create Server Action for registration
3. Create registration form component
4. Create registration page

### Phase 7: Implement Verification Flow

1. Create verification pending page
2. Create verification success/failure pages
3. Configure Supabase email redirect URL
4. Test full flow

### Phase 8: Testing

1. Test registration with valid data
2. Verify email is received
3. Click verification link
4. Verify account is activated
5. Test error scenarios (duplicate email, weak password)

## Open Questions

1. **Supabase Project Region:** Which region for Supabase project?
   - *Recommendation:* Closest to target users (Singapore for Indonesia)

2. **Email Template Design:** How much branding in verification email?
   - *Options:* Plain text (default), HTML with logo, fully custom
   - *Recommendation:* HTML with logo and brand colors

3. **Local User Sync:** Create local user record immediately or after verification?
   - *Option A:* Immediately (has user data, but unverified)
   - *Option B:* After verification (cleaner, but need Supabase trigger)
   - *Recommendation:* Option B with Supabase Auth Hook

4. **Password Requirements:** What password policy to enforce?
   - *Supabase default:* Min 6 characters
   - *Recommendation:* Min 8 characters (match BRD requirement)

---

*This design document is part of the `teacher-email-registration` change*
*Created: 28 February 2026*
*Updated: 28 February 2026 (Supabase Auth approach)*
