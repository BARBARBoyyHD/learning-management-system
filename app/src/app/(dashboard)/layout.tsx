import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen overflow-hidden bg-bg-secondary">
      {/* Sidebar Navigation */}
      <DashboardSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-bg-secondary md:pt-0 pt-16 md:ml-72">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
