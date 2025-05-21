import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { EventDb, EventDbWithRelations, toEvent, CreateEventInput } from '../../../backend/lib/types/event';
import { ApiResponse } from '../../../backend/lib/types/api';

// GET /api/events
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const past = searchParams.get('past') === 'true';
  const search = searchParams.get('search');
  const organizerId = searchParams.get('organizerId');

  const supabase = createRouteHandlerClient({ cookies });

  try {
    let query = supabase
      .from('events')
      .select(`
        *,
        organizer:users!events_organizer_id_fkey(*)
      `);

    // Apply filters
    if (past) {
      query = query.lt('start_date', new Date().toISOString());
    } else {
      query = query.gte('start_date', new Date().toISOString());
    }

    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    if (organizerId) {
      query = query.eq('organizer_id', organizerId);
    }

    const { data: events, error } = await query
      .order('start_date', { ascending: !past });

    if (error) throw error;

    const response: ApiResponse<typeof events> = {
      success: true,
      data: events.map(event => toEvent(event as EventDbWithRelations))
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching events:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch events'
    };
    return NextResponse.json(response, { status: 500 });
  }
}

// POST /api/events
export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const json = await request.json();
    
    // Validate input format
    if (!json.title || !json.startDate || !json.endDate) {
      throw new Error('Missing required fields');
    }
    
    if (new Date(json.startDate) >= new Date(json.endDate)) {
      throw new Error('End date must be after start date');
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    // Validate user role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
      
    if (profile?.role !== 'organizer') {
      throw new Error('Insufficient permissions');
    }

    // Create event data with proper DB types
    const eventData: CreateEventInput = { 
      title: json.title,
      description: json.description,
      start_date: new Date(json.startDate).toISOString(),
      end_date: new Date(json.endDate).toISOString(),
      location: json.location,
      is_virtual: json.isVirtual,
      organizer_id: user.id,
      max_attendees: json.maxAttendees,
      status: 'upcoming'  // Default status for new events
    };

    const { data: event, error } = await supabase
      .from('events')
      .insert(eventData)
      .select(`
        *,
        organizer:users!events_organizer_id_fkey(*)
      `)
      .single();

    if (error) throw error;

    const response: ApiResponse<typeof event> = {
      success: true,
      data: toEvent(event as EventDbWithRelations)
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error creating event:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create event'
    };
    return NextResponse.json(response, { status: 500 });
  }
}
