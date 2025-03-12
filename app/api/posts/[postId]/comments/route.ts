import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface CommentReaction {
  type: string;
  users: {
    id: string;
  };
}

interface Comment {
  id: string;
  content: string;
  author: {
    username: string;
    avatar_url: string;
  };
  reactions: CommentReaction[];
}

export async function POST(
  request: Request,
  { params }: { params: { postId: string } }
) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { content } = await request.json();

    const { data: comment, error: insertError } = await supabase
      .from('comments')
      .insert({
        content,
        post_id: params.postId,
        author_id: session.user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select(`
        *,
        author:users!comments_author_id_fkey(
          id,
          username,
          avatar_url
        )
      `)
      .single();

    if (insertError) throw insertError;

    return NextResponse.json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { postId: string } }
) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { data: comments, error } = await supabase
      .from('comments')
      .select(`
        *,
        author:users!comments_author_id_fkey(
          id,
          username,
          avatar_url
        ),
        reactions:comment_reactions(
          type,
          users!comment_reactions_user_id_fkey(id)
        )
      `)
      .eq('post_id', params.postId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Transform the data to match the expected format
    const transformedComments = (comments as Comment[]).map(comment => ({
      ...comment,
      userName: comment.author.username,
      userImage: comment.author.avatar_url,
      reactions: Object.entries(
        comment.reactions.reduce((acc: Record<string, number>, r: CommentReaction) => {
          acc[r.type] = (acc[r.type] || 0) + 1;
          return acc;
        }, {})
      ).map(([type, count]) => ({ type, count })),
      userReactions: comment.reactions
        .filter((r: CommentReaction) => r.users.id === session.user.id)
        .map((r: CommentReaction) => r.type)
    }));

    return NextResponse.json({
      success: true,
      data: transformedComments
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
