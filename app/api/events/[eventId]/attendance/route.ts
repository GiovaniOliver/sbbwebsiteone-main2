import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { ensureUserExists } from '@/backend/services/auth/auth.service'
import { ApiResponse } from '@/backend/lib/types/api'

// POST /api/events/[eventId]/attendance
export async function POST(
  req: Request,
  { params }: { params: { eventId: string } }
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

    // Check if event exists
    const { data: event } = await supabase
      .from('events')
      .select()
      .eq('id', params.eventId)
      .single()

    if (!event) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Event not found'
      }, { status: 404 })
    }

    const { status } = await req.json()

    // Upsert attendance record
    const { error } = await supabase
      .from('event_attendance')
      .upsert({
        user_id: user.id,
        event_id: params.eventId,
        status,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,event_id'
      })

    if (error) throw error

    return NextResponse.json<ApiResponse<null>>({
      success: true
    })
  } catch (error) {
    console.error("[EVENT_ATTENDANCE_POST]", error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to update attendance'
    }, { status: 500 })
  }
}

// GET /api/events/[eventId]/attendance
export async function GET(
  req: Request,
  { params }: { params: { eventId: string } }
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

    // Get attendees with user details
    const { data: attendees, error } = await supabase
      .from('event_attendance')
      .select(`
        *,
        user:users (
          username,
          first_name,
          last_name,
          image_url
        )
      `)
      .eq('event_id', params.eventId)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json<ApiResponse<typeof attendees>>({
      success: true,
      data: attendees
    })
  } catch (error) {
    console.error("[EVENT_ATTENDANCE_GET]", error)
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to fetch attendees'
    }, { status: 500 })
  }
} 