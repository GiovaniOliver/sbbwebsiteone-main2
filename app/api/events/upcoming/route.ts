import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApiResponse } from '@/lib/types'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = Number(searchParams.get('limit')) || 5

    const events = await prisma.event.findMany({
      where: {
        startDate: {
          gte: new Date(),
        },
      },
      include: {
        organizer: true,
        _count: {
          select: {
            attendees: true,
          },
        },
      },
      orderBy: {
        startDate: 'asc',
      },
      take: limit,
    })

    const formattedEvents = events.map((event) => ({
      id: event.id,
      title: event.title,
      startDate: event.startDate?.toLocaleDateString() || 'Unknown Date',
      location: event.location || 'Unknown Location',
      organizer: {
        id: event.organizer.id,
        name: `${event.organizer.firstName || ''} ${event.organizer.lastName || ''}`.trim() || 'Unknown',
        email: event.organizer.email
      },
      attendeeCount: event._count.attendees
    }))

    return NextResponse.json<ApiResponse<typeof formattedEvents>>({
      success: true,
      data: formattedEvents
    })
  } catch (error) {
    console.error("[UPCOMING_EVENTS]", error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to fetch upcoming events'
    }, { status: 500 })
  }
} 