import { prisma } from './prisma'
import { NotificationType } from '@prisma/client'

interface CreateNotificationParams {
  userId: string
  type: NotificationType
  actorId?: string
  targetId?: string
  targetType?: string
}

export async function createNotification({
  userId,
  type,
  actorId,
  targetId,
  targetType,
}: CreateNotificationParams) {
  try {
    let content = ''

    // Get actor name if actorId is provided
    let actorName = 'Someone'
    if (actorId) {
      const actor = await prisma.user.findUnique({
        where: { id: actorId },
        select: { username: true, firstName: true, lastName: true }
      })
      actorName = actor?.username || `${actor?.firstName} ${actor?.lastName}`.trim() || 'Someone'
    }

    // Generate notification content based on type
    switch (type) {
      case 'FOLLOW':
        content = `${actorName} started following you`
        break
      case 'LIKE':
        content = `${actorName} liked your post`
        break
      case 'COMMENT':
        content = `${actorName} commented on your post`
        break
      case 'EVENT_REMINDER':
        const event = await prisma.event.findUnique({
          where: { id: targetId || '' },
          select: { name: true, date: true }
        })
        if (event) {
          content = `Reminder: "${event.name}" is starting soon`
        }
        break
      case 'EVENT_RSVP':
        content = `${actorName} is attending your event`
        break
      case 'EVENT_UPDATE':
        content = `An event you're attending has been updated`
        break
      case 'MENTION':
        content = `${actorName} mentioned you in a post`
        break
      default:
        content = 'You have a new notification'
    }

    // Create the notification
    const notification = await prisma.notification.create({
      data: {
        type,
        content,
        userId,
        actorId,
        targetId,
        targetType,
      }
    })

    return notification
  } catch (error) {
    console.error('Error creating notification:', error)
    throw error
  }
}

// Helper function to create event reminders
export async function createEventReminders(eventId: string) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        rsvps: {
          where: { status: 'GOING' },
          select: { userId: true }
        }
      }
    })

    if (!event) return

    // Create reminders for all attendees
    const reminderPromises = event.rsvps.map(rsvp =>
      createNotification({
        userId: rsvp.userId,
        type: 'EVENT_REMINDER',
        targetId: eventId,
        targetType: 'EVENT'
      })
    )

    await Promise.all(reminderPromises)
  } catch (error) {
    console.error('Error creating event reminders:', error)
    throw error
  }
}

// Helper function to notify followers about new posts
export async function notifyFollowers(userId: string, postId: string) {
  try {
    const followers = await prisma.follows.findMany({
      where: { followingId: userId },
      select: { followerId: true }
    })

    const notificationPromises = followers.map(follower =>
      createNotification({
        userId: follower.followerId,
        type: 'POST',
        actorId: userId,
        targetId: postId,
        targetType: 'POST'
      })
    )

    await Promise.all(notificationPromises)
  } catch (error) {
    console.error('Error notifying followers:', error)
    throw error
  }
} 