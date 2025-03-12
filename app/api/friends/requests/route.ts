import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { ApiResponse } from '@/backend/lib/types/api';
import { UserDbWithRelations, toUserWithRelations } from '@/backend/lib/types/user';

interface FriendRequestDb {
  id: string;
  created_at: string;
  sender: UserDbWithRelations;
}

interface FriendRequest {
  id: string;
  created_at: string;
  sender: UserDbWithRelations;
}

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { data: requests, error } = await supabase
      .from('friend_requests')
      .select(`
        id,
        created_at,
        sender:users!friend_requests_sender_id_fkey(
          id,
          username,
          email,
          first_name,
          last_name,
          image_url,
          profile_image_url,
          two_factor_enabled,
          banned,
          locked,
          last_sign_in_at,
          created_at,
          updated_at,
          metadata
        )
      `)
      .eq('receiver_id', user.id)
      .eq('status', 'pending')
      .returns<FriendRequestDb[]>();

    if (error) throw error;

    const response: ApiResponse<FriendRequest[]> = {
      success: true,
      data: requests.map(request => ({
        id: request.id,
        created_at: request.created_at,
        sender: request.sender
      }))
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching friend requests:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch friend requests'
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { friendId } = await request.json();
    if (!friendId) {
      throw new Error('Friend ID is required');
    }

    const { error: existingRequestError } = await supabase
      .from('friend_requests')
      .select()
      .or(`and(sender_id.eq.${user.id},receiver_id.eq.${friendId}),and(sender_id.eq.${friendId},receiver_id.eq.${user.id})`)
      .single();

    if (!existingRequestError) {
      throw new Error('Friend request already exists');
    }

    const { error: insertError } = await supabase
      .from('friend_requests')
      .insert({
        sender_id: user.id,
        receiver_id: friendId,
        status: 'pending'
      });

    if (insertError) throw insertError;

    const response: ApiResponse<null> = {
      success: true
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error sending friend request:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send friend request'
    };
    return NextResponse.json(response, { status: 500 });
  }
} 