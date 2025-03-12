import { useUser } from '@/hooks/useUser'
import { Loader2 } from 'lucide-react'

interface AttendanceListProps {
  eventId: string
  rsvps: Array<{ userId: string; status: 'attending' | 'maybe' | 'declined' }>
  attendees: string[]
  isLoading: boolean
  checkIn: (userId: string) => Promise<void>
  isAdmin?: boolean
}

export default function AttendanceList({
  eventId,
  rsvps,
  attendees,
  isLoading: isRsvpLoading,
  checkIn,
  isAdmin = false
}: AttendanceListProps) {
  const { user, isLoading: isUserLoading } = useUser()

  if (isRsvpLoading || isUserLoading) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  // TODO: Implement attendance list UI
  return null
}
