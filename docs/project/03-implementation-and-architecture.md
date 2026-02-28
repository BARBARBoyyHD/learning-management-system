# IMPLEMENTATION & TECHNICAL ARCHITECTURE
## Quizizz Clone (Lite Version)
### LearnWeb LMS Project

---

| Attribute | Value |
|-----------|-------|
| Document ID | DOC-QCL-ITA-001 |
| Version | 1.1 |
| Status | Draft |
| Author | Solution Architecture Team |
| Created | February 2026 |
| Last Updated | 28 February 2026 |
| Reviewed By | VP IT, Tech Lead, Security Team |
| Approved By | Technical Steering Committee |

---

## Changelog

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 25 February 2026 | SA Team | Initial version |
| 1.1 | 28 February 2026 | Solution Architecture Team | Updated package manager to npm, revised database schema per ERD guide |
| 1.2 | 28 February 2026 | Solution Architecture Team | Changed primary keys from auto-increment integers to UUIDs for Supabase compatibility |

---

## TABLE OF CONTENTS

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

### 1.1 Document Purpose

This Implementation & Technical Architecture (ITA) document defines the technical architecture, technology stack, and development standards for the Quizizz Clone (Lite Version) project. This document serves as the primary guide for the development team in building a system that is scalable, secure, maintainable, and DRY (Don't Repeat Yourself).

### 1.2 Architecture Principles

| Principle | Description | Rationale |
|-----------|-------------|-----------|
| **Component-Driven** | All UI built from reusable composable components | UI consistency, maintainability, development speed |
| **Type Safety First** | TypeScript strict mode across entire codebase | Prevent runtime errors, better DX, self-documenting code |
| **Server Components Default** | Next.js App Router with Server Components as default | Performance, SEO, reduced bundle size |
| **Single Source of Truth** | PostgreSQL as primary database | Data consistency, reduced complexity |
| **API Versioning** | All API endpoints follow pattern `/api/v1/{context}/{resource}/{action}` | Future-proof, clear API structure |
| **Validation Everywhere** | Zod schema validation on client and server | Type safety end-to-end, consistent error handling |

### 1.3 Technology Stack Summary

```
┌─────────────────────────────────────────────────────────────┐
│                    TECHNOLOGY STACK                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  FRONTEND          │  BACKEND           │  DATA             │
│  ─────────────     │  ─────────────     │  ─────────────    │
│  • Next.js 15      │  • Next.js API     │  • PostgreSQL     │
│  • TypeScript 5    │    Routes          │  • Prisma ORM     │
│  • Tailwind CSS 4  │  • Server Actions  │                   │
│  • Shadcn/ui       │  • Zod Validation  │                   │
│  • TanStack Query  │  • Fetch API       │                   │
│  • React Hook Form │  • Edge Runtime    │                   │
│  • Zod             │                    │                   │
│  • Lucide React    │                    │                   │
│                                                              │
│  INFRASTRUCTURE    │  DEVOPS            │  INTEGRATION      │
│  ─────────────     │  ─────────────     │  ─────────────    │
│  • Vercel          │  • GitHub Actions  │  • Google OAuth   │
│  • Edge Network    │  • ESLint          │  • Email (SMTP)   │
│  • CDN             │  • Prettier        │  • reCAPTCHA      │
│  • Blob Storage    │  • Husky           │                   │
│  • PostgreSQL      │  • Playwright      │                   │
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
│  │  │         (Prisma ORM + PostgreSQL Client)              │            │    │
│  │  └───────────────────────────────────────────────────────┘            │    │
│  └──────────────────────────────────────────────────────────────────────┘    │
│                              │                                                │
│  ┌───────────────────────────┼──────────────────────────────────────────┐    │
│  │                      DATA LAYER                                        │    │
│  │  ┌──────────────────┐  ┌────────────┐                                │    │
│  │  │   PostgreSQL     │  │   Object   │                                │    │
│  │  │   • Tables       │  │   Storage  │                                │    │
│  │  │   • Auth         │  │   • Avatars│                                │    │
│  │  │   • Sessions     │  │   • Covers │                                │    │
│  │  │   • JWT          │  │   • Assets │                                │    │
│  │  └──────────────────┘  └────────────┘                                │    │
│  └──────────────────────────────────────────────────────────────────────┘    │
│                              │                                                │
│  ┌───────────────────────────┼──────────────────────────────────────────┐    │
│  │                   INTEGRATION LAYER                                    │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                │    │
│  │  │ Google OAuth │  │ SMTP Email   │  │ reCAPTCHA    │                │    │
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
│   │   │         • Fetch Wrapper                 │     │    │
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
│   │   │ Zod     │    │ Postgres│    │  Types  │      │    │
│   │   │Validation│    │  Client │    │(Prisma) │      │    │
│   │   └─────────┘    └─────────┘    └─────────┘      │    │
│   └────────────────────────────────────────────────────┘    │
│                         │                                    │
│                         ▼                                    │
│   ┌────────────────────────────────────────────────────┐    │
│   │                 DATA STORES                         │    │
│   │                                                     │    │
│   │   PostgreSQL           │  Object Storage           │    │
│   │   • 6 core tables      │  • User avatars           │    │
│   │   • Indexes optimized  │  • Course covers          │    │
│   │                        │  • Question assets        │    │
│   └────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 2.3 Module Dependencies

| Module | Depends On | Consumed By |
|--------|------------|-------------|
| Auth Module | Users Table, Sessions | All Modules |
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
| **Authentication** | Custom JWT | Latest | Email/password + Google OAuth, JWT sessions |
| **Database Client** | Prisma Client | 6.x | PostgreSQL with type-safe queries |
| **API Documentation** | OpenAPI (via types) | 3.0 | Auto-generated from TypeScript types |
| **Logging** | Pino (via Vercel) | - | Structured logging, Vercel Analytics integration |
| **Testing** | Playwright + Vitest | Latest | E2E + Unit testing |

### 3.3 Database Stack

| Component | Technology | Version | Use Case |
|-----------|------------|---------|----------|
| **Primary Database** | PostgreSQL | 15.x | All application data, 6 core tables |
| **Auth** | Custom JWT + Sessions | Latest | User authentication, sessions, OAuth |
| **Object Storage** | Vercel Blob / AWS S3 | Latest | User avatars, course covers, question assets |
| **ORM** | Prisma | 6.x | Type-safe database access |

### 3.4 Infrastructure Stack

| Component | Technology | Version | Use Case |
|-----------|------------|---------|----------|
| **Hosting** | Vercel | Latest | Next.js optimized hosting, edge network |
| **Database Hosting** | PostgreSQL (Managed) | 15.x | Managed PostgreSQL |
| **CDN** | Vercel Edge Network | - | Global content delivery, caching |
| **DNS** | Vercel DNS | - | Domain management, SSL certificates |
| **Secret Management** | Vercel Environment Variables | - | Secure env var management |

### 3.5 DevOps Stack

| Component | Technology | Version | Use Case |
|-----------|------------|---------|----------|
| **CI/CD** | GitHub Actions | Latest | Automated testing, deployment |
| **Version Control** | Git + GitHub | Latest | Source control, PR reviews |
| **Package Manager** | npm | 10.x | Standard Node.js package manager |
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
│  │  │         PostgreSQL Database                  │     │   │
│  │  │  • Local or Cloud                           │     │   │
│  │  │  • Prisma ORM                               │     │   │
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
| npm | 10.x | Package manager |
| Git | 2.x | Version control |
| VS Code | Latest | Recommended IDE |

### 4.3 IDE Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "prisma.prisma"
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
│   │   │   ├── quizzes/
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
│   │   │       ├── quizzes/
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
│   │   ├── quizzes/           # Quiz-specific components
│   │   │   ├── quiz-card.tsx
│   │   │   ├── quiz-form.tsx
│   │   │   └── ...
│   │   │
│   │   ├── questions/         # Question components
│   │   │   ├── question-editor.tsx
│   │   │   ├── multiple-choice.tsx
│   │   │   ├── match.tsx
│   │   │   ├── reorder.tsx
│   │   │   ├── drag-drop.tsx
│   │   │   ├── hotspot.tsx
│   │   │   └── ...
│   │   │
│   │   └── forms/             # Reusable form components
│   │       ├── form-field.tsx
│   │       ├── form-label.tsx
│   │       └── ...
│   │
│   ├── lib/
│   │   ├── prisma/
│   │   │   ├── client.ts      # Prisma client singleton
│   │   │   └── index.ts       # Re-exports
│   │   │
│   │   ├── validators/        # Zod schemas
│   │   │   ├── auth.ts
│   │   │   ├── quiz.ts
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
│   │   ├── use-quizzes.ts
│   │   ├── use-questions.ts
│   │   ├── use-quiz.ts
│   │   └── index.ts
│   │
│   ├── services/              # Business logic layer
│   │   ├── auth.service.ts
│   │   ├── quiz.service.ts
│   │   ├── question.service.ts
│   │   ├── grading.service.ts
│   │   └── reporting.service.ts
│   │
│   ├── repositories/          # Data access layer
│   │   ├── user.repository.ts
│   │   ├── quiz.repository.ts
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
├── package-lock.json
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

# Database (Prisma)
DATABASE_URL="postgresql://postgres:[password]@localhost:5432/quizizz_clone"

# Auth
JWT_SECRET="your-jwt-secret-key"
NEXT_PUBLIC_SESSION_EXPIRY="24h"

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email (SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
MAIL_FROM="noreply@quizizz.local"

# Storage (Vercel Blob or AWS S3)
BLOB_READ_WRITE_TOKEN="your-blob-token"
# OR
AWS_ACCESS_KEY_ID="your-aws-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret"
AWS_BUCKET_NAME="quizizz-assets"
AWS_REGION="us-east-1"

# Security
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="your-recaptcha-site-key"
RECAPTCHA_SECRET_KEY="your-recaptcha-secret-key"

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

// hooks/use-quizzes.ts - Custom hook example
export function useQuizzes() {
  return useQuery({
    queryKey: ['quizzes'],
    queryFn: async () => {
      const res = await fetch('/api/v1/quizzes');
      if (!res.ok) throw new Error('Failed to fetch quizzes');
      return res.json();
    },
  });
}

export function useCreateQuiz() {
  return useMutation({
    mutationFn: async (data: CreateQuizInput) => {
      const res = await fetch('/api/v1/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create quiz');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
    },
  });
}
```

#### 5.1.3 Form Validation Pattern

```typescript
// lib/validators/quiz.ts
import { z } from 'zod';

export const createQuizSchema = z.object({
  title: z.string().min(3, 'Quiz title must be at least 3 characters'),
  description: z.string().max(500, 'Description max 500 characters').optional(),
  isPublic: z.boolean().default(true),
});

export type CreateQuizInput = z.infer<typeof createQuizSchema>;

// components/forms/quiz-form.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createQuizSchema, type CreateQuizInput } from '@/lib/validators/quiz';
import { useCreateQuiz } from '@/hooks/use-quizzes';
import { FormField, FormLabel, FormControl, FormMessage } from '@/components/forms';
import { Button, Input } from '@/components/ui';

export function QuizForm() {
  const createQuiz = useCreateQuiz();

  const form = useForm<CreateQuizInput>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: {
      title: '',
      description: '',
      isPublic: true,
    },
  });

  const onSubmit = (data: CreateQuizInput) => {
    createQuiz.mutate(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormField name="title">
        <FormLabel>Quiz Title</FormLabel>
        <FormControl>
          <Input {...form.register('title')} />
        </FormControl>
        <FormMessage />
      </FormField>
      {/* ... other fields */}
      <Button type="submit" disabled={createQuiz.isPending}>
        Create Quiz
      </Button>
    </form>
  );
}
```

### 5.2 Backend Architecture

#### 5.2.1 API Route Pattern

```typescript
// app/api/v1/quizzes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { quizService } from '@/services/quiz.service';
import { createQuizSchema, updateQuizSchema } from '@/lib/validators/quiz';
import { validateRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const quizzes = await quizService.getQuizzesByTeacher(user.id);
    return NextResponse.json({ data: quizzes });
  } catch (error) {
    console.error('GET /api/v1/quizzes error:', error);
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
    const validatedData = createQuizSchema.parse(body);

    const quiz = await quizService.createQuiz(user.id, validatedData);
    return NextResponse.json({ data: quiz }, { status: 201 });
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
// services/quiz.service.ts
import { prisma } from '@/lib/prisma';
import { quizRepository } from '@/repositories/quiz.repository';
import type { CreateQuizInput, UpdateQuizInput } from '@/lib/validators/quiz';

export const quizService = {
  async getQuizzesByTeacher(teacherId: string) {
    return quizRepository.findByTeacherId(teacherId);
  },

  async getQuizById(quizId: string, userId: string) {
    const quiz = await quizRepository.findById(quizId);
    if (!quiz) {
      throw new Error('Quiz not found');
    }

    // Check ownership or enrollment
    if (quiz.teacherId !== userId) {
      const enrollment = await quizRepository.getEnrollment(quizId, userId);
      if (!enrollment) {
        throw new Error('Access denied');
      }
    }

    return quiz;
  },

  async createQuiz(teacherId: string, data: CreateQuizInput) {
    return quizRepository.create({
      ...data,
      teacherId,
    });
  },

  async updateQuiz(quizId: string, userId: string, data: UpdateQuizInput) {
    const quiz = await this.getQuizById(quizId, userId);
    if (quiz.teacherId !== userId) {
      throw new Error('Only quiz owner can update');
    }

    return quizRepository.update(quizId, data);
  },

  async deleteQuiz(quizId: string, userId: string) {
    const quiz = await this.getQuizById(quizId, userId);
    if (quiz.teacherId !== userId) {
      throw new Error('Only quiz owner can delete');
    }

    return quizRepository.delete(quizId);
  },
};
```

#### 5.2.3 Repository Pattern

```typescript
// repositories/quiz.repository.ts
import { prisma } from '@/lib/prisma';
import type { Quiz, StudentResponse } from '@prisma/client';
import type { CreateQuizInput, UpdateQuizInput } from '@/lib/validators/quiz';

export const quizRepository = {
  async findById(id: string) {
    return prisma.quiz.findUnique({
      where: { id },
      include: {
        teacher: {
          select: { id: true, name: true, email: true },
        },
        questions: {
          orderBy: { orderIndex: 'asc' },
        },
        _count: {
          select: { responses: true },
        },
      },
    });
  },

  async findByTeacherId(teacherId: string) {
    return prisma.quiz.findMany({
      where: { teacherId },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            questions: true,
            responses: true,
          },
        },
      },
    });
  },

  async create(data: CreateQuizInput & { teacherId: string }) {
    return prisma.quiz.create({
      data,
    });
  },

  async update(id: string, data: UpdateQuizInput) {
    return prisma.quiz.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return prisma.quiz.delete({
      where: { id },
    });
  },

  async getEnrollment(quizId: string, userId: string) {
    return prisma.studentResponse.findFirst({
      where: {
        quizId,
        userId,
      },
    });
  },
};
```

---

## 6. DATA ARCHITECTURE

### 6.1 Database Schema (ERD)

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

// User Model
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

// Quiz Model
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

// Question Model
model Question {
  id           String     @id @default(uuid())
  quizId       String
  questionType String     // 'multiple_choice', 'match', 'reorder', 'drag_drop', 'hotspot'
  questionText String
  mediaUrl     String?
  settings     Json?      // Metadata for additional settings (e.g., hotspot coordinates, timer duration)
  points       Int        @default(10)
  orderIndex   Int

  // Relations
  quiz    Quiz             @relation(fields: [quizId], references: [id], onDelete: Cascade)
  options QuestionOption[]
  details ResponseDetail[]

  @@index([quizId])
  @@index([questionType])
}

// Question Option Model
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

// Student Response Model
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

// Response Detail Model
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

### 6.3 Question Type Settings Examples

```typescript
// Multiple Choice Settings
{
  "shuffle": true,
  "multipleAnswers": false
}

// Match Settings
{
  "shuffleLeft": true,
  "pairs": [
    { "left": "Apple", "right": "Buah" },
    { "left": "Carrot", "right": "Sayur" }
  ]
}

// Reorder Settings
{
  "correctOrder": ["first", "second", "third", "fourth"]
}

// Drag & Drop (Categorize) Settings
{
  "categories": ["Fruit", "Vegetable", "Animal"],
  "items": [
    { "id": "1", "text": "Apple", "category": "Fruit" },
    { "id": "2", "text": "Carrot", "category": "Vegetable" }
  ]
}

// Hotspot Settings
{
  "imageUrl": "/images/hotspot-quiz.png",
  "correctZones": [
    { "x": 100, "y": 150, "radius": 50 },
    { "x": 300, "y": 200, "radius": 40 }
  ],
  "tolerance": 10
}
```

### 6.4 Caching Strategy

| Data Type | Cache Location | TTL | Invalidation |
|-----------|----------------|-----|--------------|
| Quiz List | TanStack Query | 5 minutes | On quiz create/update/delete |
| Question Detail | TanStack Query | 2 minutes | On question update |
| User Session | JWT Cookie | 24 hours | On logout |
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
│  │                 │                                        │
│  │  • Teacher Auth │                                        │
│  │  • JWT Tokens   │                                        │
│  └────────┬────────┘                                        │
│           │                                                  │
│           ▼                                                  │
│  ┌─────────────────┐         ┌─────────────────┐            │
│  │   Application   │         │   SMTP Server   │            │
│  │   (Next.js)     │────────▶│                 │            │
│  │                 │         │  • Verification │            │
│  │  • Auth         │         │  • Password Reset│           │
│  └────────┬────────┘         └─────────────────┘            │
│           │                                                  │
│           ▼                                                  │
│  ┌─────────────────┐         ┌─────────────────┐            │
│  │   Object        │         │   reCAPTCHA     │            │
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

Quizzes:
  GET    /quizzes                - List quizzes (teacher)
  POST   /quizzes                - Create quiz
  GET    /quizzes/:id            - Get quiz detail
  PUT    /quizzes/:id            - Update quiz
  DELETE /quizzes/:id            - Delete quiz
  GET    /quizzes/:id/join       - Join quiz (guest with access code)

Questions:
  GET    /questions              - List questions (by quiz)
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
  GET    /reports/quizzes/:id    - Get quiz report
  GET    /reports/students/:id   - Get student report
  POST   /reports/grade          - Grade manually
  GET    /reports/export/:id     - Export scores (CSV)

Admin:
  GET    /admin/users            - List all users
  GET    /admin/quizzes          - List all quizzes
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
│              │   PostgreSQL        │                        │
│              │   (Managed)         │                        │
│              │                     │                        │
│              │  • Database         │                        │
│              │  • Sessions         │                        │
│              └─────────────────────┘                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 8.2 Environment Tiers

| Environment | URL | Purpose | Data |
|-------------|-----|---------|------|
| Development | localhost:3000 | Local development | Local PostgreSQL |
| Staging | staging-*.vercel.app | Testing, UAT | Staging PostgreSQL |
| Production | quizizz.yourdomain.com | Production | Production PostgreSQL |

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
| **Password Hashing** | bcrypt (cost factor 10+) |
| **Session Management** | JWT tokens, HTTP-only cookies |
| **API Security** | Zod validation, rate limiting |
| **Database Security** | Parameterized queries (Prisma) |
| **XSS Prevention** | React escaping, CSP headers |
| **CSRF Protection** | SameSite cookies, CSRF tokens |
| **SQL Injection** | Prisma parameterized queries |
| **Rate Limiting** | Custom middleware or Vercel KV |

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
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint

  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run typecheck

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run test
      - run: npm run test:e2e

  build:
    runs-on: ubuntu-latest
    needs: [lint, typecheck, test]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run db:generate
      - run: npm run build

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
| **Database Logs** | PostgreSQL logs | Queries, errors |
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
- kebab-case for files: user-profile.tsx, quiz-form.tsx
- PascalCase for components: UserProfile, QuizForm
- camelCase for utilities: formatDate.ts, cn.ts

// Variables & Functions
- camelCase for variables: const userName = 'John'
- PascalCase for types: interface UserProps {}
- SCREAMING_SNAKE_CASE for constants: const MAX_SIZE = 100

// API Routes
- /api/v1/{resource}/{action}/{id}
- GET /api/v1/quizzes - List quizzes
- POST /api/v1/quizzes - Create quiz
- GET /api/v1/quizzes/:id - Get quiz
- PUT /api/v1/quizzes/:id - Update quiz
- DELETE /api/v1/quizzes/:id - Delete quiz
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
| PostgreSQL | Feb 2026 | Reliable, mature, JSON support | MySQL, MongoDB |
| Prisma ORM | Feb 2026 | Type safety, excellent DX | Drizzle, raw SQL |
| TanStack Query | Feb 2026 | Server state management, caching | SWR, Redux |
| Shadcn/ui | Feb 2026 | Customizable, accessible, copy-paste | Material UI, Chakra UI |
| Zod | Feb 2026 | Type inference, client+server validation | Yup, Joi |
| Vercel Hosting | Feb 2026 | Next.js optimized, edge network | AWS, GCP, Railway |
| npm Package Manager | Feb 2026 | Standard, widely adopted | pnpm, yarn |

---

## 14. TECHNICAL RISKS & MITIGATIONS

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Database downtime | Low | High | Backup exports, migration plan |
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
npm install

# 3. Setup environment variables
cp .env.example .env.local
# Edit .env.local with your database credentials

# 4. Setup database
npm run db:generate
npm run db:push
npm run db:seed

# 5. Run development server
npm run dev

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
| ERD | Entity Relationship Diagram |
| JWT | JSON Web Token |
| ORM | Object-Relational Mapping |
| RSC | React Server Components |
| SSR | Server-Side Rendering |
| UUID | Universally Unique Identifier |

---

*This document is part of the Quizizz Clone (Lite Version) Project Documentation*
*Location: `/docs/project/03-implementation-and-architecture.md`*
*LearnWeb LMS Project © 2026*
