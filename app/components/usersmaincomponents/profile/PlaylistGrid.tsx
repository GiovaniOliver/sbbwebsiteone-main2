'use client'

import { useQuery } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { Card } from '@/app/components/molecules/cards/Card'
import { Skeleton } from '@/app/components/atoms/feedback/Skeleton'
import Link from 'next/link'
import { ListVideo, PlaySquare } from 'lucide-react'

interface PlaylistGridProps {
  userId: string
  emptyMessage: string
}

export default function PlaylistGrid({ userId, emptyMessage }: PlaylistGridProps) {
  const supabase = createClientComponentClient()

  const { data: playlists = [], isLoading } = useQuery({
    queryKey: ['playlists', userId],
    queryFn: async () => {
      const { data } = await supabase
        .from('playlists')
        .select(`
          *,
          videos:playlist_videos (count),
          thumbnail:playlist_videos (
            video:videos (
              thumbnail_url
            )
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

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
              <div className="flex gap-4">
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (!playlists.length) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {playlists.map((playlist) => (
        <Link key={playlist.id} href={`/playlists/${playlist.id}`}>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative bg-gray-100">
              {playlist.thumbnail?.[0]?.video?.thumbnail_url ? (
                <Image
                  src={playlist.thumbnail[0].video.thumbnail_url}
                  alt={playlist.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <PlaySquare className="h-12 w-12" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-2 right-2 bg-black/75 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                <ListVideo className="h-4 w-4" />
                {playlist.videos.count} videos
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg line-clamp-2">{playlist.title}</h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {playlist.description || 'No description'}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Created {new Date(playlist.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
} 