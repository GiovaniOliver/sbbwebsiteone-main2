'use client'

import { useState, useRef } from 'react'
import { Card } from "../../ui/card"
import { Button } from "../../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { ImageIcon, VideoIcon } from 'lucide-react'
import { useUser } from '@/lib/hooks/useUser'
import { usePosts } from '@/lib/hooks/usePosts'
import { PostType } from '@/lib/types'

interface CreatePostProps {
  onPostCreated: () => void;
}

export default function CreatePost({ onPostCreated }: CreatePostProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mediaUrl, setMediaUrl] = useState<string | null>(null)
  const [postType, setPostType] = useState<PostType>('text')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { user } = useUser()
  const { createPost } = usePosts()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() && !mediaUrl) return

    try {
      setIsSubmitting(true)
      await createPost(content, postType, mediaUrl || undefined)
      setContent('')
      setMediaUrl(null)
      setPostType('text')
      onPostCreated()
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload this file to a storage service
      // and get back a URL. For now, we'll create a local URL
      const url = URL.createObjectURL(file)
      setMediaUrl(url)
      setPostType(file.type.startsWith('image/') ? 'image' : 'video')
    }
  }

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = 'image/*'
      fileInputRef.current.click()
    }
  }

  const handleVideoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = 'video/*'
      fileInputRef.current.click()
    }
  }

  if (!user) return null

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarImage src={user.imageUrl} alt={user.fullName || ''} />
            <AvatarFallback>{user.fullName?.[0] || 'U'}</AvatarFallback>
          </Avatar>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="flex-1 resize-none border rounded-lg p-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {mediaUrl && (
          <div className="relative">
            {postType === 'image' ? (
              <img src={mediaUrl} alt="Upload preview" className="max-h-60 rounded-lg object-cover" />
            ) : (
              <video src={mediaUrl} className="max-h-60 rounded-lg" controls />
            )}
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => {
                setMediaUrl(null)
                setPostType('text')
              }}
            >
              Remove
            </Button>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileSelect}
        />

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleImageClick}
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              Photo
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleVideoClick}
            >
              <VideoIcon className="mr-2 h-4 w-4" />
              Video
            </Button>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting || (!content.trim() && !mediaUrl)}
          >
            Post
          </Button>
        </div>
      </form>
    </Card>
  )
}

