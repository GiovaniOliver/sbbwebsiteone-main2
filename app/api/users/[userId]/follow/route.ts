import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Follow a user
export async function POST(request: Request, { params }: { params: { userId: string } }) {
  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient({ 
    cookies: () => cookieStore 
  });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const currentUserId = session.user.id;
    const userToFollowId = params.userId;
    
    // Can't follow yourself
    if (currentUserId === userToFollowId) {
      return new Response('Cannot follow yourself', { status: 400 });
    }

    // Check if already following
    const { data: existingFollow } = await supabase
      .from('follows')
      .select()
      .eq('follower_id', currentUserId)
      .eq('following_id', userToFollowId)
      .maybeSingle();

    if (existingFollow) {
      return new Response('Already following this user', { status: 409 });
    }

    // Create follow relationship
    const { error } = await supabase
      .from('follows')
      .insert({ follower_id: currentUserId, following_id: userToFollowId });

    if (error) throw error;

    return new Response(null, { status: 201 });
  } catch (error) {
    console.error('Error following user:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// Unfollow a user
export async function DELETE(request: Request, { params }: { params: { userId: string } }) {
  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient({ 
    cookies: () => cookieStore 
  });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const currentUserId = session.user.id;
    const userToUnfollowId = params.userId;

    // Delete follow relationship
    const { error } = await supabase
      .from('follows')
      .delete()
      .eq('follower_id', currentUserId)
      .eq('following_id', userToUnfollowId);

    if (error) throw error;

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error unfollowing user:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 