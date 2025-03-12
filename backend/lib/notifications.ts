import { NotificationType } from '@/backend/lib/types/notification'
import { getUserById } from '@/backend/services/auth/users.service'
import { getDb } from '@/backend/database/db'
import { v4 as uuidv4 } from 'uuid'

export async function createNotification({
  type,
  userId,
  actorId,
  postId,
  eventId,
  commentId
}: {
  type: NotificationType
  userId: string
  actorId?: string | null
  postId?: string | null
  eventId?: string | null
  commentId?: string | null
}) {
  const db = await getDb()
  const now = new Date().toISOString()
  const id = uuidv4()

  if (actorId) {
    const actor = await db.get(
      'SELECT * FROM users WHERE id = ?',
      [actorId]
    )
    if (!actor) {
      throw new Error('Actor not found')
    }
  }

  if (eventId) {
    const event = await db.get(
      'SELECT * FROM events WHERE id = ?',
      [eventId]
    )
    if (!event) {
      throw new Error('Event not found')
    }
  }

  await db.run(
    `INSERT INTO notifications (
      id, type, user_id, actor_id, post_id, event_id, comment_id,
      read, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      type,
      userId,
      actorId || null,
      postId || null,
      eventId || null,
      commentId || null,
      false,
      now,
      now
    ]
  )

  return {
    id,
    type,
    userId,
    actorId: actorId || null,
    postId: postId || null,
    eventId: eventId || null,
    commentId: commentId || null,
    read: false,
    createdAt: new Date(now),
    updatedAt: new Date(now)
  }
}

export async function notifyEventParticipants(eventId: string, type: NotificationType) {
  const db = await getDb()

  const event = await db.get(
    'SELECT * FROM events WHERE id = ?',
    [eventId]
  )

  if (!event) {
    throw new Error('Event not found')
  }

  const attendees = await db.all(
    'SELECT user_id FROM rsvps WHERE event_id = ? AND status = ?',
    [eventId, 'GOING']
  )

  for (const attendee of attendees) {
    await createNotification({
      type,
      userId: attendee.user_id,
      eventId
    })
  }
}

export async function notifyFollowers(userId: string, type: NotificationType, data: {
  postId?: string
  eventId?: string
  commentId?: string
}) {
  const db = await getDb()

  const followers = await db.all(
    'SELECT follower_id FROM follows WHERE following_id = ?',
    [userId]
  )

  for (const follower of followers) {
    await createNotification({
      type,
      userId: follower.follower_id,
      actorId: userId,
      ...data
    })
  }
} 