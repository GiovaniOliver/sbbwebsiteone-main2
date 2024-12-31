import { prisma } from './prisma'
import { Post, User } from '@prisma/client'

export async function getUser(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })
    return user
  } catch (error) {
    console.error('Error fetching user:', error)
    throw new Error('Failed to fetch user')
  }
}

export async function createUser(userData: Partial<User>) {
  try {
    const user = await prisma.user.create({
      data: userData as User,
    })
    return user
  } catch (error) {
    console.error('Error creating user:', error)
    throw new Error('Failed to create user')
  }
}

export async function updateUser(userId: string, userData: Partial<User>) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: userData,
    })
    return user
  } catch (error) {
    console.error('Error updating user:', error)
    throw new Error('Failed to update user')
  }
} 