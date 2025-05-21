'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/molecules/navigation/Tabs'
import ProfileHeader from '@/app/components/usersmaincomponents/profile/ProfileHeader'
import VideoGrid from '@/app/components/usersmaincomponents/profile/VideoGrid'
import PlaylistGrid from '@/app/components/usersmaincomponents/profile/PlaylistGrid'
import LiveEventsList from '@/app/components/usersmaincomponents/profile/LiveEventsList'
import FollowLists from '@/app/components/usersmaincomponents/profile/FollowLists'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card } from '@/app/components/molecules/cards/Card'
import Layout from '@/app/components/usersmaincomponents/homefeed/homefeed-layout'
import { ProfileCompletionCard } from '@/app/components/profile/ProfileCompletionCard'

export default function ProfilePage() {
  // Use the useParams hook instead of receiving params as props
  const params = useParams();
  const userId = params.userId as string;
  const pathname = usePathname();
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    console.log('ProfilePage mounted with userId:', userId);
  }, [userId]);

  if (!userId) {
    return (
      <div className="container py-6">
        <Card className="p-4 border-red-500 bg-red-50">
          <div className="flex items-start">
            <div className="flex-shrink-0 text-red-500">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>No user ID found. Please try again or go back to <Link href="/homefeed" className="underline">home</Link>.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <ProfileCompletionCard />
        <div className="container py-8 space-y-8">
          <ProfileHeader userId={userId} />

          <Tabs defaultValue="videos" className="w-full mt-8">
            <TabsList className="grid w-full grid-cols-5 bg-[#1E2A3A] p-1 rounded-xl">
              <TabsTrigger 
                value="videos" 
                className="rounded-lg data-[state=active]:bg-[#263850] data-[state=active]:text-white text-gray-300"
              >
                Videos
              </TabsTrigger>
              <TabsTrigger 
                value="playlists" 
                className="rounded-lg data-[state=active]:bg-[#263850] data-[state=active]:text-white text-gray-300"
              >
                Playlists
              </TabsTrigger>
              <TabsTrigger 
                value="live-events" 
                className="rounded-lg data-[state=active]:bg-[#263850] data-[state=active]:text-white text-gray-300"
              >
                Live Events
              </TabsTrigger>
              <TabsTrigger 
                value="followers" 
                className="rounded-lg data-[state=active]:bg-[#263850] data-[state=active]:text-white text-gray-300"
              >
                Followers
              </TabsTrigger>
              <TabsTrigger 
                value="following" 
                className="rounded-lg data-[state=active]:bg-[#263850] data-[state=active]:text-white text-gray-300"
              >
                Following
              </TabsTrigger>
            </TabsList>

            <TabsContent value="videos" className="mt-6">
              <div className="bg-[#0E1C2A] border border-[#1E2A3A] rounded-xl p-6 shadow-md">
                <VideoGrid
                  userId={userId}
                  type="uploaded"
                  emptyMessage="No videos uploaded yet"
                />
              </div>
            </TabsContent>

            <TabsContent value="playlists" className="mt-6">
              <div className="bg-[#0E1C2A] border border-[#1E2A3A] rounded-xl p-6 shadow-md">
                <PlaylistGrid
                  userId={userId}
                  emptyMessage="No playlists created yet"
                />
              </div>
            </TabsContent>

            <TabsContent value="live-events" className="mt-6">
              <div className="bg-[#0E1C2A] border border-[#1E2A3A] rounded-xl p-6 shadow-md">
                <Tabs defaultValue="hosting">
                  <TabsList className="bg-[#1A2535] mb-4">
                    <TabsTrigger 
                      value="hosting" 
                      className="data-[state=active]:bg-[#263850]"
                    >
                      Hosting
                    </TabsTrigger>
                    <TabsTrigger 
                      value="attending" 
                      className="data-[state=active]:bg-[#263850]"
                    >
                      Attending
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="hosting">
                    <LiveEventsList
                      userId={userId}
                      type="hosting"
                      emptyMessage="Not hosting any upcoming events"
                    />
                  </TabsContent>
                  <TabsContent value="attending">
                    <LiveEventsList
                      userId={userId}
                      type="attending"
                      emptyMessage="Not attending any upcoming events"
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>

            <TabsContent value="followers" className="mt-6">
              <div className="bg-[#0E1C2A] border border-[#1E2A3A] rounded-xl p-6 shadow-md">
                <FollowLists
                  userId={userId}
                  type="followers"
                  emptyMessage="No followers yet"
                />
              </div>
            </TabsContent>

            <TabsContent value="following" className="mt-6">
              <div className="bg-[#0E1C2A] border border-[#1E2A3A] rounded-xl p-6 shadow-md">
                <FollowLists
                  userId={userId}
                  type="following"
                  emptyMessage="Not following anyone yet"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  )
} 