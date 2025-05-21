import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ 
    cookies 
  });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { username, firstName, lastName, imageUrl } = await request.json();

    const { error: insertError } = await supabase
      .from('users')
      .insert({
        id: session.user.id,
        username,
        first_name: firstName,
        last_name: lastName,
        image_url: imageUrl || null
      });

    if (insertError) throw insertError;

    return new Response(null, { status: 201 });
  } catch (error) {
    console.error('Error creating user profile:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 