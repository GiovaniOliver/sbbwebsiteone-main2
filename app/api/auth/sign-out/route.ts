import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { signOut } from '@/backend/services/auth/auth.service'
import { ApiResponse } from '@/backend/lib/types/api'

export async function POST() {
  try {
    await signOut()
    
    return NextResponse.json<ApiResponse<null>>({
      success: true
    })
  } catch (error: any) {
    console.error('[AUTH_SIGNOUT_POST]', error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: error.message || 'Failed to sign out'
    }, { status: 500 })
  }
} 