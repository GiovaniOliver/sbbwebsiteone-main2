import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { ensureUserExists } from '@/backend/services/auth/auth.service'
import { ApiResponse } from '@/backend/lib/types/api'

export async function GET() {
  try {
    const user = await ensureUserExists()
    if (!user) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Not authenticated'
      }, { status: 401 })
    }

    return NextResponse.json<ApiResponse<typeof user>>({
      success: true,
      data: user
    })
  } catch (error: any) {
    console.error('[AUTH_USER_GET]', error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: error.message || 'Failed to fetch user'
    }, { status: 500 })
  }
} 