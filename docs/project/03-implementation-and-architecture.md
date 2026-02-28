# IMPLEMENTATION & TECHNICAL ARCHITECTURE
## Quizizz Clone (Lite Version)
### LearnWeb LMS Project

---

| Attribute | Value |
|-----------|-------|
| Document ID | DOC-QCL-ITA-001 |
| Version | 1.0 |
| Status | Draft |
| Author | Solution Architecture Team |
| Created | Februari 2026 |
| Last Updated | 25 Februari 2026 |
| Reviewed By | VP IT, Tech Lead, Security Team |
| Approved By | Technical Steering Committee |

---

## Changelog

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 25 Februari 2026 | SA Team | Initial version |

---

## DAFTAR ISI

1. [Executive Summary](#1-executive-summary)
2. [Architecture Overview](#2-architecture-overview)
3. [Technology Stack](#3-technology-stack)
4. [Development Environment](#4-development-environment)
5. [Application Architecture](#5-application-architecture)
6. [Data Architecture](#6-data-architecture)
7. [Integration Architecture](#7-integration-architecture)
8. [Infrastructure Architecture](#8-infrastructure-architecture)
9. [Security Architecture](#9-security-architecture)
10. [DevOps & CI/CD](#10-devops--cicd)
11. [Monitoring & Observability](#11-monitoring--observability)
12. [Development Standards](#12-development-standards)
13. [Technical Decisions Log](#13-technical-decisions-log)
14. [Technical Risks & Mitigations](#14-technical-risks--mitigations)

---

## 1. EXECUTIVE SUMMARY

### 1.1 Tujuan Dokumen

Dokumen Implementation & Technical Architecture (ITA) ini mendefinisikan arsitektur teknis, technology stack, dan standar pengembangan untuk proyek Quizizz Clone (Lite Version). Dokumen ini menjadi panduan utama bagi tim development dalam membangun sistem yang scalable, secure, maintainable, dan DRY (Don't Repeat Yourself).

### 1.2 Architecture Principles

| Principle | Description | Rationale |
|-----------|-------------|-----------|
| **Component-Driven** | Semua UI dibangun dari reusable components yang terkomposisi | Konsistensi UI, maintainability, development speed |
| **Type Safety First** | TypeScript strict mode di seluruh codebase | Mencegah runtime errors, better DX, self-documenting code |
| **Server Components Default** | Next.js App Router dengan Server Components sebagai default | Performance, SEO, reduced bundle size |
| **Single Source of Truth** | Supabase sebagai primary database dan auth provider | Konsistensi data, reduced complexity |
| **API Versioning** | Semua API endpoints mengikuti pattern `/api/v1/{context}/{resource}/{action}` | Future-proof, clear API structure |
| **Validation Everywhere** | Zod schema validation di client dan server | Type safety end-to-end, consistent error handling |

### 1.3 Technology Stack Summary

```
┌─────────────────────────────────────────────────────────────┐
│                    TECHNOLOGY STACK                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  FRONTEND          │  BACKEND           │  DATA             │
│  ─────────────     │  ─────────────     │  ─────────────    │
│  • Next.js 15      │  • Next.js API     │  • Supabase       │
│  • TypeScript 5    │    Routes          │    (PostgreSQL)   │
│  • Tailwind CSS 4  │  • Server Actions  │  • Prisma ORM     │
│  • Shadcn/ui       │  • Zod Validation  │  • Supabase Auth  │
│  • TanStack Query  │  • Supabase JS     │  • Supabase       │
│  • React Hook Form │    Client          │    Storage        │
│  • Zod             │  • Edge Runtime    │                   │
│  • Lucide React    │                    │                   │
│                                                              │
│  INFRASTRUCTURE    │  DEVOPS            │  INTEGRATION      │
│  ─────────────     │  ─────────────     │  ─────────────    │
│  • Vercel          │  • GitHub Actions  │  • Google OAuth   │
│  • Supabase        │  • ESLint          │  • Email (Resend) │
│  • Edge Network    │  • Prettier        │  • reCAPTCHA      │
│  • CDN             │  • Husky           │                   │
│  • Blob Storage    │  • Playwright      │                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. ARCHITECTURE OVERVIEW

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      QUIZIZZ CLONE ARCHITECTURE                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                     PRESENTATION LAYER                               │    │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐     │    │
│  │  │   Teacher Web   │  │  Student Guest  │  │   Admin Portal  │     │    │
│  │  │      App        │  │     Web App     │  │                 │     │    │
│  │  │  (Next.js 15)   │  │  (Next.js 15)   │  │  (Next.js 15)   │     │    │
│  │  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘     │    │
│  │           └─────────────────────┼─────────────────────┘              │    │
│  └─────────────────────────────────┼────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    NEXT.JS APP ROUTER                                │    │
│  │         • Server Components  • Server Actions  • Route Handlers     │    │
│  │         • Middleware (Auth)  • Edge Runtime   • Streaming          │    │
│  └───────────────────────────┬──────────────────────────────────────────┘    │
│                              │                                                │
│  ┌───────────────────────────┼──────────────────────────────────────────┐    │
│  │                   APPLICATION LAYER                                    │    │
│  │                              │                                         │    │
│  │  ┌───────────────────────────┴───────────────────────────┐            │    │
│  │  │                  SERVICE LAYER                        │            │    │
│  │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │            │    │
│  │  │  │   Auth   │ │  Course  │ │Assessment│ │  Question│ │            │    │
│  │  │  │ Service  │ │ Service  │ │ Service  │ │ Service  │ │            │    │
│  │  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ │            │    │
│  │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │            │    │
│  │  │  │  Answer  │ │ Grading  │ │Reporting │ │   User   │ │            │    │
│  │  │  │ Service  │ │ Service  │ │ Service  │ │ Service  │ │            │    │
│  │  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ │            │    │
│  │  └───────────────────────────────────────────────────────┘            │    │
│  │                              │                                         │    │
│  │  ┌───────────────────────────┴───────────────────────────┐            │    │
│  │  │                 REPOSITORY LAYER                      │            │    │
│  │  │         (Prisma ORM + Supabase Client)                │            │    │
│  │  └───────────────────────────────────────────────────────┘            │    │
│  └──────────────────────────────────────────────────────────────────────┘    │
│                              │                                                │
│  ┌───────────────────────────┼──────────────────────────────────────────┐    │
│  │                      DATA LAYER                                        │    │
│  │  ┌──────────────────┐  ┌────────────┐  ┌────────────────────┐        │    │
│  │  │   Supabase       │  │   Supabase │  │   Supabase         │        │    │
│  │  │   (PostgreSQL)   │  │   Storage  │  │   Auth             │        │    │
│  │  │   • Tables       │  │   • Avatars│  │   • Email/Password │        │    │
│  │  │   • RLS Policies │  │   • Covers │  │   • Google OAuth   │        │    │
│  │  │   • Functions    │  │   • Assets │  │   • JWT Sessions   │        │    │
│  │  └──────────────────┘  └────────────┘  └────────────────────┘        │    │
│  └──────────────────────────────────────────────────────────────────────┘    │
│                              │                                                │
│  ┌───────────────────────────┼──────────────────────────────────────────┐    │
│  │                   INTEGRATION LAYER                                    │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                │    │
│  │  │ Google OAuth │  │ Resend Email │  │ reCAPTCHA    │                │    │
│  │  │ (Auth)       │  │ (Transactional)│ │ (Bot Protect)│                │    │
│  │  └──────────────┘  └──────────────┘  └──────────────┘                │    │
│  └──────────────────────────────────────────────────────────────────────┘    │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Component Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                COMPONENT RELATIONSHIPS                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌────────────────────────────────────────────────────┐    │
│   │              FRONTEND COMPONENTS                    │    │
│   │                                                     │    │
│   │   ┌─────────┐    ┌─────────┐    ┌─────────┐       │    │
│   │   │  Pages  │───▶│Sections │───▶│Components│       │    │
│   │   │(Server) │    │         │    │ (Client) │       │    │
│   │   └────┬────┘    └────┬────┘    └────┬────┘       │    │
│   │        │              │              │             │    │
│   │        ▼              ▼              ▼             │    │
│   │   ┌─────────────────────────────────────────┐     │    │
│   │   │         TanStack Query (React Query)    │     │    │
│   │   │         • useQuery  • useMutation       │     │    │
│   │   │         • Query Client  • Prefetch      │     │    │
│   │   └─────────────────────────────────────────┘     │    │
│   │                    │                               │    │
│   │                    ▼ fetch                         │    │
│   │   ┌─────────────────────────────────────────┐     │    │
│   │   │         API Client Layer                │     │    │
│   │   │         • Axios/Fetch Wrapper           │     │    │
│   │   │         • Interceptors (Auth, Error)    │     │    │
│   │   │         • Type-safe responses           │     │    │
│   │   └─────────────────────────────────────────┘     │    │
│   └────────────────────────────────────────────────────┘    │
│                         │                                    │
│                         │ HTTP/REST                          │
│                         ▼                                    │
│   ┌────────────────────────────────────────────────────┐    │
│   │              BACKEND (Next.js API)                  │    │
│   │                                                     │    │
│   │   ┌─────────┐    ┌─────────┐    ┌─────────┐       │    │
│   │   │  Route  │───▶│Service  │───▶│Repository│       │    │
│   │   │Handlers │    │ Layer   │    │  Layer  │       │    │
│   │   │(API)    │    │         │    │(Prisma) │       │    │
│   │   └────┬────┘    └────┬────┘    └────┬────┘       │    │
│   │        │              │              │             │    │
│   │        ▼              ▼              ▼             │    │
│   │   ┌─────────┐    ┌─────────┐    ┌─────────┐      │    │
│   │   │ Zod     │    │ Supabase│    │  Types  │      │    │
│   │   │Validation│    │  Client │    │(Prisma) │      │    │
│   │   └─────────┘    └─────────┘    └─────────┘      │    │
│   └────────────────────────────────────────────────────┘    │
│                         │                                    │
│                         ▼                                    │
│   ┌────────────────────────────────────────────────────┐    │
│   │                 DATA STORES                         │    │
│   │                                                     │    │
│   │   Supabase (PostgreSQL)  │  Supabase Storage       │    │
│   │   • 8 core tables        │  • User avatars         │    │
│   │   • RLS enabled          │  • Course covers        │    │
│   │   • Indexes optimized    │  • Question assets      │    │
│   └────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 2.3 Module Dependencies

| Module | Depends On | Consumed By |
|--------|------------|-------------|
| Auth Module | Supabase Auth, Users Table | All Modules |
| User Module | Auth Module, Database | Course, Assessment, Reporting |
| Course Module | Auth Module, User Module | Assessment, Enrollment |
| Assessment Module | Course Module, Question Module | Reporting, Grading |
| Question Module | Assessment Module, Database | Grading, Answer |
| Answer Module | Assessment Module, Question Module | Grading, Reporting |
| Grading Module | Question Module, Answer Module | Reporting |
| Reporting Module | All Modules | Admin Portal, Teacher Dashboard |

---

## 3. TECHNOLOGY STACK

### 3.1 Frontend Stack

| Layer | Technology | Version | Justification |
|-------|------------|---------|---------------|
| **Framework** | Next.js | 15.x (App Router) | Server Components, API Routes, optimal performance |
| **Language** | TypeScript | 5.x | Type safety, better DX, catch errors early |
| **State Management** | TanStack Query | 5.x | Server state management, caching, background sync |
| **Form State** | React Hook Form | 8.x | Performant form handling, minimal re-renders |
| **Styling** | Tailwind CSS | 4.x | Utility-first, consistent design, small bundle |
| **UI Components** | Shadcn/ui | Latest | Accessible, customizable, copy-paste components |
| **Icons** | Lucide React | Latest | Consistent icon set, tree-shakeable |
| **Validation** | Zod | 3.x | Schema validation, type inference, client+server |
| **HTTP Client** | Fetch API (native) | - | Built-in, no extra dependency, works with Next.js |
| **Date Handling** | date-fns | 3.x | Lightweight, modular, tree-shakeable |
| **Charts** | Recharts | 2.x | Composable, responsive, works well with React |

### 3.2 Backend Stack

| Layer | Technology | Version | Justification |
|-------|------------|---------|---------------|
| **Runtime** | Next.js API Routes | 15.x | Integrated with frontend, edge runtime support |
| **Framework** | Next.js App Router | 15.x | Server Actions, Route Handlers, middleware |
| **Language** | TypeScript | 5.x | Type safety end-to-end |
| **ORM** | Prisma | 6.x | Type-safe queries, migrations, excellent DX |
| **Validation** | Zod | 3.x | Request validation, type inference, error messages |
| **Authentication** | Supabase Auth | Latest | Email/password + Google OAuth, JWT sessions |
| **Database Client** | Supabase JS | 2.x | PostgreSQL with realtime, RLS, storage |
| **API Documentation** | OpenAPI (via types) | 3.0 | Auto-generated from TypeScript types |
| **Logging** | Pino (via Vercel) | - | Structured logging, Vercel Analytics integration |
| **Testing** | Playwright + Vitest | Latest | E2E + Unit testing |

### 3.3 Database Stack

| Component | Technology | Version | Use Case |
|-----------|------------|---------|----------|
| **Primary Database** | Supabase (PostgreSQL) | 15.x | All application data, 8 core tables |
| **Auth** | Supabase Auth | Latest | User authentication, sessions, OAuth |
| **Object Storage** | Supabase Storage | Latest | User avatars, course covers, question assets |
| **Realtime** | Supabase Realtime | Latest | Live quiz updates (future feature) |
| **Edge Functions** | Supabase Edge Functions | Latest | Custom backend logic (if needed) |

### 3.4 Infrastructure Stack

| Component | Technology | Version | Use Case |
|-----------|------------|---------|----------|
| **Hosting** | Vercel | Latest | Next.js optimized hosting, edge network |
| **Database Hosting** | Supabase Cloud | Latest | Managed PostgreSQL, auth, storage |
| **CDN** | Vercel Edge Network | - | Global content delivery, caching |
| **DNS** | Vercel DNS | - | Domain management, SSL certificates |
| **Secret Management** | Vercel Environment Variables | - | Secure env var management |

### 3.5 DevOps Stack

| Component | Technology | Version | Use Case |
|-----------|------------|---------|----------|
| **CI/CD** | GitHub Actions | Latest | Automated testing, deployment |
| **Version Control** | Git + GitHub | Latest | Source control, PR reviews |
| **Package Manager** | pnpm | 9.x | Fast, disk-efficient dependency management |
| **Code Quality** | ESLint + Prettier | Latest | Linting, formatting, consistency |
| **Type Checking** | TypeScript | 5.x | Compile-time type checking |
| **Testing** | Playwright + Vitest | Latest | E2E + Unit testing |
| **Security Scanning** | GitHub Dependabot | Latest | Dependency vulnerability alerts |
| **Pre-commit Hooks** | Husky + lint-staged | Latest | Auto-format, lint before commit |

---

## 4. DEVELOPMENT ENVIRONMENT

### 4.1 Local Development Setup

```
┌─────────────────────────────────────────────────────────────┐
│            LOCAL DEVELOPMENT ENVIRONMENT                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Developer Machine                                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                                                       │   │
│  │  ┌─────────────────┐  ┌─────────────────┐            │   │
│  │  │  VS Code        │  │  Browser        │            │   │
│  │  │  + Extensions   │  │  + DevTools     │            │   │
│  │  └────────┬────────┘  └────────┬────────┘            │   │
│  │           │                    │                      │   │
│  │           │ File Watch         │ http://localhost:3000│   │
│  │           │ + HMR              │                      │   │
│  │           ▼                    ▼                      │   │
│  │  ┌─────────────────────────────────────────────┐     │   │
│  │  │         Next.js Development Server           │     │   │
│  │  │              (Turbopack)                     │     │   │
│  │  │              PORT: 3000                      │     │   │
│  │  └─────────────────────────────────────────────┘     │   │
│  │                       │                               │   │
│  │                       │ Env Vars                      │   │
│  │                       ▼                               │   │
│  │  ┌─────────────────────────────────────────────┐     │   │
│  │  │         Supabase Local/Cloud Instance        │     │   │
│  │  │  • PostgreSQL (Local or Cloud)              │     │   │
│  │  │  • Auth (Cloud)                             │     │   │
│  │  │  • Storage (Cloud)                          │     │   │
│  │  └─────────────────────────────────────────────┘     │   │
│  │                                                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 20.x LTS (or 22.x) | JavaScript runtime |
| pnpm | 9.x | Package manager |
| Git | 2.x | Version control |
| VS Code | Latest | Recommended IDE |
| Supabase CLI | Latest (optional) | Local Supabase development |

### 4.3 IDE Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "prisma.prisma",
    "msjsdiag.vscode-react-native"
  ]
}
```

### 4.4 Project Structure

```
quizizz-clone/
├── .github/                    # GitHub Actions workflows
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
│
├── .husky/                     # Git hooks
│   ├── pre-commit
│   └── commit-msg
│
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # Database migrations
│   └── seed.ts                # Seed data
│
├── public/
│   └── assets/
│
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth routes (login, register)
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── layout.tsx
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
│   │   ├── api/               # API Routes
│   │   │   └── v1/
│   │   │       ├── admin/
│   │   │       ├── courses/
│   │   │       ├── assessments/
│   │   │       ├── questions/
│   │   │       └── auth/
│   │   │
│   │   ├── globals.css
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
│   │   ├── courses/           # Course-specific components
│   │   │   ├── course-card.tsx
│   │   │   ├── course-form.tsx
│   │   │   └── ...
│   │   │
│   │   ├── assessments/       # Assessment components
│   │   │   ├── assessment-card.tsx
│   │   │   ├── assessment-form.tsx
│   │   │   └── ...
│   │   │
│   │   ├── questions/         # Question components
│   │   │   ├── question-editor.tsx
│   │   │   ├── multiple-choice.tsx
│   │   │   ├── essay.tsx
│   │   │   ├── fill-blank.tsx
│   │   │   ├── match.tsx
│   │   │   ├── reorder.tsx
│   │   │   └── ...
│   │   │
│   │   └── forms/             # Reusable form components
│   │       ├── form-field.tsx
│   │       ├── form-label.tsx
│   │       └── ...
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts      # Supabase client (browser)
│   │   │   ├── server.ts      # Supabase client (server)
│   │   │   ├── middleware.ts  # Supabase middleware
│   │   │   └── types.ts       # Supabase types
│   │   │
│   │   ├── prisma/
│   │   │   ├── client.ts      # Prisma client singleton
│   │   │   └── index.ts       # Re-exports
│   │   │
│   │   ├── validators/        # Zod schemas
│   │   │   ├── auth.ts
│   │   │   ├── course.ts
│   │   │   ├── assessment.ts
│   │   │   ├── question.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── api/
│   │   │   ├── client.ts      # API client wrapper
│   │   │   ├── types.ts       # API types
│   │   │   └── errors.ts      # Error handling
│   │   │
│   │   ├── utils.ts           # Utility functions (cn, etc.)
│   │   └── constants.ts       # App constants
│   │
│   ├── hooks/                 # Custom hooks
│   │   ├── use-auth.ts
│   │   ├── use-courses.ts
│   │   ├── use-assessments.ts
│   │   ├── use-questions.ts
│   │   ├── use-quiz.ts
│   │   └── index.ts
│   │
│   ├── services/              # Business logic layer
│   │   ├── auth.service.ts
│   │   ├── course.service.ts
│   │   ├── assessment.service.ts
│   │   ├── question.service.ts
│   │   ├── grading.service.ts
│   │   └── reporting.service.ts
│   │
│   ├── repositories/          # Data access layer
│   │   ├── user.repository.ts
│   │   ├── course.repository.ts
│   │   ├── assessment.repository.ts
│   │   ├── question.repository.ts
│   │   └── index.ts
│   │
│   ├── types/                 # TypeScript types
│   │   ├── api.ts
│   │   ├── domain.ts
│   │   └── index.ts
│   │
│   └── middleware.ts          # Next.js middleware (auth)
│
├── tests/
│   ├── e2e/                   # Playwright E2E tests
│   ├── unit/                  # Vitest unit tests
│   └── fixtures/              # Test fixtures
│
├── .env.example
├── .env.local
├── .gitignore
├── components.json            # Shadcn/ui config
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── tailwind.config.ts
├── tsconfig.json
└── vitest.config.ts
```

### 4.5 Environment Configuration

```bash
# .env.example

# Application
NEXT_PUBLIC_APP_NAME="Quizizz Clone"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV=development

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
SUPABASE_JWT_SECRET="your-jwt-secret"

# Database (Prisma)
DATABASE_URL="postgresql://postgres:[password]@db.your-project.supabase.co:5432/postgres"

# Auth
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# Google OAuth (Supabase)
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email (Supabase + Resend)
SUPABASE_SMTP_HOST="smtp.resend.com"
SUPABASE_SMTP_PORT=587
SUPABASE_SMTP_USER="resend"
SUPABASE_SMTP_PASSWORD="your-resend-key"
SUPABASE_MAILER_FROM="noreply@yourdomain.com"

# Storage
NEXT_PUBLIC_SUPABASE_STORAGE_URL="https://your-project.supabase.co/storage/v1"
SUPABASE_STORAGE_BUCKET="quizizz-assets"

# Security
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="your-recaptcha-site-key"
RECAPTCHA_SECRET_KEY="your-recaptcha-secret-key"

# Rate Limiting (Vercel KV - optional)
KV_REST_API_URL="your-kv-url"
KV_REST_API_TOKEN="your-kv-token"

# Analytics (Vercel)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID="your-analytics-id"
```

### 4.6 Development Commands

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write \"**/*.{ts,tsx,mdx}\"",
    "format:check": "prettier --check \"**/*.{ts,tsx,mdx}\"",
    "typecheck": "tsc --noEmit",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:migrate:prod": "prisma migrate deploy",
    "db:seed": "tsx prisma/seed.ts",
    "db:studio": "prisma studio",
    "db:reset": "prisma migrate reset",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "prepare": "husky"
  }
}
```

---

## 5. APPLICATION ARCHITECTURE

### 5.1 Frontend Architecture

#### 5.1.1 Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│              COMPONENT HIERARCHY                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Page (Server Component)                                    │
│  │                                                           │
│  ├── Section (Server/Client)                                │
│  │   │                                                       │
│  │   ├── Card Component (Client)                            │
│  │   │   │                                                   │
│  │   │   ├── CardHeader (Client)                            │
│  │   │   ├── CardContent (Client)                           │
│  │   │   │   │                                               │
│  │   │   │   ├── Form Components (Client)                   │
│  │   │   │   │   ├── FormField                              │
│  │   │   │   │   ├── FormLabel                              │
│  │   │   │   │   ├── FormControl                            │
│  │   │   │   │   └── FormMessage                            │
│  │   │   │   │                                               │
│  │   │   │   └── UI Primitives (Client)                     │
│  │   │   │       ├── Button                                 │
│  │   │   │       ├── Input                                  │
│  │   │   │       ├── Select                                 │
│  │   │   │       └── ...                                    │
│  │   │   │                                                   │
│  │   │   └── CardFooter (Client)                            │
│  │   │                                                       │
│  │   └── Data Display Components (Client)                   │
│  │       ├── DataTable                                      │
│  │       ├── Chart                                          │
│  │       └── List                                           │
│  │                                                           │
│  └── Feature Components (Client)                            │
│      ├── QuizPlayer                                         │
│      ├── QuestionEditor                                     │
│      ├── Timer                                              │
│      └── AutoSaveIndicator                                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### 5.1.2 State Management Pattern

```typescript
// lib/api/client.ts - API Client with TanStack Query
import { QueryClient, useQuery, useMutation } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// hooks/use-courses.ts - Custom hook example
export function useCourses() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const res = await fetch('/api/v1/courses');
      if (!res.ok) throw new Error('Failed to fetch courses');
      return res.json();
    },
  });
}

export function useCreateCourse() {
  return useMutation({
    mutationFn: async (data: CreateCourseInput) => {
      const res = await fetch('/api/v1/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create course');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
}
```

#### 5.1.3 Form Validation Pattern

```typescript
// lib/validators/course.ts
import { z } from 'zod';

export const createCourseSchema = z.object({
  name: z.string().min(3, 'Nama course minimal 3 karakter'),
  description: z.string().max(500, 'Deskripsi maksimal 500 karakter').optional(),
  type: z.enum(['public', 'private']),
  accessCode: z.string().length(6, 'Access code harus 6 karakter').optional(),
});

export type CreateCourseInput = z.infer<typeof createCourseSchema>;

// components/forms/course-form.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCourseSchema, type CreateCourseInput } from '@/lib/validators/course';
import { useCreateCourse } from '@/hooks/use-courses';
import { FormField, FormLabel, FormControl, FormMessage } from '@/components/forms';
import { Button, Input } from '@/components/ui';

export function CourseForm() {
  const createCourse = useCreateCourse();
  
  const form = useForm<CreateCourseInput>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      name: '',
      description: '',
      type: 'public',
    },
  });

  const onSubmit = (data: CreateCourseInput) => {
    createCourse.mutate(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormField name="name">
        <FormLabel>Nama Course</FormLabel>
        <FormControl>
          <Input {...form.register('name')} />
        </FormControl>
        <FormMessage />
      </FormField>
      {/* ... other fields */}
      <Button type="submit" disabled={createCourse.isPending}>
        Create Course
      </Button>
    </form>
  );
}
```

### 5.2 Backend Architecture

#### 5.2.1 API Route Pattern

```typescript
// app/api/v1/courses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { courseService } from '@/services/course.service';
import { createCourseSchema, updateCourseSchema } from '@/lib/validators/course';
import { validateRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const courses = await courseService.getCoursesByTeacher(user.id);
    return NextResponse.json({ data: courses });
  } catch (error) {
    console.error('GET /api/v1/courses error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createCourseSchema.parse(body);

    const course = await courseService.createCourse(user.id, validatedData);
    return NextResponse.json({ data: course }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

#### 5.2.2 Service Layer Pattern

```typescript
// services/course.service.ts
import { prisma } from '@/lib/prisma';
import { courseRepository } from '@/repositories/course.repository';
import type { CreateCourseInput, UpdateCourseInput } from '@/lib/validators/course';

export const courseService = {
  async getCoursesByTeacher(teacherId: string) {
    return courseRepository.findByTeacherId(teacherId);
  },

  async getCourseById(courseId: string, userId: string) {
    const course = await courseRepository.findById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }
    
    // Check ownership or enrollment
    if (course.teacherId !== userId) {
      const enrollment = await courseRepository.getEnrollment(courseId, userId);
      if (!enrollment) {
        throw new Error('Access denied');
      }
    }
    
    return course;
  },

  async createCourse(teacherId: string, data: CreateCourseInput) {
    // Generate access code for private courses
    if (data.type === 'private' && !data.accessCode) {
      data.accessCode = await this.generateAccessCode();
    }

    return courseRepository.create({
      ...data,
      teacherId,
    });
  },

  async updateCourse(courseId: string, userId: string, data: UpdateCourseInput) {
    const course = await this.getCourseById(courseId, userId);
    if (course.teacherId !== userId) {
      throw new Error('Only course owner can update');
    }

    return courseRepository.update(courseId, data);
  },

  async deleteCourse(courseId: string, userId: string) {
    const course = await this.getCourseById(courseId, userId);
    if (course.teacherId !== userId) {
      throw new Error('Only course owner can delete');
    }

    // Soft delete
    return courseRepository.softDelete(courseId);
  },

  async generateAccessCode(): Promise<string> {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No I, O, 0, 1
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Check uniqueness
    const exists = await courseRepository.findByAccessCode(code);
    if (exists) {
      return this.generateAccessCode();
    }
    
    return code;
  },
};
```

#### 5.2.3 Repository Pattern

```typescript
// repositories/course.repository.ts
import { prisma } from '@/lib/prisma';
import type { Course, CourseEnrollment } from '@prisma/client';
import type { CreateCourseInput, UpdateCourseInput } from '@/lib/validators/course';

export const courseRepository = {
  async findById(id: string) {
    return prisma.course.findUnique({
      where: { id },
      include: {
        teacher: {
          select: { id: true, name: true, email: true },
        },
        assessments: {
          where: { status: 'published' },
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: { enrollments: true },
        },
      },
    });
  },

  async findByTeacherId(teacherId: string) {
    return prisma.course.findMany({
      where: { teacherId },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            assessments: true,
            enrollments: true,
          },
        },
      },
    });
  },

  async findByAccessCode(accessCode: string) {
    return prisma.course.findUnique({
      where: { accessCode: accessCode.toUpperCase() },
      where: { is_active: true },
    });
  },

  async create(data: CreateCourseInput & { teacherId: string }) {
    return prisma.course.create({
      data,
    });
  },

  async update(id: string, data: UpdateCourseInput) {
    return prisma.course.update({
      where: { id },
      data,
    });
  },

  async softDelete(id: string) {
    return prisma.course.update({
      where: { id },
      data: { isActive: false },
    });
  },

  async getEnrollment(courseId: string, userId: string) {
    return prisma.courseEnrollment.findUnique({
      where: {
        courseId_userId: {
          courseId,
          userId,
        },
      },
    });
  },

  async createEnrollment(courseId: string, userId: string) {
    return prisma.courseEnrollment.upsert({
      where: {
        courseId_userId: {
          courseId,
          userId,
        },
      },
      update: { status: 'active' },
      create: {
        courseId,
        userId,
        status: 'active',
      },
    });
  },
};
```

---

## 6. DATA ARCHITECTURE

### 6.1 Database Schema (High-Level ERD)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         HIGH-LEVEL ERD                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌───────────────┐       ┌───────────────┐       ┌───────────────┐         │
│  │    users      │       │    courses    │       │   assessments │         │
│  ├───────────────┤       ├───────────────┤       ├───────────────┤         │
│  │ id (UUID PK)  │       │ id (UUID PK)  │       │ id (UUID PK)  │         │
│  │ name          │◀──────│ teacher_id(FK)│       │ course_id(FK) │         │
│  │ email         │       │ name          │──────▶│ title         │         │
│  │ password_hash │       │ description   │       │ description   │         │
│  │ role          │       │ type          │       │ time_limit    │         │
│  │ created_at    │       │ access_code   │       │ status        │         │
│  └───────────────┘       │ is_active     │       │ created_at    │         │
│         │                └───────────────┘       └───────────────┘         │
│         │                       │                        │                 │
│         │  ┌────────────────────┘                        │                 │
│         │  │                                             │                 │
│         ▼  ▼                                             ▼                 │
│  ┌───────────────────┐                         ┌───────────────┐         │
│  │course_enrollments │                         │   questions   │         │
│  ├───────────────────┤                         ├───────────────┤         │
│  │ id (UUID PK)      │                         │ id (UUID PK)  │         │
│  │ course_id (FK)    │                         │ assessment_id │         │
│  │ user_id (FK)      │                         │ question_type │         │
│  │ enrolled_at       │                         │ question_text │         │
│  │ status            │                         │ settings(JSON)│         │
│  └───────────────────┘                         │ points        │         │
│         │                                      │ sort_order    │         │
│         │                                      └───────────────┘         │
│         │                                             │                   │
│         │                                             │                   │
│         │                                             ▼                   │
│         │                                      ┌───────────────┐         │
│         │                                      │question_options│         │
│         │                                      ├───────────────┤         │
│         │                                      │ id (UUID PK)  │         │
│         │                                      │ question_id   │         │
│         │                                      │ option_text   │         │
│         │                                      │ is_correct    │         │
│         │                                      │ extra_data(JSON)│       │
│         │                                      └───────────────┘         │
│         │                                                                 │
│  ┌───────────────────┐                         ┌───────────────┐         │
│  │student_responses  │◀────────────────────────│response_details│         │
│  ├───────────────────┤                         ├───────────────┤         │
│  │ id (UUID PK)      │                         │ id (UUID PK)  │         │
│  │ assessment_id(FK) │                         │ response_id   │         │
│  │ user_id (FK)      │                         │ question_id   │         │
│  │ started_at        │                         │ option_id     │         │
│  │ submitted_at      │                         │ answer_text   │         │
│  │ score             │                         │ is_correct    │         │
│  │ status            │                         │ points_earned │         │
│  └───────────────────┘                         └───────────────┘         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Schema Definition (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Enums
enum UserRole {
  teacher
  student_guest
}

enum CourseType {
  public
  private
}

enum EnrollmentStatus {
  active
  removed
  completed
}

enum AssessmentStatus {
  draft
  published
  archived
}

enum QuestionType {
  multiple_choice
  essay
  fill_blank
  match
  reorder
}

enum ResponseStatus {
  in_progress
  submitted
  abandoned
}

// User Model
model User {
  id                String    @id @default(uuid())
  name              String
  email             String    @unique
  passwordHash      String?
  role              UserRole  @default(student_guest)
  avatarUrl         String?
  isEmailVerified   Boolean   @default(false)
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt

  // Relations
  courses           Course[]
  enrollments       CourseEnrollment[]
  responses         StudentResponse[]
  gradedResponses   ResponseDetail[] @relation("GradedBy")

  @@index([email])
  @@index([role])
}

// Course Model
model Course {
  id            String      @id @default(uuid())
  teacherId     String
  name          String
  description   String?
  type          CourseType  @default(public)
  accessCode    String?     @unique
  coverImageUrl String?
  isActive      Boolean     @default(true)
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt

  // Relations
  teacher       User              @relation(fields: [teacherId], references: [id])
  enrollments   CourseEnrollment[]
  assessments   Assessment[]

  @@index([teacherId])
  @@index([type])
  @@index([accessCode])
}

// Course Enrollment Model
model CourseEnrollment {
  id          String           @id @default(uuid())
  courseId    String
  userId      String
  enrolledAt  DateTime         @default(now())
  status      EnrollmentStatus @default(active)

  // Relations
  course Course @relation(fields: [courseId], references: [id], onDelete: Cascade)
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([courseId, userId])
  @@index([courseId])
  @@index([userId])
}

// Assessment Model
model Assessment {
  id              String           @id @default(uuid())
  courseId        String
  title           String
  description     String?
  timeLimit       Int?
  openDate        DateTime?
  closeDate       DateTime?
  status          AssessmentStatus @default(draft)
  shuffleQuestions Boolean         @default(false)
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt

  // Relations
  course    Course            @relation(fields: [courseId], references: [id], onDelete: Cascade)
  questions Question[]
  responses StudentResponse[]

  @@index([courseId])
  @@index([status])
}

// Question Model
model Question {
  id            String       @id @default(uuid())
  assessmentId  String
  questionType  QuestionType
  questionText  String
  settings      Json?
  points        Int          @default(10)
  sortOrder     Int
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt

  // Relations
  assessment Assessment        @relation(fields: [assessmentId], references: [id], onDelete: Cascade)
  options    QuestionOption[]
  details    ResponseDetail[]

  @@index([assessmentId])
  @@index([questionType])
}

// Question Option Model
model QuestionOption {
  id          String   @id @default(uuid())
  questionId  String
  optionText  String
  isCorrect   Boolean  @default(false)
  sortOrder   Int
  extraData   Json?
  createdAt   DateTime @default(now())

  // Relations
  question Question       @relation(fields: [questionId], references: [id], onDelete: Cascade)
  details  ResponseDetail[]

  @@index([questionId])
}

// Student Response Model
model StudentResponse {
  id              String       @id @default(uuid())
  assessmentId    String
  userId          String
  startedAt       DateTime     @default(now())
  submittedAt     DateTime?
  score           Decimal?     @db.Decimal(5, 2)
  maxScore        Int
  status          ResponseStatus @default(in_progress)
  timeSpentSeconds Int?

  // Relations
  assessment Assessment     @relation(fields: [assessmentId], references: [id], onDelete: Cascade)
  user       User           @relation(fields: [userId], references: [id], onDelete: Cascade)
  details    ResponseDetail[]

  @@unique([assessmentId, userId])
  @@index([assessmentId])
  @@index([userId])
  @@index([status])
}

// Response Detail Model
model ResponseDetail {
  id            String   @id @default(uuid())
  responseId    String
  questionId    String
  optionId      String?
  answerText    String?
  answerOrder   Json?
  isCorrect     Boolean?
  pointsEarned  Decimal  @default(0) @db.Decimal(5, 2)
  gradedBy      String?
  gradedAt      DateTime?
  createdAt     DateTime @default(now())

  // Relations
  response  StudentResponse @relation(fields: [responseId], references: [id], onDelete: Cascade)
  question  Question        @relation(fields: [questionId], references: [id], onDelete: Cascade)
  option    QuestionOption? @relation(fields: [optionId], references: [id])
  gradedBy  User?           @relation("GradedBy", fields: [gradedBy], references: [id])

  @@index([responseId])
  @@index([questionId])
}
```

### 6.3 Caching Strategy

| Data Type | Cache Location | TTL | Invalidation |
|-----------|----------------|-----|--------------|
| Course List | TanStack Query | 5 minutes | On course create/update/delete |
| Assessment Detail | TanStack Query | 2 minutes | On assessment update |
| Question List | TanStack Query | 5 minutes | On question create/update/delete |
| User Session | Supabase Auth (JWT) | 1 hour | On logout |
| Guest Session | LocalStorage + DB | Session | On quiz submit |

---

## 7. INTEGRATION ARCHITECTURE

### 7.1 External Integrations

```
┌─────────────────────────────────────────────────────────────┐
│              INTEGRATION ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────┐                                        │
│  │  Google OAuth   │                                        │
│  │  (Supabase)     │                                        │
│  │                 │                                        │
│  │  • Teacher Auth │                                        │
│  │  • JWT Tokens   │                                        │
│  └────────┬────────┘                                        │
│           │                                                  │
│           ▼                                                  │
│  ┌─────────────────┐         ┌─────────────────┐            │
│  │   Supabase      │         │   Resend        │            │
│  │   Auth          │────────▶│   Email         │            │
│  │                 │         │                 │            │
│  │  • Email/Pass   │         │  • Verification │            │
│  │  • Google OAuth │         │  • Password Reset│           │
│  └────────┬────────┘         └─────────────────┘            │
│           │                                                  │
│           ▼                                                  │
│  ┌─────────────────┐         ┌─────────────────┐            │
│  │   Supabase      │         │   reCAPTCHA     │            │
│  │   Storage       │         │                 │            │
│  │                 │         │  • Bot Protect  │            │
│  │  • Avatars      │         │  • Rate Limit   │            │
│  │  • Covers       │         └─────────────────┘            │
│  │  • Assets       │                                        │
│  └─────────────────┘                                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 7.2 API Endpoints Structure

```
Base: /api/v1

Authentication:
  POST   /auth/register          - Teacher registration
  POST   /auth/login             - Teacher login
  POST   /auth/logout            - Logout
  POST   /auth/forgot-password   - Request password reset
  POST   /auth/reset-password    - Reset password
  GET    /auth/me                - Get current user

Courses:
  GET    /courses                - List courses (teacher)
  POST   /courses                - Create course
  GET    /courses/:id            - Get course detail
  PUT    /courses/:id            - Update course
  DELETE /courses/:id            - Delete course (soft)
  GET    /courses/:id/students   - Get enrolled students
  POST   /courses/:id/join       - Join course (guest)

Assessments:
  GET    /assessments            - List assessments
  POST   /assessments            - Create assessment
  GET    /assessments/:id        - Get assessment detail
  PUT    /assessments/:id        - Update assessment
  DELETE /assessments/:id        - Delete assessment
  POST   /assessments/:id/publish - Publish assessment

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
  POST   /reports/grade          - Grade essay (manual)
  GET    /reports/export/:id      - Export scores (CSV)

Admin:
  GET    /admin/users            - List all users
  GET    /admin/courses          - List all courses
  GET    /admin/analytics        - System analytics
```

---

## 8. INFRASTRUCTURE ARCHITECTURE

### 8.1 Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│              DEPLOYMENT ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                         INTERNET                             │
│                           │                                  │
│                           ▼                                  │
│              ┌─────────────────────┐                        │
│              │   Vercel Edge       │                        │
│              │   Network (CDN)     │                        │
│              │                     │                        │
│              │  • SSL Termination  │                        │
│              │  • Edge Caching     │                        │
│              │  • DDoS Protection  │                        │
│              └──────────┬──────────┘                        │
│                         │                                    │
│         ┌───────────────┼───────────────┐                   │
│         │               │               │                   │
│         ▼               ▼               ▼                   │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │ Edge       │  │ Edge       │  │ Edge       │            │
│  │ Function   │  │ Function   │  │ Function   │            │
│  │ (US)       │  │ (EU)       │  │ (ASIA)     │            │
│  │            │  │            │  │            │            │
│  │ Next.js    │  │ Next.js    │  │ Next.js    │            │
│  │ SSR        │  │ SSR        │  │ SSR        │            │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘            │
│        │               │               │                    │
│        └───────────────┼───────────────┘                    │
│                        │                                    │
│                        ▼                                    │
│              ┌─────────────────────┐                        │
│              │   Supabase Cloud    │                        │
│              │                     │                        │
│              │  • PostgreSQL       │                        │
│              │  • Auth             │                        │
│              │  • Storage          │                        │
│              │  • Realtime         │                        │
│              └─────────────────────┘                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 8.2 Environment Tiers

| Environment | URL | Purpose | Data |
|-------------|-----|---------|------|
| Development | localhost:3000 | Local development | Local Supabase |
| Staging | staging-*.vercel.app | Testing, UAT | Supabase staging project |
| Production | quizizz.yourdomain.com | Production | Supabase production project |

---

## 9. SECURITY ARCHITECTURE

### 9.1 Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│              AUTHENTICATION FLOW                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  TEACHER REGISTRATION:                                       │
│  ┌────────┐    ┌─────────┐    ┌──────────┐    ┌─────────┐  │
│  │  Fill  │───▶│ Submit  │───▶│  Email   │───▶│ Account │  │
│  │  Form  │    │  to API │    │ Verify   │    │ Active  │  │
│  └────────┘    └─────────┘    └──────────┘    └─────────┘  │
│                                                              │
│  TEACHER LOGIN:                                              │
│  ┌────────┐    ┌─────────┐    ┌──────────┐    ┌─────────┐  │
│  │  Enter │───▶│ Validate│───▶│  Create  │───▶│Redirect │  │
│  │ Creds  │    │  & JWT  │    │  Session │    │Dashboard│  │
│  └────────┘    └─────────┘    └──────────┘    └─────────┘  │
│                                                              │
│  GUEST STUDENT JOIN:                                         │
│  ┌────────┐    ┌─────────┐    ┌──────────┐    ┌─────────┐  │
│  │ Access │───▶│  Input  │───▶│Auto-create│───▶│  Quiz   │  │
│  │  Code  │    │  Name   │    │  Guest    │    │ Session │  │
│  └────────┘    └─────────┘    └──────────┘    └─────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 9.2 Security Measures

| Aspect | Implementation |
|--------|----------------|
| **Password Hashing** | bcrypt (via Supabase Auth) |
| **Session Management** | JWT tokens, HTTP-only cookies |
| **API Security** | Zod validation, rate limiting |
| **Database Security** | Row Level Security (RLS) |
| **XSS Prevention** | React escaping, CSP headers |
| **CSRF Protection** | SameSite cookies, CSRF tokens |
| **SQL Injection** | Prisma parameterized queries |
| **Rate Limiting** | Vercel KV or custom middleware |

### 9.3 Row Level Security (RLS) Policies

```sql
-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_responses ENABLE ROW LEVEL SECURITY;

-- Courses: Teachers can see their own courses
CREATE POLICY "Teachers can view own courses"
  ON courses FOR SELECT
  USING (auth.uid()::text = teacher_id);

-- Courses: Teachers can insert their own courses
CREATE POLICY "Teachers can insert own courses"
  ON courses FOR INSERT
  WITH CHECK (auth.uid()::text = teacher_id);

-- Assessments: Visible if course is accessible
CREATE POLICY "Assessments visible to enrolled"
  ON assessments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = assessments.course_id
      AND (
        courses.type = 'public'
        OR courses.teacher_id = auth.uid()::text
        OR EXISTS (
          SELECT 1 FROM course_enrollments
          WHERE course_enrollments.course_id = courses.id
          AND course_enrollments.user_id = auth.uid()::text
        )
      )
    )
  );

-- Student Responses: Users can see their own responses
CREATE POLICY "Users can view own responses"
  ON student_responses FOR SELECT
  USING (auth.uid()::text = user_id);
```

---

## 10. DEVOPS & CI/CD

### 10.1 GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm lint

  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm typecheck

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm test
      - run: pnpm test:e2e

  build:
    runs-on: ubuntu-latest
    needs: [lint, typecheck, test]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm db:generate
      - run: pnpm build

  deploy:
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### 10.2 Deployment Pipeline

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Push to   │     │   GitHub    │     │   Vercel    │
│   GitHub    │────▶│   Actions   │────▶│   Deploy    │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       │                   │                   │
       ▼                   ▼                   ▼
  ┌─────────┐        ┌─────────┐        ┌─────────┐
  │ Lint    │        │ Build   │        │ Preview │
  │ Typecheck│       │ Test    │        │ Deploy  │
  │ Test    │        │         │        │         │
  └─────────┘        └─────────┘        └─────────┘
```

---

## 11. MONITORING & OBSERVABILITY

### 11.1 Monitoring Stack

| Tool | Purpose | Metrics |
|------|---------|---------|
| **Vercel Analytics** | Performance, Web Vitals | LCP, FID, CLS |
| **Vercel Logs** | Application logs | Errors, warnings |
| **Supabase Logs** | Database logs | Queries, errors |
| **Sentry** (optional) | Error tracking | Exceptions, breadcrumbs |

### 11.2 Key Metrics

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Page Load Time | < 3s | > 5s |
| API Response Time (p95) | < 500ms | > 1000ms |
| Error Rate | < 0.1% | > 1% |
| Uptime | 99.5% | < 99% |

---

## 12. DEVELOPMENT STANDARDS

### 12.1 Code Organization Principles

**DRY (Don't Repeat Yourself):**
- Extract reusable components for UI patterns used 2+ times
- Create custom hooks for shared logic
- Use utility functions for common operations

**Single Responsibility:**
- Each component does one thing
- Each service handles one domain
- Each file has one purpose

**Composition Over Inheritance:**
- Build components from smaller primitives
- Use React composition patterns
- Avoid deep component hierarchies

### 12.2 Naming Conventions

```typescript
// Files & Folders
- kebab-case for files: user-profile.tsx, course-form.tsx
- PascalCase for components: UserProfile, CourseForm
- camelCase for utilities: formatDate.ts, cn.ts

// Variables & Functions
- camelCase for variables: const userName = 'John'
- PascalCase for types: interface UserProps {}
- SCREAMING_SNAKE_CASE for constants: const MAX_SIZE = 100

// API Routes
- /api/v1/{resource}/{action}/{id}
- GET /api/v1/courses - List courses
- POST /api/v1/courses - Create course
- GET /api/v1/courses/:id - Get course
- PUT /api/v1/courses/:id - Update course
- DELETE /api/v1/courses/:id - Delete course
```

### 12.3 Code Review Checklist

- [ ] TypeScript types are properly defined
- [ ] Zod validation for all inputs
- [ ] Error handling implemented
- [ ] Loading states handled
- [ ] Responsive design tested
- [ ] Accessibility (a11y) considered
- [ ] No console.log in production code
- [ ] Tests added/updated

---

## 13. TECHNICAL DECISIONS LOG

| Decision | Date | Rationale | Alternatives Considered |
|----------|------|-----------|------------------------|
| Next.js 15 App Router | Feb 2026 | Server Components, better performance | Pages Router, Remix |
| Supabase | Feb 2026 | All-in-one: DB, Auth, Storage | Firebase, Self-hosted PostgreSQL |
| Prisma ORM | Feb 2026 | Type safety, excellent DX | Drizzle, raw SQL |
| TanStack Query | Feb 2026 | Server state management, caching | SWR, Redux |
| Shadcn/ui | Feb 2026 | Customizable, accessible, copy-paste | Material UI, Chakra UI |
| Zod | Feb 2026 | Type inference, client+server validation | Yup, Joi |
| Vercel Hosting | Feb 2026 | Next.js optimized, edge network | AWS, GCP, Railway |

---

## 14. TECHNICAL RISKS & MITIGATIONS

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Supabase downtime | Low | High | Backup exports, migration plan |
| Vercel rate limits | Medium | Medium | Caching strategy, edge functions |
| Database performance | Medium | High | Indexes, query optimization |
| Security vulnerabilities | Medium | Critical | Regular audits, Dependabot |
| Team knowledge gap | Medium | Medium | Documentation, pair programming |
| Scope creep | High | Medium | Strict change control, MVP focus |

---

## APPENDIX

### A. Quick Start Guide

```bash
# 1. Clone repository
git clone https://github.com/your-org/quizizz-clone.git
cd quizizz-clone

# 2. Install dependencies
pnpm install

# 3. Setup environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 4. Setup database
pnpm db:generate
pnpm db:push
pnpm db:seed

# 5. Run development server
pnpm dev

# 6. Open browser
# http://localhost:3000
```

### B. Abbreviations

| Abbr | Full Form |
|------|-----------|
| API | Application Programming Interface |
| Auth | Authentication |
| CDN | Content Delivery Network |
| CI/CD | Continuous Integration/Continuous Deployment |
| DX | Developer Experience |
| E2E | End-to-End |
| JWT | JSON Web Token |
| ORM | Object-Relational Mapping |
| RLS | Row Level Security |
| RSC | React Server Components |
| SSR | Server-Side Rendering |
| UUID | Universally Unique Identifier |

---

*Dokumen ini adalah bagian dari Project Documentation Quizizz Clone (Lite Version)*  
*Lokasi: `/docs/project/03-implementation-and-architecture.md`*  
*LearnWeb LMS Project © 2026*
