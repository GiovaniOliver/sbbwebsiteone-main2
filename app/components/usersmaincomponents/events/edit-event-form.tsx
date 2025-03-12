'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useEvents } from '@/app/hooks/useEvents'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Textarea } from '@/app/components/ui/textarea'
import { Switch } from '@/app/components/ui/switch'
import { Label } from '@/app/components/ui/label'
import { toast } from '@/app/components/ui/use-toast'
import { Calendar } from '@/app/components/ui/calendar'
import { format } from 'date-fns'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/components/ui/popover'
import { cn } from '@/backend/lib/utils/utils'
import { CalendarIcon } from 'lucide-react'
import { Event } from '@/backend/lib/types/event'

interface EditEventFormProps {
  event: Event
}

export function EditEventForm({ event }: EditEventFormProps) {
  const router = useRouter()
  const { updateEvent } = useEvents()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [date, setDate] = useState<Date>(new Date(event.startDate))
  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    location: event.location || '',
    isVirtual: event.isVirtual,
    maxAttendees: event.maxAttendees?.toString() || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date) {
      toast({
        title: 'Error',
        description: 'Please select an event date',
        variant: 'destructive',
      })
      return
    }

    try {
      setIsSubmitting(true)
      const eventData = {
        ...formData,
        eventDate: new Date(date),
        maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : null,
      }
      
      await updateEvent({ id: event.id, data: eventData as Partial<Event> })
      toast({
        title: 'Success',
        description: 'Event updated successfully',
      })
      router.push(`/events/${event.id}`)
      router.refresh()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update event. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Event Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          placeholder="Enter event title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          placeholder="Describe your event"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label>Event Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              disabled={(date) => date < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="isVirtual">Virtual Event</Label>
          <Switch
            id="isVirtual"
            checked={formData.isVirtual}
            onCheckedChange={(checked) => setFormData({ ...formData, isVirtual: checked })}
          />
        </div>
      </div>

      {!formData.isVirtual && (
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Enter event location"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="maxAttendees">Maximum Attendees (Optional)</Label>
        <Input
          id="maxAttendees"
          type="number"
          value={formData.maxAttendees}
          onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value })}
          placeholder="Leave blank for unlimited"
          min="1"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  )
} 