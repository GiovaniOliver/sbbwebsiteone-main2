import { auth as clerkAuth } from '@clerk/nextjs/server'
import { prisma } from './prisma'

export async function ensureUserExists() {
  try {
    const { userId } = await clerkAuth()
    if (!userId) return null

    let user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      // Create user directly using prisma
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          firstName: 'New',
          lastName: 'User',
          username: `user_${userId.slice(-6)}`,
          email: '',
          avatar: '',
          badges: '[]'
        }
      })
    }

    return user
  } catch (error) {
    console.error('Error ensuring user exists:', { error: error instanceof Error ? error.message : 'Unknown error' })
    return null
  }
}

export async function getCurrentUser() {
  try {
    const { userId } = await clerkAuth()

    if (!userId) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    })

    return user
  } catch (error) {
    console.error('Error getting current user:', { error: error instanceof Error ? error.message : 'Unknown error' })
    return null
  }
}

export async function requireAuth() {
  const { userId } = await clerkAuth()

  if (!userId) {
    throw new Error('Authentication required')
  }

  return userId
}

export async function getUserProfile(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        posts: true,
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    return user
  } catch (error) {
    console.error('Error getting user profile:', { error: error instanceof Error ? error.message : 'Unknown error' })
    throw new Error('Failed to get user profile')
  }
} 