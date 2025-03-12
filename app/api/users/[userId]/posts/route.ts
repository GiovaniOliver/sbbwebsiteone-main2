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

    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get('cursor');
    const limit = 20;

    let query = supabase
      .from('posts')
      .select(`
        *,
        author:users!posts_author_id_fkey(*),
        comments:comments(count),
        likes:likes(count),
        user_likes:likes!inner(*)
      `)
      .eq('author_id', params.userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (cursor) {
      query = query.lt('id', cursor);
    }

    const { data: posts, error } = await query;

    if (error) throw error;

    const formattedPosts = posts.map(post => ({
      ...post,
      _count: {
        comments: post.comments[0]?.count || 0,
        likes: post.likes[0]?.count || 0
      },
      isLiked: post.user_likes.some((like: { user_id: string }) => like.user_id === session.user.id)
    }));

    const nextCursor = posts.length === limit ? posts[posts.length - 1].id : null;

    return NextResponse.json({
      success: true,
      data: {
        posts: formattedPosts,
        nextCursor
      }
    });
  } catch (error) {
    console.error('Error fetching user posts:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 