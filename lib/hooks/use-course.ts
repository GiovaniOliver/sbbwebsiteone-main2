import { useQuery } from '@tanstack/react-query'

interface Lesson {
  id: string
  title: string
  content: string
  videoUrl?: string
  duration: number
  order: number
}

interface Discussion {
  id: string
  title: string
  content: string
  replies: {
    id: string
    content: string
    user: {
      id: string
      firstName: string
      lastName: string
      avatar?: string
    }
  }[]
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

interface Course {
  id: string
  title: string
  description: string
  category: string
  level: string
  duration: number
  thumbnail?: string
  instructor: {
    id: string
    firstName: string
    lastName: string
    avatar?: string
  }
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

async function fetchCourse(courseId: string) {
  const response = await fetch(`/api/courses/${courseId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch course')
  }
  return response.json()
}

export function useCourse(courseId: string) {
  return useQuery<Course>({
    queryKey: ['course', courseId],
    queryFn: () => fetchCourse(courseId),
    gcTime: 5 * 60 * 1000, // 5 minutes
    staleTime: 1 * 60 * 1000, // 1 minute
  })
} 