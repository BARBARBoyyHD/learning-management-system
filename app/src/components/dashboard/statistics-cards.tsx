import { Library, CheckCircle2, FileText, Archive } from 'lucide-react'

interface StatisticsCardsProps {
  stats: {
    total: number
    published: number
    draft: number
    archived: number
  }
}

export function StatisticsCards({ stats }: StatisticsCardsProps) {
  const cards = [
    {
      name: 'Total Quizzes',
      value: stats.total,
      icon: Library,
      color: 'text-white',
      bgColor: 'bg-neutral-800',
      borderColor: 'border-neutral-700',
    },
    {
      name: 'Published',
      value: stats.published,
      icon: CheckCircle2,
      color: 'text-success-base',
      bgColor: 'bg-success-base/10',
      borderColor: 'border-success-base/20',
    },
    {
      name: 'Draft',
      value: stats.draft,
      icon: FileText,
      color: 'text-neutral-400',
      bgColor: 'bg-neutral-800',
      borderColor: 'border-neutral-700',
    },
    {
      name: 'Archived',
      value: stats.archived,
      icon: Archive,
      color: 'text-neutral-500',
      bgColor: 'bg-neutral-800/50',
      borderColor: 'border-neutral-800',
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.name}
          className={`rounded-xl border ${card.borderColor} bg-neutral-900 p-6 transition-all hover:border-neutral-600`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-400">{card.name}</p>
              <p className="mt-2 text-3xl font-bold text-white">{card.value}</p>
            </div>
            <div className={`rounded-lg ${card.bgColor} p-3`}>
              <card.icon className={`h-6 w-6 ${card.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
