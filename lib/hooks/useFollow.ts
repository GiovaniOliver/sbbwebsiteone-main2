import { useState } from 'react'
import { useToast } from '@/app/components/ui/use-toast'
import { ApiResponse } from '@/lib/types'

interface UseFollowProps {
  userId: string
  initialIsFollowing?: boolean
}

export function useFollow({ userId, initialIsFollowing = false }: UseFollowProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const toggleFollow = async () => {
    try {
      setIsLoading(true)
      const method = isFollowing ? 'DELETE' : 'POST'
      const response = await fetch(`/api/users/${userId}/follow`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data: ApiResponse<null> = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to toggle follow status')
      }

      setIsFollowing(!isFollowing)
      toast({
        title: isFollowing ? 'Unfollowed user' : 'Following user',
        description: isFollowing ? 'You are no longer following this user' : 'You are now following this user',
      })
    } catch (error) {
      console.error('Follow toggle error:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to toggle follow status',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isFollowing,
    isLoading,
    toggleFollow,
  }
} 