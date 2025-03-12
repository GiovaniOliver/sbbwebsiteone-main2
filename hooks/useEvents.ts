'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/app/types/supabase'

export interface Event {
  id: string
  title: string
  description: string
  location: string
  start_date: string
  end_date: string
  created_at: string
  user_id: string
  image_url?: string
  status: 'upcoming' | 'ongoing' | 'completed'
  max_participants?: number
  is_virtual: boolean
}

export function useEvents() {
  const supabase = createClientComponentClient<Database>()
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_date', { ascending: true })

      if (error) throw error
      return data as Event[]
    },
    staleTime: 1000 * 60 * 5,
  })

  const createEventMutation = useMutation({
    mutationFn: async (newEvent: Omit<Event, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('events')
        .insert(newEvent)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })

  return {
    ...query,
    createEvent: createEventMutation.mutate,
  }
} 