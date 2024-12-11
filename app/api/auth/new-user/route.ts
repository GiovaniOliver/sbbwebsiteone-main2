import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { name, username, email, avatar } = await request.json()

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: { clerkId: userId }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Create new user
    const user = await prisma.user.create({
      data: {
        clerkId: userId,
        name: name || 'New User',
        username: username || `user_${userId.slice(-6)}`,
        email: email || '',
        avatar: avatar || '',
        badges: '[]',
        isVerified: false,
      }
    })

    return NextResponse.json({
      success: true,
      user
    })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Error creating user' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { userId } = auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user exists with better error handling
    try {
      const user = await prisma.user.findFirst({
        where: { clerkId: userId },
        include: {
          _count: {
            select: {
              followers: true,
              following: true,
              posts: true
            }
          }
        }
      })

      if (!user) {
        return NextResponse.json(
          { exists: false },
          { status: 404 }
        )
      }

      return NextResponse.json({
        exists: true,
        user: {
          ...user,
          badges: JSON.parse(user.badges || '[]'),
        }
      })
    } catch (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { error: 'Authentication error' },
      { status: 401 }
    )
  }
}

// Update user profile
export async function PUT(request: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { name, username, bio, avatar } = await request.json()

    // Validate username uniqueness if it's being updated
    if (username) {
      const existingUser = await prisma.user.findFirst({
        where: {
          username,
          NOT: {
            clerkId: userId
          }
        }
      })

      if (existingUser) {
        return NextResponse.json(
          { error: 'Username already taken' },
          { status: 400 }
        )
      }
    }

    // Update user with better error handling
    try {
      const user = await prisma.user.update({
        where: { clerkId: userId },
        data: {
          name: name || undefined,
          username: username || undefined,
          bio: bio || undefined,
          avatar: avatar || undefined,
        },
        include: {
          _count: {
            select: {
              followers: true,
              following: true,
              posts: true
            }
          }
        }
      })

      return NextResponse.json({
        success: true,
        user: {
          ...user,
          badges: JSON.parse(user.badges || '[]'),
        }
      })
    } catch (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Error updating user' },
      { status: 500 }
    )
  }
} 