import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { Post, User, PostType } from '@prisma/client'
import { ApiResponse } from '@/lib/types'
import { ensureUserExists } from '@/lib/auth'

export const runtime = 'nodejs'

export async function GET(
  request: NextRequest,
  context: { params: {} }
): Promise<NextResponse> {
  try {
    const user = await ensureUserExists()
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    try {
      const posts = await prisma.post.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          author: true,
          likes: true,
          _count: {
            select: {
              likes: true,
              comments: true,
            }
          }
        }
      })

      const transformedPosts = posts.map(post => ({
        id: post.id,
        content: post.content,
        type: post.type,
        mediaUrl: post.mediaUrl ?? undefined,
        mediaUrls: post.mediaUrl ? [post.mediaUrl] : undefined,
        createdAt: post.createdAt,
        shares: post.shares,
        author: {
          id: post.author.id,
          name: `${post.author.firstName || ''} ${post.author.lastName || ''}`.trim() || 'Anonymous',
          username: post.author.username,
          avatar: post.author.avatar ?? undefined,
        },
        likes: post.likes.map(like => ({ userId: like.userId })),
        _count: {
          likes: post._count.likes,
          comments: post._count.comments,
        },
      }))

      return NextResponse.json({ success: true, data: transformedPosts })
    } catch (dbError) {
      console.error('Database error fetching posts:', { error: dbError instanceof Error ? dbError.message : 'Unknown error' })
      return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error in posts endpoint:', { error: error instanceof Error ? error.message : 'Unknown error' })
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  context: { params: {} }
): Promise<NextResponse> {
  try {
    const user = await ensureUserExists()
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { content, type: incomingType = 'TEXT', mediaUrl } = await request.json()
    const type = PostType[incomingType.toUpperCase() as keyof typeof PostType]

    if (!content && !mediaUrl) {
      return NextResponse.json({ success: false, error: 'Content is required' }, { status: 400 })
    }

    try {
      const post = await prisma.post.create({
        data: {
          content,
          type,
          mediaUrl: mediaUrl ?? null,
          author: {
            connect: { id: user.id },
          },
        },
        include: {
          author: true,
          likes: true,
          _count: {
            select: {
              likes: true,
              comments: true,
            },
          },
        },
      })

      const transformedPost = {
        id: post.id,
        content: post.content,
        type: post.type,
        mediaUrl: post.mediaUrl ?? undefined,
        mediaUrls: post.mediaUrl ? [post.mediaUrl] : undefined,
        createdAt: post.createdAt,
        shares: post.shares,
        author: {
          id: post.author.id,
          name: `${post.author.firstName || ''} ${post.author.lastName || ''}`.trim() || 'Anonymous',
          username: post.author.username,
          avatar: post.author.avatar ?? undefined,
        },
        likes: post.likes.map(like => ({ userId: like.userId })),
        _count: {
          likes: post._count.likes,
          comments: post._count.comments,
        },
      }

      return NextResponse.json({ success: true, data: transformedPost })
    } catch (dbError) {
      console.error('Database error creating post:', dbError)
      return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error in create post endpoint:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
} 