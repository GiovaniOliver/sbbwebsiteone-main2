import { Button } from '@/app/components/atoms/buttons/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/molecules/navigation/DropdownMenuPrimitive'
import { useRsvp } from '@/app/hooks/useRsvp'
import { Check, ChevronDown, Clock, X } from 'lucide-react'
import { cn } from '@/backend/lib/utils/utils'
import { toast } from '@/app/components/shared'

interface RSVPButtonProps {
  eventId: string
  currentUserRSVP?: string | null
  className?: string
}

export function RSVPButton({ eventId, currentUserRSVP, className }: RSVPButtonProps) {
  const { rsvpToEvent, cancelRsvp, isLoading } = useRsvp()

  const handleRSVP = async () => {
    try {
      await rsvpToEvent(eventId)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to RSVP to event",
        variant: "destructive",
      })
    }
  }

  const handleCancelRSVP = async () => {
    try {
      await cancelRsvp(eventId)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel RSVP",
        variant: "destructive",
      })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={currentUserRSVP ? "outline" : "default"}
          className={cn("w-[130px] justify-between", className)}
          disabled={isLoading}
        >
          {currentUserRSVP ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Going
            </>
          ) : (
            "RSVP"
          )}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {!currentUserRSVP ? (
          <DropdownMenuItem onClick={handleRSVP}>
            <Check className="mr-2 h-4 w-4" />
            Going
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={handleCancelRSVP}>
            <X className="mr-2 h-4 w-4" />
            Cancel RSVP
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 