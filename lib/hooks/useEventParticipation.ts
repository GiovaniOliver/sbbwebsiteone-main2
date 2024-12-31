import { useState } from 'react'
import useSWR, { mutate } from 'swr'
import { useToast } from '@/app/components/ui/use-toast'
import { ApiResponse } from '@/lib/types'
import { RSVPStatus } from '@prisma/client'

interface EventParticipant {
  id: string
  username: string | null
  firstName: string | null
  lastName: string | null
  avatar: string | null
}

interface RSVP {
  id: string
  status: RSVPStatus
  user: EventParticipant
  createdAt: string
  updatedAt: string
}

interface Attendance {
  id: string
  checkedInAt: string
  user: EventParticipant
}

interface UseEventParticipationProps {
  eventId: string
}

export function useEventParticipation({ eventId }: UseEventParticipationProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const { data: rsvpsData, error: rsvpsError } = 
    useSWR<ApiResponse<RSVP[]>>(`/api/events/${eventId}/rsvp`)
  
  const { data: attendeesData, error: attendeesError } = 
    useSWR<ApiResponse<Attendance[]>>(`/api/events/${eventId}/attendance`)

  const updateRSVP = async (status: RSVPStatus) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/events/${eventId}/rsvp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      const data: ApiResponse<RSVP> = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to update RSVP')
      }

      await mutate(`/api/events/${eventId}/rsvp`)
      
      toast({
        title: 'RSVP Updated',
        description: `You are now marked as ${status.toLowerCase()} to this event.`,
      })
    } catch (error) {
      console.error('RSVP update error:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update RSVP',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const removeRSVP = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/events/${eventId}/rsvp`, {
        method: 'DELETE',
      })

      const data: ApiResponse<null> = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to remove RSVP')
      }

      await mutate(`/api/events/${eventId}/rsvp`)
      
      toast({
        title: 'RSVP Removed',
        description: 'Your RSVP has been removed from this event.',
      })
    } catch (error) {
      console.error('RSVP removal error:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to remove RSVP',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const checkIn = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/events/${eventId}/attendance`, {
        method: 'POST',
      })

      const data: ApiResponse<Attendance> = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to check in')
      }

      await mutate(`/api/events/${eventId}/attendance`)
      
      toast({
        title: 'Checked In',
        description: 'You have been checked in to the event.',
      })
    } catch (error) {
      console.error('Check-in error:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to check in',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    rsvps: rsvpsData?.data || [],
    attendees: attendeesData?.data || [],
    isLoading,
    rsvpsError,
    attendeesError,
    updateRSVP,
    removeRSVP,
    checkIn,
  }
} 