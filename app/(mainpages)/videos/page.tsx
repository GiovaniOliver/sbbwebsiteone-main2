/* eslint-disable @next/next/no-img-element */
'use client'

import Layout from '@/app/components/usersmaincomponents/homefeed/homefeed-layout'
import { Card } from '@/app/components/molecules/cards/Card'
import { Button } from '@/app/components/atoms/buttons/Button'
import { Play, ThumbsUp, MessageCircle, Share2, MoreHorizontal, ChevronRight } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/molecules/display/Avatar'

const watchlist = [
  {
    name: "Carter Vaccaro",
    newVideos: 8,
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36"
  },
  {
    name: "Jaylon Siphron",
    newVideos: 5,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
  },
  {
    name: "Gustavo Scheifer",
    newVideos: 3,
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12"
  },
  {
    name: "Martin Botosh",
    newVideos: 12,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956"
  },
  {
    name: "Corey Culhane",
    newVideos: 4,
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d"
  },
  {
    name: "Jakob Geldt",
    newVideos: 7,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
  }
]

const currentVideo = {
  title: "UI/UX Inspiration August 2023",
  author: "Cristofer Press",
  timePosted: "14 mins ago",
  description: "Zero UI is a style that's been looming in the shadow for some time but is really starting to emerge now. The idea is easy to understand — the less the user has to think about the interface, the better and more natural it feels.",
  duration: "13:52",
  currentTime: "0:47",
  views: "12K Views",
  hashtags: ["#design", "#uiux", "#uidesign", "#web", "#mobileapp"]
}

export default function VideosPage() {
  return (
    <Layout>
      <div className="flex-1 px-8 py-6">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-semibold text-gray-900">Videos for You</h1>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-gray-600">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Video Player */}
            <div className="relative aspect-video bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl overflow-hidden shadow-lg mb-6">
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Play className="h-8 w-8 text-white" />
                </div>
              </div>
              {/* Video Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2 text-white text-sm mb-2">
                  <span>{currentVideo.currentTime}</span>
                  <div className="flex-1 h-1 bg-white/30 rounded-full">
                    <div className="w-1/3 h-full bg-white rounded-full" />
                  </div>
                  <span>{currentVideo.duration}</span>
                </div>
                <div className="flex items-center justify-between text-white/80 text-sm">
                  <div className="flex items-center gap-4">
                    <button className="hover:text-white">
                      <Play className="h-4 w-4" />
                    </button>
                    <span>{currentVideo.views}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="hover:text-white">HD</button>
                    <button className="hover:text-white">1x</button>
                    <button className="hover:text-white">CC</button>
                    <button className="hover:text-white">⚙️</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <Card className="p-6 shadow-md rounded-xl bg-white mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 ring-2 ring-offset-2 ring-blue-500">
                    <AvatarImage src={watchlist[0].avatar} />
                    <AvatarFallback>{currentVideo.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold text-gray-900">{currentVideo.author}</h2>
                    <p className="text-sm text-gray-500">{currentVideo.timePosted}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">{currentVideo.description}</p>
              <div className="flex flex-wrap gap-2">
                {currentVideo.hashtags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline cursor-pointer font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>

            {/* Engagement */}
            <Card className="p-4 shadow-sm rounded-xl bg-white/50 backdrop-blur-sm">
              <div className="flex items-center gap-6">
                <Button variant="ghost" size="sm" className="text-gray-700 hover:bg-gray-100">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Like
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-700 hover:bg-gray-100">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Comment
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-700 hover:bg-gray-100">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </Card>
          </div>

          {/* Watchlist */}
          <div className="w-80">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-gray-900">Your Watchlist</h2>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                See All
              </Button>
            </div>
            <div className="space-y-4">
              {watchlist.map((user, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 group cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="ring-2 ring-offset-2 ring-transparent group-hover:ring-blue-500 transition-all">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.newVideos} New videos</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 