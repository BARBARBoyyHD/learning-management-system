# DATABASE ERD GUIDELINE
## BrainBlitz
### LearnWeb LMS Project

---

| Attribute | Value |
|-----------|-------|
| Document ID | DOC-QCL-ERD-001 |
| Version | 1.0 |
| Status | Draft |
| Author | Solution Architecture Team |
| Created | 28 February 2026 |
| Last Updated | 28 February 2026 |
| Reviewed By | Technical Steering Committee |
| Approved By | Tech Lead |

---

## TABLE OF CONTENTS

1. [Overview](#1-overview)
2. [Entity Relationship Diagram](#2-entity-relationship-diagram)
3. [Database Schema (Prisma)](#3-database-schema-prisma)
4. [Table Specifications](#4-table-specifications)
5. [Question Type Settings](#5-question-type-settings)
6. [Relationships & Constraints](#6-relationships--constraints)
7. [Indexing Strategy](#7-indexing-strategy)
8. [Migration Guidelines](#8-migration-guidelines)

---

## 1. OVERVIEW

### 1.1 Document Purpose

This document defines the Entity Relationship Diagram (ERD) and database schema guidelines for the BrainBlitz project. It serves as the authoritative reference for database design, migrations, and data modeling decisions.

### 1.2 Design Principles

| Principle | Description |
|-----------|-------------|
| **UUID Primary Keys** | All tables use UUID for primary keys (Supabase-compatible) |
| **JSON for Extensibility** | Question settings stored as JSON for flexible question types |
| **Cascade Deletes** | Foreign keys use CASCADE delete for data integrity |
| **Indexed Foreign Keys** | All FK columns are indexed for query performance |
| **Timestamps** | All tables include `createdAt` timestamp |
| **Soft Deletes** | Consider soft deletes for audit trail (future enhancement) |

### 1.3 Database Technology

| Component | Technology |
|-----------|------------|
| **Database** | PostgreSQL 15.x |
| **ORM** | Prisma v6 |
| **Hosting** | Managed PostgreSQL (Vercel-compatible) |
| **Migrations** | Prisma Migrate |

---

## 2. ENTITY RELATIONSHIP DIAGRAM

### 2.1 Conceptual ERD

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DATABASE SCHEMA (ERD)                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌───────────────┐                                                          │
│  │    users      │                                                          │
│  ├───────────────┤                                                          │
│  │ id (UUID PK)  │◄────────────────────────────────┐                        │
│  │ username      │                                 │                        │
│  │ email         │                                 │                        │
│  │ password      │                                 │                        │
│  │ role          │                                 │                        │
│  │ created_at    │                                 │                        │
│  └───────┬───────┘                                 │                        │
│          │                                         │                        │
│          │ 1                                       │                        │
│          │                                         │                        │
│          │ N                                       │                        │
│          ▼                                         │                        │
│  ┌───────────────┐       ┌───────────────┐        │                        │
│  │    quizzes    │       │   questions   │        │                        │
│  ├───────────────┤       ├───────────────┤        │                        │
│  │ id (UUID PK)  │──────▶│ id (UUID PK)  │        │                        │
│  │ teacher_id(FK)│       │ quiz_id (FK)  │        │                        │
│  │ title         │       │ question_type │        │                        │
│  │ description   │       │ question_text │        │                        │
│  │ is_public     │       │ media_url     │        │                        │
│  │ created_at    │       │ settings(JSON)│        │                        │
│  └───────────────┘       │ points        │        │                        │
│                          │ order_index   │        │                        │
│                          └───────┬───────┘        │                        │
│                                  │                │                        │
│                          ┌───────┴────────┐       │                        │
│                          │                │       │                        │
│                          ▼                ▼       │                        │
│                   ┌──────────────┐  ┌─────────────┴──┐                    │
│                   │question_     │  │response_       │                    │
│                   │options       │  │details         │                    │
│                   ├──────────────┤  ├────────────────┤                    │
│                   │ id (UUID PK) │  │ id (UUID PK)   │                    │
│                   │ question_id  │  │ response_id    │                    │
│                   │ option       │  │ question_id    │                    │
│                   │ sort_order   │  │ answer_given   │                    │
│                   │ is_correct   │  │ is_correct     │                    │
│                   └──────────────┘  └────────────────┘                    │
│                          ▲                ▲                               │
│                          │                │                               │
│  ┌───────────────────────┘                │                               │
│  │                                        │                               │
│  │  ┌───────────────┐                     │                               │
│  │  │student_       │─────────────────────┘                               │
│  │  │responses      │                                                     │
│  │  ├───────────────┤                                                     │
│  │  │ id (UUID PK)  │                                                     │
│  │  │ user_id (FK)  │─────────────────────────────────────────────────────┘
│  │  │ quiz_id (FK)  │
│  │  │ score         │
│  │  │ completed_at  │
│  │  └───────────────┘
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Relationship Matrix

| Parent Table | Child Table | Relationship | Cardinality | FK Column |
|--------------|-------------|--------------|-------------|-----------|
| users | quizzes | Teacher owns quizzes | 1:N | quizzes.teacher_id |
| quizzes | questions | Quiz contains questions | 1:N | questions.quiz_id |
| questions | question_options | Question has options | 1:N | question_options.question_id |
| users | student_responses | Student submits responses | 1:N | student_responses.user_id |
| quizzes | student_responses | Quiz receives responses | 1:N | student_responses.quiz_id |
| questions | response_details | Question has response details | 1:N | response_details.question_id |
| student_responses | response_details | Response contains details | 1:N | response_details.response_id |

---

## 3. DATABASE SCHEMA (PRISMA)

### 3.1 Prisma Schema File

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================================================
// USER MODEL
// ============================================================================
model User {
  id         String         @id @default(uuid())
  username   String
  email      String         @unique
  password   String
  role       String         // 'teacher', 'student'
  createdAt  DateTime       @default(now())

  // Relations
  quizzes    Quiz[]
  responses  StudentResponse[]

  @@index([email])
  @@index([role])
}

// ============================================================================
// QUIZ MODEL
// ============================================================================
model Quiz {
  id          String         @id @default(uuid())
  teacherId   String
  title       String
  description String?
  isPublic    Boolean        @default(true)
  createdAt   DateTime       @default(now())

  // Relations
  teacher   User              @relation(fields: [teacherId], references: [id])
  questions Question[]
  responses StudentResponse[]

  @@index([teacherId])
  @@index([isPublic])
}

// ============================================================================
// QUESTION MODEL
// ============================================================================
model Question {
  id           String     @id @default(uuid())
  quizId       String
  questionType String     // 'multiple_choice', 'match', 'reorder', 'drag_drop', 'hotspot'
  questionText String
  mediaUrl     String?
  settings     Json?      // Metadata for additional settings
  points       Int        @default(10)
  orderIndex   Int

  // Relations
  quiz    Quiz             @relation(fields: [quizId], references: [id], onDelete: Cascade)
  options QuestionOption[]
  details ResponseDetail[]

  @@index([quizId])
  @@index([questionType])
}

// ============================================================================
// QUESTION OPTION MODEL
// ============================================================================
model QuestionOption {
  id        String     @id @default(uuid())
  questionId String
  option    String     // Universal column for option text or answer key
  sortOrder Int?       // For 'Reorder' or option ordering
  isCorrect Boolean    @default(false)

  // Relations
  question Question       @relation(fields: [questionId], references: [id], onDelete: Cascade)

  @@index([questionId])
}

// ============================================================================
// STUDENT RESPONSE MODEL
// ============================================================================
model StudentResponse {
  id          String     @id @default(uuid())
  userId      String
  quizId      String
  score       Int?
  completedAt DateTime   @default(now())

  // Relations
  user     User           @relation(fields: [userId], references: [id])
  quiz     Quiz           @relation(fields: [quizId], references: [id], onDelete: Cascade)
  details  ResponseDetail[]

  @@index([userId])
  @@index([quizId])
}

// ============================================================================
// RESPONSE DETAIL MODEL
// ============================================================================
model ResponseDetail {
  id          String     @id @default(uuid())
  responseId  String
  questionId  String
  answerGiven String?    // Stores what student answered (text or option ID)
  isCorrect   Boolean?

  // Relations
  response StudentResponse @relation(fields: [responseId], references: [id], onDelete: Cascade)
  question Question        @relation(fields: [questionId], references: [id], onDelete: Cascade)

  @@index([responseId])
  @@index([questionId])
}
```

---

## 4. TABLE SPECIFICATIONS

### 4.1 users

Stores all user accounts (teachers and guest students).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Unique user identifier |
| username | VARCHAR(255) | NOT NULL | Display name |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Email address (login credential) |
| password | VARCHAR(255) | NOT NULL | Hashed password (bcrypt) |
| role | VARCHAR(50) | NOT NULL | User role: 'teacher' or 'student' |
| createdAt | TIMESTAMP | DEFAULT now() | Account creation timestamp |

**Indexes:**
- `email` - For login lookups
- `role` - For role-based queries

### 4.2 quizzes

Stores quiz/assessment definitions.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Unique quiz identifier |
| teacherId | UUID | FK → users.id, NOT NULL | Quiz owner (teacher) |
| title | VARCHAR(255) | NOT NULL | Quiz title |
| description | TEXT | NULL | Quiz description (optional) |
| isPublic | BOOLEAN | DEFAULT true | Public visibility flag |
| createdAt | TIMESTAMP | DEFAULT now() | Creation timestamp |

**Indexes:**
- `teacherId` - For teacher's quiz list
- `isPublic` - For public quiz filtering

### 4.3 questions

Stores individual questions within quizzes.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Unique question identifier |
| quizId | UUID | FK → quizzes.id, NOT NULL | Parent quiz |
| questionType | VARCHAR(50) | NOT NULL | Type: 'multiple_choice', 'essay', 'fill_blank', 'match', 'reorder' |
| questionText | TEXT | NOT NULL | Question content (supports rich text) |
| mediaUrl | VARCHAR(500) | NULL | Optional media attachment |
| settings | JSON | NULL | Question-type-specific configuration |
| points | INTEGER | DEFAULT 10 | Points awarded for correct answer |
| orderIndex | INTEGER | NOT NULL | Display order within quiz |

**Indexes:**
- `quizId` - For quiz questions list
- `questionType` - For question type filtering

### 4.4 question_options

Stores answer options for questions (Multiple Choice, Match, Reorder).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Unique option identifier |
| questionId | UUID | FK → questions.id, NOT NULL | Parent question |
| option | TEXT | NOT NULL | Option text or answer key |
| sortOrder | INTEGER | NULL | Display/correct order |
| isCorrect | BOOLEAN | DEFAULT false | Whether this is a correct answer |

**Indexes:**
- `questionId` - For question options lookup

### 4.5 student_responses

Stores student quiz submissions.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Unique response identifier |
| userId | UUID | FK → users.id, NOT NULL | Student who took quiz |
| quizId | UUID | FK → quizzes.id, NOT NULL | Quiz that was taken |
| score | INTEGER | NULL | Total score (nullable until graded) |
| completedAt | TIMESTAMP | DEFAULT now() | Submission timestamp |

**Indexes:**
- `userId` - For student's response history
- `quizId` - For quiz responses list

### 4.6 response_details

Stores individual question responses within a submission.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Unique response detail identifier |
| responseId | UUID | FK → student_responses.id, NOT NULL | Parent response |
| questionId | UUID | FK → questions.id, NOT NULL | Question that was answered |
| answerGiven | TEXT | NULL | Student's answer (text or option ID) |
| isCorrect | BOOLEAN | NULL | Whether answer was correct |

**Indexes:**
- `responseId` - For response details lookup
- `questionId` - For question-level analysis

---

## 5. QUESTION TYPE SETTINGS

### 5.1 Multiple Choice

```typescript
{
  "shuffle": true,              // Shuffle options when presenting
  "multipleAnswers": false      // Whether multiple options can be correct
}
```

### 5.2 Essay

```typescript
{
  "gradingRubric": "Grade based on clarity, accuracy, and depth",  // Optional rubric
  "wordLimit": 500              // Optional word limit
}
```

### 5.3 Fill in the Blank

```typescript
{
  "caseSensitive": false,       // Whether answer is case-sensitive
  "acceptedAnswers": [          // Multiple acceptable variations
    "photosynthesis",
    "Photosynthesis",
    "PHOTOSYNTHESIS"
  ]
}
```

### 5.4 Match (Menjodohkan)

```typescript
{
  "shuffleLeft": true,          // Shuffle left-side items
  "pairs": [                    // Correct pairings
    { "left": "Apple", "right": "Buah", "pair_id": "1" },
    { "left": "Carrot", "right": "Sayur", "pair_id": "2" }
  ]
}
```

### 5.5 Reorder

```typescript
{
  "correctOrder": [             // Items in correct sequence
    "first_item_id",
    "second_item_id",
    "third_item_id",
    "fourth_item_id"
  ],
  "partialCredit": true         // Award partial credit for correct positions
}
```

---

## 6. RELATIONSHIPS & CONSTRAINTS

### 6.1 Foreign Key Constraints

| Constraint | Table | Column | References | On Delete |
|------------|-------|--------|------------|-----------|
| FK_quiz_teacher | quizzes | teacherId | users(id) | RESTRICT |
| FK_question_quiz | questions | quizId | quizzes(id) | CASCADE |
| FK_option_question | question_options | questionId | questions(id) | CASCADE |
| FK_response_user | student_responses | userId | users(id) | RESTRICT |
| FK_response_quiz | student_responses | quizId | quizzes(id) | CASCADE |
| FK_detail_response | response_details | responseId | student_responses(id) | CASCADE |
| FK_detail_question | response_details | questionId | questions(id) | CASCADE |

### 6.2 Cascade Delete Behavior

```
┌─────────────────────────────────────────────────────────────┐
│              CASCADE DELETE FLOW                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Delete Quiz                                                 │
│    ├─► Delete Questions (CASCADE)                           │
│    │     ├─► Delete Question Options (CASCADE)             │
│    │     └─► Delete Response Details (CASCADE)             │
│    └─► Delete Student Responses (CASCADE)                   │
│          └─► Delete Response Details (CASCADE)             │
│                                                              │
│  Delete User (Teacher)                                       │
│    └─► RESTRICT (if quizzes exist)                          │
│                                                              │
│  Delete User (Student)                                       │
│    └─► RESTRICT (if responses exist)                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. INDEXING STRATEGY

### 7.1 Index Summary

| Table | Index Name | Column(s) | Type | Purpose |
|-------|-----------|-----------|------|---------|
| users | users_email_key | email | UNIQUE | Login lookups |
| users | users_role_idx | role | BTREE | Role filtering |
| quizzes | quizzes_teacherId_idx | teacherId | BTREE | Teacher's quizzes |
| quizzes | quizzes_isPublic_idx | isPublic | BTREE | Public quiz filter |
| questions | questions_quizId_idx | quizId | BTREE | Quiz questions |
| questions | questions_questionType_idx | questionType | BTREE | Type filtering |
| question_options | question_options_questionId_idx | questionId | BTREE | Question options |
| student_responses | student_responses_userId_idx | userId | BTREE | Student history |
| student_responses | student_responses_quizId_idx | quizId | BTREE | Quiz responses |
| response_details | response_details_responseId_idx | responseId | BTREE | Response details |
| response_details | response_details_questionId_idx | questionId | BTREE | Question analysis |

### 7.2 Query Performance Targets

| Query Type | Target | Optimization |
|------------|--------|--------------|
| Get user by email | < 10ms | Unique index on email |
| List teacher's quizzes | < 50ms | Index on teacherId |
| Get quiz questions | < 30ms | Index on quizId + orderIndex |
| Get student responses | < 50ms | Index on userId |
| Get response details | < 30ms | Index on responseId |
| Question type analysis | < 100ms | Index on questionType |

---

## 8. MIGRATION GUIDELINES

### 8.1 Prisma Migration Commands

```bash
# Generate Prisma Client
npm run db:generate

# Create new migration
npm run db:migrate

# Push schema to database (dev only)
npm run db:push

# Seed database
npm run db:seed

# Reset database (dev only)
npm run db:reset
```

### 8.2 Migration Best Practices

1. **Always review generated SQL** before applying to production
2. **Test migrations on staging** before production deployment
3. **Backup database** before applying migrations
4. **Use transactions** for multi-step migrations
5. **Avoid breaking changes** in production (use additive changes)
6. **Document schema changes** in changelog

### 8.3 Example Migration

```sql
-- Example: Add access_code column to quizzes table
-- Migration: 20260228_add_access_code

ALTER TABLE quizzes 
  ADD COLUMN access_code VARCHAR(10) UNIQUE,
  ADD COLUMN is_private BOOLEAN DEFAULT false;

-- Create index for access code lookups
CREATE INDEX quizzes_access_code_idx ON quizzes(access_code);

-- Update existing quizzes
UPDATE quizzes SET is_private = false;
```

### 8.4 Rollback Strategy

| Scenario | Rollback Approach |
|----------|-------------------|
| Development | `npm run db:reset` |
| Staging | Restore from backup, revert migration |
| Production | Feature flag disable, planned rollback window |

---

## APPENDIX

### A. Abbreviations

| Abbreviation | Full Form |
|--------------|-----------|
| ERD | Entity Relationship Diagram |
| PK | Primary Key |
| FK | Foreign Key |
| UUID | Universally Unique Identifier |
| JSON | JavaScript Object Notation |
| ORM | Object-Relational Mapping |

### B. Related Documents

| Document | Location |
|----------|----------|
| Business Requirements | `/docs/project/01-bussiness-requirement.md` |
| Project Execution Plan | `/docs/project/02-project-execution-plan.md` |
| Implementation & Architecture | `/docs/project/03-implementation-and-architecture.md` |

---

*This document is part of the BrainBlitz Project Documentation*
*Location: `/docs/project/04-database-erd-guideline.md`*
*LearnWeb LMS Project © 2026*
