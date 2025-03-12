'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from "next/navigation";
import { useEffect } from 'react';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        redirect('/sign-in');
      }
    };
    checkAuth();
  }, [supabase.auth]);

  return <div className="min-h-screen bg-gray-50">
    <div className="pt-16">
      {children}
    </div>
  </div>;
} 