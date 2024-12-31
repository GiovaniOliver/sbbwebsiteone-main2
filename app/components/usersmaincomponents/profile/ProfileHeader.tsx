'use client'

import { Button } from '@/app/components/usersmaincomponents/homefeed/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/usersmaincomponents/homefeed/ui/avatar'
import { MapPin, Link as LinkIcon, Calendar } from 'lucide-react'
import { useFollow } from '@/lib/hooks/useFollow'
import { useFollowLists } from '@/lib/hooks/useFollowLists'
import { useUser } from '@/lib/hooks/useUser'
import { Skeleton } from '@/app/components/usersmaincomponents/homefeed/ui/skeleton'
import { Badge } from '@/app/components/usersmaincomponents/homefeed/ui/badge'

interface ProfileHeaderProps {
  userId: string
  isOwnProfile: boolean
}

export default function ProfileHeader({ userId, isOwnProfile }: ProfileHeaderProps) {
  const { user: targetUser, isLoading: isLoadingUser } = useUser(userId)
  const { followers, following } = useFollowLists({ userId })
  const { isLoading: isLoadingFollow, toggleFollow, isFollowing } = useFollow({ 
    userId, 
    initialIsFollowing: false 
  })

  if (isLoadingUser) {
    return (
      <div className="relative">
        <Skeleton className="w-full h-48" />
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-5">
            <div className="flex justify-center sm:justify-start -mt-20 sm:-mt-16 mb-4 sm:mb-0">
              <Skeleton className="h-32 w-32 rounded-full border-4 border-background" />
            </div>
            <div className="flex-1 text-center sm:text-left space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!targetUser) {
    return null
  }

  const joinedDate = new Date(targetUser.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="relative">
      <div className="h-48 w-full bg-gradient-to-r from-blue-500 to-purple-500" />
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-5">
          <div className="flex justify-center sm:justify-start -mt-20 sm:-mt-16 mb-4 sm:mb-0">
            <Avatar className="h-32 w-32 rounded-full border-4 border-background">
              <AvatarImage src={targetUser.avatar || undefined} />
              <AvatarFallback>{targetUser.username?.[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 text-center sm:text-left space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold">
                  {targetUser.firstName} {targetUser.lastName}
                </h1>
                <p className="text-gray-500">@{targetUser.username}</p>
              </div>
              {!isOwnProfile && (
                <Button
                  onClick={toggleFollow}
                  disabled={isLoadingFollow}
                  variant={isFollowing ? 'outline' : 'default'}
                >
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </Button>
              )}
            </div>

            <div className="flex flex-wrap gap-4 justify-center sm:justify-start text-sm text-gray-500">
              {targetUser.web3WalletAddress && (
                <Badge variant="secondary">Web3 Verified</Badge>
              )}
              {targetUser.userType && (
                <Badge>{targetUser.userType}</Badge>
              )}
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Joined {joinedDate}
              </div>
            </div>

            <div className="flex justify-center sm:justify-start space-x-6 text-sm">
              <div>
                <span className="font-semibold">{followers.length}</span>{' '}
                <span className="text-gray-500">Followers</span>
              </div>
              <div>
                <span className="font-semibold">{following.length}</span>{' '}
                <span className="text-gray-500">Following</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 