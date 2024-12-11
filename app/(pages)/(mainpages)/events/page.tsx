/* eslint-disable @next/next/no-img-element */
'use client'

import Layout from '@/app/components/usersmaincomponents/homefeed/Layout'
import { Card } from '@/app/components/usersmaincomponents/homefeed/ui/card'
import { Button } from '@/app/components/usersmaincomponents/homefeed/ui/button'
import { Calendar, MapPin, Users } from 'lucide-react'

const events = [
  {
    title: "Web Development Meetup",
    date: "Dec 15, 2023",
    time: "6:00 PM",
    location: "Tech Hub, Downtown",
    attendees: 45,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87"
  },
  {
    title: "Design Workshop",
    date: "Dec 18, 2023",
    time: "2:00 PM",
    location: "Creative Space",
    attendees: 30,
    image: "https://images.unsplash.com/photo-1531498860502-7c67cf02f657"
  },
  // Add more events as needed
]

export default function EventsPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <main className="flex-1 p-4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Events</h1>
              <Button>Create Event</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.map((event, index) => (
                <Card key={index} className="overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {event.date} at {event.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {event.attendees} attending
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button className="flex-1">Join</Button>
                      <Button variant="outline" className="flex-1">Share</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </Layout>
  )
}