'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/backend/lib/types/supabase';

export default function SignInPage() {
  const supabase = createClientComponentClient<Database>();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google', 'github']}
          redirectTo={process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL || '/auth/callback'}
        />
      </div>
    </div>
  );
}
