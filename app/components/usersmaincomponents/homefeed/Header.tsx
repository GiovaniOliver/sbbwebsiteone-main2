'use client'

import Link from "next/link";
import { Bell, MessageCircle, Search, Plus, Loader2 } from "lucide-react";
import { Button } from '@/app/components/atoms/buttons/Button';
import { Input } from "@/app/components/atoms/inputs/Input";
import { UserProfileDropdown } from "@/app/components/molecules/navigation/user-profile-dropdown";
import { useUser } from "@/hooks/useUser";
import { Skeleton } from '@/app/components/atoms/feedback/Skeleton';
import { logDebug } from '@/lib/logger'

export default function Header() {
  const { user, isLoading } = useUser();

  // Log auth state for debugging
  logDebug('HomeFeedHeader', 'Auth State', { user: !!user, isLoading })

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-gradient-to-r from-[#0B1218] via-[#13202D] to-[#0B1218] border-b border-[#1B2730] shadow-lg">
      <div className="h-full w-full max-w-screen-2xl mx-auto px-4">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8">
            <Link
              href="/"
              className="text-xl font-bold text-white hover:text-gray-200 transition-colors flex items-center"
            >
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">SBB</span>
              <span className="ml-1 text-white">DAO</span>
            </Link>

            <div className="hidden sm:flex items-center gap-2 bg-[#1B2730]/80 backdrop-blur-sm rounded-md px-3 py-1.5 border border-[#2D3C4A]/50 shadow-inner">
              <Search className="h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="bg-transparent border-none text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 w-[200px]"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isLoading ? (
              <div className="flex items-center gap-4">
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-9 w-24" />
              </div>
            ) : user ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 text-gray-400 hover:text-white hover:bg-[#1B2730]/80 backdrop-blur-sm transition-colors relative rounded-full"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-[11px] text-white flex items-center justify-center font-medium border border-[#0B1218] shadow-md">
                    3
                  </span>
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium transition-colors border border-blue-400/20 shadow-md"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Deposit
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-[#1B2730]/80 backdrop-blur-sm transition-colors border border-[#2D3C4A]/30"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  General Chat
                </Button>

                <UserProfileDropdown />
              </>
            ) : (
              <Button
                variant="primary"
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium transition-colors border border-blue-400/20 shadow-md"
                disabled={isLoading}
                asChild
              >
                <Link href="/sign-in">
                  <span className="flex items-center">
                    {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                    Sign In
                  </span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
