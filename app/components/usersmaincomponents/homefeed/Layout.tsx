'use client'

import Header from './header'
import LeftSidebar from './left-sidebar'
import { cn } from '@/backend/lib/utils/utils'

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#0B1218]">
      <Header />
      <div className="flex pt-16">
        <LeftSidebar />
        <main className={cn("flex-1 p-6 overflow-auto", className)}>
          {children}
        </main>
      </div>
    </div>
  )
} 