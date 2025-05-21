'use client'

import { ReactNode, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Navbar } from '../components/guestpagecomponents/NavbarGuest';
import Footer from '../components/guestpagecomponents/FooterSection';

export default function GuestLayout({
  children,
}: {
  children: ReactNode
}) {
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        router.replace('/homefeed')
      }
    }

    checkAuth()
  }, [router, supabase.auth])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
} 