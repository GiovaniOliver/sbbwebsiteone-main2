import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { signIn } from '@/backend/services/auth/auth.service'
import { ApiResponse } from '@/backend/lib/types/api'

export async function POST(request: Request) {
  const { email, password } = await request.json()
  
  const supabase = createRouteHandlerClient({ 
    cookies 
  })

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ 
    user: data.user,
    session: data.session
  })
} 