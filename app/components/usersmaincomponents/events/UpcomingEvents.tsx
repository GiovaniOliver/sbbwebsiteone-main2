'use client'

import { Calendar, MapPin } from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'
import { Button } from '@/app/components/atoms/buttons/Button'
import { Card } from '@/app/components/molecules/cards/Card'
import { useUpcomingEvents } from '@/hooks/useEvents'
import { Event } from '@/backend/lib/types/event'

export function UpcomingEvents() {
  const { data: events, isLoading, error } = useUpcomingEvents()

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card className="p-4 text-red-500">
        Error loading upcoming events
      </Card>
    )
  }

  if (!events?.length) {
    return (
      <Card className="p-4 text-center text-gray-500">
        No upcoming events
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Upcoming Events</h2>
      {events.map((event: Event) => (
        <Link href={`/events/${event.id}`} key={event.id}>
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{format(new Date(event.eventDate), 'MMM d, yyyy h:mm a')}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{event.isVirtual ? 'Virtual Event' : event.location || 'Location TBD'}</span>
              </div>
            </div>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {event._count?.attendees || 0} attending
              </span>
              <Button variant="ghost" size="sm">
                View Details
              </Button>
            </div>
          </Card>
        </Link>
      ))}
      <div className="text-center pt-2">
        <Link href="/events">
          <Button variant="outline" size="sm">
            View All Events
          </Button>
        </Link>
      </div>
        </div>
      )
    } 