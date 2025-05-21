import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Try a simple query to test the connection
    const { data, error } = await supabase
      .from('states')
      .select('code')
      .limit(1)

    if (error) {
      console.error('Database connection error:', error)
      return NextResponse.json(
        { 
          error: 'Database connection failed',
          details: error.message,
          hint: 'Make sure Supabase is running locally with: supabase start'
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully connected to Supabase',
      data
    })
  } catch (error) {
    console.error('Error in test connection:', error)
    return NextResponse.json(
      { 
        error: 'Connection test failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        hint: 'Verify Supabase configuration and service status'
      },
      { status: 500 }
    )
  }
} 