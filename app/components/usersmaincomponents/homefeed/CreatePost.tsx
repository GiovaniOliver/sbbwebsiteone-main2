'use client'

import { useState, useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/shared/avatar"
import { Button } from "../../ui/button"
import { Card } from "../../ui/card"
import { Textarea } from "../../ui/textarea"
import { Image as ImageIcon, Video, FileText, X } from 'lucide-react'
import { useUser } from '@/hooks/useUser'
import Image from 'next/image'

type PostType = 'text' | 'image' | 'video' | 'article';

// Utility function for class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

interface CreatePostProps {
  onPostCreated: () => void;
  createPost: (content: string, type: PostType, mediaUrl?: string) => Promise<void>;
}
export default function CreatePost({ onPostCreated, createPost }: CreatePostProps) {
  const { user, isLoading } = useUser()
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [postType, setPostType] = useState<PostType>('text');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMediaSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Set post type based on file type
    const fileType = file.type.split('/')[0];
    setPostType(fileType as 'image' | 'video');
    setMediaFile(file);

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setMediaPreview(previewUrl);
  };

  const removeMedia = () => {
    setMediaFile(null);
    setMediaPreview(null);
    setPostType('text');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!content.trim() && !mediaFile) return;
    
    try {
      setIsSubmitting(true);
      
      let mediaUrl = '';
      if (mediaFile) {
        // Here you would typically upload the file to your storage
        // and get back the URL. This is a placeholder.
        mediaUrl = URL.createObjectURL(mediaFile);
      }

      await createPost(content, postType, mediaUrl);
      
      // Reset form
      setContent('');
      removeMedia();
      onPostCreated();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !user) {
    return null;
  }

  return (
    <Card className="p-4">
      <div className="flex space-x-4">
        <Avatar>
          <AvatarImage src={user.avatar_url || undefined} />
          <AvatarFallback>{user.username?.[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-4">
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] resize-none"
          />
          
          {mediaPreview && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                onClick={removeMedia}
              >
                <X className="h-4 w-4" />
              </Button>
              {postType === 'video' ? (
                <video
                  src={mediaPreview}
                  controls
                  className="w-full rounded-lg max-h-[300px] object-contain bg-black"
                />
              ) : (
                <Image
                  src={mediaPreview}
                  alt="Preview"
                  width={800}
                  height={300}
                  className="w-full rounded-lg max-h-[300px] object-contain"
                />
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex space-x-2">
              <input
                type="file"
                accept="image/*,video/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleMediaSelect}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="text-gray-500 hover:text-gray-700"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Photo
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="text-gray-500 hover:text-gray-700"
              >
                <Video className="h-4 w-4 mr-2" />
                Video
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPostType('article')}
                className={cn(
                  "text-gray-500 hover:text-gray-700",
                  postType === 'article' && "bg-gray-100"
                )}
              >
                <FileText className="h-4 w-4 mr-2" />
                Article
              </Button>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || (!content.trim() && !mediaFile)}
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

