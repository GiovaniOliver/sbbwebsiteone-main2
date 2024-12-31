import { CreateEventForm } from '@/app/components/usersmaincomponents/events/create-event-form'

export default function CreateEventPage() {
  return (
    <div className="container max-w-2xl py-8">
      <h1 className="text-3xl font-bold mb-8">Create Event</h1>
      <CreateEventForm />
    </div>
  )
} 