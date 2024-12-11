import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/prisma'
import { CommentReaction } from '@prisma/client'

export async function POST(
  req: Request,
  { params }: { params: { postId: string; commentId: string } }
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

    const { type } = await req.json()

    // Check if reaction already exists
    const existingReaction = await prisma.commentReaction.findFirst({
      where: {
        commentId: params.commentId,
        userId: user.id,
        type,
      },
    })

    if (existingReaction) {
      // Remove the reaction if it exists
      await prisma.commentReaction.delete({
        where: { id: existingReaction.id },
      })
    } else {
      // Create new reaction
      await prisma.commentReaction.create({
        data: {
          type,
          commentId: params.commentId,
          userId: user.id,
        },
      })
    }

    // Get updated reactions count
    const reactions = await prisma.commentReaction.groupBy({
      by: ['type'],
      where: {
        commentId: params.commentId,
      },
      _count: true,
    })

    return NextResponse.json({ success: true, reactions })
  } catch (error) {
    console.error('Error in reaction endpoint:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { postId: string; commentId: string } }
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

    const reactions = await prisma.commentReaction.groupBy({
      by: ['type'],
      where: {
        commentId: params.commentId,
      },
      _count: true,
    })

    const userReactions = await prisma.commentReaction.findMany({
      where: {
        commentId: params.commentId,
        userId: user.id,
      },
      select: {
        type: true,
      },
    })

    return NextResponse.json({
      reactions,
      userReactions: userReactions.map((r: { type: string }) => r.type),
    })
  } catch (error) {
    console.error('Error in get reactions endpoint:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 