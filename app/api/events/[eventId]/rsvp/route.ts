import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { ApiResponse } from '@/lib/types'

export async function POST(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const { userId: clerkId } = getAuth(req)
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
      where: { id: params.eventId }
    })

    if (!event) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Event not found'
      }, { status: 404 })
    }

    // Check if user already RSVP'd
    const existingRsvp = await prisma.rSVP.findUnique({
      where: {
        eventId_userId: {
          eventId: event.id,
          userId: user.id
        }
      }
    })

    let rsvp
    if (existingRsvp) {
      // Update existing RSVP
      rsvp = await prisma.rSVP.update({
        where: {
          eventId_userId: {
            eventId: event.id,
            userId: user.id
          }
        },
        data: {
          status: existingRsvp.status === 'GOING' ? 'NOT_GOING' : 'GOING'
        }
      })
    } else {
      // Create new RSVP
      rsvp = await prisma.rSVP.create({
        data: {
          userId: user.id,
          eventId: event.id,
          status: 'GOING'
        }
      })
    }

    return NextResponse.json<ApiResponse<typeof rsvp>>({
      success: true,
      data: rsvp
    })
  } catch (error) {
    console.error('RSVP error:', error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to update RSVP'
    }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const { userId: clerkId } = getAuth(req)
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
      await prisma.rSVP.delete({
        where: {
          eventId_userId: {
            eventId: params.eventId,
            userId: user.id
          }
        }
      })

    return NextResponse.json<ApiResponse<null>>({
      success: true,
      data: null
    })
  } catch (error) {
    console.error('Cancel RSVP error:', error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to cancel RSVP'
    }, { status: 500 })
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const rsvps = await prisma.rSVP.findMany({
      where: {
        eventId: params.eventId,
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
        createdAt: 'desc'
      }
    })

    return NextResponse.json<ApiResponse<typeof rsvps>>({
      success: true,
      data: rsvps
    })
  } catch (error) {
    console.error('Get RSVPs error:', error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to fetch RSVPs'
    }, { status: 500 })
  }
} 