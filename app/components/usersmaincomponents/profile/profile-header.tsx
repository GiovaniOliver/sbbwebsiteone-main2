'use client'

import { Button } from '@/app/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'
import { Calendar, Globe, Twitter, Instagram, Linkedin, Youtube, MessageSquare } from 'lucide-react'
import { useFollow } from '@/hooks/useFollow'
import { useFollowLists } from '@/hooks/useFollowLists'
import { useUser } from '@/hooks/useUser'
import { Skeleton } from '@/app/components/ui/skeleton'
import { Badge } from '@/app/components/ui/badge'
import { Card } from '@/app/components/ui/card'
import { User } from '@/backend/lib/types/models'
import { useQuery } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface ProfileUser {
  id: string
  username: string
  firstName: string
  lastName: string
  email: string
  imageUrl: string
  bio: string
  role: string
  web3WalletAddress: string
  totalLikes: number
  createdAt: string
  profileVideo: string
}

interface ProfileHeaderProps {
  userId: string
}

export default function ProfileHeader({ userId }: ProfileHeaderProps) {
  const { user: currentUser } = useUser()
  const { followers, following } = useFollowLists({ userId })
  const { toggleFollow, isFollowing } = useFollow()
  const supabase = createClientComponentClient()

  const { data: targetUser, isLoading: isLoadingUser } = useQuery<ProfileUser>({
    queryKey: ['user', userId],
    queryFn: async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      return data as ProfileUser
    }
  })

  const isOwnProfile = currentUser?.id === userId

  const handleToggleFollow = () => {
    if (userId) {
      toggleFollow(userId)
    }
  }

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

  // Mock social links (replace with actual data from your backend)
  const socialLinks = {
    twitter: 'https://twitter.com/username',
    instagram: 'https://instagram.com/username',
    linkedin: 'https://linkedin.com/in/username',
    youtube: 'https://youtube.com/@username',
    website: 'https://example.com'
  }

  return (
    <div className="relative">
      <div className="h-48 w-full bg-gradient-to-r from-blue-500 to-purple-500">
        {targetUser.profileVideo && typeof targetUser.profileVideo === 'string' && (
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={targetUser.profileVideo} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-5">
          <div className="flex justify-center sm:justify-start -mt-20 sm:-mt-16 mb-4 sm:mb-0">
            <Avatar className="h-32 w-32 rounded-full border-4 border-background">
              <AvatarImage src={targetUser.imageUrl || undefined} />
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
              <div className="flex gap-2">
                {!isOwnProfile && (
                  <>
                    <Button
                      onClick={handleToggleFollow}
                      disabled={false}
                      variant={isFollowing(userId) ? 'outline' : 'default'}
                    >
                      {isFollowing(userId) ? 'Unfollow' : 'Follow'}
                    </Button>
                    <Button variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </>
                )}
              </div>
            </div>

            {targetUser.bio && (
              <p className="text-gray-700">{targetUser.bio}</p>
            )}

            <div className="flex flex-wrap gap-4 justify-center sm:justify-start text-sm text-gray-500">
              {targetUser.web3WalletAddress && (
                <Badge variant="secondary">Web3 Verified</Badge>
              )}
              {targetUser.role && (
                <Badge>{targetUser.role}</Badge>
              )}
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Joined {joinedDate}
              </div>
            </div>

            <div className="flex flex-wrap gap-6 justify-center sm:justify-start text-sm">
              <div>
                <span className="font-semibold">{followers.length}</span>{' '}
                <span className="text-gray-500">Followers</span>
              </div>
              <div>
                <span className="font-semibold">{following.length}</span>{' '}
                <span className="text-gray-500">Following</span>
              </div>
              <div>
                <span className="font-semibold">{targetUser.totalLikes || 0}</span>{' '}
                <span className="text-gray-500">Likes</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-gray-500">
              {socialLinks.website && (
                <a href={socialLinks.website} target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">
                  <Globe className="h-5 w-5" />
                </a>
              )}
              {socialLinks.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {socialLinks.youtube && (
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-red-600">
                  <Youtube className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 