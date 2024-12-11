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

    try {
      const bookmark = await prisma.bookmark.create({
        data: {
          post: { connect: { id: postId } },
          user: { connect: { id: user.id } },
        },
      })

      return NextResponse.json({ success: true })
    } catch (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error in bookmark endpoint:', error)
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
      const bookmark = await prisma.bookmark.findFirst({
        where: {
          postId,
          userId: user.id,
        },
      })

      if (!bookmark) {
        return NextResponse.json({ error: 'Bookmark not found' }, { status: 404 })
      }

      await prisma.bookmark.delete({
        where: {
          id: bookmark.id,
        },
      })

      return NextResponse.json({ success: true })
    } catch (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error in unbookmark endpoint:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Get user's bookmarked posts
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

    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId: user.id,
      },
      include: {
        post: {
          include: {
            author: true,
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(bookmarks)
  } catch (error) {
    console.error('Error in bookmarks endpoint:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 