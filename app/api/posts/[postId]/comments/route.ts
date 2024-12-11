import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const comments = await prisma.comment.findMany({
      where: {
        postId: params.postId,
        parentId: null, // Only get top-level comments
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
            isVerified: true,
          },
        },
        reactions: true,
        replies: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                avatar: true,
                isVerified: true,
              },
            },
            reactions: true,
            _count: {
              select: {
                reactions: true,
                replies: true,
              },
            },
          },
        },
        _count: {
          select: {
            reactions: true,
            replies: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(comments)
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const { content, parentId } = await req.json()

    const comment = await prisma.comment.create({
      data: {
        content,
        postId: params.postId,
        userId: user.id,
        parentId: parentId || null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
            isVerified: true,
          },
        },
        reactions: true,
        _count: {
          select: {
            reactions: true,
            replies: true,
          },
        },
      },
    })

    return NextResponse.json(comment)
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 