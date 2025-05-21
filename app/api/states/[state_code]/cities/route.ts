import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

interface Params {
  state_code: string
}

export async function GET(request: Request, { params }: { params: Params }) {
  const { state_code } = params
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data, error } = await supabase
      .from('black_population_cities')
      .select('*')
      .eq('state_code', state_code)
      .order('city_name', { ascending: true })

    if (error) {
      console.error(`Error fetching cities for state ${state_code}:`, error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 