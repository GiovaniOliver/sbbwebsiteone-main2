import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/molecules/feedback/Dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/molecules/display/Avatar'
import { Button } from '@/app/components/atoms/buttons/Button'
import { Input } from '@/app/components/atoms/inputs/Input'
import { Skeleton } from '@/app/components/atoms/feedback/Skeleton'
import { Search, MessageSquare } from 'lucide-react'
import { useUser } from '@/hooks/useUser'
import { getSupabaseClient } from '@/hooks/useSupabase'
import Link from 'next/link'
import { Route } from 'next'

interface LikesListProps {
  postId: string
  likesCount: number
  trigger?: React.ReactNode
}

interface User {
  id: string
  username: string
  first_name: string
  last_name: string
  avatar_url: string | null
  role?: string
  is_followed?: boolean
  mutual_connections?: number
}

export default function LikesList({ postId, likesCount, trigger }: LikesListProps) {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useUser()
  const supabase = getSupabaseClient()
  
  const PAGE_SIZE = 10

  useEffect(() => {
    if (isOpen) {
      fetchLikes()
    }
  }, [isOpen, page, postId])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(users)
    } else {
      const filtered = users.filter(
        user => 
          user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredUsers(filtered)
    }
  }, [searchQuery, users])

  const fetchLikes = async () => {
    if (!postId) return
    
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('post_likes')
        .select(`
          user_id,
          profiles:user_id (
            id, 
            username, 
            first_name, 
            last_name, 
            avatar_url,
            role
          )
        `)
        .eq('post_id', postId)
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error fetching likes:', error)
        return
      }
      
      if (data && data.length > 0) {
        // Convert data to User array with proper type checking
        const fetchedUsers: User[] = []
        
        for (const item of data) {
          // Safely access nested profile properties
          const profile = item?.profiles as Record<string, any> | null
          
          if (profile) {
            fetchedUsers.push({
              id: String(profile.id || item.user_id || ''),
              username: String(profile.username || 'Unknown'),
              first_name: String(profile.first_name || ''),
              last_name: String(profile.last_name || ''),
              avatar_url: profile.avatar_url || null,
              role: profile.role,
              is_followed: false,
              mutual_connections: 0
            })
          } else if (item && item.user_id) {
            // Fallback if profile data is missing
            fetchedUsers.push({
              id: String(item.user_id),
              username: 'Unknown',
              first_name: '',
              last_name: '',
              avatar_url: null,
              is_followed: false,
              mutual_connections: 0
            })
          }
        }
        
        // Check if the current user follows these users
        if (user && fetchedUsers.length > 0) {
          const { data: followData } = await supabase
            .from('follows')
            .select('following_id')
            .eq('follower_id', user.id)
            .in('following_id', fetchedUsers.map(u => u.id))
          
          if (followData) {
            const followingIds = followData.map((f: any) => f.following_id)
            fetchedUsers.forEach(u => {
              u.is_followed = followingIds.includes(u.id)
            })
          }
          
          // For simplicity, we're setting a mock mutual connections value
          // In a real app, you'd query for actual mutual connections
          fetchedUsers.forEach(u => {
            u.mutual_connections = Math.floor(Math.random() * 5)
          })
        }
        
        if (page === 0) {
          setUsers(fetchedUsers)
        } else {
          setUsers(prev => [...prev, ...fetchedUsers])
        }
        
        setHasMore(data.length === PAGE_SIZE)
      } else {
        if (page === 0) {
          setUsers([])
        }
        setHasMore(false)
      }
    } catch (error) {
      console.error('Error in fetchLikes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFollow = async (userId: string) => {
    if (!user) return
    
    try {
      // Check if already following
      const { data } = await supabase
        .from('follows')
        .select()
        .eq('follower_id', user.id)
        .eq('following_id', userId)
        .single()
      
      if (data) {
        // Unfollow
        await supabase
          .from('follows')
          .delete()
          .eq('follower_id', user.id)
          .eq('following_id', userId)
        
        setUsers(users.map(u => 
          u.id === userId ? { ...u, is_followed: false } : u
        ))
      } else {
        // Follow
        await supabase
          .from('follows')
          .insert({
            follower_id: user.id,
            following_id: userId
          })
        
        setUsers(users.map(u => 
          u.id === userId ? { ...u, is_followed: true } : u
        ))
      }
    } catch (error) {
      console.error('Error toggling follow:', error)
    }
  }

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage(prev => prev + 1)
    }
  }

  const defaultTrigger = (
    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-sm text-gray-500">
      {likesCount} {likesCount === 1 ? 'Like' : 'Likes'}
    </Button>
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>People who liked this post</DialogTitle>
        </DialogHeader>
        
        <div className="relative mt-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="mt-4 max-h-[60vh] overflow-y-auto">
          {isLoading && page === 0 ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <UserItemSkeleton key={i} />
              ))}
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              {searchQuery ? 'No users found matching your search' : 'No likes yet'}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredUsers.map(user => (
                <UserItem 
                  key={user.id} 
                  user={user} 
                  onFollow={() => handleFollow(user.id)}
                  currentUserId={user?.id}
                />
              ))}
              {isLoading && page > 0 && (
                Array.from({ length: 2 }).map((_, i) => (
                  <UserItemSkeleton key={`loading-${i}`} />
                ))
              )}
              {hasMore && !isLoading && (
                <Button 
                  variant="ghost" 
                  className="w-full mt-2" 
                  onClick={loadMore}
                >
                  Load more
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface UserItemProps {
  user: User
  onFollow: () => void
  currentUserId?: string
}

function UserItem({ user, onFollow, currentUserId }: UserItemProps) {
  const displayName = user.first_name && user.last_name 
    ? `${user.first_name} ${user.last_name}` 
    : user.username
  
  const isCurrentUser = user.id === currentUserId
  
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <Link href={`/profile/${user.id}` as Route}>
          <Avatar>
            <AvatarImage src={user.avatar_url || undefined} alt={displayName} />
            <AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <Link href={`/profile/${user.id}` as Route} className="font-medium hover:underline">
            {displayName}
          </Link>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>@{user.username}</span>
            {user.role && (
              <span className="ml-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">
                {user.role}
              </span>
            )}
          </div>
          {user.mutual_connections && user.mutual_connections > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <MessageSquare className="h-3 w-3" />
              <span>{user.mutual_connections} mutual connection{user.mutual_connections > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      </div>
      {!isCurrentUser && (
        <Button
          variant={user.is_followed ? "outline" : "primary"}
          size="sm"
          onClick={onFollow}
          className="h-8 text-xs"
        >
          {user.is_followed ? 'Following' : 'Follow'}
        </Button>
      )}
    </div>
  )
}

function UserItemSkeleton() {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div>
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24 mt-1" />
        </div>
      </div>
      <Skeleton className="h-8 w-16" />
    </div>
  )
} 