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
    select: {
      id: true,
      title: true,
      description: true,
      isPublic: true,
      accessCode: true,
      createdAt: true,
      updatedAt: true,
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
    createdAt: quiz.createdAt.toISOString(),
    updatedAt: quiz.updatedAt.toISOString(),
  }))

  // Check if a quiz was just created
  const createdQuizId = searchParams.created

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-text-primary">
            Welcome back!
          </h2>
          <p className="mt-2 text-text-secondary">
            Manage your courses and quizzes from here.
          </p>
        </div>

        {/* Create Quiz Button */}
        <Link href="/teacher/quizzes/new">
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
        <Card className="border-border-primary bg-bg-secondary">
          <CardHeader className="pb-2">
            <CardDescription className="text-text-secondary">Total Quizzes</CardDescription>
            <CardTitle className="text-4xl font-bold text-text-primary">{quizzes.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-text-tertiary">Create quizzes to assess your students</p>
          </CardContent>
        </Card>

        <Card className="border-border-primary bg-bg-secondary">
          <CardHeader className="pb-2">
            <CardDescription className="text-text-secondary">Total Questions</CardDescription>
            <CardTitle className="text-4xl font-bold text-text-primary">
              {quizzes.reduce((sum, q) => sum + q.questions.length, 0)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-text-tertiary">Questions across all quizzes</p>
          </CardContent>
        </Card>

        <Card className="border-border-primary bg-bg-secondary">
          <CardHeader className="pb-2">
            <CardDescription className="text-text-secondary">Total Attempts</CardDescription>
            <CardTitle className="text-4xl font-bold text-text-primary">
              {quizzes.reduce((sum, q) => sum + q.responses.length, 0)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-text-tertiary">Student quiz attempts</p>
          </CardContent>
        </Card>

        <Card className="border-border-primary bg-bg-secondary">
          <CardHeader className="pb-2">
            <CardDescription className="text-text-secondary">Published</CardDescription>
            <CardTitle className="text-4xl font-bold text-text-primary">
              {quizzes.filter((q) => q.isPublic).length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-text-tertiary">Quizzes visible to students</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border-primary bg-bg-secondary">
          <CardHeader>
            <CardTitle className="text-text-primary">Create Course</CardTitle>
            <CardDescription className="text-text-secondary">
              Start building a new course for your students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-text-tertiary">
              Course creation feature coming soon...
            </p>
          </CardContent>
        </Card>

        <Link href="/teacher/quizzes/new">
          <Card className="border-border-primary bg-bg-secondary hover:bg-bg-tertiary transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="text-text-primary">Create Quiz</CardTitle>
              <CardDescription className="text-text-secondary">
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

        <Card className="border-border-primary bg-bg-secondary">
          <CardHeader>
            <CardTitle className="text-text-primary">View Reports</CardTitle>
            <CardDescription className="text-text-secondary">
              Analyze student performance and quiz results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-text-tertiary">
              Reporting feature coming soon...
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Your Quizzes Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-text-primary flex items-center gap-2">
            <FileCheck className="h-6 w-6" />
            Your Quizzes
          </h3>
          {quizzes.length > 0 && (
            <Link href="/quizzes">
              <Button variant="outline" size="sm" className="border-border-primary text-text-secondary hover:bg-bg-tertiary">
                View All
              </Button>
            </Link>
          )}
        </div>

        <QuizList quizzes={formattedQuizzes} />
      </div>
    </div>
  )
}
