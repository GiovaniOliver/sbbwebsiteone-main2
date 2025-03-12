import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from './types'

interface Lesson {
  id: string
  title: string
  content: string
  videoUrl?: string
  duration: number
  order: number
}

interface DiscussionReply {
  id: string
  content: string
  user: {
    id: string
    firstName: string
    lastName: string
    avatar?: string
  }
}

interface Discussion {
  id: string
  title: string
  content: string
  replies: DiscussionReply[]
}

interface Review {
  id: string
  rating: number
  comment?: string
  user: {
    id: string
    firstName: string
    lastName: string
    avatar?: string
  }
}

interface Instructor {
  id: string
  firstName: string
  lastName: string
  avatar?: string
}

export interface Course {
  id: string
  title: string
  description: string
  category: string
  level: string
  duration: number
  thumbnail?: string
  instructor: Instructor
  lessons: Lesson[]
  discussions: Discussion[]
  reviews: Review[]
  _count: {
    enrollments: number
    reviews: number
  }
  createdAt: string
  updatedAt: string
}

async function fetchCourse(courseId: string): Promise<Course> {
  const response = await fetch(`/api/courses/${courseId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch course')
  }
  const json = await response.json() as ApiResponse<Course>
  if (!json.success || !json.data) {
    throw new Error(json.error || 'Invalid response')
  }
  return json.data
}

export function useCourse(courseId: string) {
  return useQuery<Course>({
    queryKey: ['course', courseId],
    queryFn: () => fetchCourse(courseId),
    // QueryOptions:
    staleTime: 60_000, // 1 minute
    gcTime: 300_000, // 5 minutes
  })
}
