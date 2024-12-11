import Header from './Header'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <LeftSidebar />
        <main className="flex-1 p-6">
          <div className="max-w-3xl mx-auto">
            {children}
          </div>
        </main>
        <RightSidebar />
      </div>
    </div>
  )
}

