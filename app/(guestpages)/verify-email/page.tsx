'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/app/components/atoms/buttons/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/app/components/molecules/cards/Card';

export default function VerifyEmailPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user.email_confirmed_at) {
        router.push('/');
      }
      if (session?.user.email) {
        setEmail(session.user.email);
      }
    };
    checkSession();
  }, [router, supabase.auth]);

  const handleResendEmail = async () => {
    if (!email) return;
    
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });
    if (error) {
      console.error('Error resending email:', error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            We've sent you a verification link to {email}. Please check your email to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            If you don't see the email, check your spam folder. The verification link will expire in 24 hours.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            onClick={handleResendEmail}
            variant="outline"
            className="w-full"
          >
            Resend verification email
          </Button>
          <Button
            onClick={() => router.push('/sign-in')}
            variant="ghost"
            className="w-full"
          >
            Back to sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 