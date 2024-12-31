'use client'

import { useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Heart, MessageCircle, Share2, Bookmark, Play, Music2, Plus } from 'lucide-react'
import { usePosts } from '@/lib/hooks/usePosts'
import { useUser } from '@/lib/hooks/useUser'
import { Skeleton } from './ui/skeleton'

export default function MainContent() {
  const { user } = useUser()
  const { posts, isLoading, error } = usePosts()
  const [selectedPost, setSelectedPost] = useState<string | null>(null)

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-lg">
        Error loading content: {error.message}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center space-x-4 mb-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </div>
            <Skeleton className="h-[300px] w-full rounded-lg" />
            <div className="flex justify-between mt-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {posts?.map((post) => (
        <Card key={post.id} className="p-4">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar>
              <AvatarImage src={post.author.avatar || undefined} />
              <AvatarFallback>{post.author.username?.[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.author.username}</p>
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {post.type === 'TEXT' && (
            <p className="mb-4">{post.content}</p>
          )}

          {post.mediaUrl && (post.type === 'IMAGE' || post.type === 'VIDEO') && (
            <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
              {post.type === 'VIDEO' ? (
                <video
                  src={post.mediaUrl}
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={post.mediaUrl}
                  alt="Post media"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )}

          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm">
                <Heart className="h-5 w-5 mr-1" />
                {post._count?.likes || 0}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="h-5 w-5 mr-1" />
                {post._count?.comments || 0}
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
            <Button variant="ghost" size="sm">
              <Bookmark className="h-5 w-5" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}

