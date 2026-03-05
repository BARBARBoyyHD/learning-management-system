/**
 * Create Question Page
 *
 * Question editor for adding new questions to a quiz.
 * Supports Multiple Choice and other question types.
 */

import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import { QuestionEditor } from '@/components/questions/multiple-choice-editor'

export default async function CreateQuestionPage(props: {
  params: Promise<{ quizId: string }>
}) {
  const params = await props.params
  const quizId = params.quizId

  // Check authentication
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Verify quiz exists and belongs to user
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    select: {
      id: true,
      title: true,
      teacherId: true,
    },
  })

  if (!quiz || quiz.teacherId !== user.id) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-semibold text-neutral-900">
            Create Question
          </h1>
          <p className="mt-1 text-sm text-neutral-600">
            Adding to: {quiz.title}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <QuestionEditor quizId={quizId} />
        </div>
      </main>
    </div>
  )
}
