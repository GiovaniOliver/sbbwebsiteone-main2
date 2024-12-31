import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApiResponse } from '@/lib/types'

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const following = await prisma.follows.findMany({
      where: {
        followerId: params.userId
      },
      include: {
        following: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json<ApiResponse<typeof following>>({
      success: true,
      data: following
    })
  } catch (error) {
    console.error('Get following error:', error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to fetch following'
    }, { status: 500 })
  }
} 