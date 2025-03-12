'use client'

import { useQuery } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card } from '../../ui/shared/card'
import { Skeleton } from '../../ui/shared/skeleton'
import Image from 'next/image'
import { useFollow } from '@/hooks/useFollow'
import { Button } from '../../ui/shared/button'
import { useUser } from '@/hooks/useUser'
import { CalendarDays, MapPin, Users } from 'lucide-react'

interface ProfileHeaderProps {
  userId: string
}

export default function ProfileHeader({ userId }: ProfileHeaderProps) {
  const supabase = createClientComponentClient()
  const { user: currentUser } = useUser()
  const { isFollowing, toggleFollow } = useFollow()

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      const { data } = await supabase
        .from('profiles')
        .select(`
          *,
          followers:follows!following_id (count),
          following:follows!follower_id (count)
        `)
        .eq('id', userId)
        .single()

      if (!data) throw new Error('Profile not found')
      return data
    }
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

  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Image
          src={profile.avatar_url || '/default-avatar.png'}
          alt={profile.username}
          width={128}
          height={128}
          className="rounded-full object-cover"
        />
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-2xl font-bold">{profile.username}</h1>
            <p className="text-gray-500">
              {profile.firstName} {profile.lastName}
            </p>
          </div>

          <p className="text-gray-700">{profile.bio || 'No bio yet'}</p>

          <div className="flex flex-wrap gap-6 text-sm text-gray-500">
            {profile.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {profile.location}
              </div>
            )}
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              Joined {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{profile.followers.count} followers</span>
              <span className="mx-1">·</span>
              <span>{profile.following.count} following</span>
            </div>
          </div>

          {!isOwnProfile && (
            <Button
              variant={isFollowing(userId) ? 'outline' : 'default'}
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