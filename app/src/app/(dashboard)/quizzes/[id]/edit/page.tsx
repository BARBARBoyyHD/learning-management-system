import { QuizMetadataForm } from '@/components/quizzes/quiz-metadata-form'
import { quizService } from '@/services/quiz.service'
import { getSession } from '@/lib/auth-server'
import { notFound, redirect } from 'next/navigation'

/**
 * Quiz Edit Page
 */
export default async function QuizEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { data: { session } } = await getSession()

  if (!session?.user) {
    redirect('/login')
  }

  const { id } = await params
  const quiz = await quizService.getById(id)

  if (!quiz) {
    notFound()
  }

  // Check ownership
  if (quiz.teacherId && quiz.teacherId !== session.user.id) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Edit Quiz</h1>
        <p className="mt-2 text-neutral-400">
          Update quiz metadata and settings
        </p>
      </div>

      <QuizMetadataForm quiz={quiz} />
    </div>
  )
}
