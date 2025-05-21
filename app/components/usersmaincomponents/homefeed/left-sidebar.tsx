'use client'

import { usePathname } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { useState, useEffect } from 'react'
import { 
  LayoutGrid, 
  Users, 
  Bell,
  Video,
  Image,
  ShoppingBag,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  LineChart
} from 'lucide-react'
import { Route } from 'next'
import Link from 'next/link'
import { cn } from '@/backend/lib/utils/utils'
import { Button } from '@/app/components/atoms/buttons/Button'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/molecules/display/Avatar'

// Main navigation items
const mainNavItems = [
  { icon: <LayoutGrid className="h-5 w-5" />, label: 'Feed', href: '/homefeed' as Route },
  { icon: <Users className="h-5 w-5" />, label: 'Friends', href: '/friends' as Route },
  { icon: <Bell className="h-5 w-5" />, label: 'Events', href: '/events' as Route },
  { icon: <Video className="h-5 w-5" />, label: 'Watch Videos', href: '/videos' as Route },
  { icon: <Image className="h-5 w-5" />, label: 'Photos', href: '/photos' as Route },
  { icon: <ShoppingBag className="h-5 w-5" />, label: 'Marketplace', href: '/marketplace' as Route },
  { icon: <BookOpen className="h-5 w-5" />, label: 'SBB University', href: '/sbbuniversity' as Route },
  { icon: <LineChart className="h-5 w-5" />, label: 'BP Dashboard', href: '/dashboard' as Route },
]

export default function LeftSidebar() {
  const pathname = usePathname()
  const { user } = useUser()
  const [isOpen, setIsOpen] = useState(true)

  // Load sidebar state from session storage
  useEffect(() => {
    const savedState = sessionStorage.getItem('sidebarOpen')
    if (savedState !== null) {
      setIsOpen(savedState === 'true')
    }
  }, [])

  // Save sidebar state to session storage
  const toggleSidebar = () => {
    const newState = !isOpen
    setIsOpen(newState)
    sessionStorage.setItem('sidebarOpen', String(newState))
  }

  return (
    <aside className={cn(
      "fixed top-16 left-0 h-[calc(100vh-64px)]",
      "bg-gradient-to-b from-[#1B2130] to-[#182030] border-r border-[#2E3446]",
      "transition-all duration-300 z-30 shadow-md",
      // Mobile: collapsed by default (16px width)
      // Desktop: expanded by default (64 = 256px width) if isOpen is true
      isOpen ? "w-16 lg:w-64" : "w-16",
      "flex flex-col"
    )}>
      {/* User Profile Section */}
      {user && (
        <div className={cn(
          "p-4 flex items-center gap-3 border-b border-[#2E3446]/70 mb-2",
          !isOpen && "justify-center"
        )}>
          <Avatar className="h-10 w-10 border border-[#3D495E]/50 shadow-sm">
            <AvatarImage src={user.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-700">{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          {isOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user.user_metadata?.full_name || user.email}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {user.email}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 px-2 py-2 overflow-y-auto scrollbar-thin scrollbar-thumb-[#2E3446] scrollbar-track-transparent">
        {mainNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md my-1",
              "text-gray-400 hover:text-white hover:bg-[#2E3446]/80 hover:shadow-sm",
              "transition-all duration-200 whitespace-nowrap",
              pathname === item.href && "text-white bg-gradient-to-r from-[#2E3757] to-[#2E3446] shadow-sm border border-[#3D4E66]/30",
              !isOpen && "justify-center"
            )}
          >
            {item.icon}
            {isOpen && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Toggle Button - only visible on desktop */}
      <button
        onClick={toggleSidebar}
        className="hidden lg:block absolute top-4 right-0 transform translate-x-full bg-[#1B2130] p-2 rounded-r-md border border-l-0 border-[#2E3446] text-gray-400 hover:text-white shadow-md"
      >
        {isOpen ? (
          <ChevronLeft className="h-5 w-5" />
        ) : (
          <ChevronRight className="h-5 w-5" />
        )}
      </button>
    </aside>
  )
}
