import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface Params {
  state_code: string
}

export async function GET(
  request: Request,
  { params }: { params: Params }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { state_code } = params;
    const stateCode = state_code.toUpperCase();

    const { data: stateData, error } = await supabase
      .from('black_population_states')
      .select('*')
      .eq('state_code', stateCode)
      .single();

    if (error) {
      console.error('Error fetching state population data:', error);
      return NextResponse.json({ error: 'Failed to fetch state population data' }, { status: 500 });
    }

    return NextResponse.json(stateData);
  } catch (error) {
    console.error('Error in state population route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 