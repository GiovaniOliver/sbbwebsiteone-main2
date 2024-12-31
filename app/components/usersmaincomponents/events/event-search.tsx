'use client';

import { useState } from 'react';
import { useEventSearch } from '@/app/hooks/useEventSearch';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Calendar } from '@/app/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Checkbox } from '@/app/components/ui/checkbox';
import { format } from 'date-fns';
import { Loader2, Search } from 'lucide-react';

const EVENT_CATEGORIES = [
  'Workshop',
  'Meetup',
  'Conference',
  'Social',
  'Other',
];

export function EventSearch() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const { events, isLoading, filters, updateFilters, clearFilters } = useEventSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Search events..."
              value={filters.query || ''}
              onChange={(e) => updateFilters({ query: e.target.value })}
              className="w-full"
            />
          </div>
          <Select
            value={filters.category}
            onValueChange={(value) => updateFilters({ category: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {EVENT_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Start Date</label>
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
              disabled={(date) => date < new Date()}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">End Date</label>
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={setEndDate}
              disabled={(date) => date < (startDate || new Date())}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="online"
            checked={filters.online}
            onCheckedChange={(checked) => updateFilters({ online: checked as boolean })}
          />
          <label htmlFor="online" className="text-sm font-medium">
            Online events only
          </label>
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Search className="mr-2 h-4 w-4" />
            )}
            Search
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={clearFilters}
            disabled={isLoading}
          >
            Clear Filters
          </Button>
        </div>
      </form>

      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="rounded-lg border p-4 hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p className="text-sm text-gray-500">
              {format(new Date(event.startDate), 'PPP')}
            </p>
            <p className="text-sm text-gray-600 mt-2">{event.description}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {event._count.attendees} attendees
              </span>
              {event.isOnline && (
                <span className="text-sm text-blue-500">Online Event</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 