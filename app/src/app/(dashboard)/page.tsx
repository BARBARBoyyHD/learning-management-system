/**
 * Teacher Dashboard Page
 *
 * Main dashboard for teachers after logging in.
 * Shows overview of courses, assessments, and recent activity.
 */

import { requireUser } from '@/lib/supabase/session'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function DashboardPage() {
  // Require authentication
  await requireUser()

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-semibold text-white">
          Welcome back!
        </h2>
        <p className="mt-2 text-neutral-400">
          Manage your courses and assessments from here.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-neutral-800 bg-neutral-900">
          <CardHeader className="pb-2">
            <CardDescription className="text-neutral-400">Total Courses</CardDescription>
            <CardTitle className="text-4xl font-bold text-white">0</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-500">Create your first course to get started</p>
          </CardContent>
        </Card>

        <Card className="border-neutral-800 bg-neutral-900">
          <CardHeader className="pb-2">
            <CardDescription className="text-neutral-400">Total Assessments</CardDescription>
            <CardTitle className="text-4xl font-bold text-white">0</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-500">Create assessments for your courses</p>
          </CardContent>
        </Card>

        <Card className="border-neutral-800 bg-neutral-900">
          <CardHeader className="pb-2">
            <CardDescription className="text-neutral-400">Active Students</CardDescription>
            <CardTitle className="text-4xl font-bold text-white">0</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-500">Students who joined your courses</p>
          </CardContent>
        </Card>

        <Card className="border-neutral-800 bg-neutral-900">
          <CardHeader className="pb-2">
            <CardDescription className="text-neutral-400">Recent Activity</CardDescription>
            <CardTitle className="text-4xl font-bold text-white">0</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-500">No recent activity</p>
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

        <Card className="border-neutral-800 bg-neutral-900">
          <CardHeader>
            <CardTitle className="text-white">Create Assessment</CardTitle>
            <CardDescription className="text-neutral-400">
              Create quizzes and assessments for your courses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-500">
              Assessment creation feature coming soon...
            </p>
          </CardContent>
        </Card>

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
    </div>
  )
}
