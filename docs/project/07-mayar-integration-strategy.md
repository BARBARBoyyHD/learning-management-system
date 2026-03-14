# Mayar.id Integration Strategy
## Vibe Coding Competition - Payment Gateway Implementation Plan

---

| Attribute | Value |
|-----------|-------|
| Document ID | DOC-QCL-MAY-007 |
| Version | 1.0 |
| Status | Draft - Action Plan |
| Author | Assistant |
| Created | 7 March 2026 |
| Deadline | 15 March 2026 (8 days) |

---

## 1. COMPETITION REQUIREMENTS (CONFIRMED)

| Requirement | Answer | Implication |
|-------------|--------|-------------|
| **Mandatory?** | YES - Mandatory | Must integrate to submit |
| **Provider** | Mayar.id (local Indonesian gateway) | Need to research their API |
| **Evaluation** | "The idea is free" | Core features are primary, payment is bonus |
| **Sandbox Mode** | OPSIONAL (bonus points) | Can use production or sandbox |
| **Deadline** | 15 March 2026 | **8 days remaining** |

---

## 2. CRITICAL CLARIFICATION NEEDED

### ⚠️ Contradiction Detected

You mentioned:
- **Q1:** Payment gateway = **MANDATORY**
- **Q4:** Integration = **OPSIONAL (bonus points)**

### Possible Interpretations

```
┌─────────────────────────────────────────────────────────────┐
│  INTERPRETATION A: Mandatory to Submit, Bonus for Scoring   │
├─────────────────────────────────────────────────────────────┤
│  • You MUST have some payment integration to submit        │
│  • Full integration (production) = bonus points            │
│  • Basic integration (sandbox/demo) = still eligible       │
│  • No integration = cannot submit                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  INTERPRETATION B: Core App Mandatory, Payment is Bonus     │
├─────────────────────────────────────────────────────────────┤
│  • Core features (Course, Quiz) = mandatory for submission │
│  • Payment integration = optional bonus points             │
│  • Can submit without payment, but miss bonus points       │
└─────────────────────────────────────────────────────────────┘
```

**ACTION:** Confirm with competition organizers which interpretation is correct.

---

## 3. MAYAR.ID RESEARCH CHECKLIST

### Before Implementation, Research:

```
┌─────────────────────────────────────────────────────────────┐
│  MAYAR.ID RESEARCH CHECKLIST                                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  □ 1. Visit mayar.id website                                │
│     • Check for developer section                           │
│     • Look for API documentation                            │
│                                                              │
│  □ 2. Find API Documentation                                │
│     • Base URL (sandbox vs production)                      │
│     • Authentication method (API key, OAuth, etc.)          │
│     • Available endpoints                                   │
│                                                              │
│  □ 3. Check Integration Requirements                        │
│     • Registration process for developers                   │
│     • KYC requirements (KTP, NPWP, etc.)                    │
│     • Approval timeline                                     │
│                                                              │
│  □ 4. Identify Payment Products                             │
│     • One-time payment                                      │
│     • Subscription/recurring                                │
│     • Payment methods supported (VA, QRIS, e-wallet)        │
│                                                              │
│  □ 5. Check Sandbox/Test Mode                               │
│     • Is sandbox available?                                 │
│     • Test credentials provided?                            │
│     • Test card numbers (if applicable)                     │
│                                                              │
│  □ 6. Webhook Support                                       │
│     • Does Mayar.id support webhooks?                       │
│     • Webhook signature verification?                       │
│     • Retry mechanism?                                      │
│                                                              │
│  □ 7. Contact Support (if needed)                           │
│     • Email: support@mayar.id (verify)                      │
│     • Telegram/WhatsApp support?                            │
│     • Developer Discord/Community?                          │
│                                                              │
│  □ 8. Look for Integration Examples                         │
│     • GitHub repositories                                   │
│     • Sample code (PHP, Node.js, etc.)                      │
│     • Postman collection                                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Quick Research Tasks (Do This First!)

**Before any coding, spend 2-3 hours on research:**

1. **Browse mayar.id** - Find developer docs
2. **Register for developer account** - Get API keys
3. **Test API connectivity** - Simple curl request
4. **Identify simplest integration path** - Hosted checkout vs embedded form

---

## 4. RECOMMENDED INTEGRATION APPROACH

### Assumption: Mayar.id Similar to Other Gateways

Most payment gateways offer these integration methods:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    INTEGRATION METHODS                                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  METHOD A: Hosted Checkout Page (RECOMMENDED FOR MVP)                   │
│  ═══════════════════════════════════════════════════                     │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │  Flow:                                                      │        │
│  │  1. Your app → Create payment via Mayar API                 │        │
│  │  2. Mayar returns checkout URL                              │        │
│  │  3. Redirect user to Mayar checkout page                    │        │
│  │  4. User pays on Mayar's page                              │        │
│  │  5. Mayar redirects back to your app                        │        │
│  │  6. (Optional) Webhook confirms payment                     │        │
│  │                                                             │        │
│  │  Pros:                                                      │        │
│  │  ✅ Easiest to implement (1-2 hours)                        │        │
│  │  ✅ Mayar handles PCI compliance                            │        │
│  │  ✅ Supports multiple payment methods automatically         │        │
│  │  ✅ Mobile-friendly                                         │        │
│  │                                                             │        │
│  │  Cons:                                                      │        │
│  │  ❌ User leaves your app (UX break)                         │        │
│  │  ❌ Less customization                                      │        │
│  └─────────────────────────────────────────────────────────────┘        │
│                                                                          │
│  METHOD B: Embedded Payment Form                                        │
│  ═══════════════════════════════════════════════════                     │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │  Flow:                                                      │        │
│  │  1. Your app → Create payment via Mayar API                 │        │
│  │  2. Mayar returns payment token                             │        │
│  │  3. Your app shows payment form (card input, etc.)          │        │
│  │  4. Submit payment details via Mayar SDK                    │        │
│  │  5. Receive payment result                                  │        │
│  │                                                             │        │
│  │  Pros:                                                      │        │
│  │  ✅ Seamless UX (user stays on your app)                    │        │
│  │  ✅ Full customization                                      │        │
│  │                                                             │        │
│  │  Cons:                                                      │        │
│  │  ❌ More complex (4-8 hours)                                │        │
│  │  ❌ PCI compliance considerations                           │        │
│  │  ❌ More testing required                                   │        │
│  └─────────────────────────────────────────────────────────────┘        │
│                                                                          │
│  METHOD C: Payment Link (SIMPLEST)                                      │
│  ═══════════════════════════════════════════════════                     │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │  Flow:                                                      │        │
│  │  1. Create payment link in Mayar dashboard (or via API)     │        │
│  │  2. Show link to user (button: "Pay Now")                   │        │
│  │  3. User clicks → Opens Mayar payment page                  │        │
│  │  4. User completes payment                                  │        │
│  │  5. Manual verification (or webhook)                        │        │
│  │                                                             │        │
│  │  Pros:                                                      │        │
│  │  ✅ Simplest (30 minutes - 1 hour)                          │        │
│  │  ✅ No coding required (if manual link)                     │        │
│  │  ✅ Good for demo                                           │        │
│  │                                                             │        │
│  │  Cons:                                                      │        │
│  │  ❌ Not automated                                           │        │
│  │  ❌ Manual verification needed                              │        │
│  │  ❌ Not scalable                                            │        │
│  └─────────────────────────────────────────────────────────────┘        │
│                                                                          │
│  RECOMMENDATION FOR VIBE CODING:                                        │
│  ═══════════════════════════════════════                                │
│  → METHOD A (Hosted Checkout) if available                              │
│  → METHOD C (Payment Link) as fallback if API is complex                │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 5. IMPLEMENTATION PLAN (8 DAYS)

### Phase 1: Research & Setup (Day 1)

```
┌─────────────────────────────────────────────────────────────┐
│  DAY 1: RESEARCH & SETUP                                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  MORNING (3 hours):                                         │
│  ───────────────────                                         │
│  □ Research Mayar.id (use checklist above)                  │
│  □ Find and read API documentation                          │
│  □ Register for developer account                           │
│  □ Get API keys (sandbox or production)                     │
│                                                              │
│  AFTERNOON (3 hours):                                       │
│  ──────────────────────                                     │
│  □ Test API connectivity (simple curl/Postman)              │
│  □ Identify simplest integration method                     │
│  □ Create test product in Mayar dashboard                   │
│  □ Document API endpoints needed                            │
│                                                              │
│  EVENING (2 hours):                                         │
│  ────────────────────                                       │
│  □ Create OpenSpec change: mayar-id-setup                   │
│  □ Update Prisma schema (payment tables)                    │
│  □ Add environment variables                                │
│  □ Create Mayar API client wrapper                          │
│                                                              │
│  DELIVERABLE: Working API connection to Mayar.id            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Phase 2: Core Features (Days 2-4)

```
┌─────────────────────────────────────────────────────────────┐
│  DAYS 2-4: CORE FEATURES (Priority #1)                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Focus: Build the "idea" that gets judged                   │
│  ───────────────────────────────────────                    │
│                                                              │
│  DAY 2: Course Creation                                     │
│  ─────────────────────                                      │
│  □ Teacher can create course                                │
│  □ Course listing page                                      │
│  □ Access code generation                                   │
│                                                              │
│  DAY 3: Student Join Flow                                   │
│  ──────────────────────────                                 │
│  □ Student enters access code                               │
│  □ Student inputs name                                      │
│  □ Auto-register guest user                                 │
│  □ Join confirmation                                        │
│                                                              │
│  DAY 4: Quiz Taking                                         │
│  ───────────────────────                                    │
│  □ Quiz interface (multiple choice + essay)                 │
│  □ Answer submission                                        │
│  □ Basic scoring                                            │
│  □ Result display                                           │
│                                                              │
│  DELIVERABLE: Working end-to-end quiz flow                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Phase 3: Mayar.id Integration (Days 5-6)

```
┌─────────────────────────────────────────────────────────────┐
│  DAYS 5-6: MAYAR.ID INTEGRATION                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  DAY 5: Backend Integration                                 │
│  ──────────────────────────────                             │
│  □ Create payment service                                   │
│  □ API route: POST /api/v1/payment/create-checkout          │
│  □ API route: POST /api/v1/payment/webhook (if supported)   │
│  □ API route: GET /api/v1/payment/status/:id                │
│  □ Update user subscription on payment success              │
│                                                              │
│  DAY 6: Frontend Integration                                │
│  ───────────────────────────────                            │
│  □ Create /pricing page                                     │
│  □ Pricing cards (Free vs Premium)                          │
│  □ "Upgrade to Premium" button flow                         │
│  □ Redirect to Mayar checkout                               │
│  □ Return page after payment                                │
│  □ Feature gating (free vs premium features)                │
│                                                              │
│  DELIVERABLE: Working payment flow                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Phase 4: Testing & Polish (Days 7-8)

```
┌─────────────────────────────────────────────────────────────┐
│  DAYS 7-8: TESTING & POLISH                                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  DAY 7: Testing                                             │
│  ────────────────────                                       │
│  □ Test core flow (course → quiz → result)                  │
│  □ Test payment flow (upgrade → checkout → premium)         │
│  □ Fix critical bugs                                        │
│  □ Test on mobile                                           │
│                                                              │
│  DAY 8: Submission Prep                                     │
│  ──────────────────────────                                 │
│  □ Prepare demo script                                      │
│  □ Record demo video (if required)                          │
│  □ Write README/documentation                               │
│  □ Package submission                                       │
│  □ Submit before deadline!                                  │
│                                                              │
│  DELIVERABLE: Competition submission ready                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. MINIMUM VIABLE PAYMENT INTEGRATION

### If Time is Tight, Do This:

```
┌─────────────────────────────────────────────────────────────┐
│  MVP PAYMENT INTEGRATION (2-3 hours)                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Option 1: Payment Link (Simplest)                          │
│  ──────────────────────────────────                         │
│  1. Create payment link in Mayar dashboard                  │
│  2. Add button on /pricing page: "Upgrade to Premium"       │
│  3. Button links to Mayar payment page                      │
│  4. Manual verification (check Mayar dashboard)             │
│  5. Manually activate premium for user                      │
│                                                             │
│  Code needed:                                               │
│  • Simple button with href to Mayar link                    │
│  • Admin page to manually activate premium                  │
│                                                             │
│  Time: 1-2 hours                                            │
│                                                              │
│  ─────────────────────────────────────────────────────────  │
│                                                              │
│  Option 2: Hosted Checkout (Recommended)                    │
│  ────────────────────────────────────────                   │
│  1. Create checkout session via Mayar API                   │
│  2. Redirect user to checkout URL                           │
│  3. Handle return URL                                       │
│  4. (Optional) Handle webhook for auto-activation           │
│                                                             │
│  Code needed:                                               │
│  • API route: /api/v1/payment/create-checkout               │
│  • /pricing page with upgrade button                        │
│  • /payment/success page                                    │
│  • Webhook handler (if supported)                           │
│                                                             │
│  Time: 3-4 hours                                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. DATABASE SCHEMA (Payment Integration)

```prisma
// Add to prisma/schema.prisma

model User {
  // ... existing fields ...
  
  // Subscription fields
  subscriptionStatus      String   @default("free") // free, premium, cancelled
  subscriptionExpiresAt   DateTime?
  mayarCustomerId         String?  // Mayar customer ID
  trialEndsAt             DateTime?
  
  payments                Payment[]
}

model Payment {
  id                String   @id @default(cuid())
  userId            String
  amount            Decimal  @default(49000)
  currency          String   @default("IDR")
  status            String   // pending, success, failed, refunded
  paymentMethod     String?  // qris, va, ewallet, etc.
  mayarPaymentId    String?  // Mayar payment ID
  mayarResponse     Json?    // Full response from Mayar
  checkoutUrl       String?  // Hosted checkout URL
  paidAt            DateTime?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  user              User     @relation(fields: [userId], references: [id])
  
  @@index([userId])
  @@index([status])
  @@index([mayarPaymentId])
}
```

---

## 8. API ROUTES NEEDED

```typescript
// Minimal API routes for Mayar integration

// 1. Create checkout session
POST /api/v1/payment/create-checkout
Body: { plan: 'premium', period: 'monthly' }
Response: { checkoutUrl: 'https://mayar.id/checkout/...' }

// 2. Handle return from Mayar
GET /api/v1/payment/return
Query: { payment_id, status }
Response: Redirect to /payment/success or /payment/failed

// 3. Payment success page
GET /payment/success
Display: Payment successful, premium activated

// 4. Payment failed page
GET /payment/failed
Display: Payment failed, try again

// 5. Webhook (if Mayar supports it)
POST /api/v1/payment/webhook
Body: Mayar webhook payload
Action: Update payment status, activate premium

// 6. Check subscription status
GET /api/v1/subscription/status
Response: { status: 'premium', expiresAt: '...' }
```

---

## 9. FEATURE GATING LOGIC

```typescript
// src/lib/subscription.ts

export interface SubscriptionLimits {
  maxCourses: number;
  maxStudentsPerCourse: number;
  maxQuestionsPerQuiz: number;
  allowedQuestionTypes: string[];
  canExport: boolean;
}

export const FREE_LIMITS: SubscriptionLimits = {
  maxCourses: 2,
  maxStudentsPerCourse: 30,
  maxQuestionsPerQuiz: 10,
  allowedQuestionTypes: ['multiple_choice', 'essay'],
  canExport: false,
};

export const PREMIUM_LIMITS: SubscriptionLimits = {
  maxCourses: Infinity,
  maxStudentsPerCourse: Infinity,
  maxQuestionsPerQuiz: Infinity,
  allowedQuestionTypes: ['multiple_choice', 'essay', 'fill_blank', 'match', 'reorder'],
  canExport: true,
};

export async function getUserSubscriptionStatus(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      subscriptionStatus: true,
      subscriptionExpiresAt: true,
    },
  });

  if (!user) return 'free';

  // Check if subscription is still valid
  if (
    user.subscriptionStatus === 'premium' &&
    user.subscriptionExpiresAt &&
    user.subscriptionExpiresAt > new Date()
  ) {
    return 'premium';
  }

  return user.subscriptionStatus || 'free';
}

export async function checkCourseCreationLimit(userId: string) {
  const status = await getUserSubscriptionStatus(userId);
  const limits = status === 'premium' ? PREMIUM_LIMITS : FREE_LIMITS;
  
  const courseCount = await prisma.course.count({
    where: { teacherId: userId },
  });

  return {
    current: courseCount,
    max: limits.maxCourses,
    canCreate: courseCount < limits.maxCourses,
  };
}
```

---

## 10. RISK MITIGATION

```
┌─────────────────────────────────────────────────────────────┐
│                    RISK MITIGATION                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  RISK 1: Mayar.id API is too complex or undocumented         │
│  ─────────────────────────────────────────────────────────  │
│  Mitigation:                                                │
│  → Use Payment Link method (manual verification)            │
│  → Document effort in submission                            │
│  → Focus on core features                                   │
│                                                              │
│  RISK 2: Mayar.id requires KYC approval (takes days)        │
│  ────────────────────────────────────────────────────────── │
│  Mitigation:                                                │
│  → Start registration immediately (Day 1)                   │
│  → Contact support for expedited approval                   │
│  → Have fallback (mock payment UI) ready                    │
│                                                              │
│  RISK 3: Webhook not supported or too complex               │
│  ────────────────────────────────────────────────────────── │
│  Mitigation:                                                │
│  → Skip webhook, use manual verification for demo           │
│  → User shows payment proof, admin activates manually       │
│  → Note in submission that webhook is "in progress"         │
│                                                              │
│  RISK 4: Core features not complete by Day 5                │
│  ────────────────────────────────────────────────────────── │
│  Mitigation:                                                │
│  → Prioritize core features over payment                    │
│  → Payment is bonus, core is main judging criteria          │
│  → Submit with core features if payment not ready           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 11. NEXT ACTIONS

### Immediate (Today):

```
┌─────────────────────────────────────────────────────────────┐
│  ACTION ITEMS - DO NOW                                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  □ 1. Clarify with competition organizers:                  │
│     Is payment MANDATORY to submit or BONUS for scoring?    │
│                                                              │
│  □ 2. Research Mayar.id (2-3 hours):                        │
│     • Visit mayar.id                                        │
│     • Find API docs                                         │
│     • Register for developer account                        │
│     • Get API keys                                          │
│                                                              │
│  □ 3. Test Mayar API (1 hour):                              │
│     • Simple API call to verify connectivity                │
│     • Identify simplest integration method                  │
│                                                              │
│  □ 4. Decide approach:                                      │
│     • Payment Link (simplest)                               │
│     • Hosted Checkout (recommended)                         │
│     • Embedded Form (skip for MVP)                          │
│                                                              │
│  □ 5. Start OpenSpec change:                                │
│     → /opsx:new mayar-id-setup                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 12. CONTACT MAYAR.ID

If you can't find documentation:

```
┌─────────────────────────────────────────────────────────────┐
│  MAYAR.ID CONTACT INFO (Verify These)                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Website: https://mayar.id                                  │
│  Email: support@mayar.id (verify)                           │
│  Phone: (check website)                                     │
│  WhatsApp: (check website)                                  │
│  Telegram: (check website)                                  │
│                                                              │
│  Questions to Ask:                                          │
│  ──────────────────                                         │
│  1. Do you have API documentation for developers?           │
│  2. Do you offer sandbox/test mode?                         │
│  3. What's the fastest integration method?                  │
│  4. Do you support hosted checkout pages?                   │
│  5. Do you support webhooks?                                │
│  6. What's the KYC approval timeline?                       │
│  7. Do you have Node.js/Next.js integration examples?       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

*Document created: 7 March 2026*
*Vibe Coding Competition - Mayar.id Integration Strategy*
*Deadline: 15 March 2026 (8 days remaining)*
