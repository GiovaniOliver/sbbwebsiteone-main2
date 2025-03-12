'use client'

import { useQuery } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card } from '@/app/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'
import { Skeleton } from '@/app/components/ui/skeleton'
import { Plus } from 'lucide-react'
import { useUser } from '@/hooks/useUser'
import { memo } from 'react'
import { Database } from '@/types/supabase'

interface Story {
  id: string
  user: {
    id: string
    username: string
    avatar_url: string | null
  }
  thumbnail_url: string
  created_at: string
  expires_at: string
}

interface StoriesJoinResult {
  id: string
  user: {
    id: string
    username: string
    avatar_url: string | null
  }
  thumbnail_url: string
  created_at: string
  expires_at: string
}

const StoryCard = memo(function StoryCard({ story }: { story: Story }) {
  return (
    <div className="flex-shrink-0 w-20 p-1 cursor-pointer hover:bg-[#1B2730] transition-colors rounded-lg">
      <div className="relative">
        <Avatar className="w-16 h-16 border-2 border-blue-500">
          <AvatarImage src={story.user.avatar_url || undefined} />
          <AvatarFallback>
            {story.user.username?.[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <p className="text-xs text-center mt-1 truncate text-gray-300">
          {story.user.username}
        </p>
      </div>
    </div>
  )
})

const AddStoryCard = memo(function AddStoryCard({ user }: { user: any }) {
  return (
    <div className="flex-shrink-0 w-20 p-1 cursor-pointer hover:bg-[#1B2730] transition-colors rounded-lg">
      <div className="relative">
        <Avatar className="w-16 h-16 border-2 border-dashed border-gray-600">
          <AvatarImage src={user.avatar_url || undefined} />
          <AvatarFallback>
            <Plus className="w-6 h-6 text-gray-400" />
          </AvatarFallback>
        </Avatar>
        <p className="text-xs text-center mt-1 text-gray-400">Add Story</p>
      </div>
    </div>
  )
})

export default function StoriesList() {
  const supabase = createClientComponentClient<Database>()
  const { user } = useUser()

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const { data } = await supabase
        .from('stories')
        .select(`
          id,
          user:profiles!user_id (
            id,
            username,
            avatar_url
          ),
          thumbnail_url,
          created_at,
          expires_at
        `)
        .gte('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(10)
        .returns<StoriesJoinResult[]>()

      if (!data) return []

      return data.map(story => ({
        id: story.id,
        user: story.user,
        thumbnail_url: story.thumbnail_url,
        created_at: story.created_at,
        expires_at: story.expires_at
      }))
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchInterval: 1000 * 60 * 5 // Refetch every 5 minutes
  })

  if (isLoading) {
    return (
      <Card className="bg-[#1B2730] p-4 shadow-sm">
        <div className="flex gap-4 overflow-x-auto">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-20 p-1">
              <div className="relative">
                <Skeleton className="w-16 h-16 rounded-full" />
                <Skeleton className="w-12 h-3 mt-1 mx-auto" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  return (
    <Card className="bg-[#1B2730] p-4 shadow-sm">
      <div className="flex gap-4 overflow-x-auto">
        {user && <AddStoryCard user={user} />}
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </Card>
  )
} 