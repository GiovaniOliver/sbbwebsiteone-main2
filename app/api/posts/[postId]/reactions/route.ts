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

    const { type } = await request.json();

    // Check if reaction already exists
    const { data: existingReaction, error: fetchError } = await supabase
      .from('post_reactions')
      .select()
      .eq('user_id', session.user.id)
      .eq('post_id', params.postId)
      .eq('type', type)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

    if (existingReaction) {
      // Remove existing reaction
      const { error: deleteError } = await supabase
        .from('post_reactions')
        .delete()
        .eq('id', existingReaction.id);

      if (deleteError) throw deleteError;
    } else {
      // Create new reaction
      const { error: insertError } = await supabase
        .from('post_reactions')
        .insert({
          user_id: session.user.id,
          post_id: params.postId,
          type,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (insertError) throw insertError;
    }

    // Get updated reaction counts
    const { data: reactions, error: countError } = await supabase
      .from('post_reactions')
      .select('type')
      .eq('post_id', params.postId);

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

export async function GET(request: Request, { params }: { params: { postId: string } }) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Get all reactions for the post
    const { data: reactions, error: reactionsError } = await supabase
      .from('post_reactions')
      .select('type')
      .eq('post_id', params.postId);

    if (reactionsError) throw reactionsError;

    // Get user's reactions
    const { data: userReactions, error: userReactionsError } = await supabase
      .from('post_reactions')
      .select('type')
      .eq('post_id', params.postId)
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