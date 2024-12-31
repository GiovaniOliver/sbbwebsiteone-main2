'use client'

import { useState } from 'react'
import { Bell } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import { useNotifications, Notification } from '@/lib/hooks/useNotifications'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { Badge } from '@/app/components/ui/badge'
import { useUser } from '@/lib/hooks/useUser'
import type { Route } from 'next'

export function NotificationDropdown() {
  const { notifications, unreadCount, isLoading, markAsRead } = useNotifications()
  const [isOpen, setIsOpen] = useState(false)

  const handleMarkAsRead = () => {
    const unreadIds = notifications
      .filter((n: Notification) => !n.read)
      .map((n: Notification) => n.id)
    if (unreadIds.length > 0) {
      unreadIds.forEach((id: string) => markAsRead(id))
    }
  }

  const getNotificationLink = (notification: Notification): Route => {
    switch (notification.type) {
      case 'FOLLOW':
        return `/profile/${notification.fromUserId}` as Route
      case 'LIKE':
      case 'COMMENT':
        return `/posts/${notification.metadata?.postId || ''}` as Route
      case 'EVENT_REMINDER':
      case 'EVENT_RSVP':
      case 'EVENT_UPDATE':
        return `/events/${notification.eventId || ''}` as Route
      default:
        return '/' as Route
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-sm font-semibold">Notifications</h2>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAsRead}
              className="text-xs"
            >
              Mark all as read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[400px]">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-gray-500">
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500">
              No notifications yet
            </div>
          ) : (
            notifications.map((notification: Notification) => (
              <DropdownMenuItem key={notification.id} className="p-0">
                <Link
                  href={getNotificationLink(notification)}
                  className={`flex items-start gap-4 p-4 w-full hover:bg-accent ${
                    !notification.read ? 'bg-accent/50' : ''
                  }`}
                  onClick={() => {
                    if (!notification.read) {
                      markAsRead(notification.id)
                    }
                    setIsOpen(false)
                  }}
                >
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 