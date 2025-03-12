'use client'

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

import {
  Bolt,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Layers2,
  LogOut,
  Pin,
  UserPen,
} from "lucide-react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
import { useEffect, useState } from 'react';

export function UserProfileDropdown() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { user, isLoading } = useUser();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      // Navigation is handled by onAuthStateChange in useUser hook
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (isLoading) {
    return (
      <Button variant="ghost" className="h-auto p-0 hover:bg-transparent text-gray-400">
        <Avatar>
          <AvatarFallback>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
          </AvatarFallback>
        </Avatar>
      </Button>
    );
  }

  if (!user) {
    return (
      <Button
        variant="ghost"
        disabled={isSigningIn}
        onClick={async () => {
          setIsSigningIn(true);
          try {
            router.push('/sign-in');
          } catch (error) {
            console.error('Sign in error:', error);
            setIsSigningIn(false);
          }
        }}
        className="text-gray-400 hover:text-white hover:bg-[#1B2730] px-4 py-2 rounded-md transition-colors"
      >
        {isSigningIn ? 'Signing In...' : 'User Sign-In'}
        {!isSigningIn && <ChevronRight className="ml-2 h-4 w-4" />}
      </Button>
    );
  }

  const userInitials = user.firstName && user.lastName
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : user.email?.[0].toUpperCase() || 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent text-gray-400">
          <Avatar>
            <AvatarImage
              src={user.avatar_url || 'https://source.unsplash.com/random/100x100/?portrait'}
              alt={user.username || 'Profile'}
            />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
          <ChevronDown
            size={16}
            strokeWidth={2}
            className="ms-2 opacity-60"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 bg-[#0B1218] border-[#1B2730] text-gray-300">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-white">
            {user.username || user.email}
          </span>
          <span className="truncate text-xs font-normal text-gray-400">
            {user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[#1B2730]" />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="flex items-center gap-2 hover:bg-[#1B2730] hover:text-white focus:bg-[#1B2730] focus:text-white cursor-pointer">
            <Link href="/profile">
              <Bolt
                size={16}
                strokeWidth={2}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 hover:bg-[#1B2730] hover:text-white focus:bg-[#1B2730] focus:text-white cursor-pointer">
            <Bolt
              size={16}
              strokeWidth={2}
              className="opacity-60"
              aria-hidden="true"
            />
            <span>Option 1</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 hover:bg-[#1B2730] hover:text-white focus:bg-[#1B2730] focus:text-white cursor-pointer">
            <Layers2
              size={16}
              strokeWidth={2}
              className="opacity-60"
              aria-hidden="true"
            />
            <span>Option 2</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 hover:bg-[#1B2730] hover:text-white focus:bg-[#1B2730] focus:text-white cursor-pointer">
            <BookOpen
              size={16}
              strokeWidth={2}
              className="opacity-60"
              aria-hidden="true"
            />
            <span>Option 3</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-[#1B2730]" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex items-center gap-2 hover:bg-[#1B2730] hover:text-white focus:bg-[#1B2730] focus:text-white cursor-pointer">
            <Pin
              size={16}
              strokeWidth={2}
              className="opacity-60"
              aria-hidden="true"
            />
            <span>Option 4</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 hover:bg-[#1B2730] hover:text-white focus:bg-[#1B2730] focus:text-white cursor-pointer">
            <UserPen
              size={16}
              strokeWidth={2}
              className="opacity-60"
              aria-hidden="true"
            />
            <span>Option 5</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-[#1B2730]" />
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="flex items-center gap-2 hover:bg-[#1B2730] hover:text-white focus:bg-[#1B2730] focus:text-white cursor-pointer"
        >
          <LogOut
            size={16}
            strokeWidth={2}
            className="opacity-60"
            aria-hidden="true"
          />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
