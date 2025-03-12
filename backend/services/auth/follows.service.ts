import { getDb } from '../../database/db'
import { v4 as uuidv4 } from 'uuid'
import { User } from './users.service'

export interface Follow {
  id: string
  followerId: string
  followingId: string
  createdAt: Date
  updatedAt: Date
}

export interface FollowWithUser extends Follow {
  follower: User
  following: User
}

export async function followUser(followerId: string, followingId: string): Promise<Follow | null> {
  const db = await getDb()
  const id = uuidv4()
  const now = new Date().toISOString()

  try {
    await db.run(
      `INSERT INTO follows (
        id, follower_id, following_id, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?)`,
      [id, followerId, followingId, now, now]
    )

    return {
      id,
      followerId,
      followingId,
      createdAt: new Date(now),
      updatedAt: new Date(now)
    }
  } catch (error: any) {
    if (error.message?.includes('UNIQUE constraint failed')) {
      return null
    }
    throw error
  }
}

export async function unfollowUser(followerId: string, followingId: string): Promise<boolean> {
  const db = await getDb()

  const result = await db.run(
    'DELETE FROM follows WHERE follower_id = ? AND following_id = ?',
    [followerId, followingId]
  )

  return (result.changes ?? 0) > 0
}

export async function isFollowing(followerId: string, followingId: string): Promise<boolean> {
  const db = await getDb()

  const follow = await db.get(
    'SELECT 1 FROM follows WHERE follower_id = ? AND following_id = ?',
    [followerId, followingId]
  )

  return !!follow
}

export async function getFollowers(userId: string): Promise<User[]> {
  const db = await getDb()

  const followers = await db.all<User[]>(
    `SELECT 
      u.* 
     FROM follows f
     JOIN users u ON f.follower_id = u.id
     WHERE f.following_id = ?
     ORDER BY f.created_at DESC`,
    [userId]
  )

  return followers.map(user => ({
    ...user,
    created_at: new Date(user.created_at),
    updated_at: new Date(user.updated_at)
  }))
}

export async function getFollowing(userId: string): Promise<User[]> {
  const db = await getDb()

  const following = await db.all<User[]>(
    `SELECT 
      u.* 
     FROM follows f
     JOIN users u ON f.following_id = u.id
     WHERE f.follower_id = ?
     ORDER BY f.created_at DESC`,
    [userId]
  )

  return following.map(user => ({
    ...user,
    created_at: new Date(user.created_at),
    updated_at: new Date(user.updated_at)
  }))
}

export async function getSuggestedUsers(userId: string, limit: number = 5): Promise<User[]> {
  const db = await getDb()

  // Get users that the current user is not following
  const suggestedUsers = await db.all<User[]>(
    `SELECT u.* 
     FROM users u
     WHERE u.id != ? 
     AND u.id NOT IN (
       SELECT following_id 
       FROM follows 
       WHERE follower_id = ?
     )
     ORDER BY RANDOM()
     LIMIT ?`,
    [userId, userId, limit]
  )

  return suggestedUsers.map(user => ({
    ...user,
    created_at: new Date(user.created_at),
    updated_at: new Date(user.updated_at)
  }))
} 