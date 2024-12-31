import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

interface ErrorObject {
  name?: string
  message: string
  stack?: string
  cause?: unknown
}

interface ErrorResponse {
  success: false
  error: {
    message: string
    code?: string
    details?: string
  }
}

interface SuccessResponse {
  success: true
  data: {
    exists: boolean
    user?: any
  }
}

function handleError(error: unknown): ErrorObject {
  if (error instanceof Error) {
    console.error('Raw error:', { 
      name: error.name,
      message: error.message,
      stack: error.stack,
      cause: error.cause
    })
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
      cause: error.cause
    }
  }
  console.error('Raw error:', { message: String(error) })
  return {
    message: String(error)
  }
}

export async function GET() {
  try {
    const { userId } = await auth()
    console.log('GET - Auth userId:', userId)
    
    if (!userId) {
      console.warn('GET - No userId found in auth')
      const response: ErrorResponse = {
        success: false,
        error: {
          message: 'Unauthorized',
          code: 'AUTH_REQUIRED'
        }
      }
      return NextResponse.json(response, { status: 401 })
    }

    try {
      const user = await prisma.user.findFirst({
        where: { clerkId: userId }
      })
      console.log('GET - Found user:', user ? 'yes' : 'no')

      if (!user) {
        const response: SuccessResponse = {
          success: true,
          data: {
            exists: false
          }
        }
        return NextResponse.json(response, { status: 404 })
      }

      const response: SuccessResponse = {
        success: true,
        data: {
          exists: true,
          user: {
            ...user,
            badges: user.badges ? JSON.parse(user.badges as string) as any[] : []
          }
        }
      }
      return NextResponse.json(response)
    } catch (dbError) {
      console.error('GET - Database error:', { error: dbError instanceof Error ? dbError.message : 'Unknown error' })
      if (dbError instanceof Prisma.PrismaClientKnownRequestError) {
        const response: ErrorResponse = {
          success: false,
          error: {
            message: 'Database error',
            code: dbError.code,
            details: dbError.message
          }
        }
        return NextResponse.json(response, { status: 500 })
      }
      throw dbError
    }
  } catch (error) {
    const errorObj = handleError(error)
    console.error('GET - Unhandled error:', { error: errorObj })
    const response: ErrorResponse = {
      success: false,
      error: {
        message: 'Internal server error',
        code: errorObj.name || 'UNKNOWN_ERROR',
        details: errorObj.message
      }
    }
    return NextResponse.json(response, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    console.log('POST - Auth userId:', userId)
    
    if (!userId) {
      console.warn('POST - No userId found in auth')
      const response: ErrorResponse = {
        success: false,
        error: {
          message: 'Unauthorized',
          code: 'AUTH_REQUIRED'
        }
      }
      return NextResponse.json(response, { status: 401 })
    }

    let data
    try {
      data = await request.json()
      console.log('POST - Request data:', data)
    } catch (error) {
      console.warn('POST - No request body or invalid JSON')
      data = {}
    }

    const existingUser = await prisma.user.findFirst({
      where: { clerkId: userId }
    })
    console.log('POST - Existing user:', existingUser ? 'yes' : 'no')

    if (existingUser) {
      const response: ErrorResponse = {
        success: false,
        error: {
          message: 'User already exists',
          code: 'USER_EXISTS'
        }
      }
      return NextResponse.json(response, { status: 409 })
    }

    const user = await prisma.user.create({
      data: {
        clerkId: userId,
        firstName: data?.firstName || 'New',
        lastName: data?.lastName || 'User',
        username: data?.username || `user_${userId.slice(-6)}`,
        email: data?.email || '',
        avatar: data?.avatar || '',
        badges: '[]'
      }
    })
    console.log('POST - Created user:', user.id)

    const response: SuccessResponse = {
      success: true,
      data: {
        exists: true,
        user: {
          ...user,
          badges: user.badges ? JSON.parse(user.badges as string) as any[] : []
        }
      }
    }
    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    const errorObj = handleError(error)
    console.error('POST - Unhandled error:', errorObj)
    const response: ErrorResponse = {
      success: false,
      error: {
        message: 'Failed to create user',
        code: errorObj.name || 'UNKNOWN_ERROR',
        details: errorObj.message
      }
    }
    return NextResponse.json(response, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      const response: ErrorResponse = {
        success: false,
        error: {
          message: 'Unauthorized',
          code: 'AUTH_REQUIRED'
        }
      }
      return NextResponse.json(response, { status: 401 })
    }

    let data
    try {
      data = await request.json()
    } catch {
      data = {}
    }

    const user = await prisma.user.update({
      where: { clerkId: userId },
      data: {
        ...(data?.firstName && { firstName: data.firstName }),
        ...(data?.lastName && { lastName: data.lastName }),
        ...(data?.username && { username: data.username }),
        ...(data?.email && { email: data.email }),
        ...(data?.avatar && { avatar: data.avatar })
      }
    })

    const response: SuccessResponse = {
      success: true,
      data: {
        exists: true,
        user: {
          ...user,
          badges: user.badges ? JSON.parse(user.badges as string) as any[] : []
        }
      }
    }
    return NextResponse.json(response)
  } catch (error) {
    const errorObj = handleError(error)
    console.error('Error in new-user PUT route:', errorObj)
    const response: ErrorResponse = {
      success: false,
      error: {
        message: 'Failed to update user',
        code: errorObj.name || 'UNKNOWN_ERROR',
        details: errorObj.message
      }
    }
    return NextResponse.json(response, { status: 500 })
  }
} 