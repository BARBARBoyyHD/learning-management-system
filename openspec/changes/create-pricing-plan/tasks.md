## 1. Database & Schema

- [ ] 1.1 Add subscription fields to users table (tier, subscription_status, trial_ends_at, subscription_ends_at)
- [ ] 1.2 Create Prisma enum for SubscriptionTier (FREE, PREMIUM)
- [ ] 1.3 Run db:push to update schema

## 2. Service Layer

- [ ] 2.1 Create subscription.service.ts (check tier, enforce limits)
- [ ] 2.2 Add quiz creation limit logic (2 courses, 5 quizzes for Free)
- [ ] 2.3 Create Excel export service (export student responses with scores)

## 3. API Endpoints

- [ ] 3.1 Copy .env.example to .env.local and add Mayar.id credentials (placeholder ready)
- [ ] 3.2 POST /api/v1/subscription/upgrade - Create Mayar.id payment link
- [ ] 3.3 POST /api/v1/subscription/webhook - Handle Mayar.id webhook
- [ ] 3.4 GET /api/v1/reports/export/:quizId - Export quiz results to Excel (Premium only)
- [ ] 3.5 Add tier validation middleware

## 4. Frontend - Pricing Page

- [ ] 4.1 Create /pricing page with Free vs Premium comparison cards
- [ ] 4.2 Add "Upgrade Now" button (triggers Mayar.id checkout)
- [ ] 4.3 Show current subscription status in user profile

## 5. Frontend - Upgrade Prompts

- [ ] 5.1 Add upgrade modal when free user hits quiz limit
- [ ] 5.2 Add upgrade prompt on export button click (if Free user tries to export)
- [ ] 5.3 Show "Premium" badge on Excel export feature

## 6. Integration & Testing

- [ ] 6.1 Test Free tier limits (cannot create >2 courses)
- [ ] 6.2 Test Premium unlimited creation
- [ ] 6.3 Test Excel export functionality
- [ ] 6.4 Test Mayar.id payment flow (use sandbox mode)
- [ ] 6.5 Write unit tests for subscription service
- [ ] 6.6 Write E2E test for upgrade flow
