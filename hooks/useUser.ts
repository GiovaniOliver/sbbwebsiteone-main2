'use client'

import { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import useSWR, { KeyedMutator } from 'swr'
import { logInfo, logDebug, logError } from "@/lib/logger";

// Define if we want to enable advanced debugging
const ENABLE_DEBUG_HELPERS = process.env.NODE_ENV !== 'production';

type UserData = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  mutate: KeyedMutator<User | null>;
}

export const useUser = (): UserData => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Set up debug helpers in development mode
  useEffect(() => {
    if (ENABLE_DEBUG_HELPERS && typeof window !== 'undefined') {
      logInfo('useUser', 'Auth debugging enabled');
      
      // Add window-level debug helpers
      (window as any).authDebug = {
        checkSession: async () => {
          const result = await supabase.auth.getSession();
          logDebug('authDebug', 'Current session', result);
          return result;
        },
        checkUser: async () => {
          const result = await supabase.auth.getUser();
          logDebug('authDebug', 'Current user', result);
          return result;
        },
        clearSession: async () => {
          const { error } = await supabase.auth.signOut();
          logInfo('authDebug', 'Session cleared', error ? `Error: ${error.message}` : 'Success');
        },
        refreshRouter: () => {
          router.refresh();
          logInfo('authDebug', 'Router refreshed');
        }
      };
      
      logInfo('useUser', 'Auth debug utilities available in console via window.authDebug');
    }
  }, [supabase.auth, router]);

  // Use SWR for data fetching and caching
  const { data: user, error: swrError, mutate } = useSWR('user', async () => {
    try {
      logDebug('useUser', 'Checking session...');
      const sessionResponse = await supabase.auth.getSession();
      logDebug('useUser', 'Session response', sessionResponse);
      
      if (sessionResponse.error) {
        logError('useUser', 'Session error', sessionResponse.error);
        throw sessionResponse.error;
      }

      if (!sessionResponse.data.session) {
        logDebug('useUser', 'No session found');
        return null;
      }

      logDebug('useUser', 'Session found, checking user data...');
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        logError('useUser', 'User error', error);
        // Handle "User from sub claim in JWT does not exist" error
        if (error.message?.includes('User from sub claim in JWT does not exist')) {
          logInfo('useUser', 'Invalid user session detected, signing out');
          await supabase.auth.signOut();
          router.push('/');
        }
        throw error;
      }
      
      logDebug('useUser', 'Setting user', user);
      return user;
    } catch (err) {
      logError('useUser', 'Error fetching user:', err);
      throw err;
    }
  }, {
    refreshInterval: 0, // Only refresh on demand
    revalidateOnFocus: false,
    shouldRetryOnError: false
  });

  // Subscribe to auth changes
  useEffect(() => {
    logDebug('useUser', 'Setting up auth state change subscription');
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        logDebug('useUser', `Auth state change event: ${event}`);
        logDebug('useUser', 'New session', session);
        
        // Revalidate user data on auth state change
        await mutate();
        
        // Force a router refresh to update server components
        logDebug('useUser', 'Refreshing router');
        router.refresh();
      }
    );

    return () => {
      logDebug('useUser', 'Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, [supabase, router, mutate]);

  // Update loading state based on SWR
  useEffect(() => {
    setIsLoading(!user && !swrError);
  }, [user, swrError]);

  return {
    user: user || null,
    isLoading,
    error: swrError ? new Error(swrError.message) : null,
    mutate
  };
} 