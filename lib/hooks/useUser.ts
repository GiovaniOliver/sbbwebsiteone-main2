import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { User } from '@prisma/client'
import { ApiResponse } from '../types'
import { useAuth } from '@clerk/nextjs'

interface UpdateUserData {
  name?: string
  email?: string
  image?: string
  bio?: string
}

export function useUser(userId?: string) {
  const { userId: clerkId, isLoaded } = useAuth()

  return useQuery<User, Error>({
    queryKey: ['user', userId || clerkId],
    queryFn: async () => {
      try {
        // If userId is provided, fetch that specific user
        if (userId) {
          const response = await fetch(`/api/users/${userId}`)
          if (!response.ok) {
            throw new Error('Failed to fetch user')
          }
          const data: ApiResponse<User> = await response.json()
          if (!data.success || !data.data) {
            throw new Error(data.error || 'Failed to fetch user')
          }
          return data.data
        }

        // If no userId provided, fetch current user
        if (!clerkId) {
          throw new Error('Not authenticated')
        }

        const response = await fetch('/api/auth/new-user')
        if (!response.ok) {
          throw new Error('Failed to fetch user')
        }
        const data = await response.json()
        if (!data.success) {
          throw new Error(data.error?.message || 'Failed to fetch user')
        }
        return data.data.user
      } catch (error) {
        console.error('Error in useUser:', error)
        throw error
      }
    },
    enabled: isLoaded && !!(userId || clerkId),
  })
}

export function useUpdateUser(userId: string) {
  const queryClient = useQueryClient()

  return useMutation<User, Error, UpdateUserData>({
    mutationFn: async (updateData: UpdateUserData) => {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        })

        if (!response.ok) {
          throw new Error('Failed to update user')
        }

        const data: ApiResponse<User> = await response.json()
        if (!data.success || !data.data) {
          throw new Error(data.error || 'Failed to update user')
        }

        return data.data
      } catch (error) {
        console.error('Error in useUpdateUser:', error)
        throw error
      }
    },
    onSuccess: (updatedUser: User) => {
      queryClient.setQueryData(['user', userId], updatedUser)
    },
  })
} 