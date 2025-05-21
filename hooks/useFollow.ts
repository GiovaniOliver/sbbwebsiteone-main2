'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useUser } from './useUser'

export function useFollow() {
  const supabase = createClientComponentClient()
  const queryClient = useQueryClient()
  const { user } = useUser()

  const { data: followingIds = [], isLoading: followingLoading } = useQuery({
    queryKey: ['following', user?.id],
    queryFn: async () => {
      if (!user?.id) return []
      try {
        const { data, error } = await supabase
          .from('follows')
          .select('following_id')
          .eq('follower_id', user.id)

        if (error) {
          console.error('Error fetching following list:', error)
          return []
        }

        return data?.map(f => f.following_id) || []
      } catch (err) {
        console.error('Failed to fetch following list:', err)
        return []
      }
    },
    enabled: !!user?.id,
    retry: 1
  })

  const { mutate: toggleFollow, isLoading: mutationLoading } = useMutation({
    mutationFn: async (targetUserId: string) => {
      if (!user?.id) throw new Error('Not authenticated')
      
      try {
        const isFollowing = followingIds.includes(targetUserId)
        
        if (isFollowing) {
          const { error: deleteError } = await supabase
            .from('follows')
            .delete()
            .eq('follower_id', user.id)
            .eq('following_id', targetUserId)
          
          if (deleteError) throw new Error(deleteError.message)
        } else {
          const { error: insertError } = await supabase
            .from('follows')
            .insert({ follower_id: user.id, following_id: targetUserId })
          
          if (insertError) throw new Error(insertError.message)
        }
      } catch (err) {
        console.error('Error toggling follow:', err)
        throw err
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['following'] })
      queryClient.invalidateQueries({ queryKey: ['follow-list'] })
      // Also invalidate profile queries to update follower counts
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
    onError: (error) => {
      console.error('Follow operation failed:', error)
    }
  })

  const isFollowing = (targetUserId: string) => {
    return followingIds.includes(targetUserId)
  }

  return {
    isFollowing,
    toggleFollow,
    isLoading: followingLoading || mutationLoading
  }
} 