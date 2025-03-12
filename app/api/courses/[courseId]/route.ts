import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { ensureUserExists } from '@/backend/services/auth/auth.service'
import { ApiResponse } from '@/backend/lib/types/api'

export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
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

    const { data: course, error } = await supabase
      .from('courses')
      .select(`
        *,
        instructor:users!instructor_id (*),
        lessons:lessons (count),
        enrollments:course_enrollments (count)
      `)
      .eq('id', params.courseId)
      .single()

    if (error) throw error
    if (!course) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Course not found'
      }, { status: 404 })
    }

    // Get user's enrollment status
    const { data: enrollment } = await supabase
      .from('course_enrollments')
      .select()
      .eq('user_id', user.id)
      .eq('course_id', params.courseId)
      .single()

    const formattedCourse = {
      ...course,
      _count: {
        lessons: course.lessons.length,
        enrollments: course.enrollments.length
      },
      isEnrolled: !!enrollment
    }

    return NextResponse.json<ApiResponse<typeof formattedCourse>>({
      success: true,
      data: formattedCourse
    })
  } catch (error) {
    console.error("[COURSE_GET]", error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to fetch course'
    }, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
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

    const { title, description, category, level, price, coverImage } = await req.json()

    const { data: updatedCourse, error } = await supabase
      .from('courses')
      .update({
        title,
        description,
        category,
        level,
        price,
        cover_image: coverImage,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.courseId)
      .select(`
        *,
        instructor:users!instructor_id (*)
      `)
      .single()

    if (error) throw error

    return NextResponse.json<ApiResponse<typeof updatedCourse>>({
      success: true,
      data: updatedCourse
    })
  } catch (error) {
    console.error("[COURSE_PATCH]", error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to update course'
    }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
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

    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', params.courseId)

    if (error) throw error

    return NextResponse.json<ApiResponse<null>>({
      success: true
    })
  } catch (error) {
    console.error("[COURSE_DELETE]", error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to delete course'
    }, { status: 500 })
  }
} 