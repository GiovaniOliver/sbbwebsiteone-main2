'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/shared/avatar'
import { Button } from '../../../ui/shared/button'
import { MessageCircle, MoreHorizontal, ThumbsUp } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { useUser } from '@/app/hooks/useUser'
import { useToast } from '@/app/components/ui/use-toast'
import CommentComposer from './CommentComposer'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'

interface CommentItemProps {
  comment: {
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
    replies: any[]
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
  postId: string
  onCommentUpdated: () => void
  depth?: number
}

export default function CommentItem({ comment, postId, onCommentUpdated, depth = 0 }: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false)
  const [showReplies, setShowReplies] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const { data: user } = useUser()
  const { toast } = useToast()

  const handleReply = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to reply to comments.",
        variant: "destructive",
      })
      return
    }
    setIsReplying(!isReplying)
  }

  const handleReplySubmitted = (newReply: any) => {
    setIsReplying(false)
    onCommentUpdated()
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}/comments/${comment.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete comment')
      
      onCommentUpdated()
      toast({
        title: "Success",
        description: "Comment deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete comment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleReaction = async (reactionType: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}/comments/${comment.id}/reactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: reactionType }),
      })

      if (!response.ok) throw new Error('Failed to add reaction')
      
      onCommentUpdated()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add reaction. Please try again.",
        variant: "destructive",
      })
    }
  }

  const formatTimestamp = (date: string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true })
  }

  return (
    <div className={`pl-${depth * 8}`}>
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage src={comment.author.image_url} alt={comment.author.username} />
          <AvatarFallback>{comment.author.username?.[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="font-semibold">{comment.author.name}</span>
                <span className="text-sm text-gray-500 ml-2">
                  {formatTimestamp(comment.createdAt)}
                  {comment.editedAt && ' (edited)'}
                </span>
              </div>
              {user?.id === comment.author.id && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setIsEditing(true)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={handleDelete}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            <p className="whitespace-pre-wrap">{comment.content}</p>

            {comment.attachments && comment.attachments.length > 0 && (
              <div className="mt-2 grid grid-cols-2 gap-2">
                {comment.attachments.map((attachment, index) => (
                  <div key={index} className="relative aspect-square">
                    {attachment.type === 'video' ? (
                      <video
                        src={attachment.url}
                        controls
                        className="rounded-lg w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={attachment.url}
                        alt={`Attachment ${index + 1}`}
                        fill
                        className="rounded-lg object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mt-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-blue-600"
              onClick={() => handleReaction('like')}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              {comment.likes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500"
              onClick={handleReply}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              Reply
            </Button>
          </div>

          {isReplying && (
            <div className="mt-3">
              <CommentComposer
                postId={postId}
                parentId={comment.id}
                onCommentAdded={handleReplySubmitted}
                autoFocus
                placeholder={`Reply to ${comment.author.name}...`}
              />
            </div>
          )}

          {comment.replies.length > 0 && (
            <div className="mt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReplies(!showReplies)}
              >
                {showReplies ? 'Hide' : 'Show'} {comment.replies.length}{' '}
                {comment.replies.length === 1 ? 'reply' : 'replies'}
              </Button>

              {showReplies && (
                <div className="mt-3 space-y-3">
                  {comment.replies.map((reply) => (
                    <CommentItem
                      key={reply.id}
                      comment={reply}
                      postId={postId}
                      onCommentUpdated={onCommentUpdated}
                      depth={depth + 1}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 