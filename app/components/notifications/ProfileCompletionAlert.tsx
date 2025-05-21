'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';

export function ProfileCompletionAlert() {
  const { user } = useUser();
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    async function checkProfileCompletion() {
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('state_code, city')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          setIsLoading(false);
          return;
        }

        // Show alert if state or city is missing
        setShowAlert(!profile.state_code || !profile.city);
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking profile completion:', error);
        setIsLoading(false);
      }
    }

    checkProfileCompletion();
  }, [user, supabase]);

  if (isLoading || !showAlert) return null;

  return (
    <div className="bg-amber-50 px-4 py-2 flex items-center justify-between" role="alert" aria-live="polite">
      <div className="flex items-center space-x-2">
        <AlertCircle className="h-5 w-5 text-amber-500" aria-hidden="true" />
        <span className="text-sm font-medium text-amber-800">
          Set your location to personalize your experience
        </span>
      </div>
      <Link
        href="/settings/profile"
        className="text-sm font-medium text-amber-800 hover:text-amber-600 underline underline-offset-2"
      >
        Complete Profile
      </Link>
    </div>
  );
} 