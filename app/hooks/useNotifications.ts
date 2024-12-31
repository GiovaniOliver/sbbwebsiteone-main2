import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useUser } from './useUser';
import { NotificationType } from '@prisma/client';

export type Notification = {
  id: string;
  type: NotificationType;
  message: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  priority: string;
  metadata?: any;
  expiresAt?: string;
  userId: string;
  fromUserId?: string;
  eventId?: string;
  fromUser?: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  event?: {
    id: string;
    name: string;
    date: string;
  };
};

export const useNotifications = (options?: {
  type?: NotificationType;
  unreadOnly?: boolean;
}) => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const wsRef = useRef<WebSocket>();

  // Set up WebSocket connection
  useEffect(() => {
    if (!user) return;

    const connectWebSocket = async () => {
      try {
        const response = await axios.get('/api/socket/notifications');
        const { wsUrl } = response.data;

        wsRef.current = new WebSocket(wsUrl);

        wsRef.current.onmessage = (event) => {
          const notification = JSON.parse(event.data);
          queryClient.setQueryData(['notifications'], (old: Notification[] = []) => {
            return [notification, ...old];
          });
        };

        wsRef.current.onclose = () => {
          // Attempt to reconnect after a delay
          setTimeout(connectWebSocket, 5000);
        };
      } catch (error) {
        console.error('Failed to connect to notification WebSocket:', error);
      }
    };

    connectWebSocket();

    return () => {
      wsRef.current?.close();
    };
  }, [user, queryClient]);

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['notifications', options],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (options?.type) params.append('type', options.type);
      if (options?.unreadOnly) params.append('unreadOnly', 'true');
      
      const response = await axios.get(`/api/notifications?${params.toString()}`);
      return response.data;
    },
    enabled: !!user,
  });

  const { mutate: markAsRead } = useMutation({
    mutationFn: async (notificationId: string) => {
      const response = await axios.patch('/api/notifications', { 
        notificationId,
        read: true
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const { mutate: markAsUnread } = useMutation({
    mutationFn: async (notificationId: string) => {
      const response = await axios.patch('/api/notifications', { 
        notificationId,
        read: false
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const { mutate: deleteNotification } = useMutation({
    mutationFn: async (notificationId: string) => {
      await axios.delete(`/api/notifications?id=${notificationId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const { mutate: clearReadNotifications } = useMutation({
    mutationFn: async () => {
      await axios.delete('/api/notifications');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const { mutate: createNotification } = useMutation({
    mutationFn: async (data: {
      type: NotificationType;
      fromUserId?: string;
      eventId?: string;
      message: string;
      priority?: string;
      metadata?: any;
      expiresAt?: string;
    }) => {
      const response = await axios.post('/api/notifications', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  return {
    notifications,
    isLoading,
    markAsRead,
    markAsUnread,
    deleteNotification,
    clearReadNotifications,
    createNotification,
  };
}; 