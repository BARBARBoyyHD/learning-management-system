# Pricing Plan for Quizizz Clone (Lite Version)
## Vibe Coding Competition - Mayar.id Integration

---

| Attribute | Value |
|-----------|-------|
| Document ID | DOC-QCL-PP-008 |
| Version | 1.0 |
| Status | Draft - For Competition |
| Author | Assistant |
| Created | 7 March 2026 |
| Context | Mayar.id Payment Gateway Integration |

---

## TABLE OF CONTENTS

1. [Executive Summary](#1-executive-summary)
2. [Pricing Strategy Overview](#2-pricing-strategy-overview)
3. [Feature Comparison: Free vs Premium](#3-feature-comparison-free-vs-premium)
4. [Pricing Tiers Detail](#4-pricing-tiers-detail)
5. [What to Charge For](#5-what-to-charge-for)
6. [Pricing Justification](#6-pricing-justification)
7. [Mayar.id Product Configuration](#7-mayarid-product-configuration)
8. [Revenue Model](#8-revenue-model)
9. [Competition Demo Script](#9-competition-demo-script)

---

## 1. EXECUTIVE SUMMARY

### 1.1 The Big Question

> **"Which services need to be priced?"**

**Answer:** You're selling a **Premium Subscription** for teachers who want advanced features. Students (guest users) always use the platform for **FREE**.

### 1.2 Quick Answer

```
┌─────────────────────────────────────────────────────────────┐
│              PRICING MODEL AT A GLANCE                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  FREE TIER (Rp 0/month)                                     │
│  ───────────────────────                                    │
│  For: Teachers who want basic quiz functionality            │
│  Includes: 2 courses, 30 students, MC + Essay only          │
│                                                              │
│  PREMIUM TIER (Rp 49.000/month)                             │
│  ──────────────────────────────────                         │
│  For: Teachers who want unlimited access                    │
│  Includes: Unlimited courses, all 5 question types,         │
│          advanced reporting, priority support               │
│                                                              │
│  STUDENTS (Always FREE)                                     │
│  ──────────────────────                                     │
│  For: All students joining via access code                  │
│  Includes: Full quiz taking experience                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.3 What You're Selling

| Product | Type | Price | Target Customer |
|---------|------|-------|-----------------|
| **Premium Subscription** | Recurring (Monthly) | Rp 49.000/month | Teachers |
| **Free Tier** | Free | Rp 0 | Teachers (trial/limited needs) |
| **Student Access** | Free | Rp 0 | Students (always free) |

---

## 2. PRICING STRATEGY OVERVIEW

### 2.1 Freemium Model

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    FREEMIUM MODEL EXPLAINED                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  FREE TIER                    PREMIUM TIER                               │
│  ───────────                  ──────────────                             │
│  • Limited features    ────▶  • All features unlocked                    │
│  • Usage limits               • Unlimited usage                          │
│  • Basic question types       • All 5 question types                     │
│  • Basic reporting            • Advanced analytics                       │
│                                 • Priority support                       │
│                                                                          │
│  Strategy:                                                              │
│  ────────                                                               │
│  1. Teachers start with FREE tier (no barrier to entry)                │
│  2. They hit limits (e.g., want 3rd course)                            │
│  3. Prompt to upgrade to PREMIUM                                       │
│  4. Pay via Mayar.id (monthly subscription)                            │
│  5. Unlock all features                                                │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Why Freemium?

| Reason | Explanation |
|--------|-------------|
| **Low Barrier** | Teachers can try without paying first |
| **Value Demonstration** | They experience the platform before upgrading |
| **Natural Upsell** | Upgrade prompts appear when they hit limits |
| **Competition Friendly** | Judges can see free → premium flow |
| **Scalable** | Can add more tiers later (Team, School, Enterprise) |

### 2.3 What's NOT Priced (Always Free)

```
┌─────────────────────────────────────────────────────────────┐
│  ALWAYS FREE - NEVER CHARGE                                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ Student Access                                          │
│     • Students join via access code                         │
│     • Take quizzes                                          │
│     • View results                                          │
│     Why: Need to remove barriers for students               │
│                                                              │
│  ✅ Teacher Registration                                    │
│     • Create account                                        │
│     • Login                                                 │
│     Why: Need teachers to join the platform                 │
│                                                              │
│  ✅ Basic Course Creation (up to 2)                         │
│     • Create courses                                        │
│     • Generate access codes                                 │
│     Why: Let them experience the value first                │
│                                                              │
│  ✅ Basic Quiz Creation (MC + Essay)                        │
│     • Multiple Choice questions                             │
│     • Essay questions                                       │
│     Why: Core functionality should be accessible            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. FEATURE COMPARISON: FREE VS PREMIUM

### 3.1 Detailed Feature Matrix

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         FEATURE COMPARISON                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  FEATURE                        │ FREE        │ PREMIUM        │        │
│  ───────────────────────────────┼─────────────┼────────────────┤        │
│                                 │             │                │        │
│  COURSE MANAGEMENT              │             │                │        │
│  • Number of courses            │ 2           │ UNLIMITED      │        │
│  • Students per course          │ 30          │ UNLIMITED      │        │
│  • Course types                 │ Public only │ Public + Private│       │
│  • Access code generation       │ ✅ Yes      │ ✅ Yes         │        │
│  • Course analytics             │ ❌ No       │ ✅ Yes         │        │
│                                 │             │                │        │
│  ASSESSMENT & QUIZZES           │             │                │        │
│  • Quizzes per course           │ 5           │ UNLIMITED      │        │
│  • Questions per quiz           │ 10          │ UNLIMITED      │        │
│  • Question types               │ 2 types     │ 5 types        │        │
│  │ - Multiple Choice            │ ✅ Included │ ✅ Included    │        │
│  │ - Essay                      │ ✅ Included │ ✅ Included    │        │
│  │ - Fill in the Blank          │ ❌ No       │ ✅ Included    │        │
│  │ - Match (Menjodohkan)        │ ❌ No       │ ✅ Included    │        │
│  │ - Reorder (Urutkan)          │ ❌ No       │ ✅ Included    │        │
│  • Time limit configuration     │ ❌ No       │ ✅ Yes         │        │
│  • Quiz scheduling              │ ❌ No       │ ✅ Yes         │        │
│  • Auto-save answers            │ ❌ No       │ ✅ Yes         │        │
│                                 │             │                │        │
│  REPORTING & ANALYTICS          │             │                │        │
│  • Basic score table            │ ✅ Yes      │ ✅ Yes         │        │
│  • Individual student report    │ ❌ No       │ ✅ Yes         │        │
│  • Question analysis            │ ❌ No       │ ✅ Yes         │        │
│  • Export to CSV/Excel          │ ❌ No       │ ✅ Yes         │        │
│  • Class performance dashboard  │ ❌ No       │ ✅ Yes         │        │
│                                 │             │                │        │
│  SUPPORT                        │             │                │        │
│  • Documentation                │ ✅ Yes      │ ✅ Yes         │        │
│  • Email support                │ ❌ No       │ ✅ Yes         │        │
│  • Priority support             │ ❌ No       │ ✅ Yes         │        │
│                                 │             │                │        │
│  STUDENT ACCESS                 │             │                │        │
│  • Join via access code         │ ✅ FREE     │ ✅ FREE        │        │
│  • Take quizzes                 │ ✅ FREE     │ ✅ FREE        │        │
│  • View results                 │ ✅ FREE     │ ✅ FREE        │        │
│  • Review answers               │ ✅ FREE     │ ✅ FREE        │        │
│                                 │             │                │        │
│  PRICE (Monthly)                │ Rp 0        │ Rp 49.000      │        │
│                                 │             │                │        │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Visual Pricing Card Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         PRICING CARDS                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────────┐           ┌─────────────────────┐             │
│  │      FREE           │           │       PREMIUM       │             │
│  │                     │           │                     │             │
│  │      Rp 0           │           │    Rp 49.000        │             │
│  │     /month          │           │     /month          │             │
│  │                     │           │                     │             │
│  │  Perfect for:       │           │  Perfect for:       │             │
│  │  Trying out         │           │  Serious teachers   │             │
│  │                     │           │                     │             │
│  │  ✓ 2 courses        │           │  ✓ Unlimited courses│             │
│  │  ✓ 30 students      │           │  ✓ Unlimited students│            │
│  │  ✓ 5 quizzes        │           │  ✓ Unlimited quizzes│             │
│  │  ✓ MC + Essay       │           │  ✓ All 5 question types│          │
│  │  ✓ Basic reporting  │           │  ✓ Advanced analytics│            │
│  │                     │           │  ✓ Export to CSV    │             │
│  │                     │           │  ✓ Priority support │             │
│  │                     │           │                     │             │
│  │  [Get Started]      │           │  [Upgrade Now]      │             │
│  │                     │           │                     │             │
│  │                     │           │  🏷️ 7-day free trial│             │
│  └─────────────────────┘           └─────────────────────┘             │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 4. PRICING TIERS DETAIL

### 4.1 FREE Tier

```
┌─────────────────────────────────────────────────────────────┐
│  FREE TIER - DETAIL                                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Price: Rp 0 / month (Forever Free)                         │
│                                                              │
│  TARGET USER:                                               │
│  ─────────────                                              │
│  • Teachers new to the platform                             │
│  • Teachers with small classes (≤ 30 students)              │
│  • Teachers who only need basic quizzes                     │
│  • Trial users evaluating the platform                      │
│                                                              │
│  LIMITS:                                                    │
│  ────────                                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Feature              │ Limit                        │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ Courses              │ 2 courses                    │   │
│  │ Students per course  │ 30 students                  │   │
│  │ Quizzes per course   │ 5 quizzes                    │   │
│  │ Questions per quiz   │ 10 questions                 │   │
│  │ Question types       │ 2 types (MC, Essay)          │   │
│  │ Storage              │ 100 MB                       │   │
│  │ Reports              │ Basic only                   │   │
│  │ Support              │ Documentation only           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  WHAT HAPPENS WHEN THEY HIT LIMITS?                         │
│  ─────────────────────────────────────                      │
│  • Show friendly upgrade prompt                             │
│  • "You've reached the maximum of 2 courses"                │
│  • "Upgrade to Premium for unlimited courses"               │
│  • Button: "Upgrade Now" → /pricing                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 PREMIUM Tier

```
┌─────────────────────────────────────────────────────────────┐
│  PREMIUM TIER - DETAIL                                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Price: Rp 49.000 / month                                   │
│         or Rp 490.000 / year (save 17%)                     │
│                                                              │
│  TARGET USER:                                               │
│  ─────────────                                              │
│  • Active teachers creating many quizzes                    │
│  • Teachers with large classes (> 30 students)              │
│  • Teachers who want advanced question types                │
│  • Schools needing detailed reporting                       │
│                                                              │
│  FEATURES:                                                  │
│  ─────────                                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Feature              │ Limit                        │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ Courses              │ UNLIMITED                    │   │
│  │ Students per course  │ UNLIMITED                    │   │
│  │ Quizzes per course   │ UNLIMITED                    │   │
│  │ Questions per quiz   │ UNLIMITED                    │   │
│  │ Question types       │ All 5 types                  │   │
│  │ Storage              │ 10 GB                        │   │
│  │ Reports              │ Advanced + Export            │   │
│  │ Support              │ Priority email               │   │
│  │ Trial                │ 7 days free                  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  TRIAL DETAILS:                                             │
│  ───────────────                                            │
│  • 7-day free trial (no payment required to start)          │
│  • Full access to all Premium features                      │
│  • Payment only required after trial ends                   │
│  • Cancel anytime during trial = no charge                  │
│                                                              │
│  BILLING (via Mayar.id):                                    │
│  ─────────────────────                                      │
│  • Monthly recurring payment                                │
│  • Auto-renewal (can cancel anytime)                        │
│  • Payment methods: QRIS, Virtual Account, E-wallet         │
│  • Invoice sent via email                                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. WHAT TO CHARGE FOR

### 5.1 The Simple Answer

```
┌─────────────────────────────────────────────────────────────┐
│  WHAT YOU'RE CHARGING FOR                                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ CHARGE FOR: Premium Subscription (Teacher)              │
│     ─────────────────────────────────────                   │
│     • Unlimited course creation                             │
│     • All 5 question types                                  │
│     • Advanced reporting                                    │
│     • Priority support                                      │
│                                                              │
│  ❌ DON'T CHARGE FOR:                                       │
│     ────────────────────────                                │
│     • Student access (always free)                          │
│     • Teacher registration (free to join)                   │
│     • Basic features (let them try first)                   │
│     • Quiz taking (students always free)                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 What NOT to Charge For (And Why)

| Feature | Why Free? |
|---------|-----------|
| **Student Access** | Removing barriers = more adoption. Students tell teachers about the platform. |
| **Teacher Registration** | Need teachers to experience the platform first. |
| **Basic Course Creation (2 courses)** | Let them create something valuable before asking for payment. |
| **Multiple Choice + Essay** | These are the most common question types. Should be accessible. |
| **Basic Reporting** | Teachers need to see scores. Don't hide basic functionality. |

### 5.3 What TO Charge For (And Why)

| Feature | Why Premium? |
|---------|--------------|
| **Unlimited Courses** | Power users (active teachers) will need this. They'll pay for scale. |
| **All 5 Question Types** | Advanced types (Fill Blank, Match, Reorder) are differentiators. |
| **Advanced Reporting** | Schools and serious teachers need detailed analytics. |
| **Export to CSV/Excel** | Administrative feature for grade books and records. |
| **Priority Support** | Paying customers deserve faster response times. |

---

## 6. PRICING JUSTIFICATION

### 6.1 Market Comparison (Indonesia)

```
┌─────────────────────────────────────────────────────────────┐
│  COMPETITOR PRICING COMPARISON                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  PLATFORM              │ PRICE (Monthly)  │ FEATURES        │
│  ──────────────────────┼──────────────────┼───────────────  │
│  Quizizz (Pro)         │ ~Rp 150.000      │ All features    │
│  Kahoot! (Pro)         │ ~Rp 100.000      │ All features    │
│  Google Forms          │ FREE             │ Basic only      │
│  Microsoft Forms       │ FREE             │ Basic only      │
│  ──────────────────────┼──────────────────┼───────────────  │
│  OUR PLATFORM (Premium)│ Rp 49.000        │ All features    │
│                                                              │
│  POSITIONING:                                                │
│  ────────────                                                │
│  • Cheaper than Quizizz Pro (67% cheaper)                   │
│  • Cheaper than Kahoot! Pro (50% cheaper)                   │
│  • More features than Google/Microsoft Forms                │
│  • Local Indonesian support                                 │
│  • Built for Indonesian schools                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Value Proposition

```
┌─────────────────────────────────────────────────────────────┐
│  WHY Rp 49.000/month is a GOOD DEAL                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  COST BREAKDOWN:                                            │
│  ───────────────                                            │
│  Rp 49.000 / month = Rp 1.633 / day                         │
│                                                              │
│  That's less than:                                          │
│  • 1 cup of coffee (Rp 15.000)                              │
│  • 1 parking ticket (Rp 5.000)                              │
│  • 1 snack (Rp 10.000)                                      │
│                                                              │
│  VALUE DELIVERED:                                           │
│  ───────────────                                            │
│  For one teacher with 4 classes (120 students):             │
│  • Time saved on grading: ~5 hours/week                     │
│  • At Rp 50.000/hour (teacher rate) = Rp 250.000/week      │
│  • ROI: 5x return on investment                             │
│                                                              │
│  AFFORDABILITY:                                             │
│  ─────────────                                              │
│  • Less than 1% of average teacher salary (Rp 5.000.000)   │
│  • Cheaper than most educational apps                       │
│  • School can bulk-purchase for all teachers                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. MAYAR.ID PRODUCT CONFIGURATION

### 7.1 Product Setup in Mayar Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│  MAYAR.ID PRODUCT SETUP                                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  PRODUCT 1: Premium Monthly Subscription                    │
│  ──────────────────────────────────────                     │
│                                                              │
│  Product Details:                                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Field                  │ Value                      │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ Product Name           │ Premium Subscription       │   │
│  │ Product Type           │ Recurring (Subscription)   │   │
│  │ Billing Period         │ Monthly                    │   │
│  │ Price                  │ Rp 49.000                  │   │
│  │ Currency               │ IDR (Indonesian Rupiah)    │   │
│  │ Trial Period           │ 7 days (free)              │   │
│  │ Auto-renewal           │ Yes                        │   │
│  │ Payment Methods        │ QRIS, Virtual Account,     │   │
│  │                        │ E-wallet (GoPay, OVO, etc) │   │
│  │ Description            │ Unlimited courses, all     │   │
│  │                        │ question types, advanced   │   │
│  │                        │ reporting, priority support│   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  PRODUCT 2: Premium Yearly Subscription (Optional)          │
│  ────────────────────────────────────────                   │
│                                                              │
│  Product Details:                                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Field                  │ Value                      │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ Product Name           │ Premium Yearly             │   │
│  │ Product Type           │ Recurring (Subscription)   │   │
│  │ Billing Period         │ Yearly                     │   │
│  │ Price                  │ Rp 490.000                 │   │
│  │ Discount               │ 17% off (save Rp 98.000)   │   │
│  │ Currency               │ IDR                        │   │
│  │ Trial Period           │ None                       │   │
│  │ Auto-renewal           │ Yes                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  FOR COMPETITION MVP:                                       │
│  ───────────────────────                                    │
│  → Start with PRODUCT 1 only (Monthly)                      │
│  → Add PRODUCT 2 later (post-competition)                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 7.2 Mayar.id Integration Checklist

```
┌─────────────────────────────────────────────────────────────┐
│  MAYAR.ID SETUP CHECKLIST                                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  □ 1. Create Mayar.id Account                               │
│     • Register at https://mayar.id                          │
│     • Complete KYC (KTP, NPWP if required)                  │
│     • Wait for approval (1-3 days)                          │
│                                                              │
│  □ 2. Create Product in Dashboard                           │
│     • Product name: "Premium Subscription"                  │
│     • Type: Recurring (Monthly)                             │
│     • Price: Rp 49.000                                      │
│     • Trial: 7 days                                         │
│                                                              │
│  □ 3. Get API Keys                                          │
│     • API Key (Public)                                      │
│     • API Secret (Private)                                  │
│     • Webhook Secret (if supported)                         │
│                                                              │
│  □ 4. Configure Return URLs                                 │
│     • Success URL: https://yourapp.com/payment/success      │
│     • Failed URL: https://yourapp.com/payment/failed        │
│     • Cancel URL: https://yourapp.com/payment/cancel        │
│                                                              │
│  □ 5. Setup Webhook (Optional - Bonus Points)               │
│     • Webhook URL: https://yourapp.com/api/v1/payment/      │
│       webhook                                               │
│     • Events: payment.success, payment.failed,              │
│       subscription.cancelled                                │
│                                                              │
│  □ 6. Test Payment Flow                                     │
│     • Use test mode (if available)                          │
│     • Create test payment                                   │
│     • Verify webhook (if configured)                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 8. REVENUE MODEL

### 8.1 Revenue Projections (Example)

```
┌─────────────────────────────────────────────────────────────┐
│  REVENUE PROJECTIONS (First Year)                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ASSUMPTIONS:                                               │
│  ───────────                                                │
│  • Month 1-3: 10 paying teachers                            │
│  • Month 4-6: 50 paying teachers                            │
│  • Month 7-12: 200 paying teachers                          │
│  • Price: Rp 49.000 / month                                 │
│  • Churn rate: 10% per month                                │
│                                                              │
│  PROJECTIONS:                                               │
│  ────────────                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Period      │ Users  │ MRR (Monthly)  │ Revenue    │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ Month 1     │ 10     │ Rp 490.000     │ Rp 490.000 │   │
│  │ Month 2     │ 15     │ Rp 735.000     │ Rp 735.000 │   │
│  │ Month 3     │ 25     │ Rp 1.225.000   │ Rp 1.225K  │   │
│  │ Month 4     │ 50     │ Rp 2.450.000   │ Rp 2.45M   │   │
│  │ Month 5     │ 75     │ Rp 3.675.000   │ Rp 3.675M  │   │
│  │ Month 6     │ 100    │ Rp 4.900.000   │ Rp 4.9M    │   │
│  │ Month 7     │ 150    │ Rp 7.350.000   │ Rp 7.35M   │   │
│  │ Month 8     │ 200    │ Rp 9.800.000   │ Rp 9.8M    │   │
│  │ Month 9     │ 250    │ Rp 12.250.000  │ Rp 12.25M  │   │
│  │ Month 10    │ 300    │ Rp 14.700.000  │ Rp 14.7M   │   │
│  │ Month 11    │ 350    │ Rp 17.150.000  │ Rp 17.15M  │   │
│  │ Month 12    │ 400    │ Rp 19.600.000  │ Rp 19.6M   │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ YEAR 1 TOTAL │        │               │ Rp 94.3M   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  NOTE: These are conservative estimates.                    │
│        Actual results may vary.                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 8.2 Revenue Streams (Future)

```
┌─────────────────────────────────────────────────────────────┐
│  FUTURE REVENUE STREAMS (Post-Competition)                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  STREAM 1: Premium Subscription (Current)                   │
│  ───────────────────────────────────────                    │
│  • Monthly: Rp 49.000                                       │
│  • Yearly: Rp 490.000                                       │
│                                                              │
│  STREAM 2: School/Team Plan (Future)                        │
│  ─────────────────────────────────────                      │
│  • Price: Rp 299.000 / month (up to 10 teachers)            │
│  • Target: Schools buying for all teachers                  │
│  • Features: Admin dashboard, bulk management, SSO          │
│                                                              │
│  STREAM 3: Enterprise Plan (Future)                         │
│  ─────────────────────────────────────                      │
│  • Price: Custom (Rp 2.000.000+ / month)                    │
│  • Target: Large schools, districts                         │
│  • Features: Custom branding, API access, dedicated support │
│                                                              │
│  STREAM 4: Pay-per-Course Marketplace (Future)              │
│  ───────────────────────────────────────────────            │
│  • Teachers set price for their courses                     │
│  • Platform takes 20% commission                            │
│  • Students pay per course (not subscription)               │
│                                                              │
│  FOR COMPETITION:                                           │
│  ──────────────────                                         │
│  → Focus on STREAM 1 only (Premium Subscription)            │
│  → Mention other streams in pitch (future vision)           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 9. COMPETITION DEMO SCRIPT

### 9.1 Demo Flow for Judges

```
┌─────────────────────────────────────────────────────────────┐
│  DEMO SCRIPT: PRICING & PAYMENT FLOW                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  SCENE 1: Teacher Signs Up (FREE)                           │
│  ──────────────────────────────────                         │
│  1. Go to homepage                                          │
│  2. Click "Sign Up"                                         │
│  3. Register as teacher                                     │
│  4. Login to dashboard                                      │
│  Narration: "Teachers start free, no payment required"      │
│                                                              │
│  SCENE 2: Teacher Creates First Course (FREE)               │
│  ───────────────────────────────────────────────            │
│  1. Click "Create Course"                                   │
│  2. Fill course details                                     │
│  3. Course created successfully                             │
│  Narration: "Free tier includes up to 2 courses"            │
│                                                              │
│  SCENE 3: Teacher Hits Limit (Upsell Moment)                │
│  ───────────────────────────────────────────────            │
│  1. Try to create 3rd course                                │
│  2. Show upgrade prompt                                     │
│  3. "You've reached the free limit"                         │
│  4. Click "Upgrade to Premium"                              │
│  Narration: "When teachers need more, they see upgrade"     │
│                                                              │
│  SCENE 4: Pricing Page                                      │
│  ──────────────────────────────                             │
│  1. Show pricing page (/pricing)                            │
│  2. Compare Free vs Premium                                 │
│  3. Highlight Premium benefits                              │
│  4. Click "Upgrade Now"                                     │
│  Narration: "Clear pricing, no hidden fees"                 │
│                                                              │
│  SCENE 5: Mayar.id Checkout                                 │
│  ───────────────────────────────                            │
│  1. Redirect to Mayar checkout                              │
│  2. Show payment options (QRIS, VA, etc.)                   │
│  3. Complete payment (use test mode)                        │
│  Narration: "Secure payment via Mayar.id"                   │
│                                                              │
│  SCENE 6: Premium Activated                                 │
│  ─────────────────────────────                              │
│  1. Redirect back to app                                    │
│  2. Show "Premium Activated" success page                   │
│  3. Dashboard now shows "Premium" badge                     │
│  4. Create 3rd course (now unlimited)                       │
│  Narration: "Instant activation, full access unlocked"      │
│                                                              │
│  SCENE 7: Premium Features Demo                             │
│  ───────────────────────────────                            │
│  1. Create Fill in the Blank question                       │
│  2. Create Match question                                   │
│  3. Export report to CSV                                    │
│  Narration: "All premium features now available"            │
│                                                              │
│  TOTAL DEMO TIME: 3-5 minutes                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 9.2 Key Talking Points for Judges

```
┌─────────────────────────────────────────────────────────────┐
│  TALKING POINTS FOR JUDGES                                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  💡 BUSINESS MODEL:                                         │
│     • Freemium model (low barrier, natural upsell)          │
│     • Affordable pricing (Rp 49.000/month)                  │
│     • Recurring revenue (subscription)                      │
│                                                              │
│  💡 MARKET FIT:                                             │
│     • Cheaper than Quizizz/Kahoot                           │
│     • Built for Indonesian schools                          │
│     • Local payment methods (Mayar.id)                      │
│                                                              │
│  💡 TECHNICAL:                                              │
│     • Integrated with Mayar.id payment gateway              │
│     • Automated billing (recurring subscription)            │
│     • Feature gating based on subscription status           │
│                                                              │
│  💡 SCALABILITY:                                            │
│     • Can add School/Enterprise tiers later                 │
│     • Marketplace model possible (pay-per-course)           │
│     • Revenue sharing with teachers                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 10. SUMMARY

### 10.1 Quick Reference

```
┌─────────────────────────────────────────────────────────────┐
│  PRICING PLAN SUMMARY                                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  WHAT TO CHARGE FOR:                                        │
│  ─────────────────────                                      │
│  ✅ Premium Subscription (Rp 49.000/month)                  │
│     • Unlimited courses                                     │
│     • All 5 question types                                  │
│     • Advanced reporting                                    │
│     • Priority support                                      │
│                                                              │
│  WHAT NOT TO CHARGE FOR:                                    │
│  ─────────────────────────────                              │
│  ❌ Student access (always free)                            │
│  ❌ Teacher registration (free to join)                     │
│  ❌ Basic features (2 courses, MC + Essay)                  │
│                                                              │
│  PAYMENT GATEWAY:                                           │
│  ──────────────────                                         │
│  • Provider: Mayar.id                                       │
│  • Product: Premium Monthly Subscription                    │
│  • Price: Rp 49.000                                         │
│  • Trial: 7 days free                                       │
│  • Payment methods: QRIS, VA, E-wallet                      │
│                                                              │
│  COMPETITION DEMO:                                          │
│  ──────────────────                                         │
│  • Show free → premium upgrade flow                         │
│  • Demonstrate Mayar.id integration                         │
│  • Highlight feature gating                                 │
│  • Total demo time: 3-5 minutes                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

*Document created: 7 March 2026*
*Quizizz Clone (Lite Version) - Pricing Plan*
*Vibe Coding Competition - Mayar.id Integration*
*Deadline: 15 March 2026 (8 days remaining)*
