'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/molecules/feedback/Dialog'
import CommentList from './comments/CommentList'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/app/components/atoms/buttons/Button'

interface CommentsModalProps {
  postId: string
  commentsCount: number
  trigger?: React.ReactNode
}

export default function CommentsModal({ postId, commentsCount, trigger }: CommentsModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const defaultTrigger = (
    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
      <MessageCircle className="mr-2 h-4 w-4" />
      {commentsCount} {commentsCount === 1 ? 'Comment' : 'Comments'}
    </Button>
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden flex flex-col bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">Comments</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-auto">
          <CommentList postId={postId} />
        </div>
      </DialogContent>
    </Dialog>
  )
} 