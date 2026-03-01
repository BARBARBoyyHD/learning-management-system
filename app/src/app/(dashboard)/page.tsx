/**
 * Teacher Dashboard Page
 *
 * Main dashboard for teachers after logging in.
 * Shows overview of courses, quizzes, and recent activity.
 */

import { requireUser } from '@/lib/supabase/session'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { QuizList } from '@/components/quizzes/quiz-list'
import { Plus, FileCheck } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { created?: string }
}) {
  // Require authentication
  const user = await requireUser()

  // Get user's quizzes
  const quizzes = await prisma.quiz.findMany({
    where: { teacherId: user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      questions: {
        select: { id: true },
      },
      responses: {
        select: { id: true },
      },
    },
  })

  // Format quizzes for display
  const formattedQuizzes = quizzes.map((quiz) => ({
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
    isPublic: quiz.isPublic,
    accessCode: quiz.accessCode,
    questionCount: quiz.questions.length,
    studentCount: quiz.responses.length,
  }))

  // Check if a quiz was just created
  const createdQuizId = searchParams.created

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white">
            Welcome back!
          </h2>
          <p className="mt-2 text-neutral-400">
            Manage your courses and quizzes from here.
          </p>
        </div>

        {/* Create Quiz Button */}
        <Link href="/quizzes/new">
          <Button className="bg-primary-base text-white hover:bg-primary-hover shadow-lg shadow-primary/20">
            <Plus className="mr-2 h-5 w-5" />
            Create Quiz
          </Button>
        </Link>
      </div>

      {/* Success Message */}
      {createdQuizId && (
        <div className="rounded-xl border border-success/20 bg-success/10 p-4">
          <p className="text-sm text-success-base">
            ✓ Quiz created successfully! Start adding questions to your quiz.
          </p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-neutral-800 bg-neutral-900">
          <CardHeader className="pb-2">
            <CardDescription className="text-neutral-400">Total Quizzes</CardDescription>
            <CardTitle className="text-4xl font-bold text-white">{quizzes.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-500">Create quizzes to assess your students</p>
          </CardContent>
        </Card>

        <Card className="border-neutral-800 bg-neutral-900">
          <CardHeader className="pb-2">
            <CardDescription className="text-neutral-400">Total Questions</CardDescription>
            <CardTitle className="text-4xl font-bold text-white">
              {quizzes.reduce((sum, q) => sum + q.questions.length, 0)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-500">Questions across all quizzes</p>
          </CardContent>
        </Card>

        <Card className="border-neutral-800 bg-neutral-900">
          <CardHeader className="pb-2">
            <CardDescription className="text-neutral-400">Total Attempts</CardDescription>
            <CardTitle className="text-4xl font-bold text-white">
              {quizzes.reduce((sum, q) => sum + q.responses.length, 0)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-500">Student quiz attempts</p>
          </CardContent>
        </Card>

        <Card className="border-neutral-800 bg-neutral-900">
          <CardHeader className="pb-2">
            <CardDescription className="text-neutral-400">Published</CardDescription>
            <CardTitle className="text-4xl font-bold text-white">
              {quizzes.filter((q) => q.isPublic).length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-500">Quizzes visible to students</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-neutral-800 bg-neutral-900">
          <CardHeader>
            <CardTitle className="text-white">Create Course</CardTitle>
            <CardDescription className="text-neutral-400">
              Start building a new course for your students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-500">
              Course creation feature coming soon...
            </p>
          </CardContent>
        </Card>

        <Link href="/quizzes/new">
          <Card className="border-neutral-800 bg-neutral-900 hover:bg-neutral-800 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="text-white">Create Quiz</CardTitle>
              <CardDescription className="text-neutral-400">
                Create quizzes and assessments for your students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-primary-base text-white hover:bg-primary-hover">
                <Plus className="mr-2 h-4 w-4" />
                Create Quiz
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Card className="border-neutral-800 bg-neutral-900">
          <CardHeader>
            <CardTitle className="text-white">View Reports</CardTitle>
            <CardDescription className="text-neutral-400">
              Analyze student performance and quiz results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-500">
              Reporting feature coming soon...
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Your Quizzes Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <FileCheck className="h-6 w-6" />
            Your Quizzes
          </h3>
          {quizzes.length > 0 && (
            <Link href="/quizzes">
              <Button variant="outline" size="sm" className="border-neutral-700 text-neutral-300 hover:bg-neutral-800">
                View All
              </Button>
            </Link>
          )}
        </div>

        <QuizList
          quizzes={formattedQuizzes}
          emptyMessage="You haven't created any quizzes yet. Click 'Create Quiz' to get started!"
        />
      </div>
    </div>
  )
}
