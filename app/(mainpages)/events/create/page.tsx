import { CreateEventForm } from '@/app/components/usersmaincomponents/events/create-event-form'

export default function CreateEventPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <div className="w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Create Event</h1>
          <CreateEventForm />
        </div>
      </div>
    </div>
  )
} 