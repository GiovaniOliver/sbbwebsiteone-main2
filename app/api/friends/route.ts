import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { data: friends, error } = await supabase
      .from('friendships')
      .select(`
        friend:users!friendships_friend_id_fkey(
          id,
          username,
          email,
          first_name,
          last_name,
          image_url,
          profile_image_url,
          bio,
          created_at,
          updated_at
        )
      `)
      .eq('user_id', session.user.id)
      .eq('status', 'active');

    if (error) throw error;

    return NextResponse.json(friends.map(f => f.friend));
  } catch (error) {
    console.error('Error fetching friends:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 