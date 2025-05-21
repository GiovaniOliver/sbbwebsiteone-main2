import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { EventDbWithRelations, toEvent, Event } from '../../../../backend/lib/types/event';
import { ApiResponse } from '../../../../backend/lib/types/api';

export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ 
      cookies
    });
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }
    
    const today = new Date().toISOString();
    
    // Get upcoming events
    const { data: events, error } = await supabase
      .from('events')
      .select(`
        *,
        creator:profiles!creator_id (id, username, avatar_url),
        attendees:event_attendees (count)
      `)
      .gte('event_date', today)
      .order('event_date', { ascending: true });
    
    if (error) throw error;
    
    return NextResponse.json({
      success: true,
      data: events
    });
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    return new Response('Error fetching events', { status: 500 });
  }
} 