import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { ApiResponse } from '@/lib/types'

export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 })
    }

    const currentUser = await prisma.user.findUnique({
      where: { clerkId }
    })

    if (!currentUser) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'User not found'
      }, { status: 404 })
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: params.userId }
    })

    if (!targetUser) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Target user not found'
      }, { status: 404 })
    }

    // Prevent self-following
    if (currentUser.id === targetUser.id) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Cannot follow yourself'
      }, { status: 400 })
    }

    // Create follow relationship
    await prisma.follows.create({
      data: {
        followerId: currentUser.id,
        followingId: targetUser.id
      }
    })

    return NextResponse.json<ApiResponse<null>>({
      success: true
    }, { status: 200 })
  } catch (error) {
    console.error('Follow error:', error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to follow user'
    }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 })
    }

    const currentUser = await prisma.user.findUnique({
      where: { clerkId }
    })

    if (!currentUser) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'User not found'
      }, { status: 404 })
    }

    // Delete follow relationship
    await prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId: currentUser.id,
          followingId: params.userId
        }
      }
    })

    return NextResponse.json<ApiResponse<null>>({
      success: true
    }, { status: 200 })
  } catch (error) {
    console.error('Unfollow error:', error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to unfollow user'
    }, { status: 500 })
  }
}

// Get followers/following lists
export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'followers' or 'following'

    if (!type || !['followers', 'following'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid type parameter' },
        { status: 400 }
      )
    }

    const follows = await prisma.follow.findMany({
      where: type === 'followers' 
        ? { followingId: params.userId }
        : { followerId: params.userId },
      include: {
        follower: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
            isVerified: true,
          }
        },
        following: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
            isVerified: true,
          }
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(follows)
  } catch (error) {
    console.error('Error in follows endpoint:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 