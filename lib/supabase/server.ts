/**
 * Server-side Supabase utilities 
 * Provides properly configured Supabase clients for server components & API routes
 */

import { cookies } from 'next/headers';
import { createServerComponentClient, createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/app/types/supabase';

/**
 * Creates a Supabase client for use in server components with proper cookie handling
 * Usage: const supabase = createServerSupabaseClient();
 */
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();
  return createServerComponentClient<Database>({ 
    cookies: () => cookieStore 
  });
}

/**
 * Creates a Supabase client for use in route handlers with proper cookie handling
 * Usage: const supabase = createApiSupabaseClient();
 */
export async function createApiSupabaseClient() {
  const cookieStore = await cookies();
  return createRouteHandlerClient<Database>({ 
    cookies: () => cookieStore 
  });
} 