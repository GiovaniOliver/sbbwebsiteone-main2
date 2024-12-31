import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ensureUserExists } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const currentUser = await ensureUserExists()
    if (!currentUser) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    // Get 5 random users excluding the current user
    const suggestedUsers = await prisma.user.findMany({
      where: {
        id: { not: currentUser.id },
        // Add any other filters (e.g., not already following)
      },
      select: {
        id: true,
        username: true,
        avatar: true,
        userType: true,
      },
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ success: true, data: suggestedUsers })
  } catch (error) {
    console.error('Error fetching suggested users:', { error: error instanceof Error ? error.message : 'Unknown error' })
    return NextResponse.json(
      { success: false, error: 'Failed to fetch suggested users' },
      { status: 500 }
    )
  }
} 