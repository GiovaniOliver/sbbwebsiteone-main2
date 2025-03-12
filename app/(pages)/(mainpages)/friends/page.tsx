'use client'

import { useState } from 'react'
import Layout from '@/app/components/usersmaincomponents/homefeed/Layout'
import { Card } from '@/app/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'
import { Button } from '@/app/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs'
import { useFriends } from '@/hooks/useFriends'
import { Skeleton } from '@/app/components/ui/skeleton'
import { format } from 'date-fns'
import { toast } from 'sonner'

export default function FriendsPage() {
  const {
    friends,
    friendRequests,
    loadingFriends,
    loadingRequests,
    sendRequest,
    respondToRequest,
    removeFriend
  } = useFriends()

  const handleAcceptRequest = async (requestId: string) => {
    try {
      await respondToRequest.mutateAsync({ requestId, status: 'ACCEPTED' })
      toast.success('Friend request accepted')
    } catch (error) {
      toast.error('Failed to accept friend request')
    }
  }

  const handleRejectRequest = async (requestId: string) => {
    try {
      await respondToRequest.mutateAsync({ requestId, status: 'REJECTED' })
      toast.success('Friend request rejected')
    } catch (error) {
      toast.error('Failed to reject friend request')
    }
  }

  const handleRemoveFriend = async (friendId: string) => {
    try {
      await removeFriend.mutateAsync(friendId)
      toast.success('Friend removed')
    } catch (error) {
      toast.error('Failed to remove friend')
    }
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold">Friends</h1>
            <p className="text-muted-foreground">
              Manage your friends and friend requests
            </p>
          </div>

          <Tabs defaultValue="friends">
            <TabsList>
              <TabsTrigger value="friends">Friends</TabsTrigger>
              <TabsTrigger value="requests">
                Requests {friendRequests?.length ? `(${friendRequests.length})` : ''}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="friends" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {loadingFriends ? (
                  [...Array(6)].map((_, i) => (
                    <Card key={i} className="p-4">
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-24 mb-2" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                    </Card>
                  ))
                ) : friends?.length === 0 ? (
                  <div className="col-span-full text-center text-muted-foreground">
                    No friends yet
                  </div>
                ) : (
                  friends?.map((friend) => (
                    <Card key={friend.id} className="p-4">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={friend.friend.image_url || undefined} />
                          <AvatarFallback>
                            {friend.friend.username?.[0]?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold">{friend.friend.username}</p>
                          <p className="text-sm text-muted-foreground">
                            Friends since {format(new Date(friend.created_at), 'PP')}
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveFriend(friend.friend_id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="requests" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {loadingRequests ? (
                  [...Array(3)].map((_, i) => (
                    <Card key={i} className="p-4">
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-24 mb-2" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                    </Card>
                  ))
                ) : friendRequests?.length === 0 ? (
                  <div className="col-span-full text-center text-muted-foreground">
                    No friend requests
                  </div>
                ) : (
                  friendRequests?.map((request) => (
                    <Card key={request.id} className="p-4">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={request.sender.image_url || undefined} />
                          <AvatarFallback>
                            {request.sender.username?.[0]?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold">{request.sender.username}</p>
                          <p className="text-sm text-muted-foreground">
                            Sent {format(new Date(request.created_at), 'PP')}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleAcceptRequest(request.id)}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRejectRequest(request.id)}
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  )
} 