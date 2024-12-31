import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse } from '@/lib/types';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query') || '';
    const category = searchParams.get('category');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const online = searchParams.get('online') === 'true';

    const events = await prisma.event.findMany({
      where: {
        AND: [
          query ? {
            OR: [
              { title: { contains: query.toLowerCase() } },
              { description: { contains: query.toLowerCase() } },
            ],
          } : {},
          ...(category ? [{ category }] : []),
          ...(startDate ? [{ startDate: { gte: new Date(startDate) } }] : []),
          ...(endDate ? [{ endDate: { lte: new Date(endDate) } }] : []),
          ...(online ? [{ isOnline: true }] : []),
        ].filter(condition => Object.keys(condition).length > 0),
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
    });

    return NextResponse.json<ApiResponse<typeof events>>({
      success: true,
      data: events
    });
  } catch (error) {
    console.error("[EVENTS_SEARCH]", error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to search events'
    }, { status: 500 });
  }
} 