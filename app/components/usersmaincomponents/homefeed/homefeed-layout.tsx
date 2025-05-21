'use client'

import Header from './header'
import LeftSidebar from './left-sidebar'
import RightSidebar from './right-sidebar'
import { cn } from '@/backend/lib/utils/utils'
import { motion } from 'framer-motion'

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#141824] to-[#1A1F2E] flex flex-col">
      <Header />
      <div className="flex flex-1 relative pt-16">
        <LeftSidebar />
        <motion.main 
          className={cn(
            "flex-1 p-4 md:p-6 overflow-auto",
            "ml-[64px] lg:ml-64",
            "mr-0 lg:mr-80",
            "mt-2",
            "transition-all duration-300 ease-in-out",
            className
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full max-w-3xl mx-auto lg:-translate-x-10">
            {children}
          </div>
        </motion.main>
        <RightSidebar />
      </div>
    </div>
  )
} 