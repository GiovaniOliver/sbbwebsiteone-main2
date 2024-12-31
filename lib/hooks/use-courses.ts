import { useQuery } from '@tanstack/react-query'

interface Course {
  id: string
  title: string
  description: string
  category: string
  level: string
  duration: number
  thumbnail?: string
  instructorId: string
  createdAt: string
  updatedAt: string
}

interface UseCoursesOptions {
  category?: string
  level?: string
  search?: string
}

async function fetchCourses(options: UseCoursesOptions = {}) {
  const params = new URLSearchParams()
  if (options.category) params.append('category', options.category)
  if (options.level) params.append('level', options.level)
  if (options.search) params.append('search', options.search)

  const response = await fetch(`/api/courses?${params.toString()}`)
  if (!response.ok) {
    throw new Error('Failed to fetch courses')
  }
  return response.json()
}

export function useCourses(options: UseCoursesOptions = {}) {
  return useQuery<Course[]>({
    queryKey: ['courses', options],
    queryFn: () => fetchCourses(options),
    gcTime: 5 * 60 * 1000, // 5 minutes
    staleTime: 1 * 60 * 1000, // 1 minute
  })
} 