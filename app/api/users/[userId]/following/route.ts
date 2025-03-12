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

    const { data: following, error } = await supabase
      .from('follows')
      .select('following:users!follows_following_id_fkey(*)')
      .eq('follower_id', params.userId);

    if (error) throw error;

    return NextResponse.json(following.map(f => f.following));
  } catch (error) {
    console.error('Error fetching following:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 