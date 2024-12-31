import useSWR from 'swr'
import { ApiResponse } from '@/lib/types'

interface FollowUser {
  id: string
  username: string | null
  firstName: string | null
  lastName: string | null
  avatar: string | null
}

interface FollowRelation {
  followerId: string
  followingId: string
  createdAt: string
  follower?: FollowUser
  following?: FollowUser
}

interface UseFollowListsProps {
  userId: string
}

export function useFollowLists({ userId }: UseFollowListsProps) {
  const { data: followersData, error: followersError, isLoading: isLoadingFollowers } = 
    useSWR<ApiResponse<FollowRelation[]>>(`/api/users/${userId}/followers`)

  const { data: followingData, error: followingError, isLoading: isLoadingFollowing } = 
    useSWR<ApiResponse<FollowRelation[]>>(`/api/users/${userId}/following`)

  return {
    followers: followersData?.data || [],
    following: followingData?.data || [],
    isLoadingFollowers,
    isLoadingFollowing,
    followersError,
    followingError,
  }
} 