'use client'

import { useQuery } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card } from '../../ui/shared/card'
import { Skeleton } from '../../ui/shared/skeleton'
import Link from 'next/link'
import { Button } from '../../ui/shared/button'
import { Calendar, Clock, Users } from 'lucide-react'

interface LiveEventsListProps {
  userId: string
  type: 'hosting' | 'attending'
  emptyMessage: string
}

export default function LiveEventsList({ userId, type, emptyMessage }: LiveEventsListProps) {
  const supabase = createClientComponentClient()

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['live-events', userId, type],
    queryFn: async () => {
      let query = supabase
        .from('events')
        .select(`
          *,
          host:users!host_id (*),
          attendees:event_attendance (count)
        `)

      if (type === 'hosting') {
        query = query.eq('host_id', userId)
      } else if (type === 'attending') {
        query = query
          .eq('event_attendance.user_id', userId)
          .not('host_id', 'eq', userId)
      }

      const { data } = await query
        .gte('start_time', new Date().toISOString())
        .order('start_time', { ascending: true })

      return data || []
    }
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="p-4">
            <div className="space-y-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-9 w-full" />
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (!events.length) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <Card key={event.id} className="p-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg line-clamp-2">{event.title}</h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {event.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(event.start_time).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {new Date(event.start_time).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit'
                })}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {event.attendees.count} attending
              </div>
            </div>

            <Link href={`/events/${event.id}`}>
              <Button className="w-full">View Details</Button>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  )
} 