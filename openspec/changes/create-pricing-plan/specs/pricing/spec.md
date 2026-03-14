# Pricing & Subscription Specification

## ADDED Requirements

### Requirement: Subscription Tiers

The system SHALL provide two subscription tiers for teachers: FREE and PREMIUM.

#### Scenario: Teacher signs up (default FREE)
- **WHEN** a teacher registers a new account
- **THEN** they are automatically assigned the FREE tier
- **AND** they can create up to 2 courses
- **AND** they can create up to 5 quizzes per course

#### Scenario: Teacher upgrades to Premium
- **WHEN** a teacher completes payment via Mayar.id
- **THEN** their tier is upgraded to PREMIUM
- **AND** they can create unlimited courses
- **AND** they can create unlimited quizzes per course
- **AND** they gain access to Premium features (Excel export, all question types)

#### Scenario: Premium trial period
- **WHEN** a teacher starts Premium subscription
- **THEN** they get 7 days free trial
- **AND** they have full Premium access during trial
- **AND** they are charged Rp 49.000/month after trial ends

---

### Requirement: Quiz Creation Limits

The system SHALL enforce quiz creation limits based on subscription tier.

#### Scenario: Free teacher creates first course
- **WHEN** a FREE tier teacher creates a course
- **AND** they have fewer than 2 courses
- **THEN** the course is created successfully

#### Scenario: Free teacher hits course limit
- **WHEN** a FREE tier teacher already has 2 courses
- **AND** they attempt to create a 3rd course
- **THEN** the system blocks the creation
- **AND** displays an upgrade prompt to Premium

#### Scenario: Free teacher creates quiz within limit
- **WHEN** a FREE tier teacher creates a quiz in a course
- **AND** the course has fewer than 5 quizzes
- **THEN** the quiz is created successfully

#### Scenario: Free teacher hits quiz limit
- **WHEN** a FREE tier teacher attempts to create a 6th quiz in a course
- **THEN** the system blocks the creation
- **AND** displays an upgrade prompt to Premium

#### Scenario: Premium teacher creates unlimited quizzes
- **WHEN** a PREMIUM tier teacher creates a course or quiz
- **THEN** there is no limit on the number of courses or quizzes

---

### Requirement: Excel Export for Student Responses

The system SHALL provide Excel export functionality for student quiz responses and scores.

#### Scenario: Premium teacher exports quiz results
- **WHEN** a PREMIUM tier teacher views quiz results
- **AND** they click "Export to Excel"
- **THEN** the system generates an .xlsx file
- **AND** the file contains: student names, scores, answers, completion time
- **AND** the file downloads automatically

#### Scenario: Free teacher attempts to export
- **WHEN** a FREE tier teacher clicks "Export to Excel"
- **THEN** the system shows an upgrade prompt
- **AND** displays "Export to Excel is a Premium feature"
- **AND** provides a button to upgrade to Premium

#### Scenario: Excel file format
- **WHEN** a quiz is exported to Excel
- **THEN** the file includes columns: Student Name, Student Email, Score, Total Questions, Correct Answers, Completion Date, Time Spent
- **AND** each row represents one student's submission
- **AND** the file is named: `{quiz-name}_{date}.xlsx`

---

### Requirement: Mayar.id Payment Integration

The system SHALL integrate with Mayar.id for Premium subscription payments.

#### Scenario: Teacher initiates upgrade
- **WHEN** a teacher clicks "Upgrade to Premium"
- **THEN** the system creates a payment link via Mayar.id API
- **AND** redirects the teacher to Mayar.id checkout page

#### Scenario: Successful payment
- **WHEN** a teacher completes payment on Mayar.id
- **THEN** Mayar.id sends a webhook to the system
- **AND** the teacher's subscription is activated
- **AND** their tier is updated to PREMIUM
- **AND** they receive a confirmation email

#### Scenario: Payment methods
- **WHEN** a teacher checks out on Mayar.id
- **THEN** they can pay via: QRIS, Virtual Account, GoPay, OVO, DANA
- **AND** they see the price: Rp 49.000/month

#### Scenario: Subscription cancellation
- **WHEN** a teacher cancels their subscription
- **THEN** they retain Premium access until the end of the billing period
- **AND** their tier reverts to FREE after cancellation

---

## MODIFIED Requirements

### Requirement: User Account Structure

The system SHALL store subscription information for each teacher user account.

**Reason**: Need to store subscription information for each teacher user.

#### Scenario: User schema includes subscription fields
- **WHEN** a user account is created
- **THEN** the following fields are stored:
  - `subscriptionTier`: FREE | PREMIUM (default: FREE)
  - `subscriptionStatus`: active | cancelled | expired | trial
  - `trialEndsAt`: datetime (nullable)
  - `subscriptionEndsAt`: datetime (nullable)
  - `mayarCustomerId`: string (nullable, Mayar.id customer ID)

---

## REMOVED Requirements

*(None - this is a new capability)*
