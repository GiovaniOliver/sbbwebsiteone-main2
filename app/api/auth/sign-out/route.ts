import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { signOut } from '@/backend/services/auth/auth.service'
import { ApiResponse } from '@/backend/lib/types/api'

export async function POST() {
  const supabase = createRouteHandlerClient({ 
    cookies 
  });
  
  await supabase.auth.signOut();
  
  return NextResponse.json<ApiResponse<null>>({
    success: true
  })
} 