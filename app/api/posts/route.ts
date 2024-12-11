import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { parseJsonArray } from '@/lib/db-utils'
import { auth } from '@clerk/nextjs'
import { Post, User, PostType } from '@prisma/client'
import { Post as PostResponse } from '@/lib/types'

export async function GET() {
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

      const transformedPosts: PostResponse[] = posts.map(post => ({
        id: post.id,
        content: post.content,
        type: post.type,
        mediaUrl: post.mediaUrl,
        mediaUrls: post.mediaUrl ? [post.mediaUrl] : undefined,
        createdAt: post.createdAt,
        author: {
          id: post.author.id,
          name: post.author.name,
          username: post.author.username,
          avatar: post.author.avatar,
        },
        likes: post.likes.map(like => ({ userId: like.userId })),
        _count: {
          likes: post._count.likes,
          comments: post._count.comments,
        },
      }))

      return NextResponse.json(transformedPosts)
    } catch (dbError) {
      console.error('Database error fetching posts:', dbError)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error in posts endpoint:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
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

    const { content, type = PostType.text, mediaUrl } = await request.json()

    if (!content && !mediaUrl) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    try {
      const post = await prisma.post.create({
        data: {
          content,
          type,
          mediaUrl,
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

      const transformedPost: PostResponse = {
        id: post.id,
        content: post.content,
        type: post.type,
        mediaUrl: post.mediaUrl,
        mediaUrls: post.mediaUrl ? [post.mediaUrl] : undefined,
        createdAt: post.createdAt,
        author: {
          id: post.author.id,
          name: post.author.name,
          username: post.author.username,
          avatar: post.author.avatar,
        },
        likes: post.likes.map(like => ({ userId: like.userId })),
        _count: {
          likes: post._count.likes,
          comments: post._count.comments,
        },
      }

      return NextResponse.json(transformedPost)
    } catch (dbError) {
      console.error('Database error creating post:', dbError)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error in create post endpoint:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 