import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Post, PostType } from '@prisma/client'
import { ApiResponse, ExtendedPost } from '../types'

export function usePosts() {
  const queryClient = useQueryClient()
  const { data: posts, isLoading, error, refetch } = useQuery<ExtendedPost[], Error>({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch('/api/posts')
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }
      const data: ApiResponse<ExtendedPost[]> = await response.json()
      if (!data.success || !data.data) {
        throw new Error(data.error || 'Failed to fetch posts')
      }
      return data.data
    },
    staleTime: 1000 * 60, // Consider data fresh for 1 minute
    gcTime: 1000 * 60 * 5, // Keep unused data in cache for 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })

  const createPostMutation = useMutation({
    mutationFn: async ({ content, type, mediaUrl }: { content: string; type: PostType; mediaUrl?: string }) => {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, type, mediaUrl }),
      })
      if (!response.ok) {
        throw new Error('Failed to create post')
      }
      const data: ApiResponse<Post> = await response.json()
      if (!data.success || !data.data) {
        throw new Error(data.error || 'Failed to create post')
      }
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const likePostMutation = useMutation({
    mutationFn: async (postId: string) => {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
      })
      if (!response.ok) {
        throw new Error('Failed to like post')
      }
      return postId
    },
    onSuccess: (postId) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const unlikePostMutation = useMutation({
    mutationFn: async (postId: string) => {
      const response = await fetch(`/api/posts/${postId}/unlike`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to unlike post')
      }
      return postId
    },
    onSuccess: (postId) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  return {
    posts,
    isLoading,
    error,
    fetchPosts: refetch,
    createPost: createPostMutation.mutateAsync,
    likePost: likePostMutation.mutateAsync,
    unlikePost: unlikePostMutation.mutateAsync,
  }
}

export function usePost(postId: string) {
  return useQuery<ExtendedPost, Error>({
    queryKey: ['post', postId],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/posts/${postId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch post')
        }
        const data: ApiResponse<ExtendedPost> = await response.json()
        if (!data.success || !data.data) {
          throw new Error(data.error || 'Failed to fetch post')
        }
        return data.data
      } catch (error) {
        console.error('Error in usePost:', error)
        throw error
      }
    },
    enabled: !!postId,
  })
} 