'use client'

import Layout from '@/app/components/usersmaincomponents/homefeed/Layout'
import { Card } from '@/app/components/usersmaincomponents/homefeed/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/usersmaincomponents/homefeed/ui/avatar'
import { Button } from '@/app/components/usersmaincomponents/homefeed/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/usersmaincomponents/homefeed/ui/tabs'
import { useToast } from '@/app/components/ui/use-toast'

// Test data
const friendRequests = [
  {
    id: 1,
    name: "Emma Thompson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    mutualFriends: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    mutualFriends: 3
  }
]

const friendsList = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    mutualFriends: 12
  },
  {
    id: 2,
    name: "Sarah Wilson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    mutualFriends: 8
  }
]

const suggestions = [
  {
    id: 1,
    name: "Rachel Green",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    mutualFriends: 7
  },
  {
    id: 2,
    name: "James Wilson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    mutualFriends: 4
  }
]

export default function FriendsPage() {
  const { toast } = useToast()

  const handleAcceptRequest = (friendId: number) => {
    toast({
      title: "Friend request accepted"
    })
  }

  const handleAddFriend = (friendId: number) => {
    toast({
      title: "Friend request sent"
    })
  }

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold mb-6">My Friends</h1>
        
        <Tabs defaultValue="friends" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="friends">All Friends</TabsTrigger>
            <TabsTrigger value="requests">Friend Requests</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          </TabsList>

          <TabsContent value="friends">
            <div className="space-y-4">
              {friendsList.map((friend) => (
                <Card key={friend.id} className="p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={friend.avatar} alt={friend.name} />
                      <AvatarFallback>{friend.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{friend.name}</h3>
                      <p className="text-sm text-gray-500">{friend.mutualFriends} mutual friends</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Message
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requests">
            <div className="space-y-4">
              {friendRequests.map((request) => (
                <Card key={request.id} className="p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={request.avatar} alt={request.name} />
                      <AvatarFallback>{request.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{request.name}</h3>
                      <p className="text-sm text-gray-500">{request.mutualFriends} mutual friends</p>
                    </div>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => handleAcceptRequest(request.id)}
                    >
                      Accept
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="suggestions">
            <div className="space-y-4">
              {suggestions.map((suggestion) => (
                <Card key={suggestion.id} className="p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={suggestion.avatar} alt={suggestion.name} />
                      <AvatarFallback>{suggestion.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{suggestion.name}</h3>
                      <p className="text-sm text-gray-500">{suggestion.mutualFriends} mutual friends</p>
                    </div>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => handleAddFriend(suggestion.id)}
                    >
                      Add Friend
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
} 