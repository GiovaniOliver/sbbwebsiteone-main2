import { auth } from '@clerk/nextjs'
import { prisma } from './prisma'

class AuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthError'
  }
}

export async function getCurrentUser() {
  const { userId } = auth()
  
  if (!userId) {
    throw new AuthError('Unauthorized: No user ID found')
  }

  const user = await prisma.user.findFirst({
    where: { clerkId: userId }
  })

  if (!user) {
    throw new AuthError('User not found in database')
  }

  return user
}

export async function requireAuth() {
  try {
    return await getCurrentUser()
  } catch (error) {
    console.error('Auth error:', error)
    throw new AuthError('Unauthorized')
  }
}

interface UserData {
  name?: string
  username?: string
  email?: string
  avatar?: string
  bio?: string
}

export async function ensureUserExists(clerkId: string, userData: UserData) {
  let user = await prisma.user.findFirst({
    where: { clerkId }
  })

  if (!user) {
    // Create user if they don't exist
    user = await prisma.user.create({
      data: {
        clerkId,
        name: userData.name || 'New User',
        username: userData.username || `user_${clerkId.slice(-6)}`,
        email: userData.email || '',
        avatar: userData.avatar || '',
        bio: userData.bio || '',
        badges: '[]',
      }
    })
  }

  return user
} 