import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/molecules/cards/Card'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/molecules/display/Avatar'
import { MapPin, Users, Video } from 'lucide-react'
import { formatDate } from '@/backend/lib/utils/utils'
import Link from 'next/link'
import { Event } from '@/backend/lib/types/event'

interface EventCardProps {
  event: Pick<Event, 'id' | 'title' | 'description' | 'startDate' | 'location' | 'isVirtual' | 'organizer'> & {
    notificationCount?: number
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
            {formatDate(event.startDate)}
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
                  <AvatarImage src={event.organizer?.imageUrl || undefined} />
                  <AvatarFallback>
                    {event.organizer?.username?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{event.organizer?.username}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{event.notificationCount || 0}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
} 