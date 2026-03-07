import { cn } from '@/lib/utils'

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
  trend?: {
    value: string
    isPositive: boolean
  }
  icon: string
  iconBgColor: string
  iconColor: string
}

export function StatisticsCards({ stats }: StatisticsCardsProps) {
  const cards: StatCard[] = [
    {
      name: 'Total Quizzes',
      value: stats.total,
      trend: { value: '+5% this month', isPositive: true },
      icon: 'history_edu',
      iconBgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
    },
    {
      name: 'Published',
      value: stats.published,
      trend: { value: '+12% this month', isPositive: true },
      icon: 'check_circle',
      iconBgColor: 'bg-success-base/10',
      iconColor: 'text-success-base',
    },
    {
      name: 'Draft',
      value: stats.draft,
      trend: { value: '-2% this week', isPositive: false },
      icon: 'description',
      iconBgColor: 'bg-neutral-700/50',
      iconColor: 'text-neutral-400',
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.name}
          className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 transition-all hover:border-neutral-700"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-neutral-400 font-medium">{card.name}</p>
              <p className="text-3xl font-black text-white tracking-tight">{card.value}</p>
              {card.trend && (
                <div className={cn(
                  'flex items-center gap-1 text-xs font-bold',
                  card.trend.isPositive ? 'text-success-base' : 'text-error-base'
                )}>
                  <span className="material-symbols-outlined text-xs">
                    {card.trend.isPositive ? 'trending_up' : 'trending_down'}
                  </span>
                  <span>{card.trend.value}</span>
                </div>
              )}
            </div>
            <div className={`size-14 rounded-xl ${card.iconBgColor} ${card.iconColor} flex items-center justify-center`}>
              <span className="material-symbols-outlined text-3xl">{card.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
