import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { data: followers, error } = await supabase
      .from('follows')
      .select('follower:users!follows_follower_id_fkey(*)')
      .eq('following_id', params.userId);

    if (error) throw error;

    return NextResponse.json(followers.map(f => f.follower));
  } catch (error) {
    console.error('Error fetching followers:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 