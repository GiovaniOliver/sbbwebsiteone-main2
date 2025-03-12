/* eslint-disable @next/next/no-img-element */
'use client'
import Layout from '@/app/components/usersmaincomponents/homefeed/layout'
import { useState, useEffect } from 'react'
import { useEvents } from '@/hooks/useEvents'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select' 
import { Calendar, MapPin, Users, Video } from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'
import { Skeleton } from '@/app/components/ui/skeleton'
import { Event, EventDbWithRelations, CreateEventInput } from '@/backend/lib/types/event'

export default function EventsPage() {
  const [search, setSearch] = useState('')
  const [dateFilter, setDateFilter] = useState<'upcoming' | 'past' | 'today' | 'week' | 'month'>('upcoming')
  const [isVirtual, setIsVirtual] = useState<boolean | undefined>(undefined)
  const [page, setPage] = useState(1)

  const { data = [], isLoading, error, createEvent } = useEvents()
  const [events, setEvents] = useState<EventDbWithRelations[]>([])

  useEffect(() => {
    if (data) {
      setEvents(data)
    }
  }, [data])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1) // Reset page when searching
    createEvent({
      title: 'Test Event',
      description: 'This is a test event',
      start_date: new Date().toISOString(),
      end_date: new Date().toISOString(),
      location: 'Test Location',
      is_virtual: false,
      organizer_id: '123',
      max_attendees: null
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const eventData: CreateEventInput = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      start_date: formData.get('startDate') as string,
      end_date: formData.get('endDate') as string,
      location: formData.get('location') as string || null,
      is_virtual: formData.get('isVirtual') === 'true',
      organizer_id: formData.get('organizerId') as string,
      max_attendees: Number(formData.get('maxAttendees')) || null
    }
    await createEvent(eventData)
  }

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-4 w-48" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Events</h1>
              <p className="text-muted-foreground">
                Discover and join upcoming events in your community
              </p>
            </div>
            <Link href="/events/create">
              <Button>Create Event</Button>
            </Link>
          </div>

          {/* Filters */}
          <div className="grid gap-4 md:grid-cols-4">
            <form onSubmit={handleSearch} className="md:col-span-2">
              <Input
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
            <Select value={dateFilter} onValueChange={(value: any) => setDateFilter(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="past">Past</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={isVirtual?.toString() || 'all'}
              onValueChange={(value) => setIsVirtual(value === 'all' ? undefined : value === 'true')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="true">Virtual</SelectItem>
                <SelectItem value="false">In Person</SelectItem>
              </SelectContent>
            </Select>
          </div>  

          {/* Events Grid */}
          {data?.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No events found. Try adjusting your filters.
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data?.map((event: EventDbWithRelations) => (
                  <Link key={event.id} href={`/events/${event.id}`}>
                    <Card className="hover:bg-accent/50 transition-colors">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>{event.title}</CardTitle>
                          {event.is_virtual && <Video className="h-4 w-4 text-blue-500" />}
                        </div>
                        <CardDescription>
                          {format(new Date(event.start_date), 'PPP')}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {event.location ? (
                              <>
                                <MapPin className="h-4 w-4" />
                                <span>{event.location}</span>
                              </>
                            ) : (
                              <>
                                <Video className="h-4 w-4" />
                                <span>Virtual Event</span>
                              </>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={event.organizer?.image_url || undefined} />
                                <AvatarFallback>
                                  {event.organizer?.username?.[0]?.toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{event.organizer?.username}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Users className="h-4 w-4" />
                              <span>{event.max_attendees || 0}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 flex justify-center gap-2">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setPage(p => p + 1)}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
} 