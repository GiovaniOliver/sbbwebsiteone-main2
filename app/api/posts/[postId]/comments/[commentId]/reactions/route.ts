import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { postId: string; commentId: string } }
) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { type } = await request.json();

    // Check if reaction already exists
    const { data: existingReaction, error: fetchError } = await supabase
      .from('comment_reactions')
      .select()
      .eq('user_id', session.user.id)
      .eq('comment_id', params.commentId)
      .eq('type', type)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

    if (existingReaction) {
      // Remove existing reaction
      const { error: deleteError } = await supabase
        .from('comment_reactions')
        .delete()
        .eq('id', existingReaction.id);

      if (deleteError) throw deleteError;
    } else {
      // Create new reaction
      const { error: insertError } = await supabase
        .from('comment_reactions')
        .insert({
          user_id: session.user.id,
          comment_id: params.commentId,
          type,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (insertError) throw insertError;
    }

    // Get updated reaction counts
    const { data: reactions, error: countError } = await supabase
      .from('comment_reactions')
      .select('type')
      .eq('comment_id', params.commentId);

    if (countError) throw countError;

    // Transform reactions into counts by type
    const reactionCounts = reactions.reduce((acc: Record<string, number>, r) => {
      acc[r.type] = (acc[r.type] || 0) + 1;
      return acc;
    }, {});

    const formattedReactions = Object.entries(reactionCounts).map(([type, count]) => ({
      type,
      count
    }));

    return NextResponse.json({
      success: true,
      data: formattedReactions
    });
  } catch (error) {
    console.error('Error updating reaction:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { postId: string; commentId: string } }
) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Get all reactions for the comment
    const { data: reactions, error: reactionsError } = await supabase
      .from('comment_reactions')
      .select('type')
      .eq('comment_id', params.commentId);

    if (reactionsError) throw reactionsError;

    // Get user's reactions
    const { data: userReactions, error: userReactionsError } = await supabase
      .from('comment_reactions')
      .select('type')
      .eq('comment_id', params.commentId)
      .eq('user_id', session.user.id);

    if (userReactionsError) throw userReactionsError;

    // Transform reactions into counts by type
    const reactionCounts = reactions.reduce((acc: Record<string, number>, r) => {
      acc[r.type] = (acc[r.type] || 0) + 1;
      return acc;
    }, {});

    const formattedReactions = Object.entries(reactionCounts).map(([type, count]) => ({
      type,
      count
    }));

    return NextResponse.json({
      success: true,
      data: {
        reactions: formattedReactions,
        userReactions
      }
    });
  } catch (error) {
    console.error('Error fetching reactions:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 