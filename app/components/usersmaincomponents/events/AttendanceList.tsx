import { useEventParticipation } from '@/lib/hooks/useEventParticipation'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/usersmaincomponents/homefeed/ui/avatar'
import { Button } from '@/app/components/usersmaincomponents/homefeed/ui/button'
import { ScrollArea } from '@/app/components/usersmaincomponents/homefeed/ui/scroll-area'
import { Skeleton } from '@/app/components/usersmaincomponents/homefeed/ui/skeleton'
import { useUser } from '@/lib/hooks/useUser'
import { RSVPStatus } from '@prisma/client'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

interface AttendanceListProps {
  eventId: string
  isOrganizer: boolean
}

export function AttendanceList({ eventId, isOrganizer }: AttendanceListProps) {
  const { rsvps, attendees, isLoading, checkIn } = useEventParticipation({ eventId })
  const { data: currentUser } = useUser()

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  const goingRSVPs = rsvps.filter(rsvp => rsvp.status === RSVPStatus.GOING)
  const maybeRSVPs = rsvps.filter(rsvp => rsvp.status === RSVPStatus.MAYBE)
  const notGoingRSVPs = rsvps.filter(rsvp => rsvp.status === RSVPStatus.NOT_GOING)

  const isUserGoing = currentUser && goingRSVPs.some(rsvp => rsvp.user.id === currentUser.id)
  const hasUserCheckedIn = currentUser && attendees.some(attendance => attendance.user.id === currentUser.id)

  return (
    <div className="space-y-6">
      {/* Check-in button for current user */}
      {isUserGoing && !hasUserCheckedIn && (
        <Button onClick={checkIn} className="w-full">
          Check In to Event
        </Button>
      )}

      {/* Going */}
      <div>
        <h3 className="font-semibold mb-4">Going ({goingRSVPs.length})</h3>
        <ScrollArea className="h-[200px]">
          <div className="space-y-4">
            {goingRSVPs.map((rsvp) => (
              <div key={rsvp.id} className="flex items-center justify-between">
                <Link
                  href={`/profile/${rsvp.user.id}`}
                  className="flex items-center space-x-3"
                >
                  <Avatar>
                    <AvatarImage src={rsvp.user.avatar || undefined} />
                    <AvatarFallback>
                      {rsvp.user.username?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{rsvp.user.username}</p>
                    <p className="text-sm text-gray-500">
                      {rsvp.user.firstName} {rsvp.user.lastName}
                    </p>
                  </div>
                </Link>
                {attendees.some(a => a.user.id === rsvp.user.id) && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Maybe */}
      {maybeRSVPs.length > 0 && (
        <div>
          <h3 className="font-semibold mb-4">Maybe ({maybeRSVPs.length})</h3>
          <ScrollArea className="h-[200px]">
            <div className="space-y-4">
              {maybeRSVPs.map((rsvp) => (
                <div key={rsvp.id} className="flex items-center space-x-3">
                  <Link
                    href={`/profile/${rsvp.user.id}`}
                    className="flex items-center space-x-3"
                  >
                    <Avatar>
                      <AvatarImage src={rsvp.user.avatar || undefined} />
                      <AvatarFallback>
                        {rsvp.user.username?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{rsvp.user.username}</p>
                      <p className="text-sm text-gray-500">
                        {rsvp.user.firstName} {rsvp.user.lastName}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Not Going */}
      {isOrganizer && notGoingRSVPs.length > 0 && (
        <div>
          <h3 className="font-semibold mb-4">Not Going ({notGoingRSVPs.length})</h3>
          <ScrollArea className="h-[200px]">
            <div className="space-y-4">
              {notGoingRSVPs.map((rsvp) => (
                <div key={rsvp.id} className="flex items-center space-x-3">
                  <Link
                    href={`/profile/${rsvp.user.id}`}
                    className="flex items-center space-x-3"
                  >
                    <Avatar>
                      <AvatarImage src={rsvp.user.avatar || undefined} />
                      <AvatarFallback>
                        {rsvp.user.username?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{rsvp.user.username}</p>
                      <p className="text-sm text-gray-500">
                        {rsvp.user.firstName} {rsvp.user.lastName}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
} 