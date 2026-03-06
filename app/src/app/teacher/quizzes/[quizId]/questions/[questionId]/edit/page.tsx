/**
 * Edit Question Page
 *
 * Question editor for editing existing questions.
 * Loads existing question data and pre-fills the form.
 */

import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import { QuestionEditor } from '@/components/questions/multiple-choice-editor'

export default async function EditQuestionPage(props: {
  params: Promise<{ quizId: string; questionId: string }>
}) {
  const params = await props.params
  const { quizId, questionId } = params

  // Check authentication
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Verify question exists and belongs to user
  const question = await prisma.question.findUnique({
    where: { id: questionId },
    include: {
      quiz: {
        select: {
          id: true,
          title: true,
          teacherId: true,
        },
      },
      options: {
        orderBy: { sortOrder: 'asc' },
      },
    },
  })

  if (!question || question.quiz.teacherId !== user.id) {
    notFound()
  }

  // Verify question belongs to the specified quiz
  if (question.quizId !== quizId) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="border-b border-border-primary bg-bg-secondary">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-semibold text-text-primary">
            Edit Question
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Editing in: {question.quiz.title}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <QuestionEditor
            quizId={quizId}
            initialData={{
              id: question.id,
              questionType: question.questionType as any,
              questionText: question.questionText,
              points: question.points,
              shuffle: (question.settings as any)?.shuffle ?? false,
              options: question.options.map((opt) => ({
                id: opt.id,
                text: opt.option,
                isCorrect: opt.isCorrect,
                sortOrder: opt.sortOrder ?? 0,
              })),
              settings: question.settings as any,
            }}
          />
        </div>
      </main>
    </div>
  )
}
