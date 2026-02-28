import Link from "next/link";

/**
 * Home Page - Quizizz Clone
 * 
 * Welcome page with links to documentation and next steps
 */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-bg-primary to-bg-secondary">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-8">
            <div className="size-24 bg-gradient-to-br from-primary-base to-primary-hover rounded-2xl flex items-center justify-center shadow-xl shadow-primary-base/20">
              <span className="material-symbols-outlined text-5xl text-white">
                rocket_launch
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-black text-text-primary tracking-tight">
            Quizizz Clone
          </h1>
          
          <p className="text-xl md:text-2xl text-text-secondary font-medium">
            LearnWeb LMS - Interactive Quiz Platform
          </p>

          {/* Description */}
          <div className="prose prose-lg dark:prose-invert mx-auto mt-8">
            <p className="text-text-tertiary">
              A modern, scalable assessment tool for engaging learning experiences.
              Create courses, build quizzes with 5 question types, and track student progress in real-time.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-primary-base hover:bg-primary-hover text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-primary-base/30 hover:shadow-xl hover:shadow-primary-base/40 active:scale-95"
            >
              <span className="material-symbols-outlined">dashboard</span>
              Go to Dashboard
            </Link>
            
            <a
              href="https://github.com/your-org/quizizz-clone"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-bg-tertiary hover:bg-border-primary text-text-primary font-bold py-4 px-8 rounded-xl transition-all border-2 border-border-secondary"
            >
              <span className="material-symbols-outlined">code</span>
              View on GitHub
            </a>
          </div>
        </div>

        {/* Documentation Links */}
        <div className="max-w-6xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Business Requirements */}
          <div className="bg-bg-primary rounded-2xl p-6 border border-border-primary hover:border-primary-base transition-colors">
            <div className="size-12 bg-primary-lighter rounded-xl flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-primary-base">description</span>
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-2">
              Business Requirements
            </h3>
            <p className="text-sm text-text-tertiary mb-4">
              62 functional requirements across 6 modules
            </p>
            <a
              href="/docs/project/01-bussiness-requirement.md"
              className="text-sm font-semibold text-primary-base hover:text-primary-hover"
            >
              Read BRD →
            </a>
          </div>

          {/* Technical Architecture */}
          <div className="bg-bg-primary rounded-2xl p-6 border border-border-primary hover:border-primary-base transition-colors">
            <div className="size-12 bg-primary-lighter rounded-xl flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-primary-base">architecture</span>
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-2">
              Technical Architecture
            </h3>
            <p className="text-sm text-text-tertiary mb-4">
              Next.js 16, PostgreSQL, Prisma ORM
            </p>
            <a
              href="/docs/project/03-implementation-and-architecture.md"
              className="text-sm font-semibold text-primary-base hover:text-primary-hover"
            >
              View ITA →
            </a>
          </div>

          {/* Database Schema */}
          <div className="bg-bg-primary rounded-2xl p-6 border border-border-primary hover:border-primary-base transition-colors">
            <div className="size-12 bg-primary-lighter rounded-xl flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-primary-base">database</span>
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-2">
              Database Schema
            </h3>
            <p className="text-sm text-text-tertiary mb-4">
              6-table ERD with UUID primary keys
            </p>
            <a
              href="/docs/project/04-database-erd-guideline.md"
              className="text-sm font-semibold text-primary-base hover:text-primary-hover"
            >
              View ERD →
            </a>
          </div>

          {/* Design System */}
          <div className="bg-bg-primary rounded-2xl p-6 border border-border-primary hover:border-primary-base transition-colors">
            <div className="size-12 bg-primary-lighter rounded-xl flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-primary-base">palette</span>
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-2">
              Design System
            </h3>
            <p className="text-sm text-text-tertiary mb-4">
              Dual-theme with Lexend typography
            </p>
            <a
              href="/docs/project/05-color-guideline.md"
              className="text-sm font-semibold text-primary-base hover:text-primary-hover"
            >
              View Colors →
            </a>
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="max-w-4xl mx-auto mt-24 bg-bg-primary rounded-3xl p-8 border border-border-primary">
          <h2 className="text-3xl font-bold text-text-primary mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary-base">quick_reference_all</span>
            Quick Start Guide
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="size-8 bg-primary-base text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-text-primary mb-1">Set up your database</h3>
                <p className="text-text-tertiary">Copy <code className="bg-bg-tertiary px-2 py-1 rounded">.env.example</code> to <code className="bg-bg-tertiary px-2 py-1 rounded">.env.local</code> and configure DATABASE_URL</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="size-8 bg-primary-base text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-text-primary mb-1">Generate Prisma Client</h3>
                <p className="text-text-tertiary">Run <code className="bg-bg-tertiary px-2 py-1 rounded">npm run db:generate</code> to generate the database client</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="size-8 bg-primary-base text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-text-primary mb-1">Run database migrations</h3>
                <p className="text-text-tertiary">Execute <code className="bg-bg-tertiary px-2 py-1 rounded">npm run db:migrate</code> to create the database schema</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="size-8 bg-primary-base text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold text-text-primary mb-1">Start development server</h3>
                <p className="text-text-tertiary">Run <code className="bg-bg-tertiary px-2 py-1 rounded">npm run dev</code> and open http://localhost:3000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="max-w-4xl mx-auto mt-16 text-center text-text-tertiary text-sm">
          <p>© 2026 LearnWeb LMS Ecosystem. Quizizz Clone (Lite Version)</p>
          <p className="mt-2">Built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, and Prisma ORM</p>
        </footer>
      </div>
    </main>
  );
}
