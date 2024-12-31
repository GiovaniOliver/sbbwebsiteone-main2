import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

export type EventSearchFilters = {
  query?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  online?: boolean;
};

export const useEventSearch = (initialFilters: EventSearchFilters = {}) => {
  const [filters, setFilters] = useState<EventSearchFilters>(initialFilters);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events', 'search', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.query) params.append('query', filters.query);
      if (filters.category) params.append('category', filters.category);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      if (filters.online) params.append('online', String(filters.online));

      const response = await axios.get(`/api/events/search?${params.toString()}`);
      return response.data;
    },
  });

  const updateFilters = (newFilters: Partial<EventSearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  return {
    events,
    isLoading,
    filters,
    updateFilters,
    clearFilters,
  };
}; 