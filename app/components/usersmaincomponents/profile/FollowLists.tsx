'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/usersmaincomponents/homefeed/ui/tabs'
import { useFollowLists } from '@/lib/hooks/useFollowLists'
import { useFollow } from '@/lib/hooks/useFollow'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/usersmaincomponents/homefeed/ui/avatar'
import { Button } from '@/app/components/usersmaincomponents/homefeed/ui/button'
import { Skeleton } from '@/app/components/usersmaincomponents/homefeed/ui/skeleton'
import { useUser } from '@/lib/hooks/useUser'
import Link from 'next/link'

interface FollowListsProps {
  userId: string
}

export function FollowLists({ userId }: FollowListsProps) {
  const { followers, following, isLoadingFollowers, isLoadingFollowing } = useFollowLists({ userId })
  const { data: currentUser } = useUser()

  const FollowButton = ({ targetUserId }: { targetUserId: string }) => {
    const isCurrentUser = currentUser?.id === targetUserId
    const isFollowing = following.some(f => f.following?.id === targetUserId)
    const { isLoading, toggleFollow } = useFollow({ userId: targetUserId, initialIsFollowing: isFollowing })

    if (isCurrentUser) return null

    return (
      <Button
        variant={isFollowing ? 'outline' : 'default'}
        size="sm"
        onClick={toggleFollow}
        disabled={isLoading}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
    )
  }

  const UserList = ({ users, type }: { users: typeof followers | typeof following, type: 'followers' | 'following' }) => {
    if (isLoadingFollowers || isLoadingFollowing) {
      return (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-card rounded-lg">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <Skeleton className="h-8 w-20" />
            </div>
          ))}
        </div>
      )
    }

    const displayUsers = users.map(relation => type === 'followers' ? relation.follower : relation.following)
      .filter(user => user !== undefined)

    if (displayUsers.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No {type} yet
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {displayUsers.map(user => (
          <div key={user?.id} className="flex items-center justify-between p-4 bg-card rounded-lg">
            <Link href={`/profile/${user?.id}`} className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={user?.avatar || undefined} />
                <AvatarFallback>{user?.username?.[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user?.username}</p>
                <p className="text-sm text-gray-500">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>
            </Link>
            <FollowButton targetUserId={user?.id || ''} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <Tabs defaultValue="followers" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="followers">
          Followers ({followers.length})
        </TabsTrigger>
        <TabsTrigger value="following">
          Following ({following.length})
        </TabsTrigger>
      </TabsList>
      <TabsContent value="followers" className="mt-4">
        <UserList users={followers} type="followers" />
      </TabsContent>
      <TabsContent value="following" className="mt-4">
        <UserList users={following} type="following" />
      </TabsContent>
    </Tabs>
  )
} 