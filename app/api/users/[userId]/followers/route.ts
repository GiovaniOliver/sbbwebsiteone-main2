import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApiResponse } from '@/lib/types'

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const followers = await prisma.follows.findMany({
      where: {
        followingId: params.userId
      },
      include: {
        follower: {
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

    return NextResponse.json<ApiResponse<typeof followers>>({
      success: true,
      data: followers
    })
  } catch (error) {
    console.error('Get followers error:', error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to fetch followers'
    }, { status: 500 })
  }
} 