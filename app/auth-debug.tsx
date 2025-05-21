'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AuthDebugPage() {
  const [sessionInfo, setSessionInfo] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [profileInfo, setProfileInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function checkAuth() {
      try {
        setLoading(true);
        
        // Get session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          throw sessionError;
        }
        setSessionInfo(sessionData.session);
        
        // Get user if session exists
        if (sessionData.session) {
          const { data: userData, error: userError } = await supabase.auth.getUser();
          if (userError) {
            throw userError;
          }
          setUserInfo(userData.user);
        }
      } catch (err: any) {
        setError(err.message);
        console.error('Auth check error:', err);
      } finally {
        setLoading(false);
      }
    }
    
    checkAuth();
  }, [supabase.auth]);

  // Fetch profile information if we have a user ID
  const fetchProfileInfo = async () => {
    if (!userInfo?.id) return;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', userInfo.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        setProfileInfo({ error: error.message });
      } else {
        setProfileInfo(data);
      }
    } catch (err: any) {
      console.error('Error in profile fetch:', err);
      setProfileInfo({ error: err.message });
    }
  };

  useEffect(() => {
    if (userInfo?.id) {
      fetchProfileInfo();
    }
  }, [userInfo]);

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const checkProfileRoute = () => {
    window.location.href = `/profile`;
  };

  const checkSpecificProfile = () => {
    if (userInfo?.id) {
      window.location.href = `/profile/${userInfo.id}`;
    } else {
      alert('No user ID available - please sign in first');
    }
  };

  return (
    <div className="container py-8 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Authentication Debug</h1>
      
      {loading ? (
        <p>Loading authentication state...</p>
      ) : error ? (
        <div className="bg-red-100 p-4 rounded mb-4">
          <p className="text-red-700">Error: {error}</p>
        </div>
      ) : (
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">Session Status</h2>
            <div className="bg-gray-100 p-4 rounded">
              <p>Session exists: {sessionInfo ? 'Yes' : 'No'}</p>
              {sessionInfo && (
                <pre className="mt-2 text-xs overflow-auto bg-white p-2 rounded">
                  {JSON.stringify(sessionInfo, null, 2)}
                </pre>
              )}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">User Information</h2>
            <div className="bg-gray-100 p-4 rounded">
              <p>User exists: {userInfo ? 'Yes' : 'No'}</p>
              {userInfo && (
                <pre className="mt-2 text-xs overflow-auto bg-white p-2 rounded">
                  {JSON.stringify(userInfo, null, 2)}
                </pre>
              )}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Profile Information</h2>
            <div className="bg-gray-100 p-4 rounded">
              <p>Profile exists: {profileInfo ? 'Yes' : 'No'}</p>
              {profileInfo?.error ? (
                <div className="bg-red-100 p-2 rounded mt-2">
                  <p className="text-red-700">Error: {profileInfo.error}</p>
                </div>
              ) : profileInfo ? (
                <pre className="mt-2 text-xs overflow-auto bg-white p-2 rounded">
                  {JSON.stringify(profileInfo, null, 2)}
                </pre>
              ) : null}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={signOut}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Sign Out
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Refresh Page
            </button>
            <a 
              href="/sign-in"
              className="bg-green-500 text-white px-4 py-2 rounded inline-block"
            >
              Go to Sign In
            </a>
            <button 
              onClick={checkProfileRoute}
              className="bg-purple-500 text-white px-4 py-2 rounded"
            >
              Go to Profile
            </button>
            <button 
              onClick={checkSpecificProfile}
              className="bg-indigo-500 text-white px-4 py-2 rounded"
            >
              Go to My Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
