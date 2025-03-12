import { NextResponse } from 'next/server'
import { ensureUserExists } from '@/backend/services/auth/auth.service'
import { ApiResponse } from '@/backend/lib/types/api'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function POST(
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

    // Check if user is enrolled in the course
    const { data: enrollment, error: enrollmentError } = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', user.id)
      .eq('course_id', params.courseId)
      .single()

    if (enrollmentError || !enrollment) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'User is not enrolled in this course'
      }, { status: 403 })
    }

    // Create or update lesson progress
    const { data: existingProgress, error: progressError } = await supabase
      .from('lesson_progress')
      .select('*')
      .eq('lesson_id', params.lessonId)
      .eq('enrollment_id', enrollment.id)
      .single()

    if (!existingProgress) {
      const { error: insertError } = await supabase
        .from('lesson_progress')
        .insert({
          lesson_id: params.lessonId,
          enrollment_id: enrollment.id,
          completed: true,
          completed_at: new Date().toISOString()
        })

      if (insertError) throw insertError
    } else {
      const { error: updateError } = await supabase
        .from('lesson_progress')
        .update({
          completed: true,
          completed_at: new Date().toISOString()
        })
        .eq('lesson_id', params.lessonId)
        .eq('enrollment_id', enrollment.id)

      if (updateError) throw updateError
    }

    // Check if all lessons are completed
    const { data: completedLessons, error: completedError } = await supabase
      .from('lesson_progress')
      .select('lesson_id')
      .eq('enrollment_id', enrollment.id)
      .eq('completed', true)

    if (completedError) throw completedError

    const { data: totalLessons, error: totalError } = await supabase
      .from('lessons')
      .select('id')
      .eq('course_id', params.courseId)

    if (totalError) throw totalError

    // Update enrollment progress
    const progress = Math.round((completedLessons.length / totalLessons.length) * 100)
    const completed = progress === 100

    const { error: enrollmentUpdateError } = await supabase
      .from('enrollments')
      .update({
        progress,
        completed,
        completed_at: completed ? new Date().toISOString() : null
      })
      .eq('id', enrollment.id)

    if (enrollmentUpdateError) throw enrollmentUpdateError

    // If course is completed, create certificate
    if (completed) {
      const { data: existingCertificate, error: certificateError } = await supabase
        .from('certificates')
        .select('*')
        .eq('enrollment_id', enrollment.id)
        .single()

      if (certificateError && certificateError.code !== 'PGRST116') throw certificateError

      if (!existingCertificate) {
        const { error: insertCertError } = await supabase
          .from('certificates')
          .insert({
            enrollment_id: enrollment.id,
            user_id: user.id,
            course_id: params.courseId,
            issued_at: new Date().toISOString()
          })

        if (insertCertError) throw insertCertError
      }
    }

    return NextResponse.json<ApiResponse<null>>({
      success: true
    })
  } catch (error) {
    console.error('Error completing lesson:', error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to complete lesson'
    })
  }
} 