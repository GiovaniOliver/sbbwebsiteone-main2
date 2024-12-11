'use client'

import Layout from '@/app/components/usersmaincomponents/homefeed/Layout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/usersmaincomponents/homefeed/ui/tabs'
import { PlaySquare, Heart, Bookmark } from 'lucide-react'
import ProfileHeader from '@/app/components/usersmaincomponents/profile/ProfileHeader'
import VideoGrid from '@/app/components/usersmaincomponents/profile/VideoGrid'

// Mock user data
const userData = {
  name: "Alex Thompson",
  username: "@alexthompson",
  avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
  coverPhoto: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
  bio: "Community Builder | Web3 Enthusiast | Building the future of decentralized social networks",
  location: "San Francisco, CA",
  website: "https://alexthompson.dev",
  joinedDate: "January 2023",
  stats: {
    posts: 245,
    followers: 12500,
    following: 890
  },
  badges: ["Verified", "Core Contributor", "Top Creator"]
}

// Mock content data
const userContent = {
  videos: [
    {
      id: 1,
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      views: "12.5K",
      duration: "2:30",
      likes: "1.2K",
      comments: "234"
    },
    {
      id: 2,
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      views: "8.2K",
      duration: "3:45",
      likes: "956",
      comments: "167"
    }
  ],
  liked: [
    {
      id: 3,
      thumbnail: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
      views: "5.7K",
      duration: "1:30",
      likes: "2.1K",
      comments: "89"
    }
  ],
  saved: [
    {
      id: 4,
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      views: "15.3K",
      duration: "4:20",
      likes: "3.4K",
      comments: "445"
    }
  ]
}

export default function ProfilePage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <ProfileHeader user={userData} isOwnProfile={true} />

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
          </TabsList>

          <TabsContent value="videos">
            <VideoGrid 
              videos={userContent.videos} 
              emptyMessage="No videos uploaded yet" 
            />
          </TabsContent>

          <TabsContent value="liked">
            <VideoGrid 
              videos={userContent.liked} 
              emptyMessage="No liked videos" 
            />
          </TabsContent>

          <TabsContent value="saved">
            <VideoGrid 
              videos={userContent.saved} 
              emptyMessage="No saved videos" 
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
