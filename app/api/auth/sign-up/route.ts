import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { signUp } from '@/backend/services/auth/auth.service'
import { ApiResponse } from '@/backend/lib/types/api'

export async function POST(req: Request) {
  try {
    const { email, password, username } = await req.json()

    // Validate input
    if (!email || !password || !username) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 })
    }

    // Attempt to sign up
    const user = await signUp(email, password, username)
    if (!user) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Failed to create user'
      }, { status: 500 })
    }

    return NextResponse.json<ApiResponse<typeof user>>({
      success: true,
      data: user
    })
  } catch (error: any) {
    console.error('[AUTH_SIGNUP_POST]', error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: error.message || 'Failed to sign up'
    }, { status: 500 })
  }
} 