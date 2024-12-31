import { useState } from 'react'
import { ApiResponse } from '@/lib/types'

export function useRsvp() {
  const [isLoading, setIsLoading] = useState(false)

  const rsvpToEvent = async (eventId: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/events/${eventId}/rsvp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = (await response.json()) as ApiResponse<{ status: string }>

      if (!data.success) {
        throw new Error(data.error || 'Failed to RSVP')
      }

      return data.data
    } catch (error) {
      console.error('RSVP error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const cancelRsvp = async (eventId: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/events/${eventId}/rsvp`, {
        method: 'DELETE'
      })

      const data = (await response.json()) as ApiResponse<null>

      if (!data.success) {
        throw new Error(data.error || 'Failed to cancel RSVP')
      }
    } catch (error) {
      console.error('Cancel RSVP error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    rsvpToEvent,
    cancelRsvp
  }
} 