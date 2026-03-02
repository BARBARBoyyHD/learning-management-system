/**
 * Quiz Edit Page
 *
 * Main quiz editor showing quiz details and question list.
 * Teachers can add, edit, and manage questions for this quiz.
 */

import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import { QuizEditor } from '@/components/quizzes/quiz-editor'

export default async function QuizEditPage(props: {
  params: Promise<{ quizId: string }>
}) {
  const params = await props.params
  const { quizId } = params

  // Check authentication
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get quiz with questions
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      questions: {
        orderBy: { orderIndex: 'asc' },
        include: {
          options: {
            orderBy: { sortOrder: 'asc' },
          },
        },
      },
    },
  })

  // Quiz not found or user doesn't own it
  if (!quiz || quiz.teacherId !== user.id) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <QuizEditor quiz={quiz} />
    </div>
  )
}
