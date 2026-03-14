# Change: Create Pricing Plan with Premium Unlimited Quiz and Excel Export

## Why

Teachers need a clear upgrade path from free to premium tier. Based on the business requirements in `06-pricing-plan.md`, we need to implement a simple freemium model where:
- Free tier gets limited quiz creation (2 courses, 5 quizzes per course)
- Premium tier unlocks unlimited quiz creation and Excel export for student scores

This is essential for the Mayar.id integration and monetization strategy.

## What Changes

- Add pricing tier system (Free vs Premium) stored in user database
- Implement quiz creation limits based on subscription tier
- Add Excel export functionality for student responses and scores (Premium feature)
- Create pricing page showing Free vs Premium comparison
- Add upgrade prompts when free users hit limits
- Integrate Mayar.id payment gateway for Premium subscription (Rp 49.000/month)
  - API Reference: https://docs.mayar.id/api-reference/introduction
  - Environment variables with placeholders in `.env`

## Impact

- **Affected specs**: User Management, Course Management, Assessment/Quiz Management, Reporting
- **Affected code**:
  - Database schema (add subscription fields to users table)
  - API endpoints (add tier checks, export endpoint, Mayar webhook)
  - Frontend (pricing page, upgrade prompts, export button)
  - Service layer (enforce limits, generate Excel files, Mayar integration)
  - Environment variables (`.env` with Mayar API key placeholders)

## Key Features (Simple & Focused)

1. **Premium Unlimited Quiz Creation**
   - Free: Max 2 courses, 5 quizzes per course
   - Premium: Unlimited courses and quizzes

2. **Export to Excel (Student Answers & Scores)**
   - Premium-only feature
   - Download student responses as .xlsx file
   - Includes scores, answers, and completion data

3. **Simple Payment Flow**
   - Mayar.id integration for monthly subscription
   - Rp 49.000/month
   - 7-day free trial
