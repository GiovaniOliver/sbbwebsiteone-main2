import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/prisma'

export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId: clerkId } = auth()
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const follower = await prisma.user.findUnique({
      where: { clerkId }
    })

    if (!follower) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const following = await prisma.user.findUnique({
      where: { id: params.userId }
    })

    if (!following) {
      return NextResponse.json({ error: 'User to follow not found' }, { status: 404 })
    }

    // Check if already following
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: follower.id,
          followingId: following.id,
        }
      }
    })

    if (existingFollow) {
      return NextResponse.json({ error: 'Already following' }, { status: 400 })
    }

    // Create follow relationship
    await prisma.follow.create({
      data: {
        followerId: follower.id,
        followingId: following.id,
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in follow endpoint:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId: clerkId } = auth()
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const follower = await prisma.user.findUnique({
      where: { clerkId }
    })

    if (!follower) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Find and delete follow relationship
    const follow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: follower.id,
          followingId: params.userId,
        }
      }
    })

    if (!follow) {
      return NextResponse.json({ error: 'Not following' }, { status: 404 })
    }

    await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId: follower.id,
          followingId: params.userId,
        }
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in unfollow endpoint:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Get followers/following lists
export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId: clerkId } = auth()
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