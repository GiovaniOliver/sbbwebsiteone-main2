'use client'

import { useState, useRef, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/molecules/display/Avatar'
import { Button } from '@/app/components/atoms/buttons/Button'
import { Card } from '@/app/components/molecules/cards/Card'
import { Textarea } from '@/app/components/atoms/inputs/Textarea'
import { Image as ImageIcon, Video, FileText, X, Loader2 } from 'lucide-react'
import { useUser } from '@/hooks/useUser'
import Image from 'next/image'
import { useToast } from '@/app/components/shared'
import useSupabaseStorage from '@/hooks/useSupabaseStorage'

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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // Initialize storage with appropriate bucket
  const storage = useSupabaseStorage({
    bucketName: 'post-media',
    autoCreateBucket: true
  });

  // Initialize storage bucket as early as possible
  useEffect(() => {
    const init = async () => {
      try {
        if (storage.initializeBucket) {
          console.log('Pre-initializing storage bucket');
          await storage.initializeBucket();
        }
      } catch (e) {
        console.warn('Failed to pre-initialize bucket:', e);
      }
    };
    
    init();
  }, [storage]);

  // Reset upload progress when file changes
  useEffect(() => {
    if (mediaFile) {
      setUploadProgress(0);
    }
  }, [mediaFile]);

  const handleMediaSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size - limit to 10MB
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please select a file smaller than 10MB",
      });
      return;
    }

    // Set post type based on file type
    const fileType = file.type.split('/')[0];
    if (fileType !== 'image' && fileType !== 'video') {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please select an image or video file",
      });
      return;
    }

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
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!content.trim() && !mediaFile) return;
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please sign in to create a post",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      let mediaUrl = '';
      if (mediaFile) {
        try {
          setIsUploading(true);
          // Upload file to Supabase storage
          console.log('Uploading file to storage:', { 
            userId: user.id, 
            fileType: mediaFile.type,
            fileSize: `${(mediaFile.size / 1024 / 1024).toFixed(2)} MB`
          });
          
          const { publicUrl } = await storage.uploadFile(user.id, mediaFile, {
            folder: postType === 'image' ? 'images' : 'videos'
          });
          
          console.log('File uploaded successfully, public URL:', publicUrl);
          mediaUrl = publicUrl;
          setIsUploading(false);
        } catch (uploadError) {
          console.error('Error uploading file:', uploadError);
          
          // Check for specific storage errors
          let errorMessage = "Failed to upload media. Please try again.";
          
          if (uploadError instanceof Error) {
            // Handle specific error types
            if (uploadError.message.includes('row-level security policy')) {
              errorMessage = "Permission denied: You don't have access to upload files. Please verify your account.";
              console.log('RLS error detected, user needs storage permissions');
            } else if (uploadError.message.includes('storage is not ready')) {
              errorMessage = "Storage service is initializing. Please try again in a moment.";
            } else if (uploadError.message.includes('file size')) {
              errorMessage = "File is too large. Maximum size is 10MB.";
            } else if (uploadError.message.includes('mime type')) {
              errorMessage = "File type not supported. Please upload an image or video file.";
            }
          }
          
          toast({
            variant: "destructive",
            title: "Upload failed",
            description: errorMessage
          });
          
          setIsUploading(false);
          setIsSubmitting(false);
          return;
        }
      }

      // Log the data being sent to createPost
      console.log('Creating post with:', { content, postType, mediaUrl });
      
      // Attempt to create the post
      await createPost(content, postType, mediaUrl);
      
      // Reset form
      setContent('');
      removeMedia();
      onPostCreated();
      
      toast({
        title: "Post created",
        description: "Your post has been published successfully!",
      });
    } catch (error) {
      console.error('Error creating post:', error);
      let errorMessage = "Could not create post. Please try again.";
      
      // Get more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('row-level security') || error.message.includes('permission denied')) {
          errorMessage = "Permission error: You don't have access to create posts. Please verify your account.";
        } else if (error.message.includes('not authenticated')) {
          errorMessage = "You must be logged in to create posts. Please sign in and try again.";
        } else if (error.message.includes('Failed to create user profile')) {
          errorMessage = "There was an issue with your user profile. Please go to settings to complete your profile.";
        }
        
        // Log detailed error for debugging
        console.log('Error details:', {
          message: error.message,
          stack: error.stack,
          name: error.name
        });
      }
      
      toast({
        variant: "destructive",
        title: "Post creation failed",
        description: errorMessage,
      });
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
          <AvatarImage src={(user as any).avatar_url || undefined} />
          <AvatarFallback>{((user as any).username || '')?.charAt(0)?.toUpperCase()}</AvatarFallback>
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
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-10"
                onClick={removeMedia}
                disabled={isSubmitting}
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
              
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/30 h-6">
                  <div 
                    className="h-full bg-blue-500" 
                    style={{ width: `${uploadProgress}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-white text-xs">
                    {uploadProgress}%
                  </div>
                </div>
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
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.accept = "image/*";
                    fileInputRef.current.click();
                  }
                }}
                className="text-gray-500 hover:text-gray-700"
                disabled={isSubmitting}
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Photo
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.accept = "video/*";
                    fileInputRef.current.click();
                  }
                }}
                className="text-gray-500 hover:text-gray-700"
                disabled={isSubmitting}
              >
                <Video className="h-4 w-4 mr-2" />
                Video
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setPostType('article')}
                className={cn(
                  "text-gray-500 hover:text-gray-700",
                  postType === 'article' && "bg-gray-100"
                )}
                disabled={isSubmitting}
              >
                <FileText className="h-4 w-4 mr-2" />
                Article
              </Button>
            </div>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || isUploading || (!content.trim() && !mediaFile)}
            >
              {isSubmitting || isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isUploading ? 'Uploading...' : 'Posting...'}
                </>
              ) : (
                'Post'
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

