## Context

This change implements a freemium pricing model with Mayar.id payment gateway integration for the BrainBlitz LMS. Teachers get FREE tier (limited) or PREMIUM tier (unlimited) access.

**Key Constraints:**
- Simple implementation (<100 lines per file where possible)
- Mayar.id sandbox mode for testing
- Excel export using lightweight library (exceljs or xlsx)
- No changes to student experience (always free)

## Goals / Non-Goals

**Goals:**
- Unlimited quiz creation for Premium teachers
- Excel export for student responses (Premium only)
- Mayar.id monthly subscription (Rp 49.000)
- Clear upgrade prompts when hitting Free limits

**Non-Goals:**
- Team/School/Enterprise tiers (future)
- Refund handling (manual for now)
- Dunning/retry logic (future)
- Proration on plan changes (future)

## Decisions

### Decision 1: Database Schema - Enum vs String

**What:** Use Prisma enum for subscription tiers
**Why:** Type safety, validation at schema level

```prisma
enum SubscriptionTier {
  FREE
  PREMIUM
}

enum SubscriptionStatus {
  active
  cancelled
  expired
  trial
}

model User {
  subscriptionTier     SubscriptionTier @default(FREE)
  subscriptionStatus   SubscriptionStatus @default(trial)
  trialEndsAt          DateTime?
  subscriptionEndsAt   DateTime?
  mayarCustomerId      String?
}
```

**Alternatives considered:**
- String type: Less type safety, rejected
- Separate Subscription table: Over-engineered for single-tier, rejected

---

### Decision 2: Excel Export Library

**What:** Use `exceljs` package
**Why:** Lightweight, good TypeScript support, creates proper .xlsx files

```bash
npm install exceljs
```

**Alternatives considered:**
- `xlsx`: More popular but heavier
- CSV export: Simpler but loses formatting, rejected
- Google Sheets API: Too complex, rejected

---

### Decision 3: Limit Enforcement Strategy

**What:** Enforce limits at service layer with middleware check
**Why:** Centralized logic, reusable across API routes

```typescript
// In subscription.service.ts
async function canCreateCourse(userId: string): Promise<boolean> {
  const user = await getUserSubscription(userId);
  if (user.subscriptionTier === 'PREMIUM') return true;
  
  const courseCount = await countCoursesByTeacher(userId);
  return courseCount < 2; // Free limit
}
```

**Alternatives considered:**
- Database constraint: Inflexible for business logic, rejected
- Frontend-only validation: Insecure, rejected
- Middleware-only: Good but need service for error messages

---

### Decision 4: Mayar.id Integration Pattern

**What:** Server-side API routes for payment flow
**Why:** Secure, keeps API keys server-side

**API Reference:** https://docs.mayar.id/api-reference/introduction

**Flow:**
1. POST `/api/v1/subscription/upgrade` → Creates Mayar checkout URL
2. Redirect user to Mayar checkout
3. Mayar webhook → POST `/api/v1/subscription/webhook`
4. Update user subscription on successful payment

**Environment Variables:**
```env
# Mayar.id Payment Gateway
# Get your API keys from: https://docs.mayar.id/api-reference/introduction
MAYAR_API_KEY=your_mayar_api_key_here
MAYAR_WEBHOOK_SECRET=your_webhook_secret_here
MAYAR_PRODUCT_ID=your_product_id_here
```

**Note:** Placeholders are set in `.env`. Replace with actual keys from Mayar dashboard before testing payments.

**Alternatives considered:**
- Client-side checkout: Exposes API keys, rejected
- Third-party wrapper (LemonSqueezy): Extra cost, rejected

---

### Decision 5: Trial Period Handling

**What:** 7-day automatic trial on registration
**Why:** Low-friction onboarding, no payment required upfront

**Implementation:**
- Set `trialEndsAt = now + 7 days` on user registration
- Check `trialEndsAt > now` for Premium access
- Webhook updates status when trial converts to paid

**Alternatives considered:**
- No trial: Higher friction, rejected
- 14-day trial: Standard but 7 days sufficient for demo, rejected
- Manual trial activation: Extra steps, rejected

---

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|------|--------|------------|
| Mayar.id API downtime | Users can't upgrade | Show friendly error, retry later |
| Webhook delivery failure | Payment not recorded | Manual reconciliation, admin panel |
| Excel export memory usage | Large quizzes crash | Stream response, limit to 1000 students |
| Free users bypass limits | Revenue loss | Service-layer checks, audit logs |

**Trade-offs:**
- **Simplicity over flexibility:** Single Premium tier (can add more later)
- **Manual over automated:** No dunning/retry logic initially
- **Trust over prevention:** No aggressive limit policing

---

## Migration Plan

### Phase 1: Database Schema (Day 1)
```bash
# 1. Update Prisma schema
# 2. Generate client
# 3. Push to database
npm run db:generate
npm run db:push
```

### Phase 2: Core Services (Day 2-3)
- Implement subscription.service.ts
- Add limit enforcement to course/quiz services
- Create Excel export service

### Phase 3: API Endpoints (Day 4)
- Payment upgrade endpoint
- Webhook handler
- Export endpoint

### Phase 4: Frontend (Day 5-6)
- Pricing page
- Upgrade modals
- Export button (Premium badge)

### Phase 5: Testing (Day 7)
- Unit tests for services
- E2E test for upgrade flow
- Manual Mayar sandbox testing

**Rollback:**
- Revert database schema
- Remove new API endpoints
- Disable pricing page

---

## Open Questions

1. **What happens to quizzes created during trial if user doesn't upgrade?**
   - Current: Keep them accessible (goodwill)
   
2. **Can users downgrade from Premium to Free mid-billing?**
   - Current: Yes, effective at billing period end

3. **How to handle refunds?**
   - Current: Manual via Mayar dashboard, admin updates user status

4. **Should we show "X days left in trial" banner?**
   - Current: Yes, in user profile header
