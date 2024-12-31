'use client'

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from "./ui/skeleton"
import { useUpcomingEvents } from "@/lib/hooks/useEvents"

export default function RightSidebar() {
  const { data: suggestedUsers, isLoading: loadingUsers } = useQuery({
    queryKey: ['suggestedUsers'],
    queryFn: async () => {
      const response = await fetch('/api/users/suggested')
      if (!response.ok) throw new Error('Failed to fetch suggested users')
      const data = await response.json()
      return data.data
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
            ) : suggestedUsers?.map((user: any) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={user.avatar || undefined} />
                    <AvatarFallback>{user.username?.[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.username}</p>
                    <p className="text-sm text-gray-500">
                      {user.userType?.toLowerCase().replace('_', ' ')}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Follow</Button>
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
                <p className="font-medium">{event.name}</p>
                <p className="text-sm text-gray-500">{event.date}</p>
                {event.location && (
                  <p className="text-sm text-gray-500">{event.location}</p>
                )}
                {event.organizer && (
                  <div className="flex items-center space-x-2 mt-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={event.organizer.avatar} />
                      <AvatarFallback>{event.organizer.username[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <p className="text-sm text-gray-500">{event.organizer.username}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </aside>
  )
}

