/**
 * Quiz Card Component
 *
 * Displays a single quiz card with title, description, status, and actions.
 * Used in quiz lists on dashboard and other pages.
 */

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, Edit, Eye } from 'lucide-react'

/**
 * Quiz card props
 */
export interface QuizCardProps {
  /** Quiz ID */
  id: string
  /** Quiz title */
  title: string
  /** Quiz description */
  description?: string | null
  /** Whether quiz is public (published) */
  isPublic: boolean
  /** Access code for private quizzes */
  accessCode?: string | null
  /** Question count */
  questionCount?: number
  /** Student count */
  studentCount?: number
}

/**
 * QuizCard component
 */
export function QuizCard({
  id,
  title,
  description,
  isPublic,
  accessCode,
  questionCount = 0,
  studentCount = 0,
}: QuizCardProps) {
  return (
    <Card className="border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg text-neutral-900 line-clamp-1">
            {title}
          </CardTitle>
          {/* Status Badge */}
          <Badge
            variant={isPublic ? 'default' : 'secondary'}
            className={
              isPublic
                ? 'bg-success-base text-white'
                : 'bg-warning-base text-white'
            }
          >
            {isPublic ? 'Published' : 'Draft'}
          </Badge>
        </div>
        {description && (
          <CardDescription className="text-neutral-600 line-clamp-2">
            {description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-4 text-sm text-neutral-500">
          {/* Question Count */}
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{questionCount} questions</span>
          </div>

          {/* Student Count */}
          {studentCount > 0 && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{studentCount} attempts</span>
            </div>
          )}

          {/* Access Code for Private Quizzes */}
          {!isPublic && accessCode && (
            <div className="flex items-center gap-1 text-xs bg-neutral-100 px-2 py-1 rounded">
              <span>Code: {accessCode}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        {/* Edit Button */}
        <Link href={`/quizzes/${id}/edit`}>
          <Button
            variant="outline"
            size="sm"
            className="border-neutral-300 text-neutral-700 hover:bg-neutral-100"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </Link>

        {/* View Button (only for published) */}
        {isPublic && (
          <Link href={`/quizzes/${id}`}>
            <Button
              variant="default"
              size="sm"
              className="bg-primary-base text-white hover:bg-primary-hover"
            >
              <Eye className="mr-2 h-4 w-4" />
              View
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}
