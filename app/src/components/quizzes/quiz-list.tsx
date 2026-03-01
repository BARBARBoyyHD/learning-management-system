'use client'

import { Quiz } from '@/types/quiz'
import { QuizCard } from './quiz-card'
import { QuizFilters } from './quiz-filters'
import { PlusCircle, Library, Sparkles } from 'lucide-react'
import Link from 'next/link'

interface QuizListProps {
  quizzes: Quiz[]
}

export function QuizList({ quizzes }: QuizListProps) {
  // TODO: Implement search and filter when QuizFilters is created
  // For now, just show all quizzes or empty state

  if (quizzes.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-12 text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-base/20 to-primary-base/5">
          <Library className="h-10 w-10 text-primary-base" />
        </div>
        
        {/* Heading */}
        <h3 className="text-2xl font-bold text-white mb-2">
          Oops, no quizzes yet!
        </h3>
        
        {/* Description */}
        <p className="text-neutral-400 mb-8 max-w-md mx-auto leading-relaxed">
          Create your first quiz to get started. It only takes a few minutes to set up.
        </p>
        
        {/* CTA Button */}
        <Link
          href="/quizzes/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary-base px-6 py-3 text-sm font-medium text-white hover:bg-primary-hover transition-all shadow-lg shadow-primary-base/20 hover:shadow-primary-base/30"
        >
          <PlusCircle className="h-4 w-4" />
          Create Your First Quiz
        </Link>
        
        {/* Quick Tips */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
          <div className="rounded-lg bg-neutral-800/50 p-4">
            <Sparkles className="h-5 w-5 text-primary-base mx-auto mb-2" />
            <p className="text-xs font-medium text-white">5 Question Types</p>
            <p className="text-xs text-neutral-500 mt-1">MC, Essay, Fill-in & more</p>
          </div>
          <div className="rounded-lg bg-neutral-800/50 p-4">
            <Sparkles className="h-5 w-5 text-primary-base mx-auto mb-2" />
            <p className="text-xs font-medium text-white">Auto-grading</p>
            <p className="text-xs text-neutral-500 mt-1">Instant feedback</p>
          </div>
          <div className="rounded-lg bg-neutral-800/50 p-4">
            <Sparkles className="h-5 w-5 text-primary-base mx-auto mb-2" />
            <p className="text-xs font-medium text-white">Access Codes</p>
            <p className="text-xs text-neutral-500 mt-1">Private quizzes</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Filters and Search */}
      <QuizFilters />

      {/* Quiz Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  )
}
