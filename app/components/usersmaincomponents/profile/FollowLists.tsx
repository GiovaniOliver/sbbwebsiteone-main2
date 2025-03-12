'use client'

import { useQuery } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card } from '../../ui/shared/card'
import { Skeleton } from '../../ui/shared/skeleton'
import Image from 'next/image'
import Link from 'next/link'
import { useFollow } from '@/hooks/useFollow'
import { Button } from '../../ui/shared/button'

interface FollowListsProps {
  userId: string
  type: 'followers' | 'following'
  emptyMessage: string
}

export default function FollowLists({ userId, type, emptyMessage }: FollowListsProps) {
  const supabase = createClientComponentClient()
  const { isFollowing, toggleFollow } = useFollow()

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['follow-list', userId, type],
    queryFn: async () => {
      const { data } = await supabase
        .from('follows')
        .select(`
          ${type === 'followers' ? 'follower:users!follower_id (*)' : 'following:users!following_id (*)'}
        `)
        .eq(type === 'followers' ? 'following_id' : 'follower_id', userId)

      if (!data) return []
      
      return data.map(item => {
        const user = type === 'followers' ? item.follower : item.following
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-9 w-24" />
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (!users.length) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <Card key={user.id} className="p-4">
          <div className="flex items-center gap-4">
            <Link href={`/profile/${user.id}`} className="shrink-0">
              <Image
                src={user.avatar_url || '/default-avatar.png'}
                alt={user.username || ''}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <Link href={`/profile/${user.id}`} className="hover:underline">
                <h3 className="font-semibold truncate">{user.username}</h3>
              </Link>
              <p className="text-sm text-gray-500 truncate">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <Button
              variant={isFollowing(user.id) ? 'outline' : 'default'}
              onClick={() => toggleFollow(user.id)}
              className="shrink-0"
            >
              {isFollowing(user.id) ? 'Unfollow' : 'Follow'}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
} 