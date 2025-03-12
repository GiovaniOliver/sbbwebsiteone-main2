'use client'

import { useQuery } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface UseFollowListsProps {
  userId: string
}

export function useFollowLists({ userId }: UseFollowListsProps) {
  const supabase = createClientComponentClient()

  const { data: followers = [], isLoading: isLoadingFollowers } = useQuery({
    queryKey: ['followers', userId],
    queryFn: async () => {
      const { data } = await supabase
        .from('follows')
        .select(`
          follower:users!follower_id (
            id,
            username,
            first_name,
            last_name,
            image_url
          )
        `)
        .eq('following_id', userId)

      return data || []
    }
  })

  const { data: following = [], isLoading: isLoadingFollowing } = useQuery({
    queryKey: ['following', userId],
    queryFn: async () => {
      const { data } = await supabase
        .from('follows')
        .select(`
          following:users!following_id (
            id,
            username,
            first_name,
            last_name,
            image_url
          )
        `)
        .eq('follower_id', userId)

      return data || []
    }
  })

  return {
    followers,
    following,
    isLoadingFollowers,
    isLoadingFollowing
  }
}
