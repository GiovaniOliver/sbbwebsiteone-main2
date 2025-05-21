'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/app/components/atoms/buttons/Button'
import { 
  Home, 
  Users, 
  ShoppingBag, 
  Calendar, 
  Settings, 
  LogOut,
  Compass,
  MessageSquare,
  Bell,
  LineChart
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/molecules/display/Avatar'
import { useUser } from '@/hooks/useUser'
import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { ProfileCompletionAlert } from '@/app/components/notifications/ProfileCompletionAlert'

export default function MainNavbar() {
  const pathname = usePathname()
  const { user } = useUser()
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/sign-in')
  }

  const navItems = [
    { href: '/homefeed', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { href: '/explore', label: 'Explore', icon: <Compass className="h-5 w-5" /> },
    { href: '/friends', label: 'Friends', icon: <Users className="h-5 w-5" /> },
    { href: '/messages', label: 'Messages', icon: <MessageSquare className="h-5 w-5" /> },
    { href: '/marketplace', label: 'Marketplace', icon: <ShoppingBag className="h-5 w-5" /> },
    { href: '/events', label: 'Events', icon: <Calendar className="h-5 w-5" /> },
    { href: '/buyingpower', label: 'Buying Power', icon: <LineChart className="h-5 w-5" /> },
  ]

  return (
    <>
      <ProfileCompletionAlert />
      <header 
        className={`fixed top-0 left-0 right-0 z-50 bg-[#0E1C2A] border-b border-[#1E2A3A] transition-all duration-200 ${
          isScrolled ? 'shadow-md' : ''
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/homefeed" className="flex items-center">
              <span className="text-xl font-bold text-white">SBB DAO</span>
            </Link>

            {/* Main Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
                return (
                  <Link key={item.href} href={item.href}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`flex items-center gap-1 text-white hover:bg-[#1E2A3A] ${
                        isActive ? 'bg-[#1E2A3A] border-b-2 border-blue-400' : 'border-b-2 border-transparent'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                )
              })}
            </nav>

            {/* Right side - user menu */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Link href="/notifications">
                <Button variant="ghost" size="sm" className="text-white hover:bg-[#1E2A3A] p-2">
                  <Bell className="h-5 w-5" />
                </Button>
              </Link>

              {/* Settings */}
              <Link href="/settings">
                <Button variant="ghost" size="sm" className="text-white hover:bg-[#1E2A3A] p-2">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
              
              {/* User profile */}
              {user && (
                <Link href={`/profile/${user.id}`}>
                  <Avatar className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity">
                    <AvatarImage src={user.user_metadata?.avatar_url} />
                    <AvatarFallback>
                      {user.user_metadata?.username?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              )}

              {/* Sign out */}
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-white hover:bg-[#1E2A3A] p-2">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
