import { getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApiResponse } from '@/lib/types'

export async function GET(req: Request) {
  try {
    const { userId: clerkId } = getAuth()
    if (!clerkId) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkId }
    })

    if (!user) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'User not found'
      }, { status: 404 })
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId: user.id,
        read: false
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        fromUser: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        }
      }
    })

    return NextResponse.json<ApiResponse<typeof notifications>>({
      success: true,
      data: notifications
    })
  } catch (error) {
    console.error('Get notifications error:', error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to fetch notifications'
    }, { status: 500 })
  }
} 