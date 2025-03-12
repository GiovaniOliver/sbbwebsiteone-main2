import { getDb } from '../../database/db'   
import { v4 as uuidv4 } from 'uuid'
import { Friend, FriendStatus } from '../../lib/types/types'

export async function getFriends(userId: string): Promise<Friend[]> {
  const db = await getDb()
  
  return db.all(`
    SELECT 
      f.*,
      u.id as "friend.id",
      u.username as "friend.username",
      u.first_name as "friend.first_name",
      u.last_name as "friend.last_name",
      u.image_url as "friend.image_url"
    FROM friends f
    JOIN users u ON f.friend_id = u.id
    WHERE f.user_id = ? AND f.status = 'ACCEPTED'
    ORDER BY f.created_at DESC
  `, [userId])
}

export async function getFriendRequests(userId: string): Promise<Friend[]> {
  const db = await getDb()
  
  return db.all(`
    SELECT 
      f.*,
      u.id as "friend.id",
      u.username as "friend.username",
      u.first_name as "friend.first_name",
      u.last_name as "friend.last_name",
      u.image_url as "friend.image_url"
    FROM friends f
    JOIN users u ON f.user_id = u.id
    WHERE f.friend_id = ? AND f.status = 'PENDING'
    ORDER BY f.created_at DESC
  `, [userId])
}

export async function sendFriendRequest(userId: string, friendId: string): Promise<Friend> {
  const db = await getDb()
  const id = uuidv4()
  const now = new Date().toISOString()

  await db.run(`
    INSERT INTO friends (
      id, user_id, friend_id, status, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?)
  `, [id, userId, friendId, 'PENDING', now, now])

  const friend = await db.get(`
    SELECT 
      id, username, first_name, last_name, image_url
    FROM users
    WHERE id = ?
  `, [friendId])

  if (!friend) {
    throw new Error('Friend not found')
  }

  return {
    id,
    user_id: userId,
    friend_id: friendId,
    status: 'PENDING',
    created_at: now,
    updated_at: now,
    friend
  }
}

export async function updateFriendRequest(
  userId: string,
  friendId: string,
  status: FriendStatus
): Promise<boolean> {
  const db = await getDb()
  const now = new Date().toISOString()

  const result = await db.run(`
    UPDATE friends
    SET status = ?, updated_at = ?
    WHERE user_id = ? AND friend_id = ?
  `, [status, now, friendId, userId])

  if (status === 'ACCEPTED') {
    // Create reciprocal friendship
    const id = uuidv4()
    await db.run(`
      INSERT INTO friends (
        id, user_id, friend_id, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?)
    `, [id, userId, friendId, 'ACCEPTED', now, now])
  }

  return (result.changes ?? 0) > 0
}

export async function removeFriend(userId: string, friendId: string): Promise<boolean> {
  const db = await getDb()

  const result = await db.run(`
    DELETE FROM friends
    WHERE (user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?)
  `, [userId, friendId, friendId, userId])

  return (result.changes ?? 0) > 0
}

export async function areFriends(userId: string, friendId: string): Promise<boolean> {
  const db = await getDb()

  const friendship = await db.get(`
    SELECT 1
    FROM friends
    WHERE user_id = ? AND friend_id = ? AND status = 'ACCEPTED'
  `, [userId, friendId])

  return !!friendship
} 