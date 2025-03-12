import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { ensureUserExists } from '@/backend/services/auth/auth.service'
import { ApiResponse } from '@/backend/lib/types/api'

// POST /api/posts/[postId]/like
export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
) {
  const supabase = createRouteHandlerClient({ cookies })
  
  try {
    const user = await ensureUserExists()
    if (!user) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 })
    }

    // Check if post exists
    const { data: post } = await supabase
      .from('posts')
      .select()
      .eq('id', params.postId)
      .single()

    if (!post) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Post not found'
      }, { status: 404 })
    }

    // Check if already liked
    const { data: existingLike } = await supabase
      .from('likes')
      .select()
      .eq('user_id', user.id)
      .eq('post_id', params.postId)
      .single()

    if (existingLike) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Post already liked'
      }, { status: 400 })
    }

    // Create like
    const { error } = await supabase
      .from('likes')
      .insert({
        post_id: params.postId,
        user_id: user.id,
        created_at: new Date().toISOString()
      })

    if (error) throw error

    // Get updated post with like count
    const { data: updatedPost } = await supabase
      .from('posts')
      .select(`
        *,
        likes:likes(count)
      `)
      .eq('id', params.postId)
      .single()

    return NextResponse.json<ApiResponse<typeof updatedPost>>({
      success: true,
      data: updatedPost
    })
  } catch (error) {
    console.error('[POST_LIKE_POST]', error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to like post'
    }, { status: 500 })
  }
}

// DELETE /api/posts/[postId]/like
export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } }
) {
  const supabase = createRouteHandlerClient({ cookies })
  
  try {
    const user = await ensureUserExists()
    if (!user) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 })
    }

    // Delete like
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('user_id', user.id)
      .eq('post_id', params.postId)

    if (error) throw error

    // Get updated post with like count
    const { data: updatedPost } = await supabase
      .from('posts')
      .select(`
        *,
        likes:likes(count)
      `)
      .eq('id', params.postId)
      .single()

    return NextResponse.json<ApiResponse<typeof updatedPost>>({
      success: true,
      data: updatedPost
    })
  } catch (error) {
    console.error('[POST_LIKE_DELETE]', error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to unlike post'
    }, { status: 500 })
  }
}
