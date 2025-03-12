import { getDb } from '../../database/db'
import { v4 as uuidv4 } from 'uuid'
import { Notification, NotificationWithRelations, NotificationType } from '../../lib/types/notification'

export async function createNotification(data: {
  type: NotificationType
  userId: string
  actorId?: string | null
  postId?: string | null
  eventId?: string | null
  commentId?: string | null
}): Promise<Notification> {
  const db = await getDb()
  const id = uuidv4()
  const now = new Date().toISOString()

  await db.run(
    `INSERT INTO notifications (
      id, type, user_id, actor_id, post_id, event_id, comment_id,
      read, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      data.type,
      data.userId,
      data.actorId || null,
      data.postId || null,
      data.eventId || null,
      data.commentId || null,
      false,
      now,
      now
    ]
  )

  return {
    id,
    type: data.type,
    userId: data.userId,
    actorId: data.actorId || null,
    postId: data.postId || null,
    eventId: data.eventId || null,
    commentId: data.commentId || null,
    read: false,
    createdAt: new Date(now),
    updatedAt: new Date(now)
  }
}

export async function getNotificationsByUserId(userId: string): Promise<NotificationWithRelations[]> {
  const db = await getDb()
  
  const notifications = await db.all<NotificationWithRelations[]>(
    `SELECT 
      n.*,
      u.id as "actor.id",
      u.username as "actor.username",
      u.first_name as "actor.firstName",
      u.last_name as "actor.lastName",
      u.avatar as "actor.avatar",
      p.id as "post.id",
      p.content as "post.content",
      e.id as "event.id",
      e.title as "event.title"
     FROM notifications n
     LEFT JOIN users u ON n.actor_id = u.id
     LEFT JOIN posts p ON n.post_id = p.id
     LEFT JOIN events e ON n.event_id = e.id
     WHERE n.user_id = ?
     ORDER BY n.created_at DESC`,
    [userId]
  )

  return notifications.map(notification => ({
    ...notification,
    createdAt: new Date(notification.createdAt),
    updatedAt: new Date(notification.updatedAt)
  }))
}

export async function markNotificationAsRead(id: string): Promise<boolean> {
  const db = await getDb()
  const now = new Date().toISOString()

  const result = await db.run(
    `UPDATE notifications 
     SET read = ?, updated_at = ?
     WHERE id = ?`,
    [true, now, id]
  )

  return (result.changes ?? 0) > 0
}

export async function markAllNotificationsAsRead(userId: string): Promise<boolean> {
  const db = await getDb()
  const now = new Date().toISOString()

  const result = await db.run(
    `UPDATE notifications 
     SET read = ?, updated_at = ?
     WHERE user_id = ? AND read = ?`,
    [true, now, userId, false]
  )

  return (result.changes ?? 0) > 0
}

export async function deleteNotification(id: string): Promise<boolean> {
  const db = await getDb()

  const result = await db.run(
    'DELETE FROM notifications WHERE id = ?',
    [id]
  )

  return (result.changes ?? 0) > 0
}

export async function deleteAllNotifications(userId: string): Promise<boolean> {
  const db = await getDb()

  const result = await db.run(
    'DELETE FROM notifications WHERE user_id = ?',
    [userId]
  )

  return (result.changes ?? 0) > 0
} 