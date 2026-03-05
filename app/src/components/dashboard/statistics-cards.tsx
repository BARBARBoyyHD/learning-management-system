interface StatisticsCardsProps {
  stats: {
    total: number
    published: number
    draft: number
  }
}

interface StatCard {
  name: string
  value: number
  color: string
  bgColor: string
  borderColor: string
  icon: string
}

export function StatisticsCards({ stats }: StatisticsCardsProps) {
  const cards: StatCard[] = [
    {
      name: 'Total Quizzes',
      value: stats.total,
      color: 'text-white',
      bgColor: 'bg-neutral-800',
      borderColor: 'border-neutral-700',
      icon: 'library_books',
    },
    {
      name: 'Published',
      value: stats.published,
      color: 'text-success-base',
      bgColor: 'bg-success-base/10',
      borderColor: 'border-success-base/20',
      icon: 'check_circle',
    },
    {
      name: 'Draft',
      value: stats.draft,
      color: 'text-neutral-400',
      bgColor: 'bg-neutral-800',
      borderColor: 'border-neutral-700',
      icon: 'description',
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
              <span className={`material-symbols-outlined h-6 w-6 ${card.color}`}>{card.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
