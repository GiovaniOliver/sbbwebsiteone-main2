import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { ApiResponse } from '@/backend/lib/types/api';

export async function POST(request: Request, { params }: { params: { eventId: string } }) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { data: existingRsvp, error: checkError } = await supabase
      .from('event_attendees')
      .select()
      .eq('event_id', params.eventId)
      .eq('user_id', user.id)
      .single();

    if (!checkError) {
      throw new Error('Already RSVPed to this event');
    }

    const { error: insertError } = await supabase
      .from('event_attendees')
      .insert({
        event_id: params.eventId,
        user_id: user.id,
        status: 'going'
      });

    if (insertError) throw insertError;

    const response: ApiResponse<null> = {
      success: true
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error RSVPing to event:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to RSVP to event'
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { eventId: string } }) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { status } = await request.json();
    if (!status || !['going', 'not_going', 'maybe'].includes(status)) {
      throw new Error('Invalid status');
    }

    const { error } = await supabase
      .from('event_attendees')
      .update({ status })
      .eq('event_id', params.eventId)
      .eq('user_id', user.id);

    if (error) throw error;

    const response: ApiResponse<null> = {
      success: true
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating RSVP:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update RSVP'
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { eventId: string } }) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { error } = await supabase
      .from('event_attendees')
      .delete()
      .eq('event_id', params.eventId)
      .eq('user_id', user.id);

    if (error) throw error;

    const response: ApiResponse<null> = {
      success: true
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error canceling RSVP:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to cancel RSVP'
    };
    return NextResponse.json(response, { status: 500 });
  }
} 