'use client'

import { useQuery } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card } from '@/app/components/molecules/cards/Card'
import { Skeleton } from '@/app/components/atoms/feedback/Skeleton'
import Image from 'next/image'
import Link from 'next/link'
import { useFollow } from '@/hooks/useFollow'
import { Button } from '@/app/components/atoms/buttons/Button'

interface FollowListsProps {
  userId: string
  type: 'followers' | 'following'
  emptyMessage: string
}

export default function FollowLists({ userId, type, emptyMessage }: FollowListsProps) {
  const supabase = createClientComponentClient()
  const { isFollowing, toggleFollow } = useFollow()

  const { data, isLoading } = useQuery({
    queryKey: ['followLists', userId, type],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('follows')
        .select(`
          follower:profiles!follower_id(*),
          following:profiles!following_id(*)
        `)
        .eq(type === 'followers' ? 'following_id' : 'follower_id', userId)

      if (error) throw error
      
      return data.map(item => {
        // Type guard to handle the union type
        const user = type === 'followers' 
          ? (item as { follower: any }).follower 
          : (item as { following: any }).following;
          
        return {
          id: user.id,
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name,
          avatar_url: user.avatar_url
        }
      })
    }
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card className="p-4" key={i}>
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-9 w-20" />
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (!data || data.length === 0) {
    return <p className="text-center py-8 text-gray-500">{emptyMessage}</p>
  }

  return (
    <div className="space-y-4">
      {data.map(user => (
        <Card className="p-4" key={user.id}>
          <div className="flex items-center gap-4">
            <Link href={`/profile/${user.id}`}>
              <div className="relative h-12 w-12 rounded-full overflow-hidden">
                {user.avatar_url ? (
                  <Image
                    src={user.avatar_url}
                    alt={user.username || "User"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-600 text-lg font-medium">
                    {user.firstName?.[0] || user.username?.[0] || "U"}
                  </div>
                )}
              </div>
            </Link>
            <div className="flex-1">
              <Link href={`/profile/${user.id}`} className="font-medium hover:underline">
                {user.username || `${user.firstName} ${user.lastName}`}
              </Link>
              <p className="text-sm text-gray-500">
                {user.firstName} {user.lastName}
              </p>
            </div>
            {isFollowing(user.id) ? (
              <Button
                onClick={() => toggleFollow(user.id)}
                size="sm"
                variant="outline"
                className="ml-auto"
              >
                Unfollow
              </Button>
            ) : (
              <Button
                onClick={() => toggleFollow(user.id)}
                size="sm"
                variant="primary"
                className="ml-auto"
              >
                Follow
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
} 