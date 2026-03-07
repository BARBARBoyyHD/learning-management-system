## 1. Project Initialization

- [x] 1.1 Create `/app` directory and initialize Next.js 16 with TypeScript, Tailwind CSS, ESLint, App Router, and Turbopack
- [x] 1.2 Install core dependencies: React 19, Next.js 16, TypeScript 5.7+
- [x] 1.3 Install frontend dependencies: Tailwind CSS 4, Shadcn/ui, TanStack Query v5, React Hook Form v8, Zod, Lucide React
- [x] 1.4 Install backend dependencies: Prisma ORM v6, JWT utilities
- [x] 1.5 Install dev dependencies: ESLint, Prettier, Husky, Playwright, Vitest
- [x] 1.6 Configure package.json with all required npm scripts (dev, build, lint, typecheck, db:generate, db:migrate, db:seed, test, test:e2e)

## 2. Configuration Files

- [x] 2.1 Create `tsconfig.json` with strict mode, path aliases (`@/*` → `./src/*`), and no `any` types allowed
- [ ] 2.2 Create `tailwind.config.ts` with design system tokens (primary colors, semantic colors, typography, border radius)
- [x] 2.3 Create `next.config.ts` with App Router and Turbopack configuration
- [x] 2.4 Create `prisma/schema.prisma` with 6-table ERD (users, quizzes, questions, question_options, student_responses, response_details)
- [x] 2.5 Create `.env.example` with DATABASE_URL, JWT_SECRET, and other required environment variables
- [x] 2.6 Create `components.json` for Shadcn/ui configuration
- [x] 2.7 Create `.gitignore` with Node.js, Next.js, and IDE exclusions
- [x] 2.8 Create `lint-staged.config.js` for pre-commit hooks

## 3. Project Structure

- [x] 3.1 Create `/app/src/app/` directory with root layout.tsx, page.tsx, and globals.css
- [x] 3.2 Create `/app/src/components/ui/` directory for Shadcn/ui components
- [x] 3.3 Create `/app/src/components/layout/` directory for Header, Sidebar, Footer
- [x] 3.4 Create `/app/src/components/quizzes/` directory for quiz-specific components
- [x] 3.5 Create `/app/src/components/questions/` directory for question type components
- [x] 3.6 Create `/app/src/components/forms/` directory for reusable form components
- [x] 3.7 Create `/app/src/lib/prisma/` directory with Prisma client singleton
- [x] 3.8 Create `/app/src/lib/validators/` directory for Zod schemas
- [x] 3.9 Create `/app/src/lib/api/` directory for API client and types
- [x] 3.10 Create `/app/src/hooks/` directory for custom React hooks
- [x] 3.11 Create `/app/src/services/` directory for business logic layer
- [x] 3.12 Create `/app/src/repositories/` directory for data access layer
- [x] 3.13 Create `/app/src/types/` directory for TypeScript type definitions
- [x] 3.14 Create `/app/prisma/migrations/` directory for database migrations
- [x] 3.15 Create `/app/tests/e2e/` and `/app/tests/unit/` directories

## 4. Design System Implementation

- [x] 4.1 Add Lexend font (weights 300-700) via Google Fonts CDN in root layout
- [x] 4.2 Add Material Symbols Outlined icons via Google Fonts CDN
- [x] 4.3 Create CSS variables in globals.css for Theme A (Light - Indigo #6467f2)
- [x] 4.4 Create CSS variables in globals.css for Theme B (Dark - Purple #6a25f4)
- [x] 4.5 Configure Tailwind to use CSS variables for all color tokens
- [x] 4.6 Add semantic color tokens (success #22c55e, warning #f59e0b, error #ef4444, info #3b82f6)
- [x] 4.7 Add option card colors (purple, blue, orange, pink for multiple choice)
- [x] 4.8 Configure border radius scale (12px default, 16px lg, 24px xl, 9999px full)
- [x] 4.9 Initialize Shadcn/ui CLI and install base components: button, input, card, dialog, label
- [x] 4.10 Create index.ts barrel exports for `/app/src/components/ui/`
- [x] 4.11 Create index.ts barrel exports for `/app/src/components/layout/`

## 5. Database Schema Setup

- [x] 5.1 Define User model in Prisma schema with UUID, email unique, password, role, createdAt, and indexes
- [x] 5.2 Define Quiz model with UUID, teacherId FK, title, description, isPublic, createdAt, and indexes
- [x] 5.3 Define Question model with UUID, quizId FK, questionType, questionText, mediaUrl, settings (Json), points, orderIndex, and cascade delete
- [x] 5.4 Define QuestionOption model with UUID, questionId FK, option, sortOrder, isCorrect, and cascade delete
- [x] 5.5 Define StudentResponse model with UUID, userId FK, quizId FK, score, completedAt, and cascade delete
- [x] 5.6 Define ResponseDetail model with UUID, responseId FK, questionId FK, answerGiven, isCorrect, and cascade delete
- [ ] 5.7 Add all required indexes per ERD Guideline Section 7 (email, role, teacherId, isPublic, quizId, questionType, userId, responseId)
- [ ] 5.8 Run `npm run db:generate` to generate Prisma Client
- [ ] 5.9 Run `npm run db:migrate` to create initial migration
- [ ] 5.10 Run `npm run db:push` to apply schema to development database
- [ ] 5.11 Create seed script at `/app/prisma/seed.ts` with demo teacher account and sample quiz
- [ ] 5.12 Run `npm run db:seed` to populate development database

## 6. Base Layout Components

- [x] 6.1 Create Header component with logo, navigation, and user profile section
- [x] 6.2 Create Sidebar component with navigation menu and active state highlighting
- [x] 6.3 Create Footer component with copyright and secondary navigation
- [x] 6.4 Implement responsive behavior for mobile (hamburger menu pattern)
- [x] 6.5 Add Material Symbols icons to all navigation items
- [x] 6.6 Apply theme-aware colors using CSS variables

## 7. Form Components

- [ ] 7.1 Create FormField wrapper component with React Hook Form Controller integration
- [ ] 7.2 Implement Zod validation with error message display
- [ ] 7.3 Add ARIA attributes for accessibility
- [ ] 7.4 Create reusable form patterns (login form, registration form, quiz creation form)

## 8. Root Application

- [x] 8.1 Create root layout.tsx with Lexend font, theme provider, and base structure
- [x] 8.2 Create home page.tsx with welcome message and links to documentation
- [ ] 8.3 Implement theme switching mechanism (data-theme attribute toggle)
- [ ] 8.4 Add error boundary for graceful error handling
- [ ] 8.5 Configure metadata for SEO (title, description, open graph)

## 9. Development Workflow

- [ ] 9.1 Initialize Husky with `npx husky init`
- [ ] 9.2 Create `.husky/pre-commit` hook to run lint-staged
- [ ] 9.3 Test pre-commit hooks with sample commit
- [ ] 9.4 Configure VS Code settings in `.vscode/settings.json` (format on save, default formatter)
- [ ] 9.5 Create `.vscode/extensions.json` with recommended extensions (ESLint, Prettier, Tailwind CSS, Prisma)
- [ ] 9.6 Test all npm scripts: dev, build, lint, typecheck

## 10. Testing Setup

- [ ] 10.1 Configure Vitest in `vitest.config.ts` with path aliases
- [ ] 10.2 Create unit test example in `/app/tests/unit/example.test.ts`
- [ ] 10.3 Configure Playwright in `playwright.config.ts`
- [ ] 10.4 Create E2E test example in `/app/tests/e2e/example.spec.ts`
- [ ] 10.5 Run `npm run test` to verify Vitest setup
- [ ] 10.6 Run `npm run test:e2e` to verify Playwright setup

## 11. Documentation

- [ ] 11.1 Create README.md with project overview, tech stack, and quick start guide
- [ ] 11.2 Add development setup instructions (Node.js version, database setup)
- [ ] 11.3 Document all npm scripts in README.md
- [ ] 11.4 Add links to BRD, ITA, ERD, and Color Guideline documentation
- [ ] 11.5 Create CONTRIBUTING.md with development conventions and commit message format

## 12. Verification & Testing

- [ ] 12.1 Run `npm run dev` and verify application starts without errors
- [ ] 12.2 Run `npm run build` and verify production build succeeds
- [ ] 12.3 Run `npm run typecheck` and verify no TypeScript errors
- [ ] 12.4 Run `npm run lint` and verify no ESLint errors
- [ ] 12.5 Verify database connection with `npm run db:generate`
- [ ] 12.6 Test hot module replacement (HMR) with Turbopack
- [ ] 12.7 Verify theme switching works (light/dark modes)
- [ ] 12.8 Verify responsive design on mobile, tablet, desktop viewports
- [ ] 12.9 Run all tests and verify 100% pass rate
- [ ] 12.10 Verify pre-commit hooks execute on git commit

---

## Implementation Notes

**Estimated Effort:** 3-4 days (6 sprints worth of work for setup phase)

**Dependencies:**
- PostgreSQL 16 database (local or cloud instance)
- Node.js 20.x LTS or 22.x
- npm 11.x

**Success Criteria:**
- ✅ All 12 task groups complete
- ✅ Application runs in development mode without errors
- ✅ Production build succeeds
- ✅ All tests pass
- ✅ Database schema applied successfully
- ✅ Design system tokens working (both themes)
- ✅ Pre-commit hooks functional

**References:**
- ITA Section 3: Technology Stack
- ITA Section 4.4: Project Structure
- ITA Section 6.1: Database Schema
- ERD Guideline: 6-table schema
- Color Guideline: Design tokens
