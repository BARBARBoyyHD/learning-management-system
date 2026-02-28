# Quizizz Clone (Lite Version) - Project Guide

## Project Overview

**Quizizz Clone (Lite Version)** is a Learning Management System (LMS) focused on interactive quizzes. Built with Next.js 15, it enables teachers to create courses and assessments while students can join as guests without registration.

### Quick Links

| Document | Location |
|----------|----------|
| Business Requirements (BRD) | [`/docs/project/01-bussiness-requirement.md`](./docs/project/01-bussiness-requirement.md) |
| Project Execution Plan (PEP) | [`/docs/project/02-project-execution-plan.md`](./docs/project/02-project-execution-plan.md) |
| Implementation & Architecture (ITA) | [`/docs/project/03-implementation-and-architecture.md`](./docs/project/03-implementation-and-architecture.md) |
| Database ERD Guideline | [`/docs/project/04-database-erd-guideline.md`](./docs/project/04-database-erd-guideline.md) |
| Color Guideline (Design System) | [`/docs/project/05-color-guideline.md`](./docs/project/05-color-guideline.md) |
| Reference UI (Stitch Assets) | [`/docs/stitch-asset/`](./docs/stitch-asset/) |

---

## Tech Stack (Latest Versions - 2026)

```
┌─────────────────────────────────────────────────────────────┐
│                    TECHNOLOGY STACK                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  FRONTEND          │  BACKEND           │  DATA             │
│  ─────────────     │  ─────────────     │  ─────────────    │
│  • Next.js 16      │  • Next.js API     │  • PostgreSQL 16  │
│  • TypeScript 5.7+ │    Routes          │  • Prisma ORM v6  │
│  • Tailwind CSS 4  │  • Server Actions  │                   │
│  • Shadcn/ui       │  • Zod Validation  │                   │
│  • TanStack Query  │  • Fetch API       │                   │
│  • React Hook Form │  • Edge Runtime    │                   │
│  • Zod             │                    │                   │
│  • Lucide React    │                    │                   │
│  • React 19        │                    │                   │
│                                                              │
│  INFRASTRUCTURE    │  DEVOPS            │                   │
│  ─────────────     │  ─────────────     │                   │
│  • Vercel          │  • GitHub Actions  │                   │
│  • Edge Network    │  • ESLint          │                   │
│  • CDN             │  • Prettier        │                   │
│  • Blob Storage    │  • Husky           │                   │
│  • npm 11.x        │  • Playwright      │                   │
│  • Turbopack       │  • Biome (opt)     │                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      QUIZIZZ CLONE ARCHITECTURE                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  PRESENTATION LAYER                                                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐              │
│  │   Teacher Web   │  │  Student Guest  │  │   Admin Portal  │              │
│  │      App        │  │     Web App     │  │                 │              │
│  │  (Next.js 15)   │  │  (Next.js 15)   │  │  (Next.js 15)   │              │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘              │
│           └─────────────────────┼─────────────────────┘                       │
│                                 │                                             │
│                                 ▼                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    NEXT.JS APP ROUTER                                │    │
│  │         • Server Components  • Server Actions  • Route Handlers     │    │
│  └───────────────────────────┬──────────────────────────────────────────┘    │
│                              │                                                │
│  APPLICATION LAYER           │                                                │
│  ┌───────────────────────────┴───────────────────────────┐                  │
│  │                  SERVICE LAYER                        │                  │
│  │  Auth | Course | Assessment | Question | Answer |     │                  │
│  │  Grading | Reporting | User                           │                  │
│  └───────────────────────────┬───────────────────────────┘                  │
│                              │                                                │
│  DATA LAYER                  │                                                │
│  ┌───────────────────────────┴───────────────────────────┐                  │
│  │           Prisma ORM + PostgreSQL Client              │                  │
│  └───────────────────────────┬───────────────────────────┘                  │
│                              │                                                │
│  ┌───────────────────────────▼───────────────────────────┐                  │
│  │              PostgreSQL Database                      │                  │
│  │         6 core tables with UUID primary keys          │                  │
│  └───────────────────────────────────────────────────────┘                  │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3-Layer Architecture Pattern

All features follow this pattern:

```
┌─────────────────────────────────────────────────────────────┐
│              CODE PATTERN EXAMPLE                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. ROUTE HANDLER (src/app/api/v1/quizzes/route.ts)         │
│     └─► Receives HTTP request, validates with Zod           │
│         └─► Calls Service Layer (Next.js 16 API Routes)     │
│                                                              │
│  2. SERVICE LAYER (src/services/quiz.service.ts)            │
│     └─► Business logic, validation, orchestration           │
│         └─► Calls Repository Layer                          │
│                                                              │
│  3. REPOSITORY LAYER (src/repositories/quiz.repository.ts)  │
│     └─► Database operations via Prisma                      │
│         └─► Returns typed data                              │
│                                                              │
│  Next.js 16 Features Used:                                   │
│  • Turbopack for fast builds and HMR                        │
│  • Improved Server Components (React 19)                    │
│  • Partial Prerendering (optional)                          │
│  • Enhanced Middleware API                                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Database Schema (ERD)

### Entity Relationship Diagram

```
┌───────────────┐
│    users      │
├───────────────┤
│ id (UUID PK)  │◄────────────────────────────────┐
│ username      │                                 │
│ email         │                                 │
│ password      │                                 │
│ role          │                                 │
│ created_at    │                                 │
└───────┬───────┘                                 │
        │                                         │
        │ 1:N                                     │
        ▼                                         │
┌───────────────┐       ┌───────────────┐        │
│    quizzes    │       │   questions   │        │
├───────────────┤       ├───────────────┤        │
│ id (UUID PK)  │──────▶│ id (UUID PK)  │        │
│ teacher_id(FK)│       │ quiz_id (FK)  │        │
│ title         │       │ question_type │        │
│ description   │       │ question_text │        │
│ is_public     │       │ media_url     │        │
│ created_at    │       │ settings(JSON)│        │
└───────────────┘       │ points        │        │
                        │ order_index   │        │
                        └───────┬───────┘        │
                                │                │
                        ┌───────┴────────┐       │
                        │                │       │
                        ▼                ▼       │
                 ┌──────────────┐  ┌─────────────┴──┐
                 │question_     │  │response_       │
                 │options       │  │details         │
                 ├──────────────┤  ├────────────────┤
                 │ id (UUID PK) │  │ id (UUID PK)   │
                 │ question_id  │  │ response_id    │
                 │ option       │  │ question_id    │
                 │ sort_order   │  │ answer_given   │
                 │ is_correct   │  │ is_correct     │
                 └──────────────┘  └────────────────┘
                        ▲                ▲
                        │                │
┌───────────────────────┘                │
│                                        │
│  ┌───────────────┐                     │
│  │student_       │─────────────────────┘
│  │responses      │
│  ├───────────────┤
│  │ id (UUID PK)  │
│  │ user_id (FK)  │──────────────────────────────────────────────┘
│  │ quiz_id (FK)  │
│  │ score         │
│  │ completed_at  │
│  └───────────────┘
```

### Core Tables

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| **users** | All user accounts | id, email, password, role (teacher/student) |
| **quizzes** | Quiz definitions | id, teacher_id, title, is_public, access_code |
| **questions** | Quiz questions | id, quiz_id, question_type, settings (JSON) |
| **question_options** | Answer options | id, question_id, option, is_correct, sort_order |
| **student_responses** | Quiz submissions | id, user_id, quiz_id, score |
| **response_details** | Individual answers | id, response_id, question_id, answer_given |

### Question Types (JSON Settings)

```typescript
// Multiple Choice
{ shuffle: true, multipleAnswers: false }

// Essay
{ gradingRubric: "...", wordLimit: 500 }

// Fill in the Blank
{ caseSensitive: false, acceptedAnswers: ["..."] }

// Match
{ shuffleLeft: true, pairs: [{ left, right, pair_id }] }

// Reorder
{ correctOrder: ["id1", "id2"], partialCredit: true }
```

---

## Project Structure

```
quizizz-clone/
├── docs/                       # Project documentation
│   └── project/
│       ├── 01-bussiness-requirement.md
│       ├── 02-project-execution-plan.md
│       ├── 03-implementation-and-architecture.md
│       └── 04-database-erd-guideline.md
│
├── openspec/                   # OpenSpec change management
│   ├── config.yaml
│   ├── specs/
│   └── changes/
│
├── prisma/
│   ├── schema.prisma          # Database schema (6 tables)
│   ├── migrations/
│   └── seed.ts
│
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth routes
│   │   │   ├── login/
│   │   │   └── register/
│   │   │
│   │   ├── (dashboard)/       # Teacher dashboard
│   │   │   ├── dashboard/
│   │   │   ├── courses/
│   │   │   ├── assessments/
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (guest)/           # Guest student routes
│   │   │   ├── join/
│   │   │   ├── quiz/
│   │   │   └── layout.tsx
│   │   │
│   │   ├── api/               # API Routes (v1)
│   │   │   └── v1/
│   │   │       ├── auth/
│   │   │       ├── courses/
│   │   │       ├── assessments/
│   │   │       ├── questions/
│   │   │       └── responses/
│   │   │
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── ui/                # Shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/            # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── footer.tsx
│   │   │
│   │   ├── courses/           # Course components
│   │   ├── assessments/       # Assessment components
│   │   ├── questions/         # Question components
│   │   │   ├── question-editor.tsx
│   │   │   ├── multiple-choice.tsx
│   │   │   ├── essay.tsx
│   │   │   ├── fill-blank.tsx
│   │   │   ├── match.tsx
│   │   │   └── reorder.tsx
│   │   │
│   │   └── forms/             # Reusable form components
│   │
│   ├── lib/
│   │   ├── prisma/
│   │   │   ├── client.ts      # Prisma client singleton
│   │   │   └── index.ts
│   │   │
│   │   ├── validators/        # Zod schemas
│   │   │   ├── auth.ts
│   │   │   ├── course.ts
│   │   │   ├── assessment.ts
│   │   │   ├── question.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── types.ts
│   │   │   └── errors.ts
│   │   │
│   │   ├── utils.ts
│   │   └── constants.ts
│   │
│   ├── hooks/
│   │   ├── use-auth.ts
│   │   ├── use-courses.ts
│   │   ├── use-assessments.ts
│   │   ├── use-questions.ts
│   │   └── index.ts
│   │
│   ├── services/              # Business logic
│   │   ├── auth.service.ts
│   │   ├── course.service.ts
│   │   ├── assessment.service.ts
│   │   ├── question.service.ts
│   │   ├── grading.service.ts
│   │   └── reporting.service.ts
│   │
│   ├── repositories/          # Data access
│   │   ├── user.repository.ts
│   │   ├── course.repository.ts
│   │   ├── assessment.repository.ts
│   │   ├── question.repository.ts
│   │   └── index.ts
│   │
│   └── types/
│       ├── domain.ts
│       ├── api.ts
│       └── index.ts
│
├── tests/
│   ├── e2e/
│   ├── unit/
│   └── fixtures/
│
├── .env.example
├── .gitignore
├── components.json
├── next.config.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vitest.config.ts
```

---

## Code Patterns & Conventions

### File Naming

```
✅ kebab-case for files:
   - user-profile.tsx
   - quiz-form.tsx
   - auth.service.ts

✅ PascalCase for components:
   - UserProfile.tsx
   - QuizForm.tsx

✅ camelCase for utilities:
   - formatDate.ts
   - cn.ts
```

### Component Pattern

```tsx
// Server Component (default)
// src/app/(dashboard)/courses/page.tsx
import { courseService } from '@/services/course.service';

export default async function CoursesPage() {
  const courses = await courseService.getAll();
  
  return (
    <div>
      <h1>Courses</h1>
      <CourseList courses={courses} />
    </div>
  );
}

// Client Component (when interactivity needed)
// src/components/courses/course-list.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { courseService } from '@/lib/api/courses';

export function CourseList() {
  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: courseService.getAll,
  });
  
  if (isLoading) return <Spinner />;
  
  return (
    <ul>
      {courses?.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </ul>
  );
}
```

### API Route Pattern

```typescript
// src/app/api/v1/courses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { courseService } from '@/services/course.service';
import { requireAuth } from '@/lib/auth';

const createCourseSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  isPublic: z.boolean().default(true),
});

export async function GET(request: NextRequest) {
  const user = await requireAuth(request);
  const courses = await courseService.getByTeacher(user.id);
  return NextResponse.json(courses);
}

export async function POST(request: NextRequest) {
  const user = await requireAuth(request);
  const body = await request.json();
  const validated = createCourseSchema.parse(body);
  
  const course = await courseService.create({
    ...validated,
    teacherId: user.id,
  });
  
  return NextResponse.json(course, { status: 201 });
}
```

### Service Layer Pattern

```typescript
// src/services/course.service.ts
import { prisma } from '@/lib/prisma';
import { Course, CourseCreateInput } from '@/types/domain';

export const courseService = {
  async getAll(): Promise<Course[]> {
    return prisma.course.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },

  async getById(id: string): Promise<Course | null> {
    return prisma.course.findUnique({
      where: { id },
      include: {
        assessments: true,
        _count: { students: true },
      },
    });
  },

  async getByTeacher(teacherId: string): Promise<Course[]> {
    return prisma.course.findMany({
      where: { teacherId },
      orderBy: { createdAt: 'desc' },
    });
  },

  async create(data: CourseCreateInput): Promise<Course> {
    return prisma.course.create({ data });
  },

  async update(id: string, data: Partial<CourseCreateInput>): Promise<Course> {
    return prisma.course.update({
      where: { id },
      data,
    });
  },

  async delete(id: string): Promise<void> {
    await prisma.course.delete({ where: { id } });
  },
};
```

### Repository Pattern

```typescript
// src/repositories/course.repository.ts
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const courseRepository = {
  findMany(args?: Prisma.CourseFindManyArgs) {
    return prisma.course.findMany(args);
  },

  findUnique(args: Prisma.CourseFindUniqueArgs) {
    return prisma.course.findUnique(args);
  },

  create(args: Prisma.CourseCreateArgs) {
    return prisma.course.create(args);
  },

  update(args: Prisma.CourseUpdateArgs) {
    return prisma.course.update(args);
  },

  delete(args: Prisma.CourseDeleteArgs) {
    return prisma.course.delete(args);
  },
};
```

### Zod Validation Pattern

```typescript
// src/lib/validators/course.ts
import { z } from 'zod';

export const courseCreateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  isPublic: z.boolean().default(true),
  accessCode: z.string().length(6).optional(),
});

export const courseUpdateSchema = courseCreateSchema.partial();

export type CourseCreateInput = z.infer<typeof courseCreateSchema>;
```

### TanStack Query Pattern

```typescript
// src/hooks/use-courses.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { courseService } from '@/lib/api/courses';

export function useCourses() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['courses'],
    queryFn: courseService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: courseService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  return {
    ...query,
    create: createMutation.mutateAsync,
  };
}
```

---

## API Endpoints

```
Base: /api/v1

Authentication:
  POST   /auth/register          - Teacher registration
  POST   /auth/login             - Teacher login
  POST   /auth/logout            - Logout
  GET    /auth/me                - Get current user

Courses:
  GET    /courses                - List courses (teacher)
  POST   /courses                - Create course
  GET    /courses/:id            - Get course detail
  PUT    /courses/:id            - Update course
  DELETE /courses/:id            - Delete course
  POST   /courses/:id/join       - Join with access code (guest)

Assessments:
  GET    /assessments            - List assessments (by course)
  POST   /assessments            - Create assessment
  GET    /assessments/:id        - Get assessment detail
  PUT    /assessments/:id        - Update assessment
  DELETE /assessments/:id        - Delete assessment

Questions:
  GET    /questions              - List questions (by assessment)
  POST   /questions              - Create question
  GET    /questions/:id          - Get question detail
  PUT    /questions/:id          - Update question
  DELETE /questions/:id          - Delete question

Quiz (Guest):
  POST   /quiz/join              - Join quiz with access code
  POST   /quiz/:id/start         - Start quiz
  POST   /quiz/:id/answer        - Submit answer (auto-save)
  POST   /quiz/:id/submit        - Submit quiz
  GET    /quiz/:id/result        - Get quiz result

Reporting:
  GET    /reports/assessments/:id - Get assessment report
  GET    /reports/students/:id    - Get student report
  POST   /reports/grade           - Grade manually (essay)
  GET    /reports/export/:id      - Export scores (CSV)
```

---

## Development Workflow

### Getting Started

```bash
# 1. Clone and install
git clone <repo>
cd learning-management-system
npm install

# 2. Setup environment
cp .env.example .env.local
# Edit .env.local with your database URL

# 3. Setup database
npm run db:generate    # Generate Prisma Client
npm run db:push        # Push schema to database
npm run db:seed        # Seed initial data

# 4. Run development
npm run dev           # Start Next.js dev server (port 3000)
```

### Available Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "typecheck": "tsc --noEmit",
  "db:generate": "prisma generate",
  "db:push": "prisma db:push",
  "db:migrate": "prisma migrate dev",
  "db:seed": "tsx prisma/seed.ts",
  "test": "vitest",
  "test:e2e": "playwright test"
}
```

### OpenSpec Workflow

This project uses OpenSpec for structured change management:

```bash
# Start a new change
/opsx:new <change-name>

# Fast-forward through artifacts
/opsx:ff <change-name>

# Continue working on a change
/opsx:continue <change-name>

# Verify implementation
/opsx:verify <change-name>

# Archive completed change
/opsx:archive <change-name>
```

---

## Key Business Rules

### User Types

| Type | Registration | Access |
|------|--------------|--------|
| **Teacher** | Full registration with email verification | Create courses, assessments, view reports |
| **Student (Guest)** | Auto-registered with UUID when joining quiz | Join via access code, take quiz, view results |

### Course Types

| Type | Visibility | Join Method |
|------|------------|-------------|
| **Public** | Searchable, visible to all | Direct access |
| **Private** | Only via access code | 6-character alphanumeric code |

### Question Types

| Type | Auto-Graded | Settings |
|------|-------------|----------|
| Multiple Choice | ✅ Yes | shuffle, multipleAnswers |
| Essay | ❌ Manual | gradingRubric, wordLimit |
| Fill in the Blank | ✅ Yes | caseSensitive, acceptedAnswers |
| Match | ✅ Yes (partial credit) | shuffleLeft, pairs |
| Reorder | ✅ Yes (partial credit) | correctOrder, partialCredit |

### Grading

- **Objective questions** (MC, Fill Blank, Match, Reorder): Auto-graded immediately
- **Essay questions**: Flagged for manual grading by teacher
- **Partial credit**: Available for Match and Reorder based on correct positions

---

## Testing Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    TESTING PYRAMID                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                         /\                                   │
│                        /  \                                  │
│                       / E2E\                                 │
│                      /--------\                              │
│                     /          \                             │
│                    / Integration\                            │
│                   /--------------\                           │
│                  /                \                          │
│                 /     Unit Tests   \                         │
│                /--------------------\                        │
│                                                              │
│  Unit Tests: Vitest (services, repositories, utils)         │
│  Integration: API route tests with test database            │
│  E2E: Playwright (critical user journeys)                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Test File Pattern

```typescript
// Unit test example
// src/services/__tests__/course.service.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { courseService } from '../course.service';

describe('courseService', () => {
  beforeEach(async () => {
    // Setup test data
  });

  it('should create a course', async () => {
    const course = await courseService.create({
      title: 'Math 101',
      teacherId: 'teacher-uuid',
    });
    expect(course.title).toBe('Math 101');
  });
});

// E2E test example
// tests/e2e/course-creation.spec.ts
import { test, expect } from '@playwright/test';

test('teacher can create a course', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', 'teacher@test.com');
  await page.fill('[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  
  await page.goto('/courses');
  await page.click('text=Create Course');
  await page.fill('[name="title"]', 'New Course');
  await page.click('button[type="submit"]');
  
  await expect(page.locator('text=New Course')).toBeVisible();
});
```

---

## Design System

### Color System

The project uses a dual-theme color system defined in [`/docs/project/05-color-guideline.md`](./docs/project/05-color-guideline.md):

| Theme | Mode | Primary Color | Use Case |
|-------|------|---------------|----------|
| **Theme A** | Light | `#6467f2` (Indigo) | Student-facing screens, Assessment Editor |
| **Theme B** | Dark | `#6a25f4` (Deep Purple) | Teacher Dashboard, Quiz screens |

### Color Tokens

```css
/* Primary Colors (Theme A - Light) */
--color-primary-base: #6467f2;
--color-primary-hover: #4f46e5;
--color-primary-active: #4338ca;
--color-primary-light: #a5b4fc;
--color-primary-lighter: #e0e7ff;

/* Primary Colors (Theme B - Dark) */
--color-primary-base: #6a25f4;
--color-primary-hover: #7c3aed;
--color-primary-active: #5b21b6;
--color-primary-light: #a78bfa;
--color-primary-lighter: #ddd6fe;

/* Semantic Colors */
--color-success-base: #22c55e;   /* Correct answers */
--color-warning-base: #f59e0b;   /* Warnings */
--color-error-base: #ef4444;     /* Errors, incorrect */
--color-info-base: #3b82f6;      /* Information */

/* Option Card Colors (Multiple Choice) */
--color-option-a: #8b5cf6;  /* Purple */
--color-option-b: #3b82f6;  /* Blue */
--color-option-c: #f97316;  /* Orange */
--color-option-d: #ec4899;  /* Pink */
```

### Typography

- **Font Family:** Lexend (Google Fonts)
- **Weights:** 300, 400, 500, 600, 700

### Icons

- **Library:** Material Symbols Outlined (Google Fonts)
- **Usage:** `<span class="material-symbols-outlined">icon_name</span>`

### Border Radius

- **Default:** 12px (0.75rem)
- **Large:** 1rem (16px)
- **XL:** 1.5rem (24px)
- **Full:** 9999px (pills, circles)

### Reference UI Screens

See [`/docs/stitch-asset/`](./docs/stitch-asset/) for HTML prototypes:

| Screen | File | Theme | Description |
|--------|------|-------|-------------|
| Student Join | `student-join-screen.html` | Dark | Guest student join flow with game code input |
| Teacher Dashboard | `teacher-dashboard.html` | Dark | Main teacher dashboard with stats |
| Assessment Editor | `assessment-editor.html` | Light | Quiz/assessment creation interface |
| Quiz MC | `quiz-multiple-choice.html` | Dark | Multiple choice question UI |
| Quiz Essay | `quiz-essay-question.html` | Dark | Essay question input UI |

### Tailwind Configuration

```ts
// tailwind.config.ts
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary-base)',
          hover: 'var(--color-primary-hover)',
          active: 'var(--color-primary-active)',
          light: 'var(--color-primary-light)',
          lighter: 'var(--color-primary-lighter)',
        },
        accent: {
          pink: '#ec4899',
          blue: '#3b82f6',
          orange: '#f97316',
          purple: '#8b5cf6',
          teal: '#14b8a6',
        },
        success: { DEFAULT: '#22c55e', light: '#86efac' },
        warning: { DEFAULT: '#f59e0b', light: '#fcd34d' },
        error: { DEFAULT: '#ef4444', light: '#fca5a5' },
        info: { DEFAULT: '#3b82f6', light: '#93c5fd' },
      },
      fontFamily: {
        display: ['Lexend', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '12px',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
      },
    },
  },
}
```

### CSS Variables Setup

```css
/* globals.css */
@layer base {
  :root[data-theme="light"] {
    --color-primary-base: #6467f2;
    --color-primary-hover: #4f46e5;
    --color-primary-active: #4338ca;
    --color-bg-primary: #ffffff;
    --color-bg-secondary: #f9fafb;
    --color-text-primary: #111827;
    --color-text-secondary: #4b5563;
    --color-border-primary: #e5e7eb;
  }

  :root[data-theme="dark"] {
    --color-primary-base: #6a25f4;
    --color-primary-hover: #7c3aed;
    --color-primary-active: #5b21b6;
    --color-bg-primary: #0f172a;
    --color-bg-secondary: #1e293b;
    --color-text-primary: #f8fafc;
    --color-text-secondary: #e2e8f0;
    --color-border-primary: #475569;
  }
}
```

### Component Example

```tsx
// components/ui/button.tsx
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary-base text-white hover:bg-primary-hover active:bg-primary-active shadow-lg shadow-primary/20',
        secondary: 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200',
        outline: 'border-2 border-primary-base text-primary-base hover:bg-primary-lighter',
        ghost: 'text-primary-base hover:bg-primary-lighter',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)
```

### Accessibility

- **WCAG 2.1 AA** contrast ratios required
- Minimum 4.5:1 for normal text, 3:1 for large text
- Never use color alone to convey information
- Pair colors with icons, labels, or patterns

---

## Security

| Aspect | Implementation |
|--------|----------------|
| **Password Hashing** | bcrypt (cost factor 10+) |
| **Session Management** | JWT tokens, HTTP-only cookies, 24h expiry |
| **API Security** | Zod validation, rate limiting |
| **SQL Injection** | Prisma parameterized queries |
| **XSS Prevention** | React escaping, CSP headers |
| **CSRF Protection** | SameSite cookies |

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Page Load Time | < 3 seconds |
| API Response (p95) | < 500ms |
| Quiz Join Time | < 2 minutes (user flow) |
| Score Availability | < 5 seconds after submission |
| Concurrent Users | 1000+ per instance |
| Uptime | 99.5% |

---

## Common Tasks

### Adding a New Question Type

1. Update Prisma schema (if needed)
2. Add JSON schema in validators
3. Create question editor component
4. Implement auto-grading logic
5. Update ERD documentation

### Creating a New Module

1. Create OpenSpec change: `/opsx:new module-name`
2. Define specs in `openspec/specs/<module>/spec.md`
3. Implement following 3-layer architecture
4. Add tests (unit + integration + E2E)
5. Verify and archive change

---

## Troubleshooting

### Database Issues

```bash
# Reset and reseed (development only)
npm run db:reset

# Regenerate Prisma Client
npm run db:generate

# Create new migration
npm run db:migrate
```

### Type Errors

```bash
# Run type checking
npm run typecheck

# Regenerate Prisma types
npm run db:generate
```

---

## Team & Contact

| Role | Responsibility |
|------|----------------|
| Tech Lead | Architecture decisions, code review |
| Backend Devs | API, database, business logic |
| Frontend Devs | UI components, pages, hooks |
| QA Engineer | Test planning, automation |

---

*Last updated: 28 February 2026*
*Quizizz Clone (Lite Version) - LearnWeb LMS Project*
