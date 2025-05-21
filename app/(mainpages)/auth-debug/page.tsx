'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/app/components/atoms/buttons/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/molecules/cards/Card';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AuthDebugPage() {
  const { user, isLoading } = useUser();
  const supabase = createClientComponentClient();
  const [directSession, setDirectSession] = useState<any>(null);
  const [directUser, setDirectUser] = useState<any>(null);
  const [cookies, setCookies] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [authEvents, setAuthEvents] = useState<{time: string, event: string}[]>([]);
  
  // Check direct session and user state
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          throw sessionError;
        }
        setDirectSession(sessionData.session);
        
        // Check user if session exists
        if (sessionData.session) {
          const { data: userData, error: userError } = await supabase.auth.getUser();
          if (userError) {
            throw userError;
          }
          setDirectUser(userData.user);
        }
        
        // Add to event log
        addAuthEvent(`Direct auth check: ${sessionData.session ? 'Session found' : 'No session'}`);
      } catch (err: any) {
        console.error('Error checking auth state:', err);
        setError(err);
        addAuthEvent(`Error checking auth: ${err?.message || 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuthState();
    
    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      addAuthEvent(`Auth state change: ${event}`);
      checkAuthState();
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);
  
  // Check for cookies
  useEffect(() => {
    const allCookies = document.cookie.split(';').map(cookie => cookie.trim());
    setCookies(allCookies);
    addAuthEvent(`Found ${allCookies.length} cookies`);
  }, []);
  
  // Add to event log
  const addAuthEvent = (event: string) => {
    setAuthEvents(prev => [
      { time: new Date().toISOString(), event },
      ...prev.slice(0, 19) // Keep the last 20 events
    ]);
  };
  
  const handleSignOut = async () => {
    addAuthEvent('Sign out requested');
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      addAuthEvent('Sign out completed');
    } catch (err: any) {
      console.error('Error signing out:', err);
      addAuthEvent(`Sign out error: ${err?.message || 'Unknown error'}`);
      setError(err);
    }
  };
  
  const handleRefreshSession = async () => {
    addAuthEvent('Session refresh requested');
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      addAuthEvent(`Session refresh completed: ${data.session ? 'New session' : 'No session'}`);
    } catch (err: any) {
      console.error('Error refreshing session:', err);
      addAuthEvent(`Session refresh error: ${err?.message || 'Unknown error'}`);
      setError(err);
    }
  };
  
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Authentication Debugging</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* useUser Hook State */}
        <Card>
          <CardHeader>
            <CardTitle>useUser Hook State</CardTitle>
            <CardDescription>State from the useUser custom hook</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : (
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96 text-xs">
                {JSON.stringify({ user, isLoading }, null, 2)}
              </pre>
            )}
          </CardContent>
        </Card>
        
        {/* Direct Supabase Auth State */}
        <Card>
          <CardHeader>
            <CardTitle>Direct Supabase Auth State</CardTitle>
            <CardDescription>State from direct Supabase client calls</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : (
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96 text-xs">
                {JSON.stringify({ 
                  session: directSession, 
                  user: directUser
                }, null, 2)}
              </pre>
            )}
          </CardContent>
        </Card>
        
        {/* Cookies */}
        <Card>
          <CardHeader>
            <CardTitle>Browser Cookies</CardTitle>
            <CardDescription>All cookies found in the browser</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96 text-xs">
              {cookies.length > 0 ? 
                cookies.map((cookie, i) => `${i+1}. ${cookie}`).join('\n') :
                'No cookies found'
              }
            </pre>
          </CardContent>
        </Card>
        
        {/* Auth Events Log */}
        <Card>
          <CardHeader>
            <CardTitle>Auth Events Log</CardTitle>
            <CardDescription>Timeline of authentication events</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96 text-xs">
              {authEvents.map((event, i) => (
                `[${new Date(event.time).toLocaleTimeString()}] ${event.event}`
              )).join('\n')}
            </pre>
          </CardContent>
        </Card>
      </div>
      
      {/* Actions */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Authentication Actions</CardTitle>
          <CardDescription>Perform authentication operations</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button 
            variant="primary" 
            onClick={handleRefreshSession}
          >
            Refresh Session
          </Button>
          
          <Button 
            variant="primary" 
            onClick={() => window.location.reload()}
          >
            Reload Page
          </Button>
          
          <Button 
            variant="destructive" 
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
          
          <Link href="/sign-in">
            <Button variant="outline">
              Go to Sign In
            </Button>
          </Link>
          
          <Link href="/user-profile">
            <Button variant="outline">
              Go to User Profile
            </Button>
          </Link>
        </CardContent>
        
        {error && (
          <CardFooter>
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md w-full">
              <h4 className="font-bold mb-2">Error</h4>
              <pre className="text-xs overflow-auto">{JSON.stringify(error, null, 2)}</pre>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
} 