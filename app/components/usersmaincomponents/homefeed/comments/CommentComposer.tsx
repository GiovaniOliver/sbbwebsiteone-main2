/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useRef } from 'react'
import { Button } from '../../../ui/shared/button'
import { Textarea } from '../../../ui/shared/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/shared/avatar'
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
    <div className="bg-white rounded-lg p-4">
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage src={user.avatar_url || ''} alt={user.username || user.email} />
          <AvatarFallback>{user.username?.[0] || user.email?.[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-3">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className="min-h-[100px] resize-none"
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
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6"
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
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                title="Attach media"
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                title="Add emoji"
              >
                <SmileIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setContent(prev => `${prev}@`)}
                title="Mention user"
              >
                <AtSign className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setContent(prev => `${prev}[]()`)}
                title="Add link"
              >
                <Link2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setContent(prev => `**${prev}**`)}
                title="Bold"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setContent(prev => `*${prev}*`)}
                title="Italic"
              >
                <Italic className="h-4 w-4" />
              </Button>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || (!content.trim() && attachments.length === 0)}
              className={cn(
                "gap-2",
                isSubmitting && "opacity-50 cursor-not-allowed"
              )}
            >
              {isSubmitting ? "Posting..." : "Post"}
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {showEmojiPicker && (
            <div className="absolute mt-2">
              <EmojiPicker
                onEmojiSelect={(emoji: string) => {
                  setContent(prev => prev + emoji)
                  setShowEmojiPicker(false)
                }}
              />
            </div>
          )}
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*,video/*,.gif"
        multiple
        onChange={handleFileSelect}
        title="Upload media"
        aria-label="Upload media"
      />
    </div>
  )
} 