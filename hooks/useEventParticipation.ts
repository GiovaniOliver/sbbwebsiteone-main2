'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '../backend/lib/types/supabase'

export type RSVPStatus = 'attending' | 'maybe' | 'not_attending'

interface EventRSVPDb {
  id: string
  event_id: string
  user_id: string
  status: RSVPStatus
  created_at: string
  updated_at: string
}

interface EventRSVP {
  id: string
  eventId: string
  userId: string
  status: RSVPStatus
  createdAt: string
  updatedAt: string
}

const toEventRSVP = (rsvp: EventRSVPDb): EventRSVP => ({
  id: rsvp.id,
  eventId: rsvp.event_id,
  userId: rsvp.user_id,
  status: rsvp.status,
  createdAt: rsvp.created_at,
  updatedAt: rsvp.updated_at,
})

export function useEventParticipation(eventId: string) {
  const supabase = createClientComponentClient<Database>()
  const queryClient = useQueryClient()

  const {
    data: rsvp,
    isLoading,
    error,
  } = useQuery<EventRSVP | null, Error>({
    queryKey: ['event-rsvp', eventId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('event_rsvps')
        .select()
        .eq('event_id', eventId)
        .single()

      if (error) {
        if (error.code === 'PGRST116') return null // No rows returned
        throw new Error('Failed to fetch RSVP status')
      }

      return data ? toEventRSVP(data) : null
    },
  })

  const updateRSVP = useMutation({
    mutationFn: async (status: RSVPStatus) => {
      const { error } = await supabase
        .from('event_rsvps')
        .upsert(
          {
            event_id: eventId,
            status,
          },
          { onConflict: 'event_id,user_id' }
        )

      if (error) throw new Error('Failed to update RSVP status')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event-rsvp', eventId] })
    },
  })

  return {
    rsvp,
    isLoading,
    error,
    updateRSVP: updateRSVP.mutate,
  }
}
