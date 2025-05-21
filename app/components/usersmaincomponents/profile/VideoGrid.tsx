'use client'

import { useQuery } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { Card } from '@/app/components/molecules/cards/Card'
import { Skeleton } from '@/app/components/atoms/feedback/Skeleton'
import Link from 'next/link'
import { Eye, MessageCircle, ThumbsUp } from 'lucide-react'

interface VideoGridProps {
  userId: string
  type: 'uploaded' | 'liked' | 'saved'
  emptyMessage: string
}

export default function VideoGrid({ userId, type, emptyMessage }: VideoGridProps) {
  const supabase = createClientComponentClient()

  const { data: videos = [], isLoading } = useQuery({
    queryKey: ['videos', userId, type],
    queryFn: async () => {
      let query = supabase
        .from('videos')
        .select(`
          *,
          author:users!user_id (*),
          likes:video_likes (count),
          comments:video_comments (count)
        `)

      if (type === 'uploaded') {
        query = query.eq('user_id', userId)
      } else if (type === 'liked') {
        query = query.eq('video_likes.user_id', userId)
      } else if (type === 'saved') {
        query = query.eq('video_saves.user_id', userId)
      }

      const { data } = await query.order('created_at', { ascending: false })
      return data || []
    }
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="aspect-video" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (!videos.length) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <Link key={video.id} href={`/videos/${video.id}`}>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative">
              <Image
                src={video.thumbnail_url}
                alt={video.title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-black/75 text-white px-2 py-1 rounded text-sm">
                {formatDuration(video.duration)}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg line-clamp-2">{video.title}</h3>
              <p className="text-gray-500 text-sm mt-1">
                {video.author.username} • {formatDate(video.created_at)}
              </p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {formatNumber(video.view_count)}
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  {formatNumber(video.likes.length)}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  {formatNumber(video.comments.length)}
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

function formatNumber(num: number) {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toString()
} 