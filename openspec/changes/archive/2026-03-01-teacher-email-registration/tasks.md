## 1. Supabase Project Setup

- [x] 1.1 Create Supabase project at https://supabase.com (free tier)
- [x] 1.2 Select region closest to target users (Singapore for Indonesia)
- [x] 1.3 Configure Authentication → Email settings
- [x] 1.4 Enable "Enable email confirmations" option
- [x] 1.5 Customize email template with app branding (logo, colors)
- [x] 1.6 Set site URL to NEXT_PUBLIC_APP_URL
- [x] 1.7 Add redirect URLs: http://localhost:3000/auth/verify, https://yourdomain.com/auth/verify
- [x] 1.8 Get NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY from project settings

## 2. Dependencies Installation

- [x] 2.1 Install Supabase client: `npm install @supabase/supabase-js`
- [x] 2.2 Install Supabase SSR: `npm install @supabase/ssr`
- [x] 2.3 Verify installation: check package.json for dependencies

## 3. Environment Configuration

- [x] 3.1 Add NEXT_PUBLIC_SUPABASE_URL to .env.local
- [x] 3.2 Add NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local
- [x] 3.3 Add NEXT_PUBLIC_APP_URL to .env.local (http://localhost:3000)
- [x] 3.4 Update .env.example with Supabase configuration section
- [x] 3.5 Document Supabase setup in README.md

## 4. Supabase Client Utilities

- [x] 4.1 Create `src/lib/supabase/client.ts` with createBrowserClient
- [x] 4.2 Create `src/lib/supabase/server.ts` with createServerClient and cookie management
- [x] 4.3 Create `src/lib/supabase/middleware.ts` (optional for protected routes)
- [x] 4.4 Export clients from `src/lib/supabase/index.ts`
- [x] 4.5 Test client initialization in development

## 5. Database Schema Updates

- [x] 5.1 Update Prisma schema: simplify User model (remove password, isVerified, verificationToken)
- [x] 5.2 Keep users.id as UUID (matches Supabase auth.users.id)
- [x] 5.3 Add users.name field for teacher name
- [x] 5.4 Keep users.role with default 'teacher'
- [x] 5.5 Run `npm run db:migrate` to apply schema changes
- [x] 5.6 (Optional) Create database trigger to sync Supabase auth.users to local users table

## 6. Zod Validation Schemas

- [x] 6.1 Create `src/lib/validators/auth.ts`
- [x] 6.2 Define registerSchema: email (email format), password (min 8 chars), name (min 2 chars)
- [x] 6.3 Export type inference: RegisterInput
- [x] 6.4 Add error messages for validation failures

## 7. Registration Server Action

- [x] 7.1 Create `src/actions/auth/register.ts` Server Action
- [x] 7.2 Import Supabase server client
- [x] 7.3 Implement formData parsing with Zod validation
- [x] 7.4 Call supabase.auth.signUp() with email, password, and metadata (name)
- [x] 7.5 Set emailRedirectTo to `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify`
- [x] 7.6 Handle Supabase errors (duplicate email, weak password)
- [x] 7.7 Return success response or throw error for UI to handle

## 8. Registration UI Components

- [x] 8.1 Create `src/components/auth/register-form.tsx` with React Hook Form
- [x] 8.2 Implement client-side validation with Zod
- [x] 8.3 Add error display for server-side errors
- [x] 8.4 Add loading state during form submission
- [x] 8.5 Show success message and redirect to verification pending page
- [x] 8.6 Create `src/app/(auth)/register/page.tsx` registration page
- [x] 8.7 Apply design system tokens (primary color, border radius, Lexend font)

## 9. Verification Flow UI

- [x] 9.1 Create `src/components/auth/verification-pending.tsx`
- [x] 9.2 Display "Check your email" message with resend button
- [x] 9.3 Create `src/app/(auth)/verify/pending/page.tsx` verification pending page
- [x] 9.4 Create `src/app/(auth)/verify/page.tsx` verification result page
- [x] 9.5 Handle Supabase redirect with token from email link
- [x] 9.6 Display success message on successful verification
- [x] 9.7 Display error message on expired/invalid link

## 10. Supabase Email Template Configuration

- [x] 10.1 Navigate to Supabase Dashboard → Authentication → Email Templates
- [x] 10.2 Select "Email Confirmation" template
- [x] 10.3 Customize subject line: "Verify your email for Quizizz Clone"
- [x] 10.4 Add app logo and branding colors
- [x] 10.5 Include verification link (Supabase handles this automatically)
- [x] 10.6 Add expiry warning (24 hours default)
- [x] 10.7 Test email template by registering test account

## 11. Database Trigger for User Sync (Optional)

- [x] 11.1 Create Supabase database function to create local users record
- [x] 11.2 Create trigger on auth.users after email confirmation
- [x] 11.3 Trigger inserts into public.users with auth.users.id, name from metadata
- [x] 11.4 Test trigger by registering and verifying new user
- [x] 11.5 Verify local users table has correct record

## 12. Testing

- [x] 12.1 Write unit test: Zod validation rejects invalid email
- [x] 12.2 Write unit test: Zod validation rejects password < 8 chars
- [x] 12.3 Write integration test: Supabase signUp creates auth.users record
- [x] 12.4 Write integration test: Verification email is sent
- [x] 12.5 Write E2E test: Full registration flow (register → email → verify)
- [x] 12.6 Test error scenario: Duplicate email registration
- [x] 12.7 Test error scenario: Expired verification link
- [x] 12.8 Verify local users table sync (manual or via trigger)

## 13. Documentation

- [x] 13.1 Add Supabase setup guide to README.md
- [x] 13.2 Document environment variables required
- [x] 13.3 Add registration flow diagram
- [x] 13.4 Link to Supabase documentation
- [x] 13.5 Update BRD traceability matrix (FR-M1-01, FR-M1-03)

## 14. Security Review

- [x] 14.1 Verify Supabase anon key is public (NEXT_PUBLIC_ prefix)
- [x] 14.2 Verify service role key is NOT exposed (server-side only)
- [x] 14.3 Verify HTTPS is enforced in production (Vercel default)
- [x] 14.4 Verify email confirmation is enabled in Supabase
- [x] 14.5 Run `npm audit` and fix any security vulnerabilities
- [x] 14.6 Test rate limiting on Supabase auth endpoints (built-in)

## 15. Deployment Checklist

- [x] 15.1 Add Supabase environment variables to Vercel project
- [x] 15.2 Update Supabase site URL to production URL
- [x] 15.3 Add production redirect URL in Supabase dashboard
- [x] 15.4 Test registration flow on staging environment
- [x] 15.5 Verify email delivery on staging
- [x] 15.6 Test verification link with production URL
- [x] 15.7 Monitor Supabase dashboard for errors
- [x] 15.8 Set up Supabase alerts for auth failures

---

## Implementation Notes

**BRD Reference:**
- FR-M1-01: Teacher Registration
- FR-M1-03: Email Verification
- US-M1-01 through US-M1-03: User Stories

**Estimated Effort:** 1-2 sprints (2-4 days with Supabase)

**Dependencies:**
- Supabase project (free tier)
- @supabase/supabase-js and @supabase/ssr packages
- Environment variables configured

**Success Criteria:**
- ✅ Teacher can register with email and password
- ✅ Verification email is sent within 5 seconds
- ✅ Clicking verification link activates account
- ✅ Expired tokens are handled gracefully
- ✅ Local users table is synced with Supabase auth.users
- ✅ All tests pass (unit, integration, E2E)

**Supabase Free Tier Limits:**
- 50,000 monthly active users
- 100 emails/month (upgrade to $25/month for more)
- 500MB database
- Sufficient for MVP and testing
