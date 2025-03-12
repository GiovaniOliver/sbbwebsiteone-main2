'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '../backend/lib/types/supabase'
import { Event, EventDb, toEvent } from '../backend/lib/types/event'

export type EventSearchFilters = {
  query?: string
  category?: string
  startDate?: string
  endDate?: string
  isVirtual?: boolean
}

export function useEventSearch(initialFilters: EventSearchFilters = {}) {
  const [filters, setFilters] = useState<EventSearchFilters>(initialFilters)
  const supabase = createClientComponentClient<Database>()

  const { data: events = [], isLoading, error } = useQuery<Event[], Error>({
    queryKey: ['events', 'search', filters],
    queryFn: async () => {
      let query = supabase
        .from('events')
        .select()
        .order('start_time', { ascending: true })

      if (filters.query) {
        query = query.or(`title.ilike.%${filters.query}%,description.ilike.%${filters.query}%`)
      }

      if (filters.category) {
        query = query.eq('category', filters.category)
      }

      if (filters.startDate) {
        query = query.gte('start_time', filters.startDate)
      }

      if (filters.endDate) {
        query = query.lte('end_time', filters.endDate)
      }

      if (filters.isVirtual !== undefined) {
        query = query.eq('is_virtual', filters.isVirtual)
      }

      const { data, error } = await query

      if (error) throw new Error('Failed to fetch events')
      return data.map(toEvent)
    },
  })

  function updateFilters(newFilters: Partial<EventSearchFilters>) {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  function clearFilters() {
    setFilters({})
  }

  return {
    events,
    isLoading,
    error,
    filters,
    updateFilters,
    clearFilters,
  }
}
