import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { NotificationDbWithRelations, toNotificationWithRelations } from '../../../backend/lib/types/notification';
import { ApiResponse } from '../../../backend/lib/types/api';

// GET /api/notifications
export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { data: notifications, error } = await supabase
      .from('notifications')
      .select(`
        *,
        actor:users!notifications_actor_id_fkey(*),
        post:posts(*),
        event:events(*)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const response: ApiResponse<typeof notifications> = {
      success: true,
      data: notifications.map(notification => 
        toNotificationWithRelations(notification as NotificationDbWithRelations)
      )
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch notifications'
    };
    return NextResponse.json(response, { status: 500 });
  }
}

// PATCH /api/notifications
export async function PATCH(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { notificationIds } = await request.json();
    if (!Array.isArray(notificationIds)) throw new Error('Invalid notification IDs');

    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .in('id', notificationIds)
      .eq('user_id', user.id);

    if (error) throw error;

    const response: ApiResponse<null> = {
      success: true
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error marking notifications as read:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update notifications'
    };
    return NextResponse.json(response, { status: 500 });
  }
}
