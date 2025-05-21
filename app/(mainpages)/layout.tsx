'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/app/components/atoms/buttons/Button';
import Link from 'next/link';
import LeftSidebar from '@/app/components/usersmaincomponents/homefeed/left-sidebar';
import RightSidebar from '@/app/components/usersmaincomponents/homefeed/right-sidebar';
import Header from '@/app/components/usersmaincomponents/homefeed/header';
import { LocationProvider } from '@/app/context/LocationContext';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        setAuthError(null);
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session check error:', sessionError);
          setAuthError(sessionError.message);
          router.push('/sign-in');
          return;
        }
        
        if (!session) {
          console.log('No session found, redirecting to sign-in');
          router.push('/sign-in');
          return;
        }
        
        setIsAuthenticated(true);
      } catch (error: any) {
        console.error('Authentication check error:', error);
        setAuthError(error.message || 'Unknown authentication error');
        setTimeout(() => router.push('/sign-in'), 3000); // Delay redirect to show the error
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change:', event);
      if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        router.push('/sign-in');
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setIsAuthenticated(true);
        setAuthError(null);
      } else if (event === 'USER_UPDATED') {
        // Just refresh the current state
        console.log('User updated, refreshing state');
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth, router]);

  if (authError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#1A1F2E]">
        <div className="bg-[#2E3446] border-l-4 border-[#7B68EE] p-4 w-full max-w-md rounded-md text-white">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-[#7B68EE]" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium">Authentication Error</h3>
              <div className="mt-2 text-sm text-gray-300">
                <p>{authError}</p>
              </div>
              <div className="mt-4">
                <Link href="/sign-in">
                  <Button className="bg-[#7B68EE] hover:bg-[#6758CE] text-white">
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#1A1F2E]">
        <Loader2 className="h-10 w-10 animate-spin text-[#7B68EE]" />
        <p className="mt-4 text-gray-300">Loading...</p>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <LocationProvider>
      <div className="min-h-screen bg-[#1A1F2E] text-gray-100">
        <Header />
        <div className="flex pt-16">
          <LeftSidebar />
          <div className="flex-1 ml-64 mr-0">
            <main className="p-6 overflow-x-hidden">
              {children}
            </main>
          </div>
          <RightSidebar />
        </div>
      </div>
    </LocationProvider>
  );
}
