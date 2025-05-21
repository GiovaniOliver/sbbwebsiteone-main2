'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { logInfo, logError } from '@/lib/logger'

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    const supabase = await createServerSupabaseClient()
    
    const { data: { session } } = await supabase.auth.getSession()

    // Log the session for debugging
    logInfo('ProfileLayout', `Session check result: ${!!session}`)

    if (!session) {
      // Redirect to sign-in if no session
      return redirect('/sign-in')
    }

    return <>{children}</>
  } catch (error) {
    // Log any errors
    logError('ProfileLayout', 'Error checking session', error)
    
    // Still redirect on error
    return redirect('/sign-in')
  }
} 