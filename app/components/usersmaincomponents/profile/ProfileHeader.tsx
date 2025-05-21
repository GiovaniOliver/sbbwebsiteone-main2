'use client'

import { useQuery } from '@tanstack/react-query'
import { Card } from '@/app/components/molecules/cards/Card'
import { Skeleton } from '@/app/components/atoms/feedback/Skeleton'
import Image from 'next/image'
import { useFollow } from '@/hooks/useFollow'
import { Button } from '@/app/components/atoms/buttons/Button'
import { useUser } from '@/hooks/useUser'
import { CalendarDays, MapPin, Users } from 'lucide-react'
import { useSupabase } from '@/hooks/useSupabase'
import { logDebug } from '@/lib/logger'

interface ProfileHeaderProps {
  userId: string
}

// Simple number formatting function since it's missing
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export default function ProfileHeader({ userId }: ProfileHeaderProps) {
  const { supabase } = useSupabase()
  const { user: currentUser } = useUser()
  const { isFollowing, toggleFollow } = useFollow()

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      try {
        // Only proceed if supabase is initialized
        if (!supabase) throw new Error('Supabase client not initialized')
        
        logDebug('ProfileHeader', 'Fetching profile', { userId })
        const { data, error } = await supabase
          .from('profiles')
          .select(`
            *,
            followers:follows!follows_following_id_fkey(count),
            following:follows!follows_follower_id_fkey(count)
          `)
          .eq('id', userId)
          .maybeSingle()

        if (error) {
          console.error('Error fetching profile:', error)
          throw new Error(error.message)
        }

        // If no profile found, try to get basic profile without relationships
        if (!data) {
          const { data: basicProfile, error: basicError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .maybeSingle()

          if (basicError) {
            console.error('Error fetching basic profile:', basicError)
            throw new Error('Profile not found')
          }

          // If no basic profile, create a placeholder profile for display
          if (!basicProfile) {
            console.log('No profile found, using placeholder');
            // Use data from the auth user if available
            const { data: authUser } = await supabase.auth.getUser();
            
            // Return a placeholder profile with minimal info
            return {
              id: userId,
              username: authUser?.user?.email?.split('@')[0] || 'New User',
              email: authUser?.user?.email || 'unknown@example.com',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              followers: { count: 0 },
              following: { count: 0 }
            };
          }

          // Return profile with empty followers/following counts
          return {
            ...basicProfile,
            followers: { count: 0 },
            following: { count: 0 }
          }
        }
        
        logDebug('ProfileHeader', 'Profile fetched successfully', data)
        return data
      } catch (err) {
        console.error('Failed to fetch profile:', err)
        throw err
      }
    },
    enabled: !!supabase && !!userId,
    retry: 1
  })

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Skeleton className="h-32 w-32 rounded-full" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-20 w-full" />
            <div className="flex gap-4">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
        </div>
      </Card>
    )
  }

  if (!profile) {
    return (
      <Card className="p-6">
        <div className="text-center text-gray-500">Profile not found</div>
      </Card>
    )
  }

  const isOwnProfile = currentUser?.id === userId
  
  // Detect if this is a placeholder profile
  const isPlaceholder = !profile.bio && 
                      !profile.avatar_url && 
                      (!profile.first_name && !profile.last_name);

  return (
    <Card className="p-6 border-0 shadow-md bg-gradient-to-r from-[#0E1C2A] to-[#1E304A]">
      {isPlaceholder && isOwnProfile && (
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-md p-4 mb-6">
          <h3 className="text-sm font-medium text-amber-800">Profile incomplete</h3>
          <div className="mt-2 text-sm text-amber-800">
            <p>Add a profile picture, bio, and personal details to make your profile stand out.</p>
          </div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <button
                type="button"
                className="bg-amber-500 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-amber-50 focus:ring-amber-600"
              >
                Complete Profile
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="relative">
          <Image
            src={profile.avatar_url || '/default-avatar.png'}
            alt={profile.username}
            width={160}
            height={160}
            className="rounded-full object-cover border-4 border-white shadow-lg"
          />
          {isOwnProfile && (
            <div className="absolute bottom-2 right-2">
              <Button variant="outline" size="sm" className="rounded-full bg-white shadow-sm h-8 w-8 p-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
              </Button>
            </div>
          )}
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-white">{profile.username}</h1>
            <p className="text-gray-300 mt-1">
              {profile.first_name && profile.last_name 
                ? `${profile.first_name} ${profile.last_name}`
                : profile.full_name || ''}
            </p>
          </div>

          <p className="text-gray-700">{profile.bio || 'No bio yet'}</p>

          <p className="text-gray-200 text-lg">{profile.bio || 'No bio yet'}</p>

          <div className="flex flex-wrap gap-6 text-base text-gray-300 mt-2">
            {profile.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-400" />
                {profile.location}
              </div>
            )}
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-blue-400" />
              Joined {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-400" />
              <span className="font-medium">{formatNumber(profile.followers?.count || 0)}</span> followers
              <span className="mx-1 text-gray-500">•</span>
              <span className="font-medium">{formatNumber(profile.following?.count || 0)}</span> following
            </div>
          </div>

          {isOwnProfile ? (
            <Button variant="outline" size="lg" className="bg-blue-600 text-white border-0 hover:bg-blue-700">
              Edit Profile
            </Button>
          ) : (
            <Button
              variant={isFollowing(userId) ? 'outline' : 'primary'}
              size="lg"
              className={isFollowing(userId) 
                ? "border-2 border-gray-300 text-white hover:bg-gray-700"
                : "bg-blue-600 text-white border-0 hover:bg-blue-700"}
              onClick={() => toggleFollow(userId)}
            >
              {isFollowing(userId) ? 'Unfollow' : 'Follow'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
