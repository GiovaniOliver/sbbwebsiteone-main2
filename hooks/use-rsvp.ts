'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '../backend/lib/types/supabase'

// TODO: Add these to Database type
interface RSVPDb {
  id: string
  event_id: string
  user_id: string
  status: 'attending' | 'not_attending'
  created_at: string
  updated_at: string
}

interface RSVP {
  id: string
  eventId: string
  userId: string
  status: 'attending' | 'not_attending'
  createdAt: string
  updatedAt: string
}

const toRSVP = (rsvp: RSVPDb): RSVP => ({
  id: rsvp.id,
  eventId: rsvp.event_id,
  userId: rsvp.user_id,
  status: rsvp.status,
  createdAt: rsvp.created_at,
  updatedAt: rsvp.updated_at,
})

export function useRsvp() {
  const supabase = createClientComponentClient<Database>()
  const queryClient = useQueryClient()

  const rsvpToEvent = useMutation({
    mutationFn: async (eventId: string) => {
      const { error } = await supabase
        .from('event_rsvps')
        .upsert(
          {
            event_id: eventId,
            status: 'attending',
          },
          { onConflict: 'event_id,user_id' }
        )

      if (error) throw new Error('Failed to RSVP to event')
    },
    onSuccess: (_, eventId) => {
      queryClient.invalidateQueries({ queryKey: ['event-rsvp', eventId] })
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })

  const cancelRsvp = useMutation({
    mutationFn: async (eventId: string) => {
      const { error } = await supabase
        .from('event_rsvps')
        .delete()
        .eq('event_id', eventId)

      if (error) throw new Error('Failed to cancel RSVP')
    },
    onSuccess: (_, eventId) => {
      queryClient.invalidateQueries({ queryKey: ['event-rsvp', eventId] })
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })

  return {
    rsvpToEvent: rsvpToEvent.mutate,
    cancelRsvp: cancelRsvp.mutate,
    isLoading: rsvpToEvent.isPending || cancelRsvp.isPending,
  }
}
