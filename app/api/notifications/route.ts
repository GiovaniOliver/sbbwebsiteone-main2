import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { NotificationDbWithRelations, toNotificationWithRelations } from '../../../backend/lib/types/notification';
import { ApiResponse } from '../../../backend/lib/types/api';

// GET /api/notifications
export async function GET(request: Request) {
  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient({ 
    cookies: () => cookieStore 
  });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const page = parseInt(url.searchParams.get('page') || '1');
    const offset = (page - 1) * limit;

    // Get notifications with their related user info
    const { data: notifications, error, count } = await supabase
      .from('notifications')
      .select(`
        *,
        sender:sender_id (id, username, first_name, last_name, image_url)
      `, { count: 'exact' })
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    // Calculate pagination info
    const totalPages = Math.ceil((count || 0) / limit);
    const hasMore = page < totalPages;

    return NextResponse.json({
      notifications,
      pagination: {
        page,
        limit,
        total: count,
        pages: totalPages,
        hasMore
      }
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// PATCH /api/notifications
export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient({ 
    cookies: () => cookieStore 
  });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { notification_ids } = await request.json();
    
    if (!notification_ids || !Array.isArray(notification_ids) || notification_ids.length === 0) {
      return new Response('Invalid request: notification_ids must be a non-empty array', { status: 400 });
    }

    // Mark the specified notifications as read, ensuring they belong to the user
    const { data, error } = await supabase
      .from('notifications')
      .update({ read: true, updated_at: new Date().toISOString() })
      .in('id', notification_ids)
      .eq('user_id', session.user.id)
      .select();

    if (error) throw error;

    return NextResponse.json({ updated: data });
  } catch (error) {
    console.error('Error marking notifications as read:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
