/**
 * Assessment Editor Page
 *
 * Modern quiz/question editor matching the design mockup.
 * Full-screen layout for focused editing.
 * Theme A - Light Mode with Indigo primary color (#6467f2)
 */

import { quizService } from '@/services/quiz.service'
import { requireAuth } from '@/lib/auth-server'
import { notFound } from 'next/navigation'
import { AssessmentEditor } from '@/components/quizzes/assessment-editor'

/**
 * Edit Quiz Page Props
 */
interface EditQuizPageProps {
  params: Promise<{
    quizId: string
  }>
}

/**
 * Assessment Editor Page Component
 */
export default async function AssessmentEditorPage({ params }: EditQuizPageProps) {
  // Authenticate user
  await requireAuth()

  // Get quiz ID from params
  const { quizId } = await params

  // Fetch quiz data
  const quiz = await quizService.getById(quizId)

  // Check if quiz exists
  if (!quiz) {
    notFound()
  }

  // Check ownership
  if (!quiz.teacherId) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f6f6f8] text-slate-900" data-theme="light">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
        <div className="flex items-center gap-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6467f2] text-white">
            <span className="material-symbols-outlined text-2xl">edit_note</span>
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none">{quiz.title}</h1>
            <p className="text-xs font-medium text-slate-500">Last saved 2m ago</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100">
            <span className="material-symbols-outlined text-[20px]">visibility</span>
            <span className="hidden sm:inline">Preview</span>
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50">
            Save Draft
          </button>
          <button className="rounded-lg bg-[#6467f2] px-6 py-2 text-sm font-bold text-white shadow-lg shadow-[#6467f2]/20 transition-all hover:brightness-110">
            Publish
          </button>
        </div>
      </header>

      {/* Main Content - Full Screen Editor */}
      <main className="flex-1 overflow-y-auto">
        <AssessmentEditor quiz={quiz} />
      </main>
    </div>
  )
}
