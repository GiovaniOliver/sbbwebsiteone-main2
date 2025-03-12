import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { EventDbWithRelations, toEvent } from '../../../../backend/lib/types/event';
import { ApiResponse } from '../../../../backend/lib/types/api';

export async function GET(request: Request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '5');

    const now = new Date().toISOString();
    const { data: events, error } = await supabase
      .from('events')
      .select(`
        *,
        organizer:users!events_organizer_id_fkey(*)
      `)
      .gte('start_date', now)
      .order('start_date', { ascending: true })
      .limit(limit);

    if (error) throw error;

    const response: ApiResponse<typeof events> = {
      success: true,
      data: events.map(event => toEvent(event as EventDbWithRelations))
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch upcoming events'
    };
    return NextResponse.json(response, { status: 500 });
  }
} 