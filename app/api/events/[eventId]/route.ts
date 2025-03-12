import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { EventDbWithRelations, toEvent, CreateEventInput } from '../../../../backend/lib/types/event';
import { ApiResponse } from '../../../../backend/lib/types/api';

export async function GET(request: Request, { params }: { params: { eventId: string } }) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { data: event, error } = await supabase
      .from('events')
      .select(`
        *,
        organizer:users!events_organizer_id_fkey(*),
        attendees:event_attendees(user:users(*))
      `)
      .eq('id', params.eventId)
      .single();

    if (error) throw error;
    if (!event) throw new Error('Event not found');

    const response: ApiResponse<typeof event> = {
      success: true,
      data: toEvent(event as EventDbWithRelations)
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching event:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch event'
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { eventId: string } }) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { data: event, error: fetchError } = await supabase
      .from('events')
      .select('organizer_id')
      .eq('id', params.eventId)
      .single();

    if (fetchError) throw fetchError;
    if (!event) throw new Error('Event not found');
    if (event.organizer_id !== user.id) {
      throw new Error('You are not authorized to update this event');
    }

    const json = await request.json();
    const updates: Partial<CreateEventInput> = {
      title: json.title,
      description: json.description,
      start_date: json.startDate ? new Date(json.startDate).toISOString() : undefined,
      end_date: json.endDate ? new Date(json.endDate).toISOString() : undefined,
      location: json.location,
      is_virtual: json.isVirtual,
      max_attendees: json.maxAttendees
    };

    const { data: updatedEvent, error: updateError } = await supabase
      .from('events')
      .update(updates)
      .eq('id', params.eventId)
      .select(`
        *,
        organizer:users!events_organizer_id_fkey(*)
      `)
      .single();

    if (updateError) throw updateError;

    const response: ApiResponse<typeof updatedEvent> = {
      success: true,
      data: toEvent(updatedEvent as EventDbWithRelations)
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating event:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update event'
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { eventId: string } }) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { data: event, error: fetchError } = await supabase
      .from('events')
      .select('organizer_id')
      .eq('id', params.eventId)
      .single();

    if (fetchError) throw fetchError;
    if (!event) throw new Error('Event not found');
    if (event.organizer_id !== user.id) {
      throw new Error('You are not authorized to delete this event');
    }

    const { error: deleteError } = await supabase
      .from('events')
      .delete()
      .eq('id', params.eventId);

    if (deleteError) throw deleteError;

    const response: ApiResponse<null> = {
      success: true
    };

    return NextResponse.json(response, { status: 204 });
  } catch (error) {
    console.error('Error deleting event:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete event'
    };
    return NextResponse.json(response, { status: 500 });
  }
} 