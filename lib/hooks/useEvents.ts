import { useQuery } from '@tanstack/react-query'
import { Event, ApiResponse } from '../types'

interface EventsResponse {
  events: Event[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

interface UseEventsParams {
  page?: number
  limit?: number
  search?: string
  date?: 'upcoming' | 'past' | 'today' | 'week' | 'month'
  isVirtual?: boolean
  organizerId?: string
}

export function useEvents({
  page = 1,
  limit = 10,
  search = '',
  date,
  isVirtual,
  organizerId,
}: UseEventsParams = {}) {
  return useQuery<EventsResponse, Error>({
    queryKey: ['events', { page, limit, search, date, isVirtual, organizerId }],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      })

      if (search) params.set('search', search)
      if (date) params.set('date', date)
      if (isVirtual !== undefined) params.set('isVirtual', isVirtual.toString())
      if (organizerId) params.set('organizerId', organizerId)

      const response = await fetch(`/api/events?${params.toString()}`)
      if (!response.ok) {
        throw new Error('Failed to fetch events')
      }

      const data: ApiResponse<EventsResponse> = await response.json()
      if (!data.success || !data.data) {
        throw new Error(data.error || 'Failed to fetch events')
      }

      return data.data
    },
  })
}

// Hook for fetching upcoming events
export function useUpcomingEvents(limit = 5) {
  return useQuery<Event[], Error>({
    queryKey: ['events', 'upcoming', limit],
    queryFn: async () => {
      const response = await fetch(`/api/events/upcoming?limit=${limit}`)
      if (!response.ok) {
        throw new Error('Failed to fetch upcoming events')
      }

      const data: ApiResponse<Event[]> = await response.json()
      if (!data.success || !data.data) {
        throw new Error(data.error || 'Failed to fetch upcoming events')
      }

      return data.data
    },
  })
}

// Hook for fetching a single event
export function useEvent(eventId: string) {
  return useQuery<Event, Error>({
    queryKey: ['event', eventId],
    queryFn: async () => {
      const response = await fetch(`/api/events/${eventId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch event')
      }

      const data: ApiResponse<Event> = await response.json()
      if (!data.success || !data.data) {
        throw new Error(data.error || 'Failed to fetch event')
      }

      return data.data
    },
    enabled: !!eventId,
  })
} 