import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAuth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/usersmaincomponents/homefeed/ui/avatar'
import { Button } from '@/app/components/usersmaincomponents/homefeed/ui/button'
import { Card, CardContent, CardHeader } from '@/app/components/usersmaincomponents/homefeed/ui/card'
import { Calendar, MapPin, Users } from 'lucide-react'
import { RSVPButton } from '@/app/components/usersmaincomponents/events/RSVPButton'
import { AttendanceList } from '@/app/components/usersmaincomponents/events/AttendanceList'

interface EventPageProps {
  params: {
    eventId: string
  }
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const event = await prisma.event.findUnique({
    where: { id: params.eventId },
    include: {
      organizer: true
    }
  })

  if (!event) {
    return {
      title: 'Event Not Found'
    }
  }

  return {
    title: event.title,
    description: event.description
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { userId: clerkId } = getAuth()
  const event = await prisma.event.findUnique({
    where: { id: params.eventId },
    include: {
      organizer: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatar: true
        }
      },
      rsvps: {
        where: clerkId ? {
          user: {
            clerkId
          }
        } : undefined,
        include: {
          user: true
        }
      },
      _count: {
        select: {
          rsvps: {
            where: {
              status: 'GOING'
            }
          }
        }
      }
    }
  })

  if (!event) {
    notFound()
  }

  const isOrganizer = clerkId && event.organizer.clerkId === clerkId
  const userRsvp = event.rsvps[0]

  return (
    <div className="container max-w-4xl py-6 space-y-8">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={event.organizer.avatar || ''} alt={event.organizer.username} />
            <AvatarFallback>
              {event.organizer.firstName?.[0]}{event.organizer.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{event.title}</h1>
            <p className="text-muted-foreground">
              Organized by {event.organizer.firstName} {event.organizer.lastName}
            </p>
          </div>
          {!isOrganizer && (
            <RSVPButton
              eventId={event.id}
              currentStatus={userRsvp?.status}
            />
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg">{event.description}</p>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Date & Time</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(event.startDate)}
                </p>
                <p className="text-sm text-muted-foreground">
                  to {formatDate(event.endDate)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-sm text-muted-foreground">
                  {event.location}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Attendees</p>
              <p className="text-sm text-muted-foreground">
                {event._count.rsvps} {event.maxAttendees ? `/ ${event.maxAttendees}` : ''} attending
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {isOrganizer && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Manage Attendance</h2>
          </CardHeader>
          <CardContent>
            <AttendanceList eventId={event.id} />
          </CardContent>
        </Card>
      )}
    </div>
  )
} 