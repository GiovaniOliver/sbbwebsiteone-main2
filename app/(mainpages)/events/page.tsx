/* eslint-disable @next/next/no-img-element */
'use client'
import Layout from '@/app/components/usersmaincomponents/homefeed/homefeed-layout'
import { useState, useEffect } from 'react'
import { useEvents, Event } from '@/hooks/useEvents'
import { Button } from '@/app/components/atoms/buttons/Button'
import { Input } from '@/app/components/atoms/inputs/Input'
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/molecules/cards/Card'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/molecules/display/Avatar'
import { Skeleton } from '@/app/components/atoms/feedback/Skeleton'
import { useUser } from '@/hooks/useUser'

export default function EventsPage() {
  const [search, setSearch] = useState('')
  const [dateFilter, setDateFilter] = useState<'upcoming' | 'past' | 'today' | 'week' | 'month'>('upcoming')
  const [isVirtual, setIsVirtual] = useState<boolean | undefined>(undefined)
  const [page, setPage] = useState(1)

  const { data = [], isLoading, error, createEvent } = useEvents()
  const { user } = useUser()
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    if (data) {
      setEvents(data)
    }
  }, [data])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1) // Reset page when searching
    // Filter events based on search term
    const filteredEvents = data.filter(event => 
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase())
    )
    setEvents(filteredEvents)
  }

  const handleCreateTestEvent = () => {
    if (!user) return
    const newEvent: Omit<Event, 'id' | 'created_at'> = {
      title: 'Test Event',
      description: 'This is a test event',
      location: 'Virtual',
      start_date: new Date().toISOString(),
      end_date: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
      user_id: user.id,
      status: 'upcoming',
      is_virtual: true,
      max_participants: 10,
    }
    createEvent(newEvent)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    const formData = new FormData(e.target as HTMLFormElement)
    const maxParticipants = formData.get('max_participants')
    const eventData: Omit<Event, 'id' | 'created_at'> = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      location: formData.get('location') as string || 'Virtual',
      start_date: formData.get('start_date') as string,
      end_date: formData.get('end_date') as string,
      user_id: user.id,
      status: 'upcoming',
      is_virtual: formData.get('is_virtual') === 'true',
      max_participants: maxParticipants ? Number(maxParticipants) : undefined,
    }
    createEvent(eventData)
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
                {data?.map((event: Event) => (
                  <Link key={event.id} href={`/events/${event.id}`}>
                    <Card className="hover:bg-accent/50 transition-colors">
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={event.image_url || ''} />
                            <AvatarFallback>
                              {event.title.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{event.title}</CardTitle>
                            <CardDescription>
                              Created by {event.user_id}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          {event.description}
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-2" />
                            {format(new Date(event.start_date), 'PPP')}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-2" />
                            {event.location || 'No location set'}
                          </div>
                          {event.max_participants && (
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Users className="h-4 w-4 mr-2" />
                              {event.max_participants} attendees max
                            </div>
                          )}
                          {event.is_virtual && (
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Video className="h-4 w-4 mr-2" />
                              Virtual Event
                            </div>
                          )}
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