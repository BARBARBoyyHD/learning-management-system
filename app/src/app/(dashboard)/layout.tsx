import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-neutral-950">
      {/* Sidebar Navigation */}
      <DashboardSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-neutral-950">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
