import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { PostDbWithRelations, toPostWithRelations, CreatePostInput } from '../../../backend/lib/types/post';
import { ApiResponse } from '../../../backend/lib/types/api';

// GET /api/posts
export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(request.url);
  const authorId = searchParams.get('authorId');

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    let query = supabase
      .from('posts')
      .select(`
        *,
        author:users!posts_author_id_fkey(*),
        likes:post_likes(count),
        replies:post_replies(count)
      `)
      .order('created_at', { ascending: false });

    if (authorId) {
      query = query.eq('author_id', authorId);
    }

    const { data: posts, error } = await query;

    if (error) throw error;

    const response: ApiResponse<typeof posts> = {
      success: true,
      data: posts.map(post => toPostWithRelations({
        ...post,
        _count: {
          likes: post.likes[0]?.count || 0,
          replies: post.replies[0]?.count || 0
        }
      } as PostDbWithRelations))
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching posts:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch posts'
    };
    return NextResponse.json(response, { status: 500 });
  }
}

// POST /api/posts
export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const json = await request.json();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    // Create post data with proper DB types
    const postData: CreatePostInput = {
      content: json.content,
      author_id: user.id,
      parent_id: json.parentId || null,
      root_id: json.rootId || null
    };

    const { data: post, error } = await supabase
      .from('posts')
      .insert(postData)
      .select(`
        *,
        author:users!posts_author_id_fkey(*),
        likes:post_likes(count),
        replies:post_replies(count)
      `)
      .single();

    if (error) throw error;

    const response: ApiResponse<typeof post> = {
      success: true,
      data: toPostWithRelations({
        ...post,
        _count: {
          likes: post.likes[0]?.count || 0,
          replies: post.replies[0]?.count || 0
        }
      } as PostDbWithRelations)
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error creating post:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create post'
    };
    return NextResponse.json(response, { status: 500 });
  }
}
