import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'

interface User {
  id: string
  clerkId: string
  name: string
  username: string
  email: string
  avatar?: string
  bio?: string
  isVerified: boolean
  badges: string[]
}

export function useUser() {
  const { userId, isLoaded: isAuthLoaded } = useAuth()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function checkUser() {
      if (!userId) {
        setIsLoading(false)
        return
      }

      try {
        // Check if user exists in our database
        const response = await fetch('/api/auth/new-user')
        const data = await response.json()

        if (response.ok && data.exists) {
          setUser(data.user)
        } else if (response.status === 404) {
          // User doesn't exist in our database, create them
          const createResponse = await fetch('/api/auth/new-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              // You can get more user data from Clerk here if needed
              name: 'New User',
              username: `user_${userId.slice(-6)}`,
            }),
          })

          if (createResponse.ok) {
            const createData = await createResponse.json()
            setUser(createData.user)
          } else {
            throw new Error('Failed to create user')
          }
        }
      } catch (err) {
        console.error('Error in useUser:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    if (isAuthLoaded) {
      checkUser()
    }
  }, [userId, isAuthLoaded])

  const updateUser = async (userData: Partial<User>) => {
    if (!userId) return

    try {
      const response = await fetch('/api/auth/new-user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        throw new Error('Failed to update user')
      }

      const data = await response.json()
      setUser(data.user)
      return data.user
    } catch (err) {
      console.error('Error updating user:', err)
      throw err
    }
  }

  return {
    user,
    isLoading: isLoading || !isAuthLoaded,
    error,
    updateUser,
  }
} 