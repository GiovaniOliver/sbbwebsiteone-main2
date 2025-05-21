'use client'

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
import { useSupabase } from '@/hooks/useSupabase';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../DropdownMenuPrimitive";
import { Avatar, AvatarImage, AvatarFallback } from '../../display/Avatar';
import { Button } from '@/app/components/atoms/buttons/Button';
import { useToast } from '@/app/components/shared';

/**
 * User profile dropdown component
 * Displays user information and navigation options in a dropdown menu
 * 
 * @example
 * ```tsx
 * <UserProfileDropdown />
 * ```
 */
interface UserProfileDropdownProps {
  className?: string;
}

export function UserProfileDropdown({ className }: UserProfileDropdownProps) {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const { supabase } = useSupabase();
  const { toast } = useToast();

  const handleSignOut = async () => {
    if (!supabase) return;
    
    try {
      await supabase.auth.signOut();
      router.push('/');
      toast({
        title: 'Signed out successfully',
        description: 'You have been signed out of your account.',
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: 'Error signing out',
        description: 'There was a problem signing out. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar>
            <AvatarImage 
              src={user?.user_metadata?.avatar_url || ''} 
              alt={user?.user_metadata?.full_name || 'User avatar'} 
            />
            <AvatarFallback>
              {user?.user_metadata?.full_name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {user && (
          <div className="flex items-center gap-2 p-2">
            <Avatar>
              <AvatarImage 
                src={user.user_metadata?.avatar_url || ''} 
                alt={user.user_metadata?.full_name || 'User avatar'} 
              />
              <AvatarFallback>
                {user.user_metadata?.full_name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-medium">
                {user.user_metadata?.full_name || 'User'}
              </p>
              <p className="text-xs text-gray-500">
                {user.email}
              </p>
            </div>
          </div>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-red-500 focus:text-red-500" 
          onClick={handleSignOut}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserProfileDropdown; 