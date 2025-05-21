/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useRef } from 'react'
import { Button } from '@/app/components/atoms/buttons/Button'
import { Textarea } from '@/app/components/atoms/inputs/Textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/molecules/display/Avatar'
import { useUser } from '@/hooks/useUser'
import { ImageIcon, SmileIcon, AtSign, Link2, Bold, Italic, Send } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import EmojiPicker from './EmojiPicker'
import { cn } from '@/backend/lib/utils/utils'

interface CommentComposerProps {
  postId: string
  parentId?: string
  onCommentAdded: (comment: any) => void
  autoFocus?: boolean
  placeholder?: string
}

export default function CommentComposer({
  postId,
  parentId,
  onCommentAdded,
  autoFocus = false,
  placeholder = "Write a comment..."
}: CommentComposerProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [attachments, setAttachments] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const { user } = useUser()
  const { toast } = useToast()

  const handleSubmit = async () => {
    if (!content.trim() && attachments.length === 0) return

    setIsSubmitting(true)
    try {
      // Handle file uploads first if any
      let mediaUrls: string[] = []
      if (attachments.length > 0) {
        const formData = new FormData()
        attachments.forEach(file => {
          formData.append('files', file)
        })
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        
        if (!uploadResponse.ok) throw new Error('Failed to upload files')
        const uploadedFiles = await uploadResponse.json()
        mediaUrls = uploadedFiles.urls
      }

      // Create the comment
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          parentId,
          mediaUrls,
        }),
      })

      if (!response.ok) throw new Error('Failed to post comment')
      
      const newComment = await response.json()
      onCommentAdded(newComment)
      
      // Reset form
      setContent('')
      setAttachments([])
      setPreviewUrls([])
      setShowEmojiPicker(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const newFiles = Array.from(files)
    const validFiles = newFiles.filter(file => 
      file.type.startsWith('image/') || 
      file.type.startsWith('video/') ||
      file.type === 'image/gif'
    )

    if (validFiles.length !== newFiles.length) {
      toast({
        title: "Invalid files",
        description: "Only images, GIFs, and videos are allowed.",
        variant: "destructive",
      })
    }

    setAttachments(prev => [...prev, ...validFiles])

    // Create preview URLs
    validFiles.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrls(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
    setPreviewUrls(prev => prev.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  if (!user) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage src={user.avatar_url || ''} alt={user.username || user.email} />
          <AvatarFallback className="bg-blue-600 text-white">{user.username?.[0] || user.email?.[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-3">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className="min-h-[100px] resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600"
          />

          {previewUrls.length > 0 && ( 
            <div className="grid grid-cols-2 gap-2">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="rounded-lg object-cover w-full h-32"
                  />
                  <Button
                    variant="destructive"
                    className="absolute top-1 right-1 h-6 w-6 p-0"
                    onClick={() => removeAttachment(index)}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm" 
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                onClick={() => fileInputRef.current?.click()}
                title="Attach media"
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm" 
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                title="Add emoji"
              >
                <SmileIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm" 
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                title="Mention user"
              >
                <AtSign className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm" 
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                title="Add link"
              >
                <Link2 className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              onClick={handleSubmit}
              disabled={(!content.trim() && attachments.length === 0) || isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2" />
                  Posting...
                </div>
              ) : (
                <div className="flex items-center">
                  <Send className="h-4 w-4 mr-2" />
                  Post
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileSelect}
        accept="image/*,video/*,image/gif"
        multiple
      />
      {showEmojiPicker && (
        <div className="relative mt-2">
          <div className="absolute z-10 bottom-full left-0">
            <EmojiPicker onEmojiSelect={(emoji) => {
              setContent(prev => prev + emoji)
              setShowEmojiPicker(false)
            }} />
          </div>
        </div>
      )}
    </div>
  )
} 