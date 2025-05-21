import { NextResponse } from 'next/server'
import { ensureUserExists } from '@/backend/services/auth/auth.service'
import { ApiResponse } from '@/backend/lib/types/api'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; lessonId: string } }
) {
  const cookieStore = await cookies()
  const supabase = createRouteHandlerClient({ 
    cookies: () => cookieStore 
  })
  
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 })
    }

    const userId = session.user.id
    const { courseId, lessonId } = params
    
    // First verify the lesson exists and belongs to the course
    const { data: lesson, error: lessonError } = await supabase
      .from('lessons')
      .select('*')
      .eq('id', lessonId)
      .eq('course_id', courseId)
      .single()
      
    if (lessonError || !lesson) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Lesson not found'
      }, { status: 404 })
    }
    
    // Check if the user has already completed this lesson
    const { data: existingCompletion, error: checkError } = await supabase
      .from('lesson_completions')
      .select('*')
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .maybeSingle()
      
    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError
    }
    
    if (existingCompletion) {
      // Already completed - just return the existing record
      return NextResponse.json(existingCompletion)
    }
    
    // Record the completion
    const { data: completion, error: completionError } = await supabase
      .from('lesson_completions')
      .insert({
        user_id: userId,
        lesson_id: lessonId,
        course_id: courseId,
        completed_at: new Date().toISOString()
      })
      .select()
      .single()
      
    if (completionError) {
      throw completionError
    }
    
    return NextResponse.json<ApiResponse<null>>({
      success: true
    })
  } catch (error) {
    console.error('Error marking lesson as completed:', error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to mark lesson as completed'
    }, { status: 500 })
  }
} 