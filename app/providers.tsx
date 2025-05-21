'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createPagesBrowserClient  } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { Database } from '@/app/types/supabase'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  const [supabaseClient] = useState(() => createPagesBrowserClient<Database>())

  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider supabaseClient={supabaseClient}>
        {children}
      </SessionContextProvider>
    </QueryClientProvider>
  )
}
