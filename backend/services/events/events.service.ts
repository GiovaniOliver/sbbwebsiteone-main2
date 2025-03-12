import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Event, EventDb, toEvent } from '../../lib/types/event';

export async function getUpcomingEvents(): Promise<Event[]> {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: events, error } = await supabase
      .from('events')
      .select(`
        *,
        organizer:users!events_organizer_id_fkey(*)
      `)
      .gte('start_date', new Date().toISOString())
      .order('start_date', { ascending: true });

    if (error) throw error;
    return (events || []).map(event => toEvent(event));
  } catch (error) {
    console.error('Error getting upcoming events:', error);
    throw error;
  }
}

export async function createEvent(data: Omit<EventDb, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: event, error } = await supabase
      .from('events')
      .insert(data)
      .select(`
        *,
        organizer:users!events_organizer_id_fkey(*)
      `)
      .single();

    if (error) throw error;
    return toEvent(event);
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
} 