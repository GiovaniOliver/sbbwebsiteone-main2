import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { PostDbWithRelations, toPostWithRelations } from '../../../../backend/lib/types/post';
import { ApiResponse } from '../../../../backend/lib/types/api';

export async function GET(request: Request, { params }: { params: { postId: string } }) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { data: post, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:users!posts_author_id_fkey(*),
        likes:post_likes(count),
        replies:post_replies(count)
      `)
      .eq('id', params.postId)
      .single();

    if (error) throw error;
    if (!post) throw new Error('Post not found');

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
    console.error('Error fetching post:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch post'
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { postId: string } }) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { data: post, error: fetchError } = await supabase
      .from('posts')
      .select('author_id')
      .eq('id', params.postId)
      .single();

    if (fetchError) throw fetchError;
    if (!post) throw new Error('Post not found');
    if (post.author_id !== user.id) {
      throw new Error('You are not authorized to update this post');
    }

    const json = await request.json();
    const { data: updatedPost, error: updateError } = await supabase
      .from('posts')
      .update({
        content: json.content,
        is_edited: true
      })
      .eq('id', params.postId)
      .select(`
        *,
        author:users!posts_author_id_fkey(*),
        likes:post_likes(count),
        replies:post_replies(count)
      `)
      .single();

    if (updateError) throw updateError;

    const response: ApiResponse<typeof updatedPost> = {
      success: true,
      data: toPostWithRelations({
        ...updatedPost,
        _count: {
          likes: updatedPost.likes[0]?.count || 0,
          replies: updatedPost.replies[0]?.count || 0
        }
      } as PostDbWithRelations)
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating post:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update post'
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { postId: string } }) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { data: post, error: fetchError } = await supabase
      .from('posts')
      .select('author_id')
      .eq('id', params.postId)
      .single();

    if (fetchError) throw fetchError;
    if (!post) throw new Error('Post not found');
    if (post.author_id !== user.id) {
      throw new Error('You are not authorized to delete this post');
    }

    const { error: deleteError } = await supabase
      .from('posts')
      .delete()
      .eq('id', params.postId);

    if (deleteError) throw deleteError;

    const response: ApiResponse<null> = {
      success: true
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error deleting post:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete post'
    };
    return NextResponse.json(response, { status: 500 });
  }
}
