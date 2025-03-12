import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: { postId: string } }) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  
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
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (insertError) throw insertError;

    return NextResponse.json({
      success: true
    });
  } catch (error) {
    console.error('Error bookmarking post:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { postId: string } }) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Delete bookmark
    const { error: deleteError } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', session.user.id)
      .eq('post_id', params.postId);

    if (deleteError) throw deleteError;

    return NextResponse.json({
      success: true
    });
  } catch (error) {
    console.error('Error removing bookmark:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params: { postId: string } }) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Get bookmarks with user details
    const { data: bookmarks, error } = await supabase
      .from('bookmarks')
      .select(`
        *,
        users!bookmarks_user_id_fkey(
          id,
          username,
          first_name,
          last_name,
          avatar_url
        )
      `)
      .eq('post_id', params.postId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Transform the data to match the expected format
    const transformedBookmarks = bookmarks.map(bookmark => ({
      ...bookmark,
      username: bookmark.users.username,
      firstName: bookmark.users.first_name,
      lastName: bookmark.users.last_name,
      avatar: bookmark.users.avatar_url
    }));

    return NextResponse.json({
      success: true,
      data: transformedBookmarks
    });
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 