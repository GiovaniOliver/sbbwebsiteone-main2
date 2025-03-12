export type NotificationType = 
  | 'EVENT_CREATED'
  | 'EVENT_UPDATED'
  | 'EVENT_CANCELLED'
  | 'EVENT_REMINDER'
  | 'NEW_FOLLOWER'
  | 'POST_LIKE'
  | 'POST_COMMENT'
  | 'COMMENT_REPLY'
  | 'MENTION'

// Database type with snake_case
export interface NotificationDb {
  id: string
  type: NotificationType
  user_id: string
  actor_id: string | null
  post_id: string | null
  event_id: string | null
  comment_id: string | null
  is_read: boolean
  created_at: string
  updated_at: string
}

// Frontend type with camelCase
export interface Notification {
  id: string
  type: NotificationType
  userId: string
  actorId: string | null
  postId: string | null
  eventId: string | null
  commentId: string | null
  isRead: boolean
  createdAt: Date
  updatedAt: Date
}

// Database type with relations
export interface NotificationDbWithRelations extends NotificationDb {
  actor: {
    id: string
    username: string | null
    first_name: string | null
    last_name: string | null
    image_url: string | null
  } | null
  post: {
    id: string
    content: string
  } | null
  event: {
    id: string
    title: string
  } | null
}

// Frontend type with relations
export interface NotificationWithRelations extends Notification {
  actor: {
    id: string
    username: string | null
    firstName: string | null
    lastName: string | null
    imageUrl: string | null
  } | null
  post: {
    id: string
    content: string
  } | null
  event: {
    id: string
    title: string
  } | null
}

// Mapping function from database to frontend type
export function toNotification(db: NotificationDb): Notification {
  return {
    id: db.id,
    type: db.type,
    userId: db.user_id,
    actorId: db.actor_id,
    postId: db.post_id,
    eventId: db.event_id,
    commentId: db.comment_id,
    isRead: db.is_read,
    createdAt: new Date(db.created_at),
    updatedAt: new Date(db.updated_at)
  }
}

// Mapping function for notifications with relations
export function toNotificationWithRelations(db: NotificationDbWithRelations): NotificationWithRelations {
  return {
    ...toNotification(db),
    actor: db.actor ? {
      id: db.actor.id,
      username: db.actor.username,
      firstName: db.actor.first_name,
      lastName: db.actor.last_name,
      imageUrl: db.actor.image_url
    } : null,
    post: db.post,
    event: db.event
  }
} 