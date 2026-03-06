/**
 * Quiz Results Page
 *
 * Teacher view for seeing all student scores and submissions.
 * Shows statistics, student list with scores, and detailed answer views.
 */

import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import { QuizResultsView } from '@/components/teacher/quiz-results-view'

export default async function QuizResultsPage(props: {
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

  // Get quiz with all responses and student info
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    select: {
      id: true,
      title: true,
      description: true,
      teacherId: true,
      questions: {
        select: {
          id: true,
          questionText: true,
          points: true,
          questionType: true,
        },
        orderBy: { orderIndex: 'asc' },
      },
      responses: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          details: {
            select: {
              questionId: true,
              answerGiven: true,
              isCorrect: true,
            },
          },
        },
        orderBy: { completedAt: 'desc' },
      },
    },
  })

  // Quiz not found
  if (!quiz) {
    notFound()
  }

  // Check if user owns this quiz
  if (quiz.teacherId !== user.id) {
    notFound()
  }

  // Calculate total points
  const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0)

  // Calculate statistics
  const responses = quiz.responses
  const statistics = {
    totalSubmissions: responses.length,
    averageScore: responses.length > 0
      ? Math.round(
          responses.reduce((acc, r) => acc + (r.score || 0), 0) / responses.length
        )
      : 0,
    highestScore: responses.length > 0
      ? Math.max(...responses.map(r => r.score || 0))
      : 0,
    lowestScore: responses.length > 0
      ? Math.min(...responses.map(r => r.score || 0))
      : 0,
  }

  // Format data for client component
  const formattedQuiz = {
    id: quiz.id,
    title: quiz.title,
    description: quiz.description || '',
    questions: quiz.questions.map(q => ({
      id: q.id,
      questionText: q.questionText,
      points: q.points,
      questionType: q.questionType,
    })),
    totalPoints,
  }

  const formattedResponses = responses.map(r => ({
    id: r.id,
    userId: r.userId,
    score: r.score,
    completedAt: r.completedAt.toISOString(),
    user: r.user,
    details: r.details.map(d => ({
      questionId: d.questionId,
      answerGiven: d.answerGiven,
      isCorrect: d.isCorrect,
    })),
  }))

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Top Navigation Bar */}
      <header className="border-b border-border-primary bg-bg-secondary sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">{quiz.title}</h1>
              <p className="text-sm text-text-secondary mt-1">Quiz Results</p>
            </div>
            <a
              href={`/teacher/quizzes/${quizId}/edit`}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              ← Back to Quiz Editor
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <QuizResultsView
          quiz={formattedQuiz}
          responses={formattedResponses}
          statistics={statistics}
        />
      </main>
    </div>
  )
}
