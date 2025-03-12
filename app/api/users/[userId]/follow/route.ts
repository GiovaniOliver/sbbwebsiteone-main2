import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: { userId: string } }) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { data: existingFollow, error: checkError } = await supabase
      .from('follows')
      .select()
      .eq('follower_id', session.user.id)
      .eq('following_id', params.userId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') throw checkError;
    if (existingFollow) {
      return new Response('Already following this user', { status: 400 });
    }

    const { error: insertError } = await supabase
      .from('follows')
      .insert({
        follower_id: session.user.id,
        following_id: params.userId
      });

    if (insertError) throw insertError;

    return new Response(null, { status: 201 });
  } catch (error) {
    console.error('Error following user:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { userId: string } }) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { error } = await supabase
      .from('follows')
      .delete()
      .eq('follower_id', session.user.id)
      .eq('following_id', params.userId);

    if (error) throw error;

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error unfollowing user:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 