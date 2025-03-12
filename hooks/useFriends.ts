'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '../backend/lib/types/supabase'

// TODO: Add these to Database type
interface FriendDb {
  id: string
  user_id: string
  friend_id: string
  status: string
  created_at: string
  updated_at: string
}

interface FriendRequestDb {
  id: string
  sender_id: string
  receiver_id: string
  message?: string
  status: string
  created_at: string
  updated_at: string
}

interface Friend {
  id: string
  userId: string
  friendId: string
  status: string
  createdAt: string
  updatedAt: string
}

interface FriendRequest {
  id: string
  senderId: string
  receiverId: string
  message?: string
  status: string
  createdAt: string
  updatedAt: string
}

const toFriend = (friend: FriendDb): Friend => ({
  id: friend.id,
  userId: friend.user_id,
  friendId: friend.friend_id,
  status: friend.status,
  createdAt: friend.created_at,
  updatedAt: friend.updated_at,
})

const toFriendRequest = (request: FriendRequestDb): FriendRequest => ({
  id: request.id,
  senderId: request.sender_id,
  receiverId: request.receiver_id,
  message: request.message,
  status: request.status,
  createdAt: request.created_at,
  updatedAt: request.updated_at,
})

export function useFriends() {
  const supabase = createClientComponentClient<Database>()
  const queryClient = useQueryClient()

  // 1. Friends list
  const {
    data: friends,
    isLoading: loadingFriends,
    error: friendsError,
  } = useQuery<Friend[], Error>({
    queryKey: ['friends'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('friends')
        .select()
        .order('created_at', { ascending: false })

      if (error) throw new Error('Failed to fetch friends')
      return data.map(toFriend)
    },
  })

  // 2. Friend requests
  const {
    data: friendRequests,
    isLoading: loadingRequests,
    error: requestsError,
  } = useQuery<FriendRequest[], Error>({
    queryKey: ['friend-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('friend_requests')
        .select()
        .order('created_at', { ascending: false })

      if (error) throw new Error('Failed to fetch friend requests')
      return data.map(toFriendRequest)
    },
  })

  // 3. Send request
  const sendRequest = useMutation({
    mutationFn: async (friendId: string) => {
      const { error } = await supabase
        .from('friend_requests')
        .insert({ receiver_id: friendId })

      if (error) throw new Error('Failed to send friend request')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friends'] })
      queryClient.invalidateQueries({ queryKey: ['friend-requests'] })
    },
  })

  // 4. Respond to request
  const respondToRequest = useMutation({
    mutationFn: async ({
      requestId,
      status,
    }: {
      requestId: string
      status: 'ACCEPTED' | 'REJECTED'
    }) => {
      const { error } = await supabase
        .from('friend_requests')
        .update({ status })
        .eq('id', requestId)

      if (error) throw new Error('Failed to respond to friend request')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friends'] })
      queryClient.invalidateQueries({ queryKey: ['friend-requests'] })
    },
  })

  // 5. Remove friend
  const removeFriend = useMutation({
    mutationFn: async (friendId: string) => {
      const { error } = await supabase
        .from('friends')
        .delete()
        .eq('friend_id', friendId)

      if (error) throw new Error('Failed to remove friend')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friends'] })
    },
  })

  return {
    friends,
    friendRequests,
    loadingFriends,
    loadingRequests,
    friendsError,
    requestsError,
    sendRequest: sendRequest.mutate,
    respondToRequest: respondToRequest.mutate,
    removeFriend: removeFriend.mutate,
  }
}
