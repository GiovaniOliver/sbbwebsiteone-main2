'use client'

import Link from "next/link";
import { Bell, MessageCircle, Search, Plus, Loader2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { UserProfileDropdown } from "@/app/components/ui/user-profile-dropdown";
import { useUser } from "@/hooks/useUser";
import { Skeleton } from "@/app/components/ui/skeleton";

export default function Header() {
  const { user, isLoading } = useUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B1218] border-b border-[#1B2730]">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-xl font-bold text-white hover:text-gray-200 transition-colors"
            >
              SBB DAO
            </Link>

            <div className="flex items-center gap-2 bg-[#1B2730] rounded-md px-3 py-1.5">
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
                  size="icon"
                  className="text-gray-400 hover:text-white hover:bg-[#1B2730] transition-colors relative"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-[11px] text-white flex items-center justify-center font-medium">
                    3
                  </span>
                </Button>

                <Button
                  variant="default"
                  size="sm"
                  className="bg-[#2563EB] hover:bg-blue-600 text-white font-medium transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Deposit
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-[#1B2730] transition-colors"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  General Chat
                </Button>

                <UserProfileDropdown />
              </>
            ) : (
              <Button
                variant="default"
                size="sm"
                className="bg-[#2563EB] hover:bg-blue-600 text-white font-medium transition-colors"
                disabled={isLoading}
                asChild
              >
                <Link href="/sign-in">
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  Sign In
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
