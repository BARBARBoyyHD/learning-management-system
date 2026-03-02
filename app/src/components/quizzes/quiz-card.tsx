'use client'

import { Quiz } from '@/types/quiz'
import { useState } from 'react'
import Link from 'next/link'

interface QuizCardProps {
  quiz: Quiz
}

export function QuizCard({ quiz }: QuizCardProps) {
  const [showMenu, setShowMenu] = useState(false)

  const statusConfig = {
    draft: {
      label: 'Draft',
      color: 'bg-neutral-700 text-neutral-300',
      dot: 'bg-neutral-400',
    },
    published: {
      label: 'Published',
      color: 'bg-success-base/20 text-success-base',
      dot: 'bg-success-base',
    },
    archived: {
      label: 'Archived',
      color: 'bg-neutral-800 text-neutral-500',
      dot: 'bg-neutral-500',
    },
  }

  const config = statusConfig[quiz.status]

  return (
    <div className="group rounded-xl border border-neutral-800 bg-neutral-900 p-6 transition-all hover:border-neutral-700 hover:shadow-lg hover:shadow-neutral-900/50">
      {/* Status Badge */}
      <div className="flex items-center justify-between mb-4">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
          {config.label}
        </span>

        {/* Quick Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            href={`/quizzes/${quiz.id}/edit`}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
            title="Edit"
          >
            <span className="material-symbols-outlined h-4 w-4">edit</span>
          </Link>
          <button
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
            title="Duplicate"
          >
            <span className="material-symbols-outlined h-4 w-4">content_copy</span>
          </button>
          <button
            className="p-1.5 text-neutral-400 hover:text-error-base hover:bg-neutral-800 rounded-lg transition-colors"
            title="Delete"
            onClick={(e) => {
              e.stopPropagation()
              setShowMenu(!showMenu)
            }}
          >
            <span className="material-symbols-outlined h-4 w-4">delete</span>
          </button>
        </div>
      </div>

      {/* Title & Description */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1">
          {quiz.title}
        </h3>
        {quiz.description ? (
          <p className="text-sm text-neutral-400 line-clamp-2">
            {quiz.description}
          </p>
        ) : (
          <p className="text-sm text-neutral-600 italic">No description</p>
        )}
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-3 text-xs text-neutral-500 mb-4">
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined h-3.5 w-3.5">library_books</span>
          {quiz.questionCount} questions
        </span>
        {quiz.accessCode && (
          <span className="flex items-center gap-1 px-2 py-1 bg-neutral-800 rounded text-neutral-400">
            <span className="material-symbols-outlined h-3 w-3">vpn_key</span>
            {quiz.accessCode}
          </span>
        )}
      </div>

      {/* Last Modified */}
      <div className="pt-4 border-t border-neutral-800">
        <p className="text-xs text-neutral-600">
          Updated {new Date(quiz.updatedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </div>
    </div>
  )
}
