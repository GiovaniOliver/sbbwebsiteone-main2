import { NextResponse } from 'next/server';
import { createApiSupabaseClient } from '@/lib/supabase/server';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const supabase = await createApiSupabaseClient();
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', params.userId)
      .single();

    if (error) throw error;
    if (!user) return new Response('User not found', { status: 404 });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 