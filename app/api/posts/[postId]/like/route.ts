import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs'

export async function POST(
  request: Request,
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

    const { postId } = params

    // Verify post exists
    const post = await prisma.post.findUnique({
      where: { id: postId }
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    try {
      // Check if like already exists
      const existingLike = await prisma.like.findFirst({
        where: {
          postId,
          userId: user.id,
        },
      })

      if (existingLike) {
        return NextResponse.json({ error: 'Already liked' }, { status: 400 })
      }

      // Create like
      const like = await prisma.like.create({
        data: {
          post: { connect: { id: postId } },
          user: { connect: { id: user.id } },
        },
        include: {
          post: {
            include: {
              _count: {
                select: {
                  likes: true,
                  comments: true,
                  bookmarks: true,
                },
              },
            },
          },
        },
      })

      return NextResponse.json({
        success: true,
        likeCount: like.post._count.likes,
      })
    } catch (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error in like endpoint:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
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

    const { postId } = params

    try {
      // Find and delete like
      const like = await prisma.like.findFirst({
        where: {
          postId,
          userId: user.id,
        },
      })

      if (!like) {
        return NextResponse.json({ error: 'Like not found' }, { status: 404 })
      }

      await prisma.like.delete({
        where: {
          id: like.id,
        },
      })

      // Get updated like count
      const updatedPost = await prisma.post.findUnique({
        where: { id: postId },
        include: {
          _count: {
            select: {
              likes: true,
            },
          },
        },
      })

      return NextResponse.json({
        success: true,
        likeCount: updatedPost?._count.likes || 0,
      })
    } catch (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error in unlike endpoint:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 