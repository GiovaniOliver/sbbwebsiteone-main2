/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react'
import { useEvents } from '@/app/hooks/useEvents'
import { Calendar, MapPin, MoreVertical, Pencil, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'
import { Button } from '@/app/components/atoms/buttons/Button'
import { Card } from '@/app/components/molecules/cards/Card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/molecules/navigation/DropdownMenuPrimitive'
import { useUser } from '@/hooks/useUser'
import { useRouter } from 'next/navigation'
import { toast } from '@/app/components/shared'
import { EventWithRelations } from '@/backend/lib/types/event'

export function EventList() {
  const router = useRouter()
  const { user, isLoading: userLoading } = useUser()
  const { events, isLoading: eventsLoading, error, deleteEvent } = useEvents()
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming')

  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/login')
    }
  }, [user, userLoading, router])

  const handleDelete = async (eventId: string) => {
    try {
      await deleteEvent(eventId)
      toast({
        title: 'Success',
        description: 'Event deleted successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete event',
        variant: 'destructive',
      })
    }
  }

  if (userLoading || eventsLoading) {
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
        Error loading events
      </Card>
    )
  }

  if (!events.length) {
    return (
      <Card className="p-4 text-center text-gray-500">
        No events found
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <Button
            variant={filter === 'upcoming' ? 'default' : 'outline'}
            onClick={() => setFilter('upcoming')}
          >
            Upcoming
          </Button>
          <Button
            variant={filter === 'past' ? 'default' : 'outline'}
            onClick={() => setFilter('past')}
          >
            Past
          </Button>
        </div>
        <Button onClick={() => router.push('/events/create')}>
          Create Event
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {(events as EventWithRelations[]).map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                {user && event.organizerId === user.id && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => router.push(`/events/${event.id}/edit`)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                        <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDelete(String(event.id))}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{format(new Date(event.startDate), 'MMM d, yyyy h:mm a')}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{event.isVirtual ? 'Virtual Event' : event.location || 'Location TBD'}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {event.attendees?.length || 0} attending
                </span>
                <Link href={`/events/${event.id}`}>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 

