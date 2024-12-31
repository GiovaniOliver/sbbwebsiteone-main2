import { Post, User } from '@prisma/client'

export interface ExtendedPost extends Post {
  [x: string]: any
  author: User
  likedBy: User[]
}

export interface UserProfile extends User {
  posts: Post[]
  bookmarks: Post[]
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface SearchParams {
  query?: string
  category?: string
  tags?: string[]
}

export interface Event {
  id: string
  name: string
  description?: string
  date: string
  location?: string
  isVirtual: boolean
  link?: string
  organizer: {
    id: string
    username: string
    avatar?: string
  }
  _count?: {
    attendees: number
  }
}

export interface CreateEventInput {
  name: string
  description?: string
  date: string
  location?: string
  isVirtual?: boolean
  link?: string
}

export interface EventsResponse {
  data: Event[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
} 