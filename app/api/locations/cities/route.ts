import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const stateCode = searchParams.get('state')

  if (!stateCode) {
    return NextResponse.json(
      { error: 'State code is required' },
      { status: 400 }
    )
  }

  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const { data: cities, error } = await supabase
      .from('black_population_cities')
      .select(`
        city_name,
        metropolitan_area,
        black_population,
        black_percentage
      `)
      .eq('state_code', stateCode.toUpperCase())
      .order('black_population', { ascending: false })

    if (error) {
      console.error('Error fetching cities:', error)
      return NextResponse.json(
        { error: 'Failed to fetch cities' },
        { status: 500 }
      )
    }

    return NextResponse.json(cities)
  } catch (error) {
    console.error('Error in cities route handler:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 