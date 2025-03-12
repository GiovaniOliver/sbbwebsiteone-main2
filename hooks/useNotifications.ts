'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '../backend/lib/types/supabase'

// TODO: Add these to Database type
interface NotificationDb {
  id: string
  user_id: string
  type: 'FRIEND_REQUEST' | 'EVENT_INVITE' | 'EVENT_UPDATE' | 'FRIEND_ACCEPTED'
  content: string
  read: boolean
  created_at: string
  updated_at: string
  reference_id?: string
}

interface Notification {
  id: string
  userId: string
  type: 'FRIEND_REQUEST' | 'EVENT_INVITE' | 'EVENT_UPDATE' | 'FRIEND_ACCEPTED'
  content: string
  read: boolean
  createdAt: string
  updatedAt: string
  referenceId?: string
}

const toNotification = (notification: NotificationDb): Notification => ({
  id: notification.id,
  userId: notification.user_id,
  type: notification.type,
  content: notification.content,
  read: notification.read,
  createdAt: notification.created_at,
  updatedAt: notification.updated_at,
  referenceId: notification.reference_id,
})

export function useNotifications() {
  const supabase = createClientComponentClient<Database>()
  const queryClient = useQueryClient()

  const {
    data: notifications,
    isLoading,
    error,
  } = useQuery<Notification[], Error>({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select()
        .order('created_at', { ascending: false })

      if (error) throw new Error('Failed to fetch notifications')
      return data.map(toNotification)
    },
  })

  const markAsRead = useMutation({
    mutationFn: async (notificationId: string) => {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId)

      if (error) throw new Error('Failed to mark notification as read')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })

  const markAllAsRead = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('read', false)

      if (error) throw new Error('Failed to mark all notifications as read')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })

  return {
    notifications,
    isLoading,
    error,
    markAsRead: markAsRead.mutate,
    markAllAsRead: markAllAsRead.mutate,
    isMarkingAsRead: markAsRead.isPending,
    isMarkingAllAsRead: markAllAsRead.isPending,
  }
}
