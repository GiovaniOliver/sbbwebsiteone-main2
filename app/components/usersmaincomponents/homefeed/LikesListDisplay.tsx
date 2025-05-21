import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/molecules/cards/Card'
import { Button } from '@/app/components/atoms/buttons/Button'
import { ThumbsUp } from 'lucide-react'
import LikesList from './LikesList'

export default function LikesListDisplay() {
  const [likesCount, setLikesCount] = useState(42)
  
  // This is a sample post ID. In a real scenario, you'd use an actual post ID from your database
  const examplePostId = '7f8d1f9e-9c22-4b9c-8c13-5d3e22f63a12'
  
  return (
    <Card className="max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Likes List Component Demo</CardTitle>
        <CardDescription>
          This demonstrates the likes list component functionality for viewing users who liked a post
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Example Post</h3>
          <p className="text-sm text-gray-600 mb-4">
            This is an example post content. The likes functionality is shown below.
          </p>
          
          <div className="flex items-center space-x-2 mt-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center"
              onClick={() => setLikesCount(prev => prev + 1)}
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              <span>Like</span>
            </Button>
            
            <div className="text-sm text-gray-500">
              <LikesList 
                postId={examplePostId}
                likesCount={likesCount}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium">Component Features</h3>
          <ul className="list-disc list-inside text-sm space-y-2">
            <li>Opens a modal dialog showing users who liked a post</li>
            <li>Supports searching users by name or username</li>
            <li>Shows user avatar, name, username, and any role badges</li>
            <li>Displays mutual connections when available</li>
            <li>Follow/Unfollow functionality included</li>
            <li>Pagination with "Load more" button</li>
            <li>Loading states with skeleton placeholders</li>
            <li>Responsive design works on mobile and desktop</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
} 