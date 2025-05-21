'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/app/types/supabase';
import { logDebug, logError } from "@/lib/logger";

// Singleton instance for getSupabaseClient
let clientInstance: SupabaseClient<Database> | null = null;

interface UseSupabaseReturn {
  supabase: SupabaseClient<Database> | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook to access Supabase client in client components
 * Provides the Supabase client, loading state, and error handling
 * 
 * @example
 * const { supabase, isLoading, error } = useSupabase();
 */
export function useSupabase(): UseSupabaseReturn {
  const [supabase, setSupabase] = useState<SupabaseClient<Database> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      logDebug('useSupabase', 'Initializing Supabase client');
      // Initialize Supabase client
      const client = createClientComponentClient<Database>();
      setSupabase(client);
      setError(null);
      
      // Update singleton instance
      clientInstance = client;
    } catch (err) {
      logError('useSupabase', 'Failed to initialize Supabase client:', err);
      setError(err instanceof Error ? err : new Error('Failed to initialize Supabase client'));
    } finally {
      setIsLoading(false);
    }
    
    // We don't need to cleanup the client as it's managed by Next.js
  }, []);

  return { supabase, isLoading, error };
}

/**
 * Singleton pattern for getting Supabase client in client components
 * Use this when you don't need React state/effects and just want the client
 * 
 * @example
 * const client = getSupabaseClient();
 */
export function getSupabaseClient(): SupabaseClient<Database> {
  if (!clientInstance) {
    logDebug('getSupabaseClient', 'Creating new Supabase client instance');
    clientInstance = createClientComponentClient<Database>();
  }
  return clientInstance;
}

export default useSupabase; 