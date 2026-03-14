# BrainBlitz

**BrainBlitz** is a modern, web-based Learning Management System (LMS) focused on interactive quizzes and assessments. Built with Next.js 16, it enables teachers to create courses and assessments while allowing students to join as guests without formal registration.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwind-css)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169e1?logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-6-f5f5f5?logo=prisma)
![Vercel](https://img.shields.io/badge/Vercel-Production-000000?logo=vercel)

## ✨ Features

### For Teachers
- **Course Management** - Create and organize multiple courses with public or private access
- **Assessment Builder** - Design quizzes with 5 different question types
- **Real-time Reporting** - View student scores and analytics instantly
- **Flexible Access** - Generate 6-character access codes for private courses

### For Students (Guest Access)
- **No Registration Required** - Join quizzes with just an access code and name
- **Quick Onboarding** - Start quizzes in under 2 minutes
- **Multiple Question Types** - Engage with varied assessment formats
- **Instant Results** - View scores immediately after submission (objective questions)

### Question Types

| Type | Auto-Graded | Description |
|------|-------------|-------------|
| **Multiple Choice** | ✅ Yes | Single or multiple correct answers with shuffle option |
| **Essay** | ❌ Manual | Long-form answers with grading rubric support |
| **Fill in the Blank** | ✅ Yes | Short answer with multiple accepted variations |
| **Match** | ✅ Partial | Pair matching with partial credit support |
| **Reorder** | ✅ Partial | Sequence ordering with partial credit support |

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    BRAINBLITZ ARCHITECTURE                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  PRESENTATION LAYER                                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │   Teacher Web   │  │  Student Guest  │  │   Admin     │ │
│  │      App        │  │     Web App     │  │   Portal    │ │
│  │  (Next.js 16)   │  │  (Next.js 16)   │  │ (Next.js 16)│ │
│  └────────┬────────┘  └────────┬────────┘  └──────┬──────┘ │
│           └─────────────────────┼──────────────────┘        │
│                                 │                            │
│                                 ▼                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              NEXT.JS APP ROUTER                       │   │
│  │    Server Components • Server Actions • Route Handlers│   │
│  └───────────────────────────┬───────────────────────────┘   │
│                              │                                │
│  APPLICATION LAYER           │                                │
│  ┌───────────────────────────┴───────────────────────────┐   │
│  │                  SERVICE LAYER                         │   │
│  │   Auth | Course | Assessment | Question | Grading     │   │
│  └───────────────────────────┬───────────────────────────┘   │
│                              │                                │
│  DATA LAYER                  │                                │
│  ┌───────────────────────────▼───────────────────────────┐   │
│  │           Prisma ORM + PostgreSQL                      │   │
│  │         6 core tables with UUID primary keys          │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript 5.x (strict mode)
- **UI Library:** React 19 with Server Components
- **Styling:** Tailwind CSS 4
- **Components:** Shadcn/ui (customizable, accessible)
- **Icons:** Lucide React
- **State:** TanStack Query 5 (server state), React Hook Form 8
- **Validation:** Zod 4

### Backend
- **Runtime:** Next.js API Routes (Edge Runtime support)
- **ORM:** Prisma 6
- **Database:** PostgreSQL 16
- **Auth:** Custom JWT with HTTP-only cookies
- **Validation:** Zod schemas (client + server)

### Infrastructure
- **Hosting:** Vercel (Edge Network, CDN)
- **Database:** Managed PostgreSQL
- **CI/CD:** GitHub Actions
- **Testing:** Vitest (unit), Playwright (E2E)
- **Code Quality:** ESLint, Prettier, Husky

## 📦 Getting Started

### Prerequisites

- Node.js 20.x LTS or 22.x
- npm 10.x
- Git 2.x
- PostgreSQL 15+ (local or cloud)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/BARBARBoyyHD/learning-management-system.git
cd learning-management-system/app

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your database URL and other secrets

# 4. Generate Prisma Client
npm run db:generate

# 5. Push database schema
npm run db:push

# 6. Seed initial data (optional)
npm run db:seed

# 7. Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

### Available Scripts

```bash
npm run dev          # Start development server (Turbopack)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking
npm run test         # Run unit tests (Vitest)
npm run test:e2e     # Run E2E tests (Playwright)

npm run db:generate  # Generate Prisma Client
npm run db:migrate   # Run database migrations
npm run db:push      # Push schema to database (dev only)
npm run db:seed      # Seed database with sample data
npm run db:reset     # Reset database (dev only)
npm run db:studio    # Open Prisma Studio
```

## 🗄️ Database Schema

BrainBlitz uses a scalable database architecture with UUIDs as primary keys and JSON-based configurations for question types.

### Core Tables

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| **users** | All user accounts | id, email, password, role (teacher/student) |
| **quizzes** | Quiz definitions | id, teacher_id, title, is_public, access_code |
| **questions** | Quiz questions | id, quiz_id, question_type, settings (JSON) |
| **question_options** | Answer options | id, question_id, option, is_correct, sort_order |
| **student_responses** | Quiz submissions | id, user_id, quiz_id, score |
| **response_details** | Individual answers | id, response_id, question_id, answer_given |

## 📁 Project Structure

```
brainblitz/
├── docs/                       # Project documentation
│   └── project/
│       ├── 01-bussiness-requirement.md
│       ├── 02-project-execution-plan.md
│       ├── 03-implementation-and-architecture.md
│       └── 04-database-erd-guideline.md
│
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/
│   └── seed.ts
│
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth routes
│   │   ├── (dashboard)/       # Teacher dashboard
│   │   ├── (guest)/           # Guest student routes
│   │   ├── api/v1/            # API endpoints
│   │   └── layout.tsx
│   │
│   ├── components/
│   │   ├── ui/                # Shadcn/ui components
│   │   ├── layout/            # Layout components
│   │   ├── courses/           # Course components
│   │   ├── assessments/       # Assessment components
│   │   └── questions/         # Question components
│   │
│   ├── lib/
│   │   ├── prisma/            # Prisma client
│   │   ├── validators/        # Zod schemas
│   │   └── api/               # API client
│   │
│   ├── hooks/                 # Custom hooks
│   ├── services/              # Business logic
│   ├── repositories/          # Data access
│   └── types/                 # TypeScript types
│
├── tests/
│   ├── e2e/
│   ├── unit/
│   └── fixtures/
│
└── package.json
```

## 🔐 Security

- **Password Hashing:** bcrypt (cost factor 10+)
- **Session Management:** JWT tokens, HTTP-only cookies, 24h expiry
- **API Security:** Zod validation, rate limiting
- **SQL Injection:** Prisma parameterized queries
- **XSS Prevention:** React escaping, CSP headers
- **CSRF Protection:** SameSite cookies

## 🎯 Performance Targets

| Metric | Target |
|--------|--------|
| Page Load Time | < 3 seconds |
| API Response (p95) | < 500ms |
| Quiz Join Time | < 2 minutes (user flow) |
| Score Availability | < 5 seconds after submission |
| Concurrent Users | 1000+ per instance |
| Uptime | 99.5% |

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
```

### Test Coverage

- **Unit Tests:** Vitest for services, repositories, and utilities
- **Integration Tests:** API route testing with test database
- **E2E Tests:** Playwright for critical user journeys

## 📄 Documentation

| Document | Description |
|----------|-------------|
| [Business Requirements](./docs/project/01-bussiness-requirement.md) | Functional requirements, user stories, success criteria |
| [Project Execution Plan](./docs/project/02-project-execution-plan.md) | Timeline, milestones, resource allocation |
| [Technical Architecture](./docs/project/03-implementation-and-architecture.md) | System design, technology stack, development standards |
| [Database ERD](./docs/project/04-database-erd-guideline.md) | Entity relationship diagrams, schema design |
| [Design System](./docs/project/05-color-guideline.md) | Color tokens, typography, UI components |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Workflow

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

## 📝 License

This project is proprietary software developed for LearnWeb LMS.

## 👥 Team

| Role | Responsibility |
|------|----------------|
| Product Owner | Executive Sponsor, scope approval |
| Tech Lead | Architecture decisions, code review |
| Backend Developers | API, database, business logic |
| Frontend Developers | UI components, pages, hooks |
| UI/UX Designer | Design system, user experience |
| QA Engineer | Test planning, automation |

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI Components from [Shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- ORM by [Prisma](https://www.prisma.io/)
- Hosting by [Vercel](https://vercel.com/)

---

**BrainBlitz** - LearnWeb LMS Project | February 2026
