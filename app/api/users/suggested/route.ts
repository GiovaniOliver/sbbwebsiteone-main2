import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .neq('id', session.user.id)
      .limit(5);

    if (error) throw error;

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching suggested users:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 