import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { Button } from "../../ui/button"
import { Card } from "../../ui/card"
import { Bookmark, MessageCircle, MoreHorizontal, Share2, ThumbsUp } from 'lucide-react'
import Image from "next/image"
import { useUser } from '@/lib/hooks/useUser'
import { Post as PostType } from '@/lib/types'

interface PostProps {
  post: PostType;
  onLike: (postId: string) => Promise<void>;
  onUnlike: (postId: string) => Promise<void>;
}

export default function Post({ post, onLike, onUnlike }: PostProps) {
  const { user } = useUser();
  const isLiked = user ? post.likes.some(like => like.userId === user.id) : false;
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = async () => {
    if (!user) return;
    if (isLiked) {
      await onUnlike(post.id);
    } else {
      await onLike(post.id);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const formatDate = (dateString: string | Date) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
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
  const likesCount = post._count?.likes ?? post.likes.length;
  const commentsCount = post._count?.comments ?? 0;

  return (
    <Card className="mb-4 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={post.author.avatar || undefined} alt={post.author.name} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.author.name}</p>
              <p className="text-sm text-gray-500">
                {formatDate(post.createdAt)}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-2 whitespace-pre-wrap">{post.content}</p>
      </div>

      {post.type === 'image' && (post.mediaUrl || (post.mediaUrls && post.mediaUrls.length > 0)) && (
        <div className={`grid gap-1 ${post.mediaUrls && post.mediaUrls.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {post.mediaUrls ? post.mediaUrls.map((image, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={image}
                alt={`Post image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          )) : post.mediaUrl && (
            <div className="relative aspect-square">
              <Image
                src={post.mediaUrl}
                alt="Post image"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      )}

      {post.type === 'video' && (post.mediaUrl || (post.mediaUrls && post.mediaUrls[0])) && (
        <div className="relative aspect-video">
          <video
            src={post.mediaUrl || post.mediaUrls![0]}
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
          <Button variant="ghost" size="sm">
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

