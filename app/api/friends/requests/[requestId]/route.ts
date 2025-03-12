import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request, { params }: { params: { requestId: string } }) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { action } = await request.json();
    if (!action || !['accept', 'reject'].includes(action)) {
      return new Response('Invalid action', { status: 400 });
    }

    const { data: friendRequest, error: fetchError } = await supabase
      .from('friend_requests')
      .select('*')
      .eq('id', params.requestId)
      .eq('receiver_id', session.user.id)
      .single();

    if (fetchError) {
      return new Response('Friend request not found', { status: 404 });
    }

    if (action === 'accept') {
      const { error: friendshipError } = await supabase
        .from('friends')
        .insert([
          {
            user_id: session.user.id,
            friend_id: friendRequest.sender_id,
            status: 'accepted'
          },
          {
            user_id: friendRequest.sender_id,
            friend_id: session.user.id,
            status: 'accepted'
          }
        ]);

      if (friendshipError) throw friendshipError;
    }

    const { error: updateError } = await supabase
      .from('friend_requests')
      .update({ status: action === 'accept' ? 'accepted' : 'rejected' })
      .eq('id', params.requestId);

    if (updateError) throw updateError;

    return new Response(null, { status: 200 });
  } catch (error) {
    console.error('Error handling friend request:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { requestId: string } }) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { error } = await supabase
      .from('friend_requests')
      .delete()
      .eq('id', params.requestId)
      .eq('sender_id', session.user.id);

    if (error) throw error;

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error canceling friend request:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 