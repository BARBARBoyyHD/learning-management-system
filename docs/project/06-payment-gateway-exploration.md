# Payment Gateway Exploration for Course Feature
## Quizizz Clone (Lite Version) - Vibe Coding Competition

---

| Attribute | Value |
|-----------|-------|
| Document ID | DOC-QCL-PGE-006 |
| Version | 2.0 |
| Status | **Updated with Competition Requirements** |
| Author | Assistant |
| Created | 7 March 2026 |
| Updated | 7 March 2026 |
| Context | MVP Course Feature + Mayar.id Integration |
| Deadline | **15 March 2026 (8 days remaining)** |

---

## TABLE OF CONTENTS

1. [Executive Summary](#1-executive-summary)
2. [Competition Requirements (Confirmed)](#2-competition-requirements-confirmed)
3. [Current State Analysis](#3-current-state-analysis)
4. [Payment Integration Scenarios](#4-payment-integration-scenarios)
5. [Decision Matrix](#5-decision-matrix)
6. [Recommended Approach](#6-recommended-approach)
7. [Technical Architecture](#7-technical-architecture)
8. [Implementation Roadmap](#8-implementation-roadmap)
9. [Mayar.id Integration Notes](#9-mayarid-integration-notes)
10. [Risk Mitigation](#10-risk-mitigation)
11. [Next Actions](#11-next-actions)
12. [Success Criteria](#12-success-criteria)

---

## 1. EXECUTIVE SUMMARY

### 1.1 Context

This document explores payment gateway integration options for the Quizizz Clone (Lite Version) MVP, specifically for the new **Course Feature** where teachers can create courses for their listed students.

**Key Constraint:** The application **must integrate with Mayar.id** (Indonesian local payment gateway) as part of a **vibe coding competition** requirement.

### 1.2 Purpose

This exploration document helps the team decide:
- **How** to integrate Mayar.id for the competition (8 days remaining)
- **Which** payment services to implement for MVP
- **How** payment gateway fits into current architecture
- **What** scope is appropriate for competition vs. future product

### 1.3 Quick Recommendation

| Scenario | Recommendation | Effort | Competition Ready |
|----------|---------------|--------|-------------------|
| **Mayar.id Hosted Checkout** | Freemium Subscription Model | Medium (3-4 days) | ✅ Yes |
| **Mayar.id Payment Link** | Simple Payment Link + Manual Verification | Low (1-2 days) | ✅ Yes (fallback) |

### 1.4 Competition Requirements Summary

| Requirement | Answer | Implication |
|-------------|--------|-------------|
| **Mandatory?** | ✅ **YES - Mandatory** | Must integrate to submit |
| **Provider** | ✅ **Mayar.id** (new local Indonesian gateway) | Need to research their API |
| **Evaluation** | ✅ **"The idea is free"** | Core features are primary, payment is bonus |
| **Sandbox Mode** | ✅ **OPSIONAL (bonus points)** | "Nilai plus bagi yang sudah integrasi pembayaran" |
| **Deadline** | ✅ **15 March 2026** | **8 days remaining!** |

---

## 2. COMPETITION REQUIREMENTS (CONFIRMED)

### 2.1 Official Requirements

| # | Question | Answer | Status |
|---|----------|--------|--------|
| 1 | Is payment gateway integration mandatory to compete? | **YES - Mandatory** | ✅ Confirmed |
| 2 | Which payment gateway provider? | **Mayar.id** (new local Indonesian gateway) | ✅ Confirmed |
| 3 | What are the evaluation criteria? | **"The idea is free"** (core features judged, payment is bonus) | ✅ Confirmed |
| 4 | Is sandbox/test mode acceptable for demo? | **OPSIONAL** - "Nilai plus bagi yang sudah integrasi pembayaran aplikasi vibecodingnya ke Mayar" | ✅ Confirmed |
| 5 | Timeline for competition submission? | **15 March 2026** | ✅ Confirmed |

### 2.2 Key Insights

```
┌─────────────────────────────────────────────────────────────┐
│  CRITICAL INSIGHTS                                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. PAYMENT IS MANDATORY BUT...                             │
│     ─────────────────────────────────                        │
│     • Must integrate to submit                               │
│     • But "the idea is free" = core features matter most    │
│     • Payment integration = bonus points (nilai plus)       │
│                                                              │
│  2. MAYAR.ID IS A NEW LOCAL GATEWAY                         │
│     ──────────────────────────────────────                   │
│     ⚠️ Likely limited documentation                          │
│     ⚠️ May not have sandbox mode                            │
│     ⚠️ Integration complexity is UNKNOWN                    │
│     ⚠️ Need to research API immediately                     │
│                                                              │
│  3. DEADLINE: 15 March (8 days from now)                    │
│     ─────────────────────────────────────                    │
│     You need to balance:                                     │
│     • Building core features (Course, Quiz) = PRIMARY       │
│     • Integrating Mayar.id = BONUS                          │
│     • Testing everything                                     │
│                                                              │
│  4. RECOMMENDED PRIORITY:                                   │
│     ────────────────────────                                 │
│     Priority 1: Core features (Course, Quiz, Join flow)     │
│     Priority 2: Mayar.id integration (for bonus points)     │
│     If time runs out: Focus on core features                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 2.3 Clarification Needed

There's a slight contradiction in the requirements:
- **Q1:** Payment gateway = **MANDATORY** (must have to submit)
- **Q4:** Integration = **OPSIONAL** (bonus points)

**Most Likely Interpretation:**
```
┌─────────────────────────────────────────────────────────────┐
│  INTERPRETATION                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  • You MUST have some payment integration to submit        │
│  • Full production integration = bonus points              │
│  • Basic/sandbox integration = still eligible to submit    │
│  • No integration = cannot submit / incomplete             │
│                                                              │
│  STRATEGY:                                                   │
│  ────────                                                    │
│  → Aim for working integration (hosted checkout)            │
│  → Use sandbox/test mode if available                       │
│  → If Mayar.id is too complex, use Payment Link method     │
│  → Document effort in submission                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. CURRENT STATE ANALYSIS

### 3.1 Existing Business Requirements

From BRD Section 4.2 (Out of Scope):

| Feature | Current Status | Reason |
|---------|---------------|--------|
| Payment/Subscription System | **Out of Scope** | Tidak diperlukan untuk lite version |
| Mobile App (Native iOS/Android) | Out of Scope | Fokus pada web-based untuk lite version |
| Live Multiplayer Mode | Out of Scope | Kompleksitas tinggi, butuh WebSocket infrastructure |
| Gamification (Avatar, Power-ups) | Out of Scope | Di luar scope lite version |

### 3.2 New Requirement: Course Feature

**User Story:**
> As a Teacher, I want to create a course so that I can organize my classes and manage students.

**Current BRD Requirements (FR-M2):**

| ID | Requirement | Description |
|----|-------------|-------------|
| FR-M2-01 | Create Course | Form: name, description, type (Public/Private), access_code |
| FR-M2-02 | Auto-Generate Access Code | System generates unique 6-character alphanumeric code |
| FR-M2-03 | Course Visibility | Public courses searchable, Private courses via access code |
| FR-M2-04 | Course Listing | Teacher can view all created courses with statistics |
| FR-M2-05 | Edit Course | Teacher can edit course details |
| FR-M2-06 | Delete Course | Delete course with cascade to assessments (soft delete) |
| FR-M2-07 | View Enrolled Students | Teacher can view list of enrolled students with status |
| FR-M2-08 | Student Enrollment | Auto-enrollment when guest student joins with access code |

### 3.3 Competition Constraint (UPDATED)

**NOTE:** See Section 2 for full competition requirements. This section is kept for reference.

```
┌─────────────────────────────────────────────────────────────┐
│              COMPETITION REQUIREMENT                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  "Our app have to run under their payment gateway"          │
│                                                              │
│  CONFIRMED REQUIREMENTS (See Section 2):                    │
│  ────────────────────────────────────────                   │
│  1. Mandatory: YES                                          │
│  2. Provider: Mayar.id (new local Indonesian gateway)       │
│  3. Evaluation: "The idea is free" (core features primary)  │
│  4. Sandbox Mode: OPSIONAL (bonus points)                   │
│  5. Deadline: 15 March 2026 (8 days remaining!)             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. PAYMENT INTEGRATION SCENARIOS

### 4.1 Scenario Overview

**Context:** Must integrate with **Mayar.id** (Indonesian local payment gateway)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    MAYAR.ID INTEGRATION OPTIONS                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  SCENARIO A: PAYMENT LINK (Simplest - Fallback)                         │
│  ═══════════════════════════════════════════════════                     │
│  ┌────────────────────────────────────────────────────────────┐        │
│  │  Create payment link in Mayar dashboard                    │        │
│  │  Show button on /pricing page                              │        │
│  │  User clicks → Opens Mayar payment page                    │        │
│  │  Manual verification (check Mayar dashboard)               │        │
│  │  Manually activate premium for user                        │        │
│  │                                                             │        │
│  │  ✅ Simplest (1-2 hours)                                    │        │
│  │  ✅ No complex coding                                       │        │
│  │  ✅ Works even if Mayar API is limited                     │        │
│  │  ❌ Manual verification (not automated)                     │        │
│  │  ❌ Not scalable                                            │        │
│  │  ❌ Demo only (not production-ready)                        │        │
│  └────────────────────────────────────────────────────────────┘        │
│                                                                          │
│  SCENARIO B: HOSTED CHECKOUT (RECOMMENDED)                              │
│  ═══════════════════════════════════════════════════                     │
│  ┌────────────────────────────────────────────────────────────┐        │
│  │  Create checkout session via Mayar API                     │        │
│  │  Redirect user to Mayar checkout page                      │        │
│  │  User completes payment on Mayar's page                    │        │
│  │  Mayar redirects back to your app                          │        │
│  │  (Optional) Webhook confirms payment                       │        │
│  │                                                             │        │
│  │  ✅ Moderate complexity (3-4 hours)                         │        │
│  │  ✅ Automated payment flow                                  │        │
│  │  ✅ Mayar handles PCI compliance                            │        │
│  │  ✅ Professional demo for judges                            │        │
│  │  ❌ User leaves your app (UX break)                         │        │
│  │  ❌ Need to research Mayar API                              │        │
│  └────────────────────────────────────────────────────────────┘        │
│                                                                          │
│  SCENARIO C: EMBEDDED PAYMENT FORM (Advanced - Skip for MVP)           │
│  ═══════════════════════════════════════════════════                     │
│  ┌────────────────────────────────────────────────────────────┐        │
│  │  Integrate Mayar SDK/embedded form                         │        │
│  │  User stays on your app during payment                     │        │
│  │  Full customization of payment UI                          │        │
│  │  Webhook for automatic activation                          │        │
│  │                                                             │        │
│  │  ✅ Best UX (seamless)                                      │        │
│  │  ✅ Full control over UI                                    │        │
│  │  ❌ Most complex (8+ hours)                                 │        │
│  │  ❌ Requires deep Mayar API knowledge                       │        │
│  │  ❌ More testing required                                   │        │
│  │  ❌ NOT recommended for 8-day deadline                      │        │
│  └────────────────────────────────────────────────────────────┘        │
│                                                                          │
│  RECOMMENDATION FOR VIBE CODING:                                        │
│  ═══════════════════════════════════════                                │
│  → PRIMARY: SCENARIO B (Hosted Checkout)                                │
│  → FALLBACK: SCENARIO A (Payment Link) if API is too complex            │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Scenario Comparison

| Criteria | Scenario A (Payment Link) | Scenario B (Hosted Checkout) | Scenario C (Embedded) |
|----------|------------------|----------------------|------------------|
| **Development Speed** | ✅✅ Fastest (1-2h) | ✅ Medium (3-4h) | ❌ Slowest (8+h) |
| **Competition Compliance** | ✅ Yes | ✅✅ Yes (best) | ✅✅ Yes |
| **User Experience** | ⚠️ Fair (redirect) | ✅ Good | ✅✅ Best |
| **Monetization Demo** | ✅ Basic | ✅✅ Strong | ✅✅ Strong |
| **Technical Complexity** | ✅✅ None | ✅ Medium | ❌ High |
| **Future Scalability** | ❌ Limited | ✅✅ High | ✅✅ High |
| **Legal/Compliance** | ✅✅ Low | ✅ Low | ⚠️ Medium |
| **Competition Appeal** | ✅ Basic | ✅✅ High | ✅ High |
| **Mayar.id Dependency** | ✅ Low (dashboard only) | ✅ Medium (API) | ❌ High (full SDK) |
| **Deadline Risk** | ✅✅ None | ✅ Low | ❌ High |


---

## 5. DECISION MATRIX

### 5.1 Weighted Scoring

**Context:** Must integrate with **Mayar.id**, 8 days remaining

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         DECISION MATRIX                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  CRITERIA               │ Weight │  A   │  B   │  C   │                 │
│                         │        │(Link)│(Hosted)│(Emb)│                │
│  ───────────────────────┼────────┼──────┼──────┼──────┤                 │
│  Development Speed      │  25%   │  5   │  4   │  2   │                 │
│  Competition Compliance │  25%   │  4   │  5   │  5   │                 │
│  User Experience        │  15%   │  3   │  4   │  5   │                 │
│  Monetization Demo      │  15%   │  3   │  5   │  5   │                 │
│  Technical Complexity   │  10%   │  5   │  4   │  2   │                 │
│  Deadline Risk          │  10%   │  5   │  4   │  1   │                 │
│  ───────────────────────┼────────┼──────┼──────┼──────┤                 │
│  WEIGHTED SCORE         │  100%  │ 4.35 │ 4.40 │ 3.35 │                 │
│                         │        │      │      │      │                 │
│  RANK                   │        │  2   │  1   │  3   │                 │
│                                                                          │
│  WINNER: SCENARIO B (HOSTED CHECKOUT)                                   │
│  RUNNER-UP: SCENARIO A (PAYMENT LINK - Fallback)                        │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Decision Tree

```
                    ┌─────────────────────────┐
                    │  Must integrate with    │
                    │  Mayar.id (Mandatory)   │
                    └───────────┬─────────────┘
                                │
              ┌─────────────────┴─────────────────┐
              │                                   │
        Research Mayar API                   Research Failed
              │                                   │
              ▼                                   ▼
    ┌──────────────────┐              ┌──────────────────┐
    │  API Available   │              │  Use FALLBACK    │
    │  & Simple?       │              │  (Payment Link)  │
    └────────┬─────────┘              └──────────────────┘
             │
    ┌────────┴────────┐
    │                 │
   YES               NO
    │                 │
    ▼                 ▼
┌─────────────┐  ┌──────────────────┐
│ SCENARIO B  │  │  SCENARIO A      │
│ (Hosted     │  │  (Payment Link)  │
│  Checkout)  │  │                  │
│ ✅ Best     │  │  ✅ Works without│
│    balance  │  │     complex API  │
│ ✅ 3-4 hrs  │  │  ✅ 1-2 hrs      │
└─────────────┘  └──────────────────┘
```

---

## 6. RECOMMENDED APPROACH

### 6.1 Primary Recommendation: Scenario B (Hosted Checkout)

```
┌─────────────────────────────────────────────────────────────┐
│              RECOMMENDED APPROACH                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  SCENARIO B: HOSTED CHECKOUT WITH MAYAR.ID                  │
│  ═══════════════════════════════════════════════            │
│                                                              │
│  WHY THIS APPROACH:                                         │
│  ─────────────────────                                      │
│  ✅ Meets competition requirement (Mayar.id integrated)     │
│  ✅ Moderate complexity (3-4 hours)                         │
│  ✅ Automated payment flow (professional demo)              │
│  ✅ Mayar handles PCI compliance                            │
│  ✅ Clear demo for judges (Free vs Premium flow)            │
│  ✅ Scalable to real business later                         │
│  ✅ No complex marketplace logic needed                     │
│  ✅ Works with 8-day deadline                               │
│                                                              │
│  FALLBACK OPTION:                                           │
│  ──────────────────                                         │
│  If Mayar.id API is too complex or undocumented:            │
│  → Use Scenario A (Payment Link)                            │
│  → Create link in Mayar dashboard                           │
│  → Manual verification for demo                             │
│  → Document in submission                                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Feature Tiers

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         FEATURE TIERS                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  FREE TIER (Default - No Payment Required)                              │
│  ════════════════════════════════════════════════                        │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │  Course Management:                                          │        │
│  │  • Create up to 2 courses                                    │        │
│  │  • Up to 30 students per course                              │        │
│  │  • Public courses only                                       │        │
│  │                                                              │        │
│  │  Assessment & Questions:                                     │        │
│  │  • Multiple Choice questions only                            │        │
│  │  • Essay questions only                                      │        │
│  │  • Maximum 10 questions per quiz                             │        │
│  │                                                              │        │
│  │  Reporting:                                                  │        │
│  │  • Basic score table                                         │        │
│  │  • No export functionality                                   │        │
│  │                                                              │        │
│  │  Support:                                                    │        │
│  │  • Community support (documentation)                         │        │
│  └─────────────────────────────────────────────────────────────┘        │
│                                                                          │
│  PREMIUM TIER (Payment Required - Mayar.id Integration)               │
│  ════════════════════════════════════════════════════════                │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │  Course Management:                                          │        │
│  │  • Unlimited courses                                         │        │
│  │  • Unlimited students                                        │        │
│  │  • Public & Private courses (access code)                    │        │
│  │                                                              │        │
│  │  Assessment & Questions:                                     │        │
│  │  • All 5 question types (MC, Essay, Fill Blank, Match,       │        │
│  │    Reorder)                                                  │        │
│  │  • Unlimited questions per quiz                              │        │
│  │  • Time limit configuration                                  │        │
│  │  • Quiz scheduling (open/close dates)                        │        │
│  │                                                              │        │
│  │  Reporting:                                                  │        │
│  │  • Advanced analytics                                        │        │
│  │  • Individual student reports                                │        │
│  │  • Export to CSV/Excel                                       │        │
│  │  • Question analysis statistics                              │        │
│  │                                                              │        │
│  │  Support:                                                    │        │
│  │  • Priority email support                                    │        │
│  │                                                              │        │
│  │  PRICING (Example for Competition):                         │        │
│  │  • Rp 49.000/month (Indonesian market)                      │        │
│  │  • Free 7-day trial (for competition demo)                  │        │
│  └─────────────────────────────────────────────────────────────┘        │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 6.3 Mayar.id Integration Scope

```
┌─────────────────────────────────────────────────────────────────────────┐
│              MAYAR.ID INTEGRATION SCOPE                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  PHASE 1: MVP (Competition - Hosted Checkout)                           │
│  ═══════════════════════════════════════════════════                     │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │  Service                          │ Payment Type            │        │
│  │  ──────────────────────────────── ┼ ─────────────────────── │        │
│  │  Premium Subscription             │ Recurring (Monthly)     │        │
│  │  ───────────────────────────────────────────────────────────│        │
│  │                                                            │        │
│  │  Integration Points (4 Total):                             │        │
│  │  ┌──────────────────────────────────────────────┐          │        │
│  │  │ 1. Create Checkout (Mayar API)               │          │        │
│  │  │    - POST /api/v1/payment/create-checkout    │          │        │
│  │  │    - Call Mayar API to create payment        │          │        │
│  │  │    - Get checkout URL                        │          │        │
│  │  │                                              │          │        │
│  │  │ 2. Redirect to Mayar                         │          │        │
│  │  │    - User clicks "Upgrade to Premium"        │          │        │
│  │  │    - Redirect to Mayar checkout URL          │          │        │
│  │  │    - User pays on Mayar's page               │          │        │
│  │  │                                              │          │        │
│  │  │ 3. Return URL Handler                        │          │        │
│  │  │    - Mayar redirects back after payment      │          │        │
│  │  │    - GET /api/v1/payment/return              │          │        │
│  │  │    - Update payment status                   │          │        │
│  │  │                                              │          │        │
│  │  │ 4. Webhook (Optional - Bonus Points)         │          │        │
│  │  │    - POST /api/v1/payment/webhook            │          │        │
│  │  │    - Mayar sends payment notification        │          │        │
│  │  │    - Auto-activate premium                   │          │        │
│  │  └──────────────────────────────────────────────┘          │        │
│  └─────────────────────────────────────────────────────────────┘        │
│                                                                          │
│  PHASE 2: Post-Competition (Real Production)                            │
│  ═══════════════════════════════════════════════════                     │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │  Additional Services (Future):                               │        │
│  │  ┌──────────────────────────────────────────────┐           │        │
│  │  │ • Pay-per-Course (One-time payment)          │           │        │
│  │  │ • Team/Enterprise Plan (Custom pricing)      │           │        │
│  │  │ • Revenue Split (Teacher marketplace)        │           │        │
│  │  │ • Refund Management                          │           │        │
│  │  │ • Invoice Generation                         │           │        │
│  │  │ • Tax Calculation                            │           │        │
│  │  └──────────────────────────────────────────────┘           │        │
│  └─────────────────────────────────────────────────────────────┘        │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 7. TECHNICAL ARCHITECTURE

### 7.1 Mayar.id Integration Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    PAYMENT GATEWAY ARCHITECTURE                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│                         ┌─────────────────┐                             │
│                         │   Payment UI    │                             │
│                         │ (Pricing Page)  │                             │
│                         │ /pricing        │                             │
│                         └────────┬────────┘                             │
│                                  │                                      │
│                         ┌────────▼────────┐                             │
│                         │  API Routes     │                             │
│                         │ /api/v1/payment │                             │
│                         │ • POST /create-checkout│                      │
│                         │ • POST /portal   │                            │
│                         │ • POST /webhook  │                            │
│                         └────────┬────────┘                             │
│                                  │                                      │
│              ┌───────────────────┼───────────────────┐                 │
│              │                   │                   │                 │
│     ┌────────▼────────┐ ┌────────▼────────┐ ┌───────▼────────┐        │
│     │ Payment Service │ │  Webhook        │ │ Subscription    │        │
│     │ • Create Session│ │  Handler        │ │ Service         │        │
│     │ • Get Portal URL│ │ • Verify Sig    │ │ • Activate      │        │
│     │ • Get Customer  │ │ • Idempotency   │ │ • Cancel        │        │
│     └────────┬────────┘ └────────┬────────┘ │ • Check Status  │        │
│              │                   │          │ • HasAccess     │        │
│     ┌────────▼───────────────────▼──────────┴───────┬────────┘        │
│     │              Mayar.id API                     │                 │
│     │         (Indonesian Payment Gateway)          │                 │
│     │         • Hosted Checkout                     │                 │
│     │         • Webhook (optional)                  │                 │
│     │         • Return URL                          │                 │
│     └───────────────────────────────────────────────┘                 │
│                                                                          │
│  Database Changes:                                                       │
│  ┌─────────────────────────────────────────────────────────┐            │
│  │  users table (add columns):                             │            │
│  │  ┌─────────────────────────────────────────────────┐   │            │
│  │  │ • subscription_status (free/premium/cancelled)  │   │            │
│  │  │ • subscription_id (gateway reference, UUID)     │   │            │
│  │  │ • subscription_expires_at (TIMESTAMP)           │   │            │
│  │  │ • trial_ends_at (TIMESTAMP, nullable)           │   │            │
│  │  └─────────────────────────────────────────────────┘   │            │
│  │                                                         │            │
│  │  payments table (new):                                  │            │
│  │  ┌─────────────────────────────────────────────────┐   │            │
│  │  │ • id (UUID PK)                                  │   │            │
│  │  │ • user_id (FK → users.id)                       │   │            │
│  │  │ • amount (DECIMAL)                              │   │            │
│  │  │ • currency (VARCHAR 3)                          │   │            │
│  │  │ • status (pending/success/failed/refunded)      │   │            │
│  │  │ • payment_type (subscription/one_time)          │   │            │
│  │  │ • gateway_provider (VARCHAR 50)                 │   │            │
│  │  │ • gateway_payment_id (VARCHAR 255)              │   │            │
│  │  │ • gateway_response (JSONB)                      │   │            │
│  │  │ • created_at (TIMESTAMP)                        │   │            │
│  │  │ • updated_at (TIMESTAMP)                        │   │            │
│  │  └─────────────────────────────────────────────────┘   │            │
│  └─────────────────────────────────────────────────────────┘            │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         PAYMENT FLOW                                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  UPGRADE TO PREMIUM FLOW:                                               │
│  ═══════════════════════════                                             │
│                                                                          │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐       │
│  │  User    │     │   Front  │     │   API    │     │  Payment │       │
│  │  Clicks  │────▶│   End    │────▶│  Route   │────▶│  Gateway │       │
│  │  Upgrade │     │           │     │          │     │          │       │
│  └──────────┘     └──────────┘     └──────────┘     └──────────┘       │
│       │                │                │                │              │
│       │                │                │                │              │
│       │  1. Click      │                │                │              │
│       │  "Upgrade"     │                │                │              │
│       │───────────────▶│                │                │              │
│       │                │                │                │              │
│       │                │  2. POST       │                │              │
│       │                │  /create-checkout              │              │
│       │                │───────────────▶│                │              │
│       │                │                │                │              │
│       │                │                │  3. Create     │              │
│       │                │                │  Checkout Session            │
│       │                │                │───────────────▶│              │
│       │                │                │                │              │
│       │                │                │  4. Return     │              │
│       │                │                │  Checkout URL  │              │
│       │                │                │◀───────────────│              │
│       │                │                │                │              │
│       │                │  5. Return URL │                │              │
│       │                │◀───────────────│                │              │
│       │                │                │                │              │
│       │  6. Redirect   │                │                │              │
│       │  to Checkout   │                │                │              │
│       │◀───────────────│                │                │              │
│       │                │                │                │              │
│       │                │                │                │              │
│       │  7. User completes payment on gateway           │              │
│       │◀───────────────────────────────────────────────▶│              │
│       │                │                │                │              │
│       │                │                │                │              │
│       │                │  8. Webhook    │                │              │
│       │                │◀───────────────│  9. Payment    │              │
│       │                │   (async)      │◀───────────────│  Complete    │
│       │                │                │                │              │
│       │                │                │                │              │
│       │                │  10. Update    │                │              │
│       │                │  User Status   │                │              │
│       │                │───────────────▶│                │              │
│       │                │                │                │              │
│       │  11. Premium   │                │                │              │
│       │  Activated     │                │                │              │
│       │◀───────────────│                │                │              │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 6.3 Feature Gating Implementation

```typescript
// src/lib/subscription.ts

export type SubscriptionTier = 'free' | 'premium' | 'cancelled';

export interface SubscriptionLimits {
  maxCourses: number;
  maxStudentsPerCourse: number;
  maxQuestionsPerQuiz: number;
  allowedQuestionTypes: string[];
  canExport: boolean;
  canScheduleQuiz: boolean;
  canUseTimeLimit: boolean;
}

export const SUBSCRIPTION_LIMITS: Record<SubscriptionTier, SubscriptionLimits> = {
  free: {
    maxCourses: 2,
    maxStudentsPerCourse: 30,
    maxQuestionsPerQuiz: 10,
    allowedQuestionTypes: ['multiple_choice', 'essay'],
    canExport: false,
    canScheduleQuiz: false,
    canUseTimeLimit: false,
  },
  premium: {
    maxCourses: Infinity,
    maxStudentsPerCourse: Infinity,
    maxQuestionsPerQuiz: Infinity,
    allowedQuestionTypes: ['multiple_choice', 'essay', 'fill_blank', 'match', 'reorder'],
    canExport: true,
    canScheduleQuiz: true,
    canUseTimeLimit: true,
  },
  cancelled: {
    // Same as free, but user was previously premium
    maxCourses: 2,
    maxStudentsPerCourse: 30,
    maxQuestionsPerQuiz: 10,
    allowedQuestionTypes: ['multiple_choice', 'essay'],
    canExport: false,
    canScheduleQuiz: false,
    canUseTimeLimit: false,
  },
};

export async function getUserSubscriptionTier(userId: string): Promise<SubscriptionTier> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      subscriptionStatus: true,
      subscriptionExpiresAt: true,
      trialEndsAt: true,
    },
  });

  if (!user) return 'free';

  // Check if trial is active
  if (user.trialEndsAt && user.trialEndsAt > new Date()) {
    return 'premium'; // Trial gives premium access
  }

  // Check if subscription is active
  if (
    user.subscriptionStatus === 'premium' &&
    user.subscriptionExpiresAt &&
    user.subscriptionExpiresAt > new Date()
  ) {
    return 'premium';
  }

  return user.subscriptionStatus as SubscriptionTier;
}

export async function checkSubscriptionAccess(
  userId: string,
  feature: keyof SubscriptionLimits
): Promise<boolean> {
  const tier = await getUserSubscriptionTier(userId);
  const limits = SUBSCRIPTION_LIMITS[tier];
  
  return limits[feature] !== undefined && limits[feature] !== 0;
}
```

---

## 8. IMPLEMENTATION ROADMAP

### 8.1 Timeline Overview (8 Days Remaining)

**Deadline: 15 March 2026**

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    IMPLEMENTATION ROADMAP (8 DAYS)                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │  DAYS 1-2: RESEARCH & MAYAR.ID SETUP                        │        │
│  │  ─────────────────────────────────────                      │        │
│  │  □ Research Mayar.id API documentation                      │        │
│  │  □ Register for Mayar.id developer account                  │        │
│  │  □ Get API keys (sandbox or production)                     │        │
│  │  □ Test API connectivity (simple request)                   │        │
│  │  □ Identify simplest integration method                     │        │
│  │  □ Create test product/subscription in Mayar dashboard      │        │
│  │                                                             │        │
│  │  DELIVERABLE: Working Mayar.id API connection               │        │
│  └─────────────────────────────────────────────────────────────┘        │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │  DAYS 3-5: CORE FEATURES (Priority #1)                      │        │
│  │  ───────────────────────────────                            │        │
│  │  □ Course creation (teacher can create courses)             │        │
│  │  □ Course listing page                                      │        │
│  │  □ Access code generation                                   │        │
│  │  □ Student join flow (access code + name)                   │        │
│  │  □ Auto-register guest user                                 │        │
│  │  □ Quiz interface (multiple choice + essay)                 │        │
│  │  □ Answer submission                                        │        │
│  │  □ Basic scoring & result display                           │        │
│  │                                                             │        │
│  │  DELIVERABLE: Working end-to-end quiz flow                  │        │
│  └─────────────────────────────────────────────────────────────┘        │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │  DAYS 6-7: MAYAR.ID INTEGRATION (Bonus Points)             │        │
│  │  ─────────────────────────────────────                      │        │
│  │  DAY 6: Backend Integration                                 │        │
│  │  ──────────────────────                                     │        │
│  │  □ Create payment service                                   │        │
│  │  □ API route: POST /api/v1/payment/create-checkout          │        │
│  │  □ API route: GET /api/v1/payment/return                    │        │
│  │  □ API route: POST /api/v1/payment/webhook (if supported)   │        │
│  │  □ Update user subscription on payment success              │        │
│  │                                                             │        │
│  │  DAY 7: Frontend Integration                                │        │
│  │  ──────────────────────────────                             │        │
│  │  □ Create /pricing page                                     │        │
│  │  □ Pricing cards (Free vs Premium)                          │        │
│  │  □ "Upgrade to Premium" button flow                         │        │
│  │  □ Redirect to Mayar checkout                               │        │
│  │  □ Return page after payment                                │        │
│  │  □ Feature gating (free vs premium features)                │        │
│  │                                                             │        │
│  │  DELIVERABLE: Working payment flow                          │        │
│  └─────────────────────────────────────────────────────────────┘        │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │  DAY 8: TESTING & SUBMISSION                                │        │
│  │  ──────────────────────────                                 │        │
│  │  □ Test core flow (course → quiz → result)                  │        │
│  │  □ Test payment flow (upgrade → checkout → premium)         │        │
│  │  □ Fix critical bugs                                        │        │
│  │  □ Test on mobile                                           │        │
│  │  □ Prepare demo script                                      │        │
│  │  □ Submit before deadline!                                  │        │
│  │                                                             │        │
│  │  DELIVERABLE: Competition submission ready                  │        │
│  └─────────────────────────────────────────────────────────────┘        │
│                                                                          │
│  FALLBACK PLAN (If Mayar.id is too complex):                            │
│  ═══════════════════════════════════════════                            │
│  → Use Payment Link method (create link in Mayar dashboard)             │
│  → Manual verification for demo                                         │
│  → Document effort in submission                                        │
│  → Focus on core features                                               │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 8.2 OpenSpec Changes Needed

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    OPENSPEC CHANGES NEEDED                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  CHANGE 1: mayar-id-setup                                               │
│  ─────────────────────────────                                          │
│  Scope: Database schema + Mayar.id configuration                        │
│  Tasks:                                                                 │
│  • Update Prisma schema (users + payments table)                        │
│  • Add environment variables for Mayar.id                               │
│  • Create Mayar.id API client wrapper                                   │
│  • Research Mayar.id API (hosted checkout vs payment link)              │
│                                                                          │
│  CHANGE 2: mayar-id-service                                             │
│  ──────────────────────────────                                         │
│  Scope: Service layer for payment operations                            │
│  Tasks:                                                                 │
│  • Create payment service (create checkout, handle return)              │
│  • Create subscription service (activate, cancel, check status)         │
│  • Implement subscription limits logic                                  │
│  • Add subscription middleware                                          │
│                                                                          │
│  CHANGE 3: mayar-id-api-routes                                          │
│  ───────────────────────────────────                                    │
│  Scope: API endpoints for Mayar.id integration                          │
│  Tasks:                                                                 │
│  • POST /api/v1/payment/create-checkout                                 │
│  • GET /api/v1/payment/return                                           │
│  • POST /api/v1/payment/webhook (if supported)                          │
│  • GET /api/v1/subscription/status                                      │
│                                                                          │
│  CHANGE 4: pricing-page                                                 │
│  ─────────────────────────────                                          │
│  Scope: Frontend pricing page                                           │
│  Tasks:                                                                 │
│  • Create /pricing page                                                 │
│  • Design pricing cards                                                 │
│  • Feature comparison table                                             │
│  • FAQ section                                                          │
│                                                                          │
│  CHANGE 5: feature-gating                                               │
│  ───────────────────────────                                            │
│  Scope: Frontend feature gating                                         │
│  Tasks:                                                                 │
│  • Add gating to course creation                                        │
│  • Add gating to question types                                         │
│  • Add gating to export functionality                                   │
│  • Add upgrade prompts/modals                                           │
│                                                                          │
│  PRIORITY ORDER:                                                        │
│  ═══════════════                                                        │
│  1. mayar-id-setup (research + DB)                                     │
│  2. mayar-id-service (business logic)                                  │
│  3. mayar-id-api-routes (API endpoints)                                │
│  4. pricing-page (UI)                                                   │
│  5. feature-gating (access control)                                    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 9. MAYAR.ID INTEGRATION NOTES

### 9.1 Mayar.id Research Checklist

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
│  □ 5. Check Hosted Checkout Availability                    │
│     • Is hosted checkout available?                         │
│     • How to create checkout session?                       │
│     • Return URL configuration                              │
│                                                              │
│  □ 6. Webhook Support                                       │
│     • Does Mayar.id support webhooks?                       │
│     • Webhook signature verification?                       │
│     • Retry mechanism?                                      │
│                                                              │
│  □ 7. Contact Support (if needed)                           │
│     • Email: support@mayar.id (verify)                      │
│     • WhatsApp/Telegram support?                            │
│     • Developer community?                                  │
│                                                              │
│  □ 8. Look for Integration Examples                         │
│     • GitHub repositories                                   │
│     • Sample code (Node.js, PHP, etc.)                      │
│     • Postman collection                                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 9.2 Mayar.id Contact Information

**Verify these details:**

| Channel | Contact |
|---------|---------|
| Website | https://mayar.id |
| Email | support@mayar.id (verify) |
| WhatsApp | Check website |
| Telegram | Check website |
| Developer Docs | Check website |

**Questions to Ask Mayar.id Support:**

1. Do you have API documentation for developers?
2. Do you offer sandbox/test mode?
3. What's the fastest integration method? (hosted checkout vs payment link)
4. Do you support webhooks?
5. What's the KYC approval timeline?
6. Do you have Node.js/Next.js integration examples?
7. Is there a subscription/recurring payment feature?

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
│  RISK 4: Core features not complete by Day 6                │
│  ────────────────────────────────────────────────────────── │
│  Mitigation:                                                │
│  → Prioritize core features over payment                    │
│  → Payment is bonus, core is main judging criteria          │
│  → Submit with core features if payment not ready           │
│                                                              │
│  RISK 5: Mayar.id has no hosted checkout                    │
│  ────────────────────────────────────────────────────────── │
│  Mitigation:                                                │
│  → Use Payment Link method                                  │
│  → Create link manually in Mayar dashboard                  │
│  → Simple button redirect on /pricing page                  │
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
│  □ 1. Research Mayar.id (2-3 hours):                        │
│     • Visit mayar.id                                        │
│     • Find API docs                                         │
│     • Register for developer account                        │
│     • Get API keys                                          │
│                                                              │
│  □ 2. Test Mayar API (1 hour):                              │
│     • Simple API call to verify connectivity                │
│     • Identify simplest integration method                  │
│                                                              │
│  □ 3. Decide approach:                                      │
│     • Hosted Checkout (recommended)                         │
│     • Payment Link (fallback)                               │
│                                                              │
│  □ 4. Start OpenSpec change:                                │
│     → /opsx:new mayar-id-setup                              │
│     or                                                       │
│     → /opsx:ff mayar-id-setup (fast-forward)                │
│                                                              │
│  □ 5. Begin implementation:                                 │
│     • Day 1-2: Research + Mayar setup                       │
│     • Day 3-5: Core features                                │
│     • Day 6-7: Mayar integration                            │
│     • Day 8: Test + Submit                                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 12. SUCCESS CRITERIA

### Competition Submission Checklist:

```
┌─────────────────────────────────────────────────────────────┐
│  SUBMISSION CHECKLIST                                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  CORE FEATURES (Primary Judging Criteria):                  │
│  ───────────────────────────────────────                    │
│  □ Teacher can create course                                │
│  □ Teacher can create quiz (MC + Essay)                     │
│  □ Student can join with access code                        │
│  □ Student can take quiz                                    │
│  □ Student can see result                                   │
│  □ Teacher can view scores                                  │
│                                                              │
│  PAYMENT INTEGRATION (Bonus Points):                        │
│  ─────────────────────────────────────                      │
│  □ /pricing page exists                                     │
│  □ "Upgrade to Premium" button works                        │
│  □ Redirects to Mayar checkout (or payment link)            │
│  □ Payment flow demonstrable (even if sandbox)              │
│  □ Feature gating working (free vs premium)                 │
│                                                              │
│  SUBMISSION REQUIREMENTS:                                   │
│  ──────────────────────────────                             │
│  □ Working demo (deployed)                                  │
│  □ Source code (GitHub repo)                                │
│  □ README/documentation                                     │
│  □ Demo video (if required)                                 │
│  □ Submission before 15 March deadline                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

*Document created: 7 March 2026*  
*Last updated: 7 March 2026 (Version 2.0 - Competition Requirements Confirmed)*  
*Vibe Coding Competition - Mayar.id Integration*  
*Deadline: 15 March 2026 (8 days remaining)*
