/**
 * Name Input Page - Guest Student Registration
 *
 * Page for guest students to enter their name before joining the quiz.
 * Auto-registers the student with a UUID upon submission.
 *
 * Route: /join/[quizId]/name
 */

import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { NameInputForm } from '@/components/guest/name-input-form'

/**
 * Page Props
 */
interface NameInputPageProps {
  params: Promise<{
    quizId: string
  }>
}

/**
 * Name Input Page Component
 */
export default async function NameInputPage({ params }: NameInputPageProps) {
  const { quizId } = await params

  // Fetch quiz details
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      teacher: {
        select: { name: true },
      },
      _count: {
        select: { questions: true },
      },
    },
  })

  // Quiz not found
  if (!quiz) {
    notFound()
  }

  return (
    <div className="w-full">
      {/* Quiz Info Card */}
      <div className="mb-6 p-4 rounded-xl border border-neutral-800 bg-neutral-900/50">
        <h2 className="text-lg font-semibold text-white mb-1">{quiz.title}</h2>
        <p className="text-sm text-neutral-400 mb-2">
          Teacher: {quiz.teacher.name}
        </p>
        <div className="flex items-center gap-3 text-xs text-neutral-500">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined h-3.5 w-3.5">library_books</span>
            {quiz._count.questions} questions
          </span>
          {quiz.timeLimit && (
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined h-3.5 w-3.5">schedule</span>
              {quiz.timeLimit} minutes
            </span>
          )}
        </div>
      </div>

      {/* Name Input Form */}
      <NameInputForm quizId={quizId} quizTitle={quiz.title} />
    </div>
  )
}
