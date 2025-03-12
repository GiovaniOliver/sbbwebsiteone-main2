import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { ensureUserExists } from '@/backend/services/auth/auth.service'
import { ApiResponse } from '@/backend/lib/types/api'

export async function GET(
  req: Request,
  { params }: { params: { courseId: string; lessonId: string } }
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

    // Check enrollment
    const { data: enrollment } = await supabase
      .from('enrollments')
      .select()
      .eq('user_id', user.id)
      .eq('course_id', params.courseId)
      .single()

    if (!enrollment) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'User is not enrolled in this course'
      }, { status: 403 })
    }

    // Get lesson with progress
    const { data: lesson } = await supabase
      .from('lessons')
      .select(`
        *,
        progress:lesson_progress(completed, completed_at)
      `)
      .eq('id', params.lessonId)
      .eq('course_id', params.courseId)
      .single()

    if (!lesson) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Lesson not found'
      }, { status: 404 })
    }

    // Get next lesson
    const { data: nextLesson } = await supabase
      .from('lessons')
      .select('id, title, order_index')
      .eq('course_id', params.courseId)
      .gt('order_index', lesson.order_index)
      .order('order_index', { ascending: true })
      .limit(1)
      .single()

    return NextResponse.json<ApiResponse<typeof lesson & { nextLesson: typeof nextLesson }>>({
      success: true,
      data: {
        ...lesson,
        nextLesson
      }
    })
  } catch (error) {
    console.error("[LESSON_GET]", error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to fetch lesson'
    }, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; lessonId: string } }
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

    // Check if course exists and user is instructor
    const { data: course } = await supabase
      .from('courses')
      .select()
      .eq('id', params.courseId)
      .eq('instructor_id', user.id)
      .single()

    if (!course) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Course not found or user is not the instructor'
      }, { status: 404 })
    }

    const { title, content, video_url, order_index } = await req.json()

    // Update lesson
    const { data: lesson, error } = await supabase
      .from('lessons')
      .update({
        title,
        content,
        video_url,
        order_index,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.lessonId)
      .eq('course_id', params.courseId)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json<ApiResponse<typeof lesson>>({
      success: true,
      data: lesson
    })
  } catch (error) {
    console.error("[LESSON_PATCH]", error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to update lesson'
    }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; lessonId: string } }
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

    // Check if course exists and user is instructor
    const { data: course } = await supabase
      .from('courses')
      .select()
      .eq('id', params.courseId)
      .eq('instructor_id', user.id)
      .single()

    if (!course) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Course not found or user is not the instructor'
      }, { status: 404 })
    }

    // Delete lesson
    const { error } = await supabase
      .from('lessons')
      .delete()
      .eq('id', params.lessonId)
      .eq('course_id', params.courseId)

    if (error) throw error

    return NextResponse.json<ApiResponse<null>>({
      success: true
    })
  } catch (error) {
    console.error("[LESSON_DELETE]", error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to delete lesson'
    }, { status: 500 })
  }
} 