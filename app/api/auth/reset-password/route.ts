import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { resetPassword } from '@/backend/services/auth/auth.service'
import { ApiResponse } from '@/backend/lib/types/api'

// Initiate password reset
export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    // Validate input
    if (!email) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Email is required'
      }, { status: 400 })
    }

    const success = await resetPassword(email)
    if (!success) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Failed to initiate password reset'
      }, { status: 500 })
    }

    return NextResponse.json<ApiResponse<null>>({
      success: true
    })
  } catch (error: any) {
    console.error('[AUTH_RESET_PASSWORD_POST]', error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: error.message || 'Failed to initiate password reset'
    }, { status: 500 })
  }
}

// Update password after reset
export async function PUT(req: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  
  try {
    const { password } = await req.json()

    // Validate input
    if (!password) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'New password is required'
      }, { status: 400 })
    }

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Not authenticated'
      }, { status: 401 })
    }

    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      throw error
    }

    return NextResponse.json<ApiResponse<null>>({
      success: true
    })
  } catch (error: any) {
    console.error('[AUTH_RESET_PASSWORD_PUT]', error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: error.message || 'Failed to update password'
    }, { status: 500 })
  }
} 