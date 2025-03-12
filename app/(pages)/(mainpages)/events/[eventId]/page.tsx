'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { useEvents } from '@/hooks/useEvents'
import { Calendar, Clock, MapPin, Users, User, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { format } from 'date-fns'
import Layout from '@/app/components/usersmaincomponents/homefeed/layout'
import { EventWithRelations } from '@/backend/lib/types/event'
import { toast } from '@/app/components/ui/use-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/app/components/ui/alert-dialog'

interface EventPageProps {
  params: {
    eventId: string
  }
}

export default function EventPage({ params }: EventPageProps) {
  const router = useRouter()
  const { user } = useUser()
  const events = useEvents()
  const [event, setEvent] = useState<EventWithRelations | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${params.eventId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch event')
        }
        const data = await response.json()
        setEvent(data.data)
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load event details',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvent()
  }, [params.eventId])

  const handleDelete = async () => {
    if (!event) return

    try {
      setIsDeleting(true)
      await deleteEvent(event.id)
      toast({
        title: 'Success',
        description: 'Event deleted successfully',
      })
      router.push('/events')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete event',
        variant: 'destructive',
      })
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="flex-1 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  if (!event) {
    return (
      <Layout>
        <div className="flex-1 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-red-500">
              Event not found
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  const organizerName = event.organizer?.username || 'Unknown Organizer'

  return (
    <Layout>
      <div className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Event Header */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
                  <div className="flex items-center text-gray-600">
                    <User className="h-5 w-5 mr-2" />
                    <span>Organized by {organizerName}</span>
                  </div>
                </div>
                {user && event.organizerId === user.id && (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/events/${event.id}/edit`)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Event</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this event? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </div>

              <p className="text-gray-600 text-lg mb-6">{event.description}</p>
              
              {/* Event Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Date</h3>
                    <p className="text-gray-600">{format(new Date(event.startDate), 'EEEE, MMMM d, yyyy')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Time</h3>
                    <p className="text-gray-600">{format(new Date(event.startDate), 'h:mm a')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Location</h3>
                    <p className="text-gray-600">
                      {event.isVirtual ? 'Virtual Event' : event.location || 'Location TBD'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Attendees</h3>
                    <p className="text-gray-600">
                      {event.attendees?.length || 0} attending
                      {event.maxAttendees && ` · ${event.maxAttendees} spots total`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1">
                  Attend Event
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  Share Event
                </Button>
              </div>
            </div>
          </div>

          {/* Additional Sections */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About the Organizer */}
            <div className="md:col-span-2 bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">About the Organizer</h2>
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                  {event.organizer?.imageUrl ? (
                    <img 
                      src={event.organizer.imageUrl} 
                      alt={organizerName}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{organizerName}</h3>
                  <p className="text-gray-600 text-sm">Event Organizer</p>
                </div>
              </div>
            </div>

            {/* Event Stats */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Event Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 text-sm">Created</p>
                  <p className="font-medium">{format(new Date(event.createdAt), 'MMM d, yyyy')}</p>
                </div>
                {event.maxAttendees && (
                  <div>
                    <p className="text-gray-600 text-sm">Capacity</p>
                    <p className="font-medium">{event.maxAttendees} attendees</p>
                  </div>
                )}
                <div>
                  <p className="text-gray-600 text-sm">Event Type</p>
                  <p className="font-medium">{event.isVirtual ? 'Virtual Event' : 'In-Person Event'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 

function deleteEvent(id: string) {
  throw new Error('Function not implemented.')
}
