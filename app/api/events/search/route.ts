import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ 
    cookies 
  });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return new Response('Search query is required', { status: 400 });
    }

    const { data: events, error } = await supabase
      .from('events')
      .select(`
        *,
        organizer:users(
          id,
          username,
          avatar_url
        ),
        attendees:event_attendees(
          user:users(
            id,
            username,
            avatar_url
          )
        )
      `)
      .eq('organizer_id', 'organizer.id')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order('start_date', { ascending: true });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: events
    });
  } catch (error) {
    console.error('Error searching events:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 