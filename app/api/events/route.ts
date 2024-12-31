import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ensureUserExists } from '@/lib/auth'
import { auth } from '@clerk/nextjs'
import { getAuth } from '@clerk/nextjs/server'
import { ApiResponse } from '@/lib/types'

export async function POST(request: NextRequest) {
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

    const body = await request.json()
    const { title, description, location, startDate, endDate, maxAttendees } = body

    const event = await prisma.event.create({
      data: {
        title,
        description,
        location,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        maxAttendees,
        organizerId: user.id
      }
    })

    return NextResponse.json<ApiResponse<typeof event>>({
      success: true,
      data: event
    })
  } catch (error) {
    console.error('Create event error:', error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to create event'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const organizerId = searchParams.get('organizerId')
    const attendeeId = searchParams.get('attendeeId')
    const past = searchParams.get('past') === 'true'
    const search = searchParams.get('search')

    const where = {
      AND: [
        // Base conditions
        {},
        // Filter by organizer
        organizerId ? { organizerId } : {},
        // Filter by attendee
        attendeeId ? {
          rsvps: {
            some: {
              userId: attendeeId,
              status: 'GOING'
            }
          }
        } : {},
        // Filter by date
        past ? {
          endDate: {
            lt: new Date()
          }
        } : {
          endDate: {
            gte: new Date()
          }
        },
        // Search by title or description
        search ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } }
          ]
        } : {}
      ]
    }

    const events = await prisma.event.findMany({
      where,
      include: {
        organizer: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        },
        _count: {
          select: {
            rsvps: true
          }
        }
      },
      orderBy: {
        startDate: 'asc'
      }
    })

    return NextResponse.json<ApiResponse<typeof events>>({
      success: true,
      data: events
    })
  } catch (error) {
    console.error('Get events error:', error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to fetch events'
    }, { status: 500 })
  }
} 