import { Card } from '../homefeed/ui/card'
import { PlaySquare, Heart, MessageCircle } from 'lucide-react'
import Image from 'next/image'

interface Video {
  id: number;
  thumbnail: string;
  views: string;
  duration: string;
  likes?: string;
  comments?: string;
}

interface VideoGridProps {
  videos: Video[];
  emptyMessage?: string;
}

export default function VideoGrid({ videos, emptyMessage = "No videos to show" }: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <PlaySquare className="h-12 w-12 mb-4" />
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}

function VideoCard({ video }: { video: Video }) {
  return (
    <Card className="group relative overflow-hidden rounded-xl cursor-pointer">
      <div className="relative w-full aspect-video">
        <Image 
          src={video.thumbnail} 
          alt="Video thumbnail"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          quality={75}
          unoptimized={video.thumbnail.startsWith('data:')} // Skip optimization for data URLs
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              {video.likes && (
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span>{video.likes}</span>
                </div>
              )}
              {video.comments && (
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{video.comments}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <PlaySquare className="h-4 w-4" />
              <span>{video.views} views</span>
            </div>
          </div>
        </div>
      </div>

      {/* Duration Badge */}
      <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded-md">
        {video.duration}
      </div>

      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <PlaySquare className="h-6 w-6 text-white" />
        </div>
      </div>
    </Card>
  )
} 