# Design Document: Student Guest Access Code Entry

## Overview

This design implements the student guest access code entry feature (US-M6-01) enabling students to join quizzes by entering a 6-character access code without registration.

## Architecture

### 3-Layer Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  PRESENTATION LAYER                                          │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  /join Page (Server Component)                      │    │
│  │  - Access code input form                           │    │
│  │  - Quiz info display                                │    │
│  │  - Error states                                     │    │
│  └──────────────────┬──────────────────────────────────┘    │
│                     │                                        │
│                     ▼                                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Client Components                                  │    │
│  │  - JoinForm (use client)                            │    │
│  │  - QuizInfoCard                                     │    │
│  │  - AccessCodeInput                                  │    │
│  └──────────────────┬──────────────────────────────────┘    │
│                     │                                        │
└─────────────────────┼────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  APPLICATION LAYER                                           │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  API Route: POST /api/v1/quizzes/join               │    │
│  │  - Zod validation (access code format)              │    │
│  │  - Calls quizService.validateAccessCode()           │    │
│  └──────────────────┬──────────────────────────────────┘    │
│                     │                                        │
│                     ▼                                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Service: quizService.validateAccessCode()          │    │
│  │  - Business logic for code validation               │    │
│  │  - Quiz lookup by access code                       │    │
│  │  - Returns quiz details or error                    │    │
│  └──────────────────┬──────────────────────────────────┘    │
│                     │                                        │
└─────────────────────┼────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  DATA LAYER                                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Repository: quizRepository.findByAccessCode()      │    │
│  │  - Prisma query with index on access_code           │    │
│  │  - Case-insensitive lookup                          │    │
│  └──────────────────┬──────────────────────────────────┘    │
│                     │                                        │
│                     ▼                                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  PostgreSQL: quizzes table                          │    │
│  │  - WHERE access_code = UPPER(code)                  │    │
│  │  - Index: quizzes_access_code_idx                   │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Component Design

### File Structure

```
src/app/
├── (guest)/
│   ├── join/
│   │   ├── page.tsx              # Server Component: Join page
│   │   └── layout.tsx            # Guest layout (minimal, no auth)
│   └── quiz/
│       └── [quizId]/
│           └── start/
│               └── page.tsx      # Next: Name input & quiz start
│
src/components/
├── guest/
│   ├── join-form.tsx             # Client: Access code form
│   ├── quiz-info-card.tsx        # Display quiz details
│   └── access-code-input.tsx     # Reusable code input
│
src/app/api/v1/quizzes/
├── join/
│   └── route.ts                  # API: Validate access code
│
src/services/
├── quiz.service.ts               # Add validateAccessCode method
│
src/repositories/
├── quiz.repository.ts            # Add findByAccessCode method
│
src/lib/validators/
├── quiz.ts                       # Add access code validation schema
```

## UI Design

### Join Page Layout (Based on student-join-screen.html)

```
┌─────────────────────────────────────────────────────┐
│                                                      │
│           [BrainBlitz Logo]                       │
│                                                      │
│        ╔═══════════════════════════════╗            │
│        ║     Enter Game Code           ║            │
│        ║                               ║            │
│        ║  ┌─────────────────────────┐  ║            │
│        ║  │  _ _ _ _ _ _           │  ║            │
│        ║  └─────────────────────────┘  ║            │
│        ║                               ║            │
│        ║  [Continue] Button            ║            │
│        ║                               ║            │
│        ║  "Enter the 6-character code  ║            │
│        ║   provided by your teacher"   ║            │
│        ╚═══════════════════════════════╝            │
│                                                      │
│  [?] "Having trouble? Check with your teacher"      │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### Quiz Info Display (After Valid Code)

```
┌─────────────────────────────────────────────────────┐
│                                                      │
│        ╔═══════════════════════════════╗            │
│        ║  ✓ Valid Code!                ║            │
│        ║                               ║            │
│        ║  Quiz: "Math Chapter 5"       ║            │
│        ║  Teacher: Mr. Johnson         ║            │
│        ║  Questions: 10                ║            │
│        ║                               ║            │
│        ║  Enter Your Name:             ║            │
│        ║  ┌─────────────────────────┐  ║            │
│        ║  │                         │  ║            │
│        ║  └─────────────────────────┘  ║            │
│        ║                               ║            │
│        ║  [Join Quiz] Button           ║            │
│        ╚═══════════════════════════════╝            │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## Color & Styling

Based on Color Guideline (DOC-QCL-CG-001):

- **Theme:** Theme B (Dark mode) for quiz screens
- **Primary Color:** Deep Purple `#6a25f4`
- **Background:** `#0f172a` (dark slate)
- **Font:** Lexend
- **Icons:** Material Symbols Outlined
- **Border Radius:** 12px default, 16px for cards

## Data Flow

### Access Code Validation Flow

```
Student → /join page
    ↓
Enters access code (e.g., "ABC123")
    ↓
Submits form → POST /api/v1/quizzes/join
    ↓
API validates with Zod (6-char alphanumeric)
    ↓
quizService.validateAccessCode(code)
    ↓
quizRepository.findByAccessCode(code)
    ↓
Prisma: SELECT * FROM quizzes WHERE UPPER(access_code) = 'ABC123'
    ↓
Found? Return quiz details : Return error
    ↓
Client: Show quiz info : Show error message
```

## Database Schema

### Existing Schema (No Changes Required)

From ERD Guideline (DOC-QCL-ERD-001):

```prisma
model Quiz {
  id          String   @id @default(uuid())
  teacherId   String
  title       String   @db.VarChar(200)
  description String?  @db.Text
  timeLimit   Int?
  isPublic    Boolean  @default(true)
  accessCode  String?  @unique @db.Char(6)  // Already exists
  createdAt   DateTime @default(now())
  updatedAt   DateTime @default(now()) @updatedAt

  teacher   User              @relation(fields: [teacherId], references: [id], onDelete: Cascade)
  questions Question[]
  responses StudentResponse[]

  @@index([accessCode])  // Index already defined
  @@map("quizzes")
}
```

## API Endpoint Design

### POST /api/v1/quizzes/join

**Request:**
```json
{
  "accessCode": "ABC123"
}
```

**Response (Success - 200 OK):**
```json
{
  "success": true,
  "data": {
    "quizId": "uuid-here",
    "title": "Math Chapter 5",
    "description": "Review of chapter 5 concepts",
    "teacherName": "Mr. Johnson",
    "questionCount": 10,
    "timeLimit": 30
  }
}
```

**Response (Error - 404 Not Found):**
```json
{
  "success": false,
  "error": "Invalid access code. Please check and try again."
}
```

**Response (Error - 400 Bad Request):**
```json
{
  "success": false,
  "error": "Access code must be 6 alphanumeric characters."
}
```

## Security Considerations

1. **Case-Insensitive Lookup:** Access codes compared in uppercase
2. **Rate Limiting:** Max 10 attempts per minute per IP
3. **No Information Leakage:** Error messages don't reveal if code exists
4. **HTTPS Only:** All requests over HTTPS in production
5. **Input Sanitization:** Zod validation prevents injection attacks

## Performance Considerations

1. **Database Index:** `@@index([accessCode])` for O(1) lookup
2. **Caching:** Optional Redis cache for frequently accessed quizzes
3. **Query Optimization:** Select only needed fields, not entire quiz object

## Testing Strategy

### Unit Tests
- Access code validation (valid/invalid formats)
- Quiz lookup by code (found/not found)
- Case-insensitive comparison

### Integration Tests
- API endpoint with various inputs
- Database query performance
- Error handling flows

### E2E Tests (Playwright)
- Student enters valid code → sees quiz info
- Student enters invalid code → sees error
- Student enters expired code → sees appropriate message

## Dependencies

### Internal
- Teacher quiz creation (US-M3-01) - access codes must exist
- Database schema with access_code column

### External
- Supabase Auth (for guest session in next step)
- PostgreSQL database

## Next Steps (US-M6-02)

After access code validation:
1. Student enters name
2. System auto-registers guest user with UUID
3. Creates student session
4. Redirects to quiz start

## Reference Screens

See `/docs/stitch-asset/student-join-screen.html` for visual design reference.
