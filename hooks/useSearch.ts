'use client'

import { useQuery } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '../backend/lib/types/supabase'

type SearchType = 'all' | 'users' | 'posts' | 'marketplace' | 'events' | 'hashtags'

interface SearchParams {
  query: string
  type?: SearchType
  page?: number
  limit?: number
}

interface SearchResponse {
  users?: Array<Database['public']['Tables']['users']['Row']>
  posts?: any[] // TODO: Add proper type once posts table is added to Database type
  marketplace?: any[] // TODO: Add proper type once marketplace table is added to Database type
  events?: any[] // TODO: Add proper type once events table is added to Database type
  hashtags?: string[]
}

export function useSearch(params: SearchParams) {
  const supabase = createClientComponentClient<Database>()

  return useQuery<SearchResponse, Error>({
    queryKey: ['search', params],
    queryFn: async () => {
      if (!params.query) {
        return { users: [], posts: [], marketplace: [], events: [], hashtags: [] }
      }

      const { type = 'all', page = 1, limit = 10 } = params
      let response: SearchResponse = {}

      // Search users
      if (type === 'all' || type === 'users') {
        const { data: users, error: usersError } = await supabase
          .from('users')
          .select()
          .ilike('username', `%${params.query}%`)
          .range((page - 1) * limit, page * limit - 1)

        if (usersError) throw new Error('Failed to search users')
        response.users = users
      }

      // Search posts
      if (type === 'all' || type === 'posts') {
        const { data: posts, error: postsError } = await supabase
          .from('posts')
          .select()
          .or(`content.ilike.%${params.query}%, title.ilike.%${params.query}%`)
          .range((page - 1) * limit, page * limit - 1)

        if (postsError) throw new Error('Failed to search posts')
        response.posts = posts
      }

      // Search marketplace
      if (type === 'all' || type === 'marketplace') {
        const { data: items, error: itemsError } = await supabase
          .from('marketplace')
          .select()
          .or(`title.ilike.%${params.query}%, description.ilike.%${params.query}%`)
          .range((page - 1) * limit, page * limit - 1)

        if (itemsError) throw new Error('Failed to search marketplace items')
        response.marketplace = items
      }

      // Search events
      if (type === 'all' || type === 'events') {
        const { data: events, error: eventsError } = await supabase
          .from('events')
          .select()
          .or(`title.ilike.%${params.query}%, description.ilike.%${params.query}%`)
          .range((page - 1) * limit, page * limit - 1)

        if (eventsError) throw new Error('Failed to search events')
        response.events = events
      }

      return response
    },
    enabled: Boolean(params.query),
    staleTime: 300_000, // 5 minutes
  })
}
