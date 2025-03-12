import { User } from "lib/types/user"

export type RSVPStatus = 'GOING' | 'MAYBE' | 'NOT_GOING'

// Database type with snake_case
export interface EventDb {
  id: string
  title: string
  description: string
  start_date: string
  end_date: string
  location: string | null
  is_virtual: boolean
  organizer_id: string
  max_attendees: number | null
  created_at: string
  updated_at: string
}

// Frontend type with camelCase
export interface Event {
  id: string
  title: string
  description: string
  startDate: Date
  endDate: Date
  location: string | null
  isVirtual: boolean
  organizerId: string
  maxAttendees: number | null
  createdAt: Date
  updatedAt: Date
  organizer?: {
    id: string
    username: string | null
    firstName: string | null
    lastName: string | null
    imageUrl: string | null
  }
}

// Database type with relations
export interface EventDbWithRelations extends EventDb {
  organizer: {
    id: string
    username: string | null
    first_name: string | null
    last_name: string | null
    image_url: string | null
  }
}

// Input type for creating events
export type CreateEventInput = Omit<EventDb, 'id' | 'created_at' | 'updated_at'>

// Mapping function from database to frontend type
export function toEvent(db: EventDbWithRelations): Event {
  return {
    id: db.id,
    title: db.title,
    description: db.description,
    startDate: new Date(db.start_date),
    endDate: new Date(db.end_date),
    location: db.location,
    isVirtual: db.is_virtual,
    organizerId: db.organizer_id,
    maxAttendees: db.max_attendees,
    createdAt: new Date(db.created_at),
    updatedAt: new Date(db.updated_at),
    organizer: {
      id: db.organizer.id,
      username: db.organizer.username,
      firstName: db.organizer.first_name,
      lastName: db.organizer.last_name,
      imageUrl: db.organizer.image_url
    }
  }
}

export interface EventWithRelations extends Omit<Event, 'organizer'> {
  attendees: Attendee[]
  rsvps: RSVP[]
  users: User[]
  organizer: {
    id: string
    username: string | null
    firstName: string | null
    lastName: string | null
    imageUrl: string | null
  }
}

export interface Attendee {
  id: string
  username: string
  firstName: string
  lastName: string
  imageUrl: string | null
}

export interface RSVP {
  id: string
  status: RSVPStatus
  createdAt: Date
  updatedAt: Date
}

export interface Organizer {
  id: string
  username: string
  firstName: string
  lastName: string
  imageUrl: string | null
}

