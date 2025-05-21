import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/molecules/display/Avatar'
import { Button } from '@/app/components/atoms/buttons/Button'
import { Card } from '@/app/components/molecules/cards/Card'
import { Bookmark, MessageCircle, MoreHorizontal, Pencil, Share2, ThumbsUp, Trash2 } from 'lucide-react'
import { getSupabaseClient } from '@/hooks'
import Image from "next/image"
import Link from "next/link"
import { Route } from 'next'
import { useUser } from '@/hooks/useUser'
import { PostWithRelations } from '@/backend/lib/types/post'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/molecules/navigation/DropdownMenuPrimitive"
import { Textarea } from "@/app/components/atoms/inputs/Textarea"
import { useToast } from "@/app/components/shared"
import { ChangeEvent } from 'react'
import LikesList from './LikesList'
import CommentsModal from './CommentsModal'
import { cn } from '@/lib/utils'
import { Dialog, DialogTrigger } from '@/app/components/molecules/feedback/Dialog'

// Add custom CSS to hide duplicate buttons
const styles = `
  .post-card > div > .post-interaction-buttons ~ div {
    display: none !important;
  }
`;

interface PostLike {
  user_id: string;
  post_id?: string;
  created_at?: string;
}

interface PostProps {
  post: any; // Use any temporarily until we fix the interface properly
  onLike: (postId: string) => Promise<void>;
  onUnlike: (postId: string) => Promise<void>;
  onUpdate: (postId: string, content: string) => Promise<void>;
  onDelete: (postId: string) => Promise<void>;
  onBookmark: (postId: string) => Promise<void>;
  onRemoveBookmark: (postId: string) => Promise<void>;
}

export default function Post({ 
  post, 
  onLike, 
  onUnlike, 
  onUpdate,
  onDelete,
  onBookmark,
  onRemoveBookmark 
}: PostProps) {
  const { user } = useUser();
  const supabase = getSupabaseClient();
  const { toast } = useToast();
  // Safely check if user has liked the post
  const isLiked = user ? 
    Array.isArray(post.likes) && 
    post.likes.some((like: PostLike) => like.user_id === user.id) : 
    false;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content || '');
  const isAuthor = user?.id === post.author_id;

  // Check if post is already bookmarked when component loads
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (!user || !post?.id) return;
      
      try {
        const { data, error } = await supabase
          .from('bookmarks')
          .select()
          .eq('user_id', user.id)
          .eq('content_id', post.id)
          .eq('content_type', 'post')
          .maybeSingle();
        
        if (error) {
          // Handle database error more gracefully
          console.warn(`Bookmark status check failed: ${error.message || 'Unknown error'}`);
          return;
        }
        
        setIsBookmarked(!!data);
      } catch (err) {
        // Improved error handling with type checks
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.warn(`Error checking bookmark status: ${errorMessage}`);
      }
    };
    
    checkBookmarkStatus();
  }, [user, post?.id, supabase]);

  const handleLike = async () => {
    if (!user) return;
    try {
      if (isLiked) {
        await onUnlike(post.id);
      } else {
        await onLike(post.id);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to like/unlike post",
        variant: "destructive",
      });
    }
  };

  const handleBookmark = async () => {
    if (!user || !post?.id) {
      toast({
        title: "Authentication Required",
        description: "Please log in to bookmark posts",
        variant: "destructive",
      });
      return;
    }
    
    try {
      if (isBookmarked) {
        await onRemoveBookmark(post.id);
        setIsBookmarked(false);
        toast({
          title: "Post Removed",
          description: "Post removed from your bookmarks",
        });
      } else {
        await onBookmark(post.id);
        setIsBookmarked(true);
        toast({
          title: "Post Saved",
          description: "Post added to your bookmarks",
        });
      }
    } catch (error) {
      // Improved error handling with type checking
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.warn(`Bookmark error: ${errorMessage}`);
      toast({
        title: "Error",
        description: "Failed to update bookmark",
        variant: "destructive",
      });
    }
  };

  const handleEdit = async () => {
    try {
      await onUpdate(post.id, editContent);
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Post updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update post",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(post.id);
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    try {
      // Try using the Web Share API first
      if (navigator.share) {
        await navigator.share({
          title: `Post by ${post.users?.username || 'Anonymous'}`,
          text: post.content || '',
          url: `${window.location.origin}/post/${post.id}`,
        });
      } else {
        // Fallback for browsers that don't support the Web Share API
        // Copy the link to clipboard
        await navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
        toast({
          title: "Link copied",
          description: "Post link copied to clipboard!",
        });
      }
    } catch (error) {
      // Handle share error or fallback
      console.error('Share error:', error);
      toast({
        title: "Sharing failed",
        description: "Could not share this post. Try copying the URL manually.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (date: Date) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }).format(date);
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Calculate counts
  const likesCount = post.likes?.length || post.likes_count || 0;
  const commentsCount = post.comments?.length || post.comments_count || 0;

  const username = post.users?.username || 'Anonymous';
  const userInitial = username[0] || 'A';

  // Create event handler to prevent event propagation
  const stopPropagation = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <>
      {/* Add style to hide external buttons */}
      <style jsx global>{`
        .post-card + div:not(.post-card) {
          display: none !important;
        }
        .post-card + ul {
          display: none !important;
        }
      `}</style>
      
      <Card className="post-card mb-4 overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700" onClick={stopPropagation}>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href={`/profile/${post.author_id}` as Route}>
                <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
                  <AvatarImage src={post.users?.avatar_url || undefined} alt={username} />
                  <AvatarFallback className="bg-blue-600 text-white">{userInitial}</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <Link href={`/profile/${post.author_id}` as Route}>
                  <p className="font-semibold hover:text-blue-600 transition-colors cursor-pointer text-gray-900 dark:text-gray-100">
                    {username}
                  </p>
                </Link>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(new Date(post.created_at))}
                </p>
              </div>
            </div>
            {isAuthor && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2 text-gray-700 dark:text-gray-300">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <DropdownMenuItem onClick={() => setIsEditing(true)} className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDelete} className="text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          {isEditing ? (
            <div className="mt-4 space-y-4">
              <Textarea
                value={editContent}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setEditContent(e.target.value)}
                className="min-h-[100px] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditing(false)} className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                  Cancel
                </Button>
                <Button onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <p className="mt-2 whitespace-pre-wrap text-gray-800 dark:text-gray-200">{post.content || ''}</p>
          )}
        </div>

        {(post.type === 'image' || post.type === 'photo') && post.images && Array.isArray(post.images) && post.images.length > 0 && (
          <div className="relative aspect-auto">
            <Image
              src={post.images[0]}
              alt="Post image"
              width={800}
              height={600}
              className="w-full max-h-[600px] object-contain bg-gray-50 dark:bg-gray-900"
              priority={false}
              unoptimized={false}
              onError={(e) => {
                // Handle broken images gracefully
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = '/images/placeholder-image.svg'; // Use SVG placeholder
              }}
            />
          </div>
        )}

        {post.type === 'video' && post.images && Array.isArray(post.images) && post.images.length > 0 && (
          <div className="relative aspect-auto bg-black">
            <video
              src={post.images[0]}
              controls
              controlsList="nodownload"
              className="w-full max-h-[600px] object-contain"
              onError={(e) => {
                // Handle video error gracefully
                console.error('Video failed to load:', e);
                const target = e.target as HTMLVideoElement;
                target.classList.add('error');
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML += `
                    <div class="absolute inset-0 flex items-center justify-center bg-black/80 text-white text-center p-4">
                      <div>
                        <p>Video could not be loaded</p>
                        <p class="text-sm text-gray-400">The video might have been removed or is inaccessible</p>
                      </div>
                    </div>
                  `;
                }
              }}
            />
          </div>
        )}

        {post.type === 'article' && (
          <div className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-900 my-2">
            <h3 className="text-lg font-semibold">{post.title || 'Article'}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 my-2">
              {post.content?.substring(0, 150)}
              {(post.content?.length || 0) > 150 ? '...' : ''}
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              Read Full Article
            </Button>
          </div>
        )}

        {/* Post interaction buttons */}
        <div className="post-interaction-buttons flex items-center justify-between p-4">
          <div className="flex gap-4">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn(
                  "text-gray-700 dark:text-gray-300",
                  isLiked && "text-blue-600 dark:text-blue-400"
                )}
                onClick={handleLike}
              >
                <ThumbsUp className="mr-2 h-4 w-4" />
                <span>{likesCount}</span>
              </Button>
              
              {likesCount > 0 && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-0 px-1 h-6 text-gray-700 dark:text-gray-300 hover:bg-transparent">
                      <span className="text-xs underline">View</span>
                    </Button>
                  </DialogTrigger>
                  <LikesList postId={post.id} likesCount={likesCount} />
                </Dialog>
              )}
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-700 dark:text-gray-300" 
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  <span>{commentsCount}</span>
                </Button>
              </DialogTrigger>
              <CommentsModal postId={post.id} commentsCount={commentsCount || 0} />
            </Dialog>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-700 dark:text-gray-300" 
              onClick={handleShare}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "p-2 text-gray-700 dark:text-gray-300",
              isBookmarked && "text-yellow-600 dark:text-yellow-400"
            )}
            onClick={handleBookmark}
            disabled={!user}
            title={user ? (isBookmarked ? "Remove from bookmarks" : "Save to bookmarks") : "Log in to bookmark"}
          >
            <Bookmark className={isBookmarked ? "h-4 w-4 fill-current" : "h-4 w-4"} />
          </Button>
        </div>
      </Card>
    </>
  );
}
