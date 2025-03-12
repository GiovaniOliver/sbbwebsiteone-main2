import { z } from 'zod'

export const searchParamsSchema = z.object({
  query: z.string().min(1, 'Search query is required').max(100, 'Search query is too long'),
  type: z.enum(['all', 'users', 'videos', 'marketplace', 'shops', 'hashtags']).default('all'),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10)
})

export type SearchParams = z.infer<typeof searchParamsSchema>

export const searchResponseSchema = z.object({
  users: z.array(z.object({
    id: z.string(),
    username: z.string().nullable(),
    first_name: z.string().nullable(),
    last_name: z.string().nullable(),
    image_url: z.string().nullable(),
    _count: z.object({
      followers: z.number(),
      posts: z.number()
    })
  })).optional(),
  videos: z.array(z.object({
    id: z.string(),
    content: z.string(),
    type: z.string(),
    mediaUrl: z.string().nullable(),
    createdAt: z.date(),
    author: z.object({
      id: z.string(),
      username: z.string().nullable(),
      first_name: z.string().nullable(),
      last_name: z.string().nullable(),
      image_url: z.string().nullable()
    }),
    _count: z.object({
      likes: z.number(),
      comments: z.number()
    })
  })).optional(),
  marketplace: z.array(z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    price: z.number(),
    category: z.string(),
    condition: z.string(),
    images: z.array(z.string()),
    createdAt: z.date(),
    seller: z.object({
      id: z.string(),
      username: z.string().nullable(),
      first_name: z.string().nullable(),
      last_name: z.string().nullable(),
      image_url: z.string().nullable()
    })
  })).optional(),
  shops: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    logo: z.string().nullable(),
    coverImage: z.string().nullable(),
    category: z.string(),
    owner: z.object({
      id: z.string(),
      username: z.string().nullable(),
      first_name: z.string().nullable(),
      last_name: z.string().nullable(),
      image_url: z.string().nullable()
    }),
    _count: z.object({
      products: z.number(),
      followers: z.number()
    })
  })).optional(),
  hashtags: z.array(z.object({
    id: z.string(),
    name: z.string(),
    postCount: z.number()
  })).optional()
})

export type SearchResponse = z.infer<typeof searchResponseSchema> 