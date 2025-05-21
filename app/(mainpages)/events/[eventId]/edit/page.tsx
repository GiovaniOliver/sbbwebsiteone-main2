import { notFound } from 'next/navigation'
import { getEventById } from '@/backend/services/events/events.service'
import { EditEventForm } from '@/app/components/usersmaincomponents/events/edit-event-form'
import Layout from '@/app/components/usersmaincomponents/homefeed/homefeed-layout'
import { Event } from '@/backend/lib/types/event'

interface EditEventPageProps {
  params: {
    eventId: string
  }
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const eventData = await getEventById(params.eventId)

  if (!eventData) {
    notFound()
  }

  // Convert the event data to match the Event type
  const event: Event = {
    id: eventData.id,
    title: eventData.title,
    description: eventData.description,
    location: eventData.location || '',
    isVirtual: eventData.isVirtual,
    eventDate: new Date(eventData.eventDate),
    maxAttendees: eventData.maxAttendees || 0,
    organizerId: eventData.organizerId,
    createdAt: new Date(eventData.createdAt),
    updatedAt: new Date(eventData.updatedAt),
    _count: eventData._count,
    organizer: {
      id: eventData.organizer?.id || '',
      username: eventData.organizer?.username || '',
      firstName: eventData.organizer?.firstName || '',
      lastName: eventData.organizer?.lastName || '',
      avatar: eventData.organizer?.image_url || ''
    }
  }

  return (
    <Layout>
      <div className="container max-w-4xl py-8">
        <div className="bg-white shadow rounded-lg p-6 sm:p-8">
          <h1 className="text-3xl font-bold mb-8">Edit Event</h1>
          <EditEventForm event={event} />
        </div>
      </div>
    </Layout>
  )
} 