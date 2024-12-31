import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { NotificationType } from '@prisma/client'
import { ensureUserExists } from '@/lib/auth'

// GET /api/notifications
export async function GET(req: Request) {
  try {
    const user = await ensureUserExists()
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type') as NotificationType | null
    const unreadOnly = searchParams.get('unreadOnly') === 'true'
    
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId: user.id,
        ...(type && { type }),
        ...(unreadOnly && { read: false }),
        OR: [
          { expiresAt: { gt: new Date() } },
          { expiresAt: null }
        ]
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        fromUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        },
        event: {
          select: {
            id: true,
            title: true,
            startDate: true
          }
        }
      },
      take: 50
    })

    return NextResponse.json(notifications)
  } catch (error) {
    console.error("[NOTIFICATIONS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

// POST /api/notifications
export async function POST(req: Request) {
  try {
    const user = await ensureUserExists()
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { type, fromUserId, eventId, message, priority, metadata, expiresAt } = await req.json()
    
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const notification = await prisma.notification.create({
      data: {
        type,
        userId: user.id,
        fromUserId,
        eventId,
        message,
        priority: priority || 'normal',
        metadata: metadata || {},
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        read: false
      },
      include: {
        fromUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        },
        event: {
          select: {
            id: true,
            title: true,
            startDate: true
          }
        }
      }
    })

    // Send real-time notification via WebSocket
    sendNotificationToUser(user.id, notification)

    return NextResponse.json(notification)
  } catch (error) {
    console.error("[NOTIFICATIONS_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

// PATCH /api/notifications
export async function PATCH(req: Request) {
  try {
    const user = await ensureUserExists()
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { notificationId, read } = await req.json()
    
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const notification = await prisma.notification.update({
      where: {
        id: notificationId,
        userId: user.id
      },
      data: {
        read: read ?? true
      }
    })

    return NextResponse.json(notification)
  } catch (error) {
    console.error("[NOTIFICATIONS_PATCH]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

// DELETE /api/notifications
export async function DELETE(req: Request) {
  try {
    const user = await ensureUserExists()
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const notificationId = searchParams.get('id')
    
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (notificationId) {
      // Delete single notification
      await prisma.notification.delete({
        where: {
          id: notificationId,
          userId: user.id
        }
      })
    } else {
      // Clear all read notifications
      await prisma.notification.deleteMany({
        where: {
          userId: user.id,
          read: true
        }
      })
    }

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[NOTIFICATIONS_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 

function sendNotificationToUser(id: string, notification: { id: string; createdAt: Date; updatedAt: Date; userId: string; type: import(".prisma/client").$Enums.NotificationType; message: string; read: boolean; priority: string | null; metadata: import("@prisma/client/runtime/library").JsonValue | null; expiresAt: Date | null; fromUserId: string | null; eventId: string | null }) {
  throw new Error('Function not implemented.')
}
