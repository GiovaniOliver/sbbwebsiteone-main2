'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import CommentItem from './CommentItem'
import CommentComposer from './CommentComposer'
import { useInView } from 'react-intersection-observer'
import { Loader2 } from 'lucide-react'

type SortOption = 'recent' | 'likes' | 'relevant'
type FilterOption = 'all' | 'top-level' | 'following'

interface Comment {
  id: string
  content: string
  author: {
    id: string
    name: string
    avatar: string
  }
  createdAt: string
  editedAt?: string
  likes: number
  replies: Comment[]
  attachments?: {
    type: 'image' | 'gif' | 'video'
    url: string
  }[]
  reactions: {
    type: string
    count: number
    users: string[]
  }[]
}

interface CommentListProps {
  postId: string
  initialComments?: Comment[]
}

export default function CommentList({ postId, initialComments = [] }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [sortBy, setSortBy] = useState<SortOption>('recent')
  const [filterBy, setFilterBy] = useState<FilterOption>('all')
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const { ref, inView } = useInView({
    threshold: 0,
  })

  const loadMoreComments = async () => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    try {
      const lastComment = comments[comments.length - 1]
      const response = await fetch(
        `/api/posts/${postId}/comments?cursor=${lastComment?.id}&sort=${sortBy}&filter=${filterBy}`
      )
      const newComments = await response.json()

      if (newComments.length < 10) {
        setHasMore(false)
      }

      setComments(prev => [...prev, ...newComments])
    } catch (error) {
      console.error('Failed to load more comments:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSort = (value: SortOption) => {
    setSortBy(value)
    refreshComments()
  }

  const handleFilter = (value: FilterOption) => {
    setFilterBy(value)
    refreshComments()
  }

  const refreshComments = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/posts/${postId}/comments?sort=${sortBy}&filter=${filterBy}`
      )
      const newComments = await response.json()
      setComments(newComments)
      setHasMore(true)
    } catch (error) {
      console.error('Failed to refresh comments:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewComment = (newComment: Comment) => {
    setComments(prev => [newComment, ...prev])
  }

  return (
    <div className="space-y-4">
      <div className="sticky top-0 bg-white z-10 p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Comments</h3>
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={handleSort}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="likes">Most Liked</SelectItem>
                <SelectItem value="relevant">Most Relevant</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterBy} onValueChange={handleFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Comments</SelectItem>
                <SelectItem value="top-level">Top Level Only</SelectItem>
                <SelectItem value="following">Following Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <CommentComposer postId={postId} onCommentAdded={handleNewComment} />
      </div>

      <div className="space-y-4 p-4">
        {comments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            postId={postId}
            onCommentUpdated={refreshComments}
          />
        ))}

        {hasMore && (
          <div
            ref={ref}
            className="flex justify-center py-4"
          >
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            ) : (
              <Button
                variant="ghost"
                onClick={loadMoreComments}
                disabled={isLoading}
              >
                Load More Comments
              </Button>
            )}
          </div>
        )}

        {!hasMore && comments.length > 0 && (
          <p className="text-center text-gray-500 py-4">
            No more comments to load
          </p>
        )}

        {comments.length === 0 && !isLoading && (
          <p className="text-center text-gray-500 py-4">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  )
} 