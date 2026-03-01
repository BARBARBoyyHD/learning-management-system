import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-neutral-950">
      {/* Sidebar Navigation */}
      <DashboardSidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <div className="container mx-auto py-8 px-6">
          {children}
        </div>
      </main>
    </div>
  )
}
