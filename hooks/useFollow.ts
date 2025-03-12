'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useUser } from './useUser'

export function useFollow() {
  const supabase = createClientComponentClient()
  const queryClient = useQueryClient()
  const { user } = useUser()

  const { data: followingIds = [] } = useQuery({
    queryKey: ['following', user?.id],
    queryFn: async () => {
      if (!user?.id) return []
      const { data } = await supabase
        .from('follows')
        .select('following_id')
        .eq('follower_id', user.id)
      return data?.map(f => f.following_id) || []
    },
    enabled: !!user?.id
  })

  const { mutate: toggleFollow } = useMutation({
    mutationFn: async (targetUserId: string) => {
      if (!user?.id) throw new Error('Not authenticated')
      
      const isFollowing = followingIds.includes(targetUserId)
      
      if (isFollowing) {
        await supabase
          .from('follows')
          .delete()
          .eq('follower_id', user.id)
          .eq('following_id', targetUserId)
      } else {
        await supabase
          .from('follows')
          .insert({ follower_id: user.id, following_id: targetUserId })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['following'] })
      queryClient.invalidateQueries({ queryKey: ['follow-list'] })
    }
  })

  const isFollowing = (targetUserId: string) => {
    return followingIds.includes(targetUserId)
  }

  return {
    isFollowing,
    toggleFollow
  }
} 