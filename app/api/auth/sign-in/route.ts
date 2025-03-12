import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { signIn } from '@/backend/services/auth/auth.service'
import { ApiResponse } from '@/backend/lib/types/api'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 })
    }

    // Attempt to sign in
    const user = await signIn(email, password)
    if (!user) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Invalid credentials'
      }, { status: 401 })
    }

    return NextResponse.json<ApiResponse<typeof user>>({
      success: true,
      data: user
    })
  } catch (error: any) {
    console.error('[AUTH_SIGNIN_POST]', error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: error.message || 'Failed to sign in'
    }, { status: 500 })
  }
} 