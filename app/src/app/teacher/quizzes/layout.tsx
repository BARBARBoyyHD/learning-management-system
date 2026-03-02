/**
 * Quiz Management Layout
 *
 * Full-width layout for quiz/question creation.
 * Used within the teacher layout for focused editing.
 */

export default function QuizManagementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main className="container mx-auto max-w-5xl px-6 py-8">
        {children}
      </main>
    </div>
  )
}
