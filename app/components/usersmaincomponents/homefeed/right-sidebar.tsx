'use client'

import { Avatar, AvatarFallback, AvatarImage } from "../../ui/shared/avatar"
import { Button } from "../../ui/shared/button"
import { Card } from "../../ui/shared/card"
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from "../../ui/shared/skeleton"
import { useUpcomingEvents } from "@/hooks/useEvents"
import Link from "next/link"
import { Route } from 'next'
import { format } from 'date-fns'

interface SuggestedUser {
  id: string
  username: string | null
  image_url: string | null
}

interface Event {
  id: string
  title: string
  eventDate: Date
  location: string | null
  organizer: {
    id: string
    username: string | null
    image_url: string | null
  }
}

export default function RightSidebar() {
  const { data: suggestedUsers, isLoading: loadingUsers } = useQuery({
    queryKey: ['suggestedUsers'],
    queryFn: async () => {
      const response = await fetch('/api/users/suggested')
      if (!response.ok) throw new Error('Failed to fetch suggested users')
      const data = await response.json()
      return data.data as SuggestedUser[]
    }
  })

  const { data: upcomingEvents, isLoading: loadingEvents } = useUpcomingEvents()

  return (
    <aside className="w-80 p-4 hidden lg:block">
      <div className="space-y-6">
        {/* Suggested Users */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Suggested Users</h3>
          <div className="space-y-4">
            {loadingUsers ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-16" />
                </div>
              ))
            ) : suggestedUsers?.map((user) => (
              <div key={user.id} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <Link href={`/profile/${user.id}` as Route}>
                    <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
                      <AvatarImage src={user.image_url || undefined} />
                      <AvatarFallback>{user.username?.[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div>
                    <Link href={`/profile/${user.id}` as Route}>
                      <p className="font-semibold hover:text-blue-600 transition-colors cursor-pointer">
                        {user.username}
                      </p>
                    </Link>
                    <p className="text-sm text-gray-500">Suggested for you</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Follow
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Events */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Upcoming Events</h3>
          <div className="space-y-4">
            {loadingEvents ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-24" />
                </div>
              ))
            ) : upcomingEvents?.map((event) => (
              <div key={event.id} className="space-y-1">
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-gray-500">{format(new Date(event.eventDate), 'PPP')}</p>
                {event.location && (
                  <p className="text-sm text-gray-500">{event.location}</p>
                )}
                {event.organizer && (
                  <Link href={`/profile/${event.organizer.id}` as Route} className="flex items-center space-x-2 mt-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={event.organizer.image_url || undefined} />
                      <AvatarFallback>{event.organizer.username?.[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <p className="text-sm text-gray-500">{event.organizer.username}</p>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </aside>
  )
} 