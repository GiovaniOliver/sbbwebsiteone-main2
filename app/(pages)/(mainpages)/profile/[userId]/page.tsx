'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/shared/tabs'
import ProfileHeader from '@/app/components/usersmaincomponents/profile/ProfileHeader'
import VideoGrid from '@/app/components/usersmaincomponents/profile/VideoGrid'
import PlaylistGrid from '@/app/components/usersmaincomponents/profile/PlaylistGrid'
import LiveEventsList from '@/app/components/usersmaincomponents/profile/LiveEventsList'
import FollowLists from '@/app/components/usersmaincomponents/profile/FollowLists'

interface ProfilePageProps {
  params: {
    userId: string
  }
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return (
    <div className="container py-6 space-y-6">
      <ProfileHeader userId={params.userId} />

      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="live-events">Live Events</TabsTrigger>
          <TabsTrigger value="followers">Followers</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="mt-6">
          <VideoGrid
            userId={params.userId}
            type="uploaded"
            emptyMessage="No videos uploaded yet"
          />
        </TabsContent>

        <TabsContent value="playlists" className="mt-6">
          <PlaylistGrid
            userId={params.userId}
            emptyMessage="No playlists created yet"
          />
        </TabsContent>

        <TabsContent value="live-events" className="mt-6">
          <Tabs defaultValue="hosting">
            <TabsList>
              <TabsTrigger value="hosting">Hosting</TabsTrigger>
              <TabsTrigger value="attending">Attending</TabsTrigger>
            </TabsList>
            <TabsContent value="hosting" className="mt-6">
              <LiveEventsList
                userId={params.userId}
                type="hosting"
                emptyMessage="Not hosting any upcoming events"
              />
            </TabsContent>
            <TabsContent value="attending" className="mt-6">
              <LiveEventsList
                userId={params.userId}
                type="attending"
                emptyMessage="Not attending any upcoming events"
              />
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="followers" className="mt-6">
          <FollowLists
            userId={params.userId}
            type="followers"
            emptyMessage="No followers yet"
          />
        </TabsContent>

        <TabsContent value="following" className="mt-6">
          <FollowLists
            userId={params.userId}
            type="following"
            emptyMessage="Not following anyone yet"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
} 