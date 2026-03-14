import Link from "next/link";

/**
 * Home Page - BrainBlitz
 *
 * Sleek SaaS-style landing page with Join Quiz and Login as Teacher options
 */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#6a25f4_0.5px,transparent_0.5px),radial-gradient(#6a25f4_0.5px,transparent_0.5px)] bg-[size:20px_20px] bg-[position:0_0,10px_10px] opacity-10 pointer-events-none"/>
      
      {/* Decorative Blurs */}
      <div className="absolute -bottom-24 -left-24 size-96 bg-primary-base/20 rounded-full blur-[120px] pointer-events-none"/>
      <div className="absolute -top-24 -right-24 size-96 bg-primary-base/10 rounded-full blur-[120px] pointer-events-none"/>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-primary-base/5 rounded-full blur-[200px] pointer-events-none"/>

      <div className="container relative z-10 mx-auto px-4">
        {/* Navigation */}
        <nav className="flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-primary-base rounded-lg flex items-center justify-center shadow-lg shadow-primary-base/20">
              <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
            </div>
            <span className="text-xl font-bold text-white">BrainBlitz</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/register"
              className="text-neutral-400 hover:text-white text-sm font-medium transition-colors"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="text-neutral-400 hover:text-white text-sm font-medium transition-colors"
            >
              Login
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-base/10 border border-primary-base/20 text-primary-base text-sm font-medium">
              <span className="material-symbols-outlined text-base">stars</span>
              <span>Interactive Learning Platform</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.1]">
              Make Learning
              <br />
              <span className="bg-gradient-to-r from-primary-base via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Fun & Engaging
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-neutral-400 font-medium max-w-2xl mx-auto leading-relaxed">
              Create quizzes, track progress, and engage students with real-time feedback. 
              Perfect for classrooms and remote learning.
            </p>

            {/* Action Buttons - Main CTAs */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
              {/* Join Quiz Button - For Students */}
              <Link
                href="/join"
                className="inline-flex items-center justify-center gap-2 bg-primary-base hover:bg-primary-hover text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-primary-base/30 hover:shadow-xl hover:shadow-primary-base/40 active:scale-95 text-lg"
              >
                <span className="material-symbols-outlined">login</span>
                Join Quiz
              </Link>

              {/* Login as Teacher Button */}
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-4 px-8 rounded-xl transition-all border border-neutral-700 active:scale-95 text-lg"
              >
                <span className="material-symbols-outlined">account_circle</span>
                Login as Teacher
              </Link>
            </div>

            {/* Register Link */}
            <div className="pt-4">
              <p className="text-neutral-500 mb-2">New to BrainBlitz?</p>
              <Link
                href="/register"
                className="text-primary-base hover:text-primary-hover font-semibold underline underline-offset-4 decoration-2"
              >
                Create a free teacher account →
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything you need to create amazing quizzes
            </h2>
            <p className="text-neutral-400 text-lg">
              Powerful features to engage students and track learning outcomes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="group p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-primary-base/50 transition-all hover:shadow-lg hover:shadow-primary-base/10">
              <div className="size-12 bg-primary-base/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-base/20 transition-colors">
                <span className="material-symbols-outlined text-primary-base text-2xl">quiz</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">5 Question Types</h3>
              <p className="text-neutral-400 text-sm">
                Multiple choice, essay, fill in the blank, match, and reorder questions for diverse assessments.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-primary-base/50 transition-all hover:shadow-lg hover:shadow-primary-base/10">
              <div className="size-12 bg-primary-base/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-base/20 transition-colors">
                <span className="material-symbols-outlined text-primary-base text-2xl">auto_awesome</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Auto-Grading</h3>
              <p className="text-neutral-400 text-sm">
                Instant feedback for students with automatic grading for objective questions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-primary-base/50 transition-all hover:shadow-lg hover:shadow-primary-base/10">
              <div className="size-12 bg-primary-base/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-base/20 transition-colors">
                <span className="material-symbols-outlined text-primary-base text-2xl">analytics</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Real-Time Reports</h3>
              <p className="text-neutral-400 text-sm">
                Track student performance with detailed analytics and exportable reports.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-primary-base/50 transition-all hover:shadow-lg hover:shadow-primary-base/10">
              <div className="size-12 bg-primary-base/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-base/20 transition-colors">
                <span className="material-symbols-outlined text-primary-base text-2xl">security</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Access Codes</h3>
              <p className="text-neutral-400 text-sm">
                Private quizzes with 6-character access codes for controlled classroom access.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-primary-base/50 transition-all hover:shadow-lg hover:shadow-primary-base/10">
              <div className="size-12 bg-primary-base/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-base/20 transition-colors">
                <span className="material-symbols-outlined text-primary-base text-2xl">timer</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Time Limits</h3>
              <p className="text-neutral-400 text-sm">
                Set custom time limits to add challenge and manage quiz pacing.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-primary-base/50 transition-all hover:shadow-lg hover:shadow-primary-base/10">
              <div className="size-12 bg-primary-base/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-base/20 transition-colors">
                <span className="material-symbols-outlined text-primary-base text-2xl">people</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Guest Access</h3>
              <p className="text-neutral-400 text-sm">
                Students join instantly without registration using quiz access codes.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto py-24">
          <div className="relative rounded-3xl bg-primary-base/10 border border-primary-base/20 p-12 text-center overflow-hidden">
            {/* Background blur */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 size-64 bg-primary-base/20 rounded-full blur-[80px] pointer-events-none"/>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 size-64 bg-primary-base/10 rounded-full blur-[80px] pointer-events-none"/>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to get started?
              </h2>
              <p className="text-neutral-400 text-lg mb-8 max-w-xl mx-auto">
                Join thousands of teachers creating engaging quizzes for their students.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/join"
                  className="inline-flex items-center justify-center gap-2 bg-primary-base hover:bg-primary-hover text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-primary-base/30 hover:shadow-xl hover:shadow-primary-base/40 active:scale-95"
                >
                  <span className="material-symbols-outlined">login</span>
                  Join a Quiz
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-100 text-neutral-900 font-bold py-4 px-8 rounded-xl transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined">add_circle</span>
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="size-8 bg-primary-base rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-sm">rocket_launch</span>
              </div>
              <span className="text-sm font-medium text-neutral-400">BrainBlitz</span>
            </div>
            <p className="text-sm text-neutral-500">
              © 2026 LearnWeb LMS Ecosystem. Built with Next.js 16 & React 19.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
