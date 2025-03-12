import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Button } from "@/app/components/ui/button"
import { Card } from "@/app/components/ui/card"
import { Bookmark, MessageCircle, MoreHorizontal, Pencil, Share2, ThumbsUp, Trash2 } from 'lucide-react'
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
} from "@/app/components/ui/dropdown-menu"
import { Textarea } from "@/app/components/ui/textarea"
import { toast } from "@/app/components/ui/use-toast"
import { ChangeEvent } from 'react'

interface PostProps {
  post: PostWithRelations;
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
  const isLiked = user ? post.likes.some((like) => like.userId === user.id) : false;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content || '');
  const isAuthor = user?.id === post.userId;

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
    if (!user) return;
    try {
      if (isBookmarked) {
        await onRemoveBookmark(post.id);
      } else {
        await onBookmark(post.id);
      }
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to bookmark/unbookmark post",
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
      await navigator.share({
        title: `Post by ${post.author.username || 'Anonymous'}`,
        text: post.content || '',
        url: `${window.location.origin}/post/${post.id}`,
      });
    } catch (error) {
      // Handle share error or fallback
      toast({
        title: "Error",
        description: "Failed to share post",
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
  const likesCount = post.likes.length;
  const commentsCount = post.comments?.length ?? 0;

  const username = post.author.username || 'Anonymous';
  const userInitial = username[0] || 'A';

  return (
    <Card className="mb-4 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href={`/profile/${post.userId}` as Route}>
              <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
                <AvatarImage src={post.author.imageUrl || undefined} alt={username} />
                <AvatarFallback>{userInitial}</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <Link href={`/profile/${post.author.id}` as Route}>
                <p className="font-semibold hover:text-blue-600 transition-colors cursor-pointer">
                  {username}
                </p>
              </Link>
              <p className="text-sm text-gray-500">
                {formatDate(new Date(post.createdAt))}
              </p>
            </div>
          </div>
          {isAuthor && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditing(true)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="text-red-600">
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
              className="min-h-[100px]"
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleEdit}>
                Save
              </Button>
            </div>
          </div>
        ) : (
          <p className="mt-2 whitespace-pre-wrap">{post.content || ''}</p>
        )}
      </div>

      {post.type === 'image' && post.mediaUrl && (
        <div className="relative aspect-square">
          <Image
            src={post.mediaUrl}
            alt="Post image"
            fill
            className="object-cover"
          />
        </div>
      )}

      {post.type === 'video' && post.mediaUrl && (
        <div className="relative aspect-video">
          <video
            src={post.mediaUrl}
            controls
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex items-center justify-between p-4">
        <div className="flex gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={isLiked ? 'text-blue-600' : ''}
            onClick={handleLike}
          >
            <ThumbsUp className="mr-2 h-4 w-4" />
            {likesCount} {likesCount === 1 ? 'Like' : 'Likes'}
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="mr-2 h-4 w-4" />
            {commentsCount} {commentsCount === 1 ? 'Comment' : 'Comments'}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={isBookmarked ? 'text-blue-600' : ''}
          onClick={handleBookmark}
        >
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
