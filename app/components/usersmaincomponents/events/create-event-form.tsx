'use client'

import { useState } from 'react'
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

export function CreateEventForm() {
  const router = useRouter()
  const { createEvent } = useEvents()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    isVirtual: false,
    maxAttendees: '',
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
        title: formData.title,
        description: formData.description,
        start_date: date.toISOString(),
        end_date: date.toISOString(), // For now, end date is same as start date
        location: formData.location || null,
        is_virtual: formData.isVirtual,
        organizer_id: '', // This will be set by the server
        max_attendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : null,
      }
      
      const event = await createEvent(eventData)
      toast({
        title: 'Success',
            // Start of Selection
            description: 'Event created successfully',
          })
          router.push('/events')
        } catch (error) {
          toast({
            title: 'Error',
            description: 'Failed to create event. Please try again.',
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
                'w-full justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
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

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Creating Event...' : 'Create Event'}
      </Button>
    </form>
  )
} 