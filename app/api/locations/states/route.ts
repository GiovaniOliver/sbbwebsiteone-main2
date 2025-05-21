import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const { data: states, error } = await supabase
      .from('black_population_states')
      .select(`
        state_code,
        state_name,
        black_population,
        black_percentage
      `)
      .order('black_population', { ascending: false })

    if (error) {
      console.error('Error fetching states:', error)
      return NextResponse.json(
        { error: 'Failed to fetch states' },
        { status: 500 }
      )
    }

    return NextResponse.json(states)
  } catch (error) {
    console.error('Error in states route handler:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 