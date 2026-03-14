## Context

This design document defines the implementation approach for setting up the Next.js 16 application infrastructure for the BrainBlitz project. The project currently has comprehensive documentation (BRD, ITA, ERD, Color Guideline) but no working codebase. This setup establishes the foundation for all future development.

**Current State:**
- Empty project directory with only documentation (`/docs/project/`) and OpenSpec configuration
- No Next.js application, no dependencies installed, no project structure
- Database schema defined in ERD Guideline but not implemented

**Constraints:**
- Must follow ITA Section 4.4 project structure exactly
- Must be located inside `/app` directory
- Must use Next.js 16 with App Router and Turbopack
- Must implement dual-theme support (Light/Dark) per Color Guideline
- Must use PostgreSQL 16 with Prisma ORM v6
- All source code in `/app/src/` with absolute imports from `src/`

**Stakeholders:**
- Development Team: Needs working development environment
- Tech Lead: Requires adherence to ITA architecture
- QA Team: Needs test frameworks configured from day one

## Goals / Non-Goals

**Goals:**
- Initialize Next.js 16 application with TypeScript 5.7+ strict mode inside `/app` directory
- Install all dependencies from ITA Section 3 (Frontend, Backend, Database, DevOps)
- Create complete folder structure per ITA Section 4.4
- Configure Tailwind CSS 4 with design system tokens from Color Guideline
- Set up Prisma ORM with 6-table schema from ERD Guideline
- Configure development scripts (dev, build, typecheck, lint, db:migrate, db:seed, test, test:e2e)
- Implement dual-theme CSS variables (Light: indigo #6467f2, Dark: purple #6a25f4)
- Initialize Shadcn/ui with base components (Button, Input, Card, Dialog, Label)
- Set up Husky pre-commit hooks with lint-staged
- Create base layout components (Header, Sidebar, Footer)
- Configure path aliases for clean imports (`@/` → `src/`)

**Non-Goals:**
- Authentication implementation (covered by separate change: auth module)
- Feature pages beyond root layout and placeholder home page
- API route implementation (covered by feature-specific changes)
- Production deployment configuration (covered by DevOps change)
- Database seeding with production data (only demo seed for development)
- Performance optimization beyond baseline Turbopack configuration

## Decisions

### Decision 1: Use `/app` Directory for Project Root

**Decision:** All Next.js application code will be located inside `/app` subdirectory, not in project root.

**Rationale:**
- Separates application code from project documentation (`/docs/`) and configuration (`/openspec/`)
- Follows monorepo-style organization for future scalability
- Clear boundary between "project" (documentation, specs) and "application" (runtime code)
- Enables potential future addition of other apps (mobile, admin, etc.) alongside main app

**Alternatives Considered:**
- *Root-level installation*: Simpler initially, but mixes app code with docs. Rejected due to poor separation of concerns.
- *`/src` at root*: Common pattern, but conflicts with ITA Section 4.4 which specifies `/app/src/`.

### Decision 2: Next.js 16 with Turbopack (Not Webpack)

**Decision:** Use Next.js 16's default Turbopack bundler instead of Webpack.

**Rationale:**
- Turbopack is Next.js 16 default, optimized for App Router
- Faster HMR (hot module replacement) for development
- Better TypeScript support with incremental compilation
- Reduced memory footprint compared to Webpack
- Future-proof: Next.js team investing in Turbopack development

**Alternatives Considered:**
- *Webpack (legacy)*: More plugins available, but slower and being phased out by Next.js team.

### Decision 3: CSS Variables for Theming (Not Tailwind Config Only)

**Decision:** Implement dual-theme support using CSS custom properties (variables) with Tailwind consuming these variables, not separate Tailwind config objects.

**Rationale:**
- Runtime theme switching without rebuild
- Single source of truth for colors in CSS
- Easier to extend with additional themes later
- Better performance: no JavaScript theme switching logic
- Follows Color Guideline Section 9 implementation pattern

**Implementation:**
```css
:root[data-theme="light"] {
  --color-primary-base: #6467f2;
  /* ... other light theme tokens */
}
:root[data-theme="dark"] {
  --color-primary-base: #6a25f4;
  /* ... other dark theme tokens */
}
```

```ts
// tailwind.config.ts
colors: {
  primary: 'var(--color-primary-base)',
  // Tailwind references CSS variables
}
```

**Alternatives Considered:**
- *Separate Tailwind configs per theme*: Requires rebuild to switch themes. Rejected.
- *CSS-in-JS theme provider*: More complex, runtime overhead. Rejected in favor of native CSS variables.

### Decision 4: Prisma Client Singleton Pattern

**Decision:** Implement Prisma Client as a singleton in `src/lib/prisma/client.ts` to prevent multiple instances during development.

**Rationale:**
- Prevents "too many connections" errors in development with Hot Reload
- Single connection pool shared across requests
- Follows Prisma best practices for Next.js
- Required for Edge Runtime compatibility

**Implementation:**
```typescript
// src/lib/prisma/client.ts
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma ?? new PrismaClient()
```

**Alternatives Considered:**
- *New instance per request*: Connection pool exhaustion in development. Rejected.

### Decision 5: Absolute Imports with Path Aliases

**Decision:** Configure TypeScript and Next.js to use `@/` alias for `src/` directory.

**Rationale:**
- Cleaner imports: `import { Button } from '@/components/ui/button'`
- No relative path hell (`../../../components/ui/button`)
- Easier refactoring: moving files doesn't break imports
- Consistent with ITA Section 12.2 naming conventions

**Configuration:**
```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Decision 6: Shadcn/ui Copy-Paste Pattern (Not npm Package)

**Decision:** Use Shadcn/ui's copy-paste component pattern (via CLI) instead of installing as npm dependency.

**Rationale:**
- Full control over component source code
- Easy customization without ejecting
- No breaking changes from upstream updates
- Components are part of codebase, not black box
- Aligns with component-driven architecture principle

**Alternatives Considered:**
- *Material UI*: Heavier bundle, less customizable. Rejected.
- *Chakra UI*: Runtime styling overhead. Rejected.
- *Shadcn/ui as dependency*: Less flexible than copy-paste. Rejected.

### Decision 7: Strict TypeScript Configuration

**Decision:** Enable TypeScript strict mode with additional strict flags, disallowing `any` types.

**Rationale:**
- Catches type errors at compile time
- Self-documenting code through types
- Better IDE autocomplete
- Prevents runtime type errors
- Aligns with ITA Architecture Principle: "Type Safety First"

**Configuration:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

## Risks / Trade-offs

### Risk 1: Database Connection in Development

**Risk:** Developers may struggle with PostgreSQL setup, slowing initial development.

**Mitigation:**
- Provide multiple options: Docker Compose, local installation, or cloud database (Neon, Supabase)
- Include detailed setup instructions in README.md
- Create `.env.example` with clear DATABASE_URL format

### Risk 2: Turbopack Compatibility Issues

**Risk:** Turbopack is newer than Webpack, may have edge case bugs or missing features.

**Mitigation:**
- Pin Next.js version to latest stable 16.x
- Maintain fallback to Webpack via `next.config.ts` if critical issues arise
- Report issues to Next.js team for resolution

### Risk 3: CSS Variables Browser Support

**Risk:** Older browsers may not support CSS custom properties.

**Mitigation:**
- Project targets modern browsers (Evergreen + Safari latest)
- No IE11 or legacy browser support required per BRD
- CSS variables have 95%+ global support as of 2026

### Risk 4: Shadcn/ui Maintenance Overhead

**Risk:** Copy-paste components require manual updates for bug fixes.

**Mitigation:**
- Only customize components when necessary
- Track upstream Shadcn/ui changes via their changelog
- Update components during sprint maintenance cycles
- Trade-off accepted for customization benefits

### Risk 5: Monorepo-Style Directory Structure

**Risk:** `/app` subdirectory adds complexity for simple project.

**Mitigation:**
- Clear documentation in README.md explaining structure
- Consistent with future scalability (multiple apps)
- Separation of concerns: docs vs code
- Trade-off accepted for long-term maintainability

## Migration Plan

### Phase 1: Project Initialization (Day 1)

```bash
# Create /app directory
mkdir -p app
cd app

# Initialize Next.js 16
npm init next-app@latest . -- \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --turbopack

# Install additional dependencies
npm install @prisma/client @tanstack/react-query react-hook-form zod lucide-react
npm install -D prisma @types/node @types/react @types/react-dom playwright vitest husky lint-staged
```

### Phase 2: Configuration Files (Day 1)

1. Update `tsconfig.json` with path aliases and strict mode
2. Configure `tailwind.config.ts` with design tokens
3. Create `next.config.ts` with App Router settings
4. Create `prisma/schema.prisma` with 6-table ERD
5. Create `.env.example` with all required variables
6. Initialize Shadcn/ui: `npx shadcn-ui init`

### Phase 3: Project Structure (Day 2)

Create directory structure:
```
app/src/
├── app/
├── components/
│   ├── ui/
│   ├── layout/
│   └── forms/
├── lib/
│   ├── prisma/
│   ├── validators/
│   └── api/
├── hooks/
├── services/
├── repositories/
└── types/
```

### Phase 4: Base Components (Day 2-3)

1. Install Shadcn/ui base components:
   ```bash
   npx shadcn-ui add button input card dialog label
   ```

2. Create layout components:
   - `src/components/layout/header.tsx`
   - `src/components/layout/sidebar.tsx`
   - `src/components/layout/footer.tsx`

3. Create form components with React Hook Form integration

### Phase 5: Database Setup (Day 3)

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to development database
npm run db:push

# Create initial migration
npm run db:migrate

# Seed demo data
npm run db:seed
```

### Phase 6: Development Scripts & Hooks (Day 3)

1. Add npm scripts to `package.json`:
   - `dev`, `build`, `start`, `lint`, `typecheck`
   - `db:generate`, `db:migrate`, `db:push`, `db:seed`
   - `test`, `test:e2e`

2. Initialize Husky:
   ```bash
   npx husky init
   ```

3. Create `.husky/pre-commit`:
   ```bash
   npx lint-staged
   ```

4. Create `lint-staged.config.js`:
   ```js
   export default {
     '*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
   }
   ```

### Rollback Strategy

If setup fails or critical issues arise:

1. **Database rollback:**
   ```bash
   # Drop all tables
   npx prisma migrate reset
   ```

2. **Code rollback:**
   - Git revert to pre-setup commit
   - Delete `/app` directory and restart

3. **Dependency rollback:**
   - Delete `node_modules/` and `package-lock.json`
   - Run `npm install` with pinned versions

## Open Questions

1. **Database Hosting:** Will production use managed PostgreSQL (Vercel Postgres, Neon, Supabase) or self-hosted? 
   - *Recommendation:* Managed for reliability, decision pending infrastructure team input.

2. **Email Service:** Which SMTP provider for teacher verification emails?
   - *Options:* SendGrid, Resend, AWS SES, or Gmail SMTP
   - *Pending:* Product team decision on budget and provider preference.

3. **Authentication Strategy:** Custom JWT vs NextAuth.js?
   - *Proposal context suggests custom JWT*, but NextAuth provides Google OAuth out-of-box.
   - *Decision needed before auth module implementation.*

4. **File Storage:** Vercel Blob vs AWS S3 for user avatars and course covers?
   - *ITA mentions both*, but need final decision for initial setup.
   - *Recommendation:* Vercel Blob for simplicity if hosting on Vercel.

---

*This design document is part of the `install-nextjs-setup` change*
*Created: 28 February 2026*
