import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { ApiResponse } from '@/lib/types'

export async function POST(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const { userId: clerkId } = await auth()
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

    const event = await prisma.event.findUnique({
      where: { id: params.eventId },
      include: {
        rsvps: {
          where: {
            userId: user.id,
            status: 'GOING'
          }
        }
      }
    })

    if (!event) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Event not found'
      }, { status: 404 })
    }

    // Check if user RSVP'd as GOING
    if (event.rsvps.length === 0) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Must RSVP as going to check in'
      }, { status: 400 })
    }

    // Create attendance record
    const attendance = await prisma.attendance.create({
      data: {
        eventId: event.id,
        userId: user.id
      }
    })

    return NextResponse.json<ApiResponse<typeof attendance>>({
      success: true,
      data: attendance
    })
  } catch (error) {
    console.error('Attendance error:', error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to record attendance'
    }, { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const { userId: clerkId } = await auth()
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

    // Check if user is event organizer
    const event = await prisma.event.findUnique({
      where: { id: params.eventId }
    })

    if (!event) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Event not found'
      }, { status: 404 })
    }

    if (event.organizerId !== user.id) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Only event organizers can view attendance'
      }, { status: 403 })
    }

    const attendees = await prisma.attendance.findMany({
      where: {
        eventId: params.eventId
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        }
      },
      orderBy: {
        checkedInAt: 'desc'
      }
    })

    return NextResponse.json<ApiResponse<typeof attendees>>({
      success: true,
      data: attendees
    })
  } catch (error) {
    console.error('Get attendees error:', error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to fetch attendees'
    }, { status: 500 })
  }
} 