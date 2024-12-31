import { EventCard } from './event-card'
import { Skeleton } from '@/app/components/usersmaincomponents/homefeed/ui/skeleton'

interface Event {
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

interface EventListProps {
  events: Event[]
  isLoading?: boolean
}

export function EventList({ events, isLoading }: EventListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!events.length) {
    return (
      <div className="text-center text-muted-foreground">
        No events found.
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
} 