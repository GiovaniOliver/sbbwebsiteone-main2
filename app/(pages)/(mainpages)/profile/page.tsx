/* eslint-disable react/no-unescaped-entities */
'use client'

import Layout from '@/app/components/usersmaincomponents/homefeed/Layout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/usersmaincomponents/homefeed/ui/tabs'
import { PlaySquare, Heart, Bookmark, Users } from 'lucide-react'
import ProfileHeader from '@/app/components/usersmaincomponents/profile/ProfileHeader'
import VideoGrid from '@/app/components/usersmaincomponents/profile/VideoGrid'
import { FollowLists } from '@/app/components/usersmaincomponents/profile/FollowLists'
import { useUser } from '@/lib/hooks/useUser'
import { useParams } from 'next/navigation'

export default function ProfilePage() {
  const params = useParams()
  const userId = typeof params.userId === 'string' ? params.userId : undefined
  const { data: currentUser } = useUser()
  const targetUserId = userId || currentUser?.id

  if (!targetUserId) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto p-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold">User not found</h2>
            <p className="text-gray-500 mt-2">The user profile you're looking for doesn't exist.</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <ProfileHeader userId={targetUserId} isOwnProfile={targetUserId === currentUser?.id} />

        {/* Content Tabs */}
        <Tabs defaultValue="videos" className="px-8">
          <TabsList className="w-full justify-start border-b pb-0 mb-8">
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <PlaySquare className="h-4 w-4" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="liked" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Liked
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              Saved
            </TabsTrigger>
            <TabsTrigger value="connections" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Connections
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos">
            <VideoGrid 
              userId={targetUserId}
              type="uploaded"
              emptyMessage="No videos uploaded yet" 
            />
          </TabsContent>

          <TabsContent value="liked">
            <VideoGrid 
              userId={targetUserId}
              type="liked"
              emptyMessage="No liked videos" 
            />
          </TabsContent>

          <TabsContent value="saved">
            <VideoGrid 
              userId={targetUserId}
              type="saved"
              emptyMessage="No saved videos" 
            />
          </TabsContent>

          <TabsContent value="connections">
            <FollowLists userId={targetUserId} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
