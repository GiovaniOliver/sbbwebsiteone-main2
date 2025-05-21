import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: { postId: string } }) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Check if bookmark already exists
    const { data: existingBookmark, error: fetchError } = await supabase
      .from('bookmarks')
      .select()
      .eq('user_id', session.user.id)
      .eq('post_id', params.postId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

    if (existingBookmark) {
      return new Response('Post already bookmarked', { status: 400 });
    }

    // Create bookmark
    const { error: insertError } = await supabase
      .from('bookmarks')
      .insert({
        user_id: session.user.id,
        post_id: params.postId,
      });

    if (insertError) throw insertError;

    return new Response(null, { status: 201 });
  } catch (error) {
    console.error('Error bookmarking post:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { postId: string } }) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Remove bookmark
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', session.user.id)
      .eq('post_id', params.postId);

    if (error) throw error;

    return new Response(null, { status: 200 });
  } catch (error) {
    console.error('Error removing bookmark:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params: { postId: string } }) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Check if post is bookmarked by user
    const { data, error } = await supabase
      .from('bookmarks')
      .select()
      .eq('user_id', session.user.id)
      .eq('post_id', params.postId)
      .maybeSingle();

    if (error) throw error;

    return NextResponse.json({
      isBookmarked: !!data
    });
  } catch (error) {
    console.error('Error checking bookmark status:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 