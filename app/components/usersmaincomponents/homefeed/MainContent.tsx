/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Heart, MessageCircle, Share2, Bookmark, Play, Music2, Plus } from 'lucide-react'

// Mock data for feed items
const feedItems = [
  {
    id: 1,
    user: {
      name: "Alex Thompson",
      username: "@alexthompson",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36"
    },
    video: {
      url: "https://example.com/video1.mp4",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      description: "Check out this amazing community event! 🎉 #SBBCommunity #Events",
      song: "Original Sound - Alex Thompson",
      likes: 1234,
      comments: 89,
      shares: 45
    }
  },
  {
    id: 2,
    user: {
      name: "Sarah Wilson",
      username: "@sarahwilson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    video: {
      url: "https://example.com/video2.mp4",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      description: "Building the future of decentralized communities 🚀 #Web3 #Community",
      song: "Background Music - Trending",
      likes: 2345,
      comments: 156,
      shares: 78
    }
  },
  {
    id: 3,
    user: {
      name: "Michael Chen",
      username: "@michaelchen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    },
    video: {
      url: "https://example.com/video3.mp4",
      thumbnail: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
      description: "Sharing knowledge with our amazing community members 📚 #Learning #Growth",
      song: "Educational Vibes - Michael Chen",
      likes: 3456,
      comments: 234,
      shares: 112
    }
  }
]

interface VideoCardProps {
  item: typeof feedItems[0]
  isActive: boolean
}

function VideoCard({ item, isActive }: VideoCardProps) {
  return (
    <div className="relative h-full w-full bg-black">
      {/* Video Thumbnail */}
      <div className="absolute inset-0">
        <img 
          src={item.video.thumbnail} 
          alt="Video thumbnail"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Play Button */}
      <button 
        className="absolute inset-0 flex items-center justify-center group"
        aria-label="Play video"
      >
        <Play className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>

      {/* Video Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="h-10 w-10 ring-2 ring-white">
                <AvatarImage src={item.user.avatar} />
                <AvatarFallback>{item.user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-white">{item.user.name}</p>
                <p className="text-sm text-gray-300">{item.user.username}</p>
              </div>
              <Button size="sm" variant="secondary" className="ml-2">
                <Plus className="h-4 w-4 mr-1" />
                Follow
              </Button>
            </div>
            <p className="text-white mb-2">{item.video.description}</p>
            <div className="flex items-center gap-2 text-white/80">
              <Music2 className="h-4 w-4" />
              <span className="text-sm">{item.video.song}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Side Actions */}
      <div className="absolute right-4 bottom-20 flex flex-col items-center gap-6">
        <button className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center backdrop-blur-md">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <span className="text-white text-sm font-medium">{item.video.likes}</span>
        </button>

        <button className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center backdrop-blur-md">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <span className="text-white text-sm font-medium">{item.video.comments}</span>
        </button>

        <button className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center backdrop-blur-md">
            <Share2 className="h-6 w-6 text-white" />
          </div>
          <span className="text-white text-sm font-medium">{item.video.shares}</span>
        </button>

        <button className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center backdrop-blur-md">
            <Bookmark className="h-6 w-6 text-white" />
          </div>
          <span className="text-white text-sm font-medium">Save</span>
        </button>
      </div>
    </div>
  )
}

export default function MainContent() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    const scrollPosition = container.scrollTop
    const videoHeight = container.clientHeight
    const newIndex = Math.round(scrollPosition / videoHeight)
    if (newIndex !== currentVideoIndex) {
      setCurrentVideoIndex(newIndex)
    }
  }

  return (
    <div className="relative h-[calc(100vh-4rem)]">
      <div 
        className="snap-y snap-mandatory h-full overflow-y-auto"
        onScroll={handleScroll}
      >
        {feedItems.map((item, index) => (
          <div 
            key={item.id} 
            className="snap-start h-full w-full relative"
          >
            <VideoCard 
              item={item} 
              isActive={index === currentVideoIndex} 
            />
          </div>
        ))}
      </div>
    </div>
  )
}

