import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/usersmaincomponents/homefeed/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/usersmaincomponents/homefeed/ui/avatar'
import { MapPin, Users, Video } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

interface EventCardProps {
  event: {
    id: string
    title: string
    description: string
    date: Date
    location: string | null
    isVirtual: boolean
    organizer: {
      username: string
      avatar: string | null
    }
    _count?: {
      rsvps: number
    }
  }
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Link href={`/events/${event.id}`}>
      <Card className="hover:bg-accent/50 transition-colors">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{event.title}</CardTitle>
            {event.isVirtual && <Video className="h-4 w-4 text-blue-500" />}
          </div>
          <p className="text-sm text-muted-foreground">
            {formatDate(event.date)}
          </p>
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
                  <AvatarImage src={event.organizer.avatar || undefined} />
                  <AvatarFallback>
                    {event.organizer.username?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{event.organizer.username}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{event._count?.rsvps || 0}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
} 