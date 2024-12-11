'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/usersmaincomponents/homefeed/ui/avatar"
import { Button } from "@/app/components/usersmaincomponents/homefeed/ui/button"
import { Card } from "@/app/components/usersmaincomponents/homefeed/ui/card"
import { Input } from "@/app/components/usersmaincomponents/homefeed/ui/input"
import { ScrollArea } from "@/app/components/usersmaincomponents/homefeed/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/usersmaincomponents/homefeed/ui/tabs"
import { ImageIcon, Link2, MessageCircle, Bell, Share2, PlusCircle } from 'lucide-react'
import Image from "next/image"

export default function Mainhome() {
  const stories = [
    { name: "Your Story", image: "/placeholder-user.jpg", active: true },
    { name: "Justin Rosser", image: "/placeholder-user.jpg" },
    { name: "Davis Dorvant", image: "/placeholder-user.jpg" },
    { name: "Randy Sams", image: "/placeholder-user.jpg" },
    { name: "Charlie Press", image: "/placeholder-user.jpg" },
    { name: "Zora Horvitz", image: "/placeholder-user.jpg" },
    { name: "Tobin Philips", image: "/placeholder-user.jpg" },
    { name: "Corey Gouse", image: "/placeholder-user.jpg" },
  ]

  return (
    <div className="flex-1 p-4">
      {/* Stories */}
      <ScrollArea className="mb-6 whitespace-nowrap">
        <div className="flex gap-4">
          {stories.map((story, i) => (
            <div key={i} className="text-center">
              <Avatar className="h-16 w-16 ring-2 ring-blue-600 ring-offset-2">
                <AvatarImage src={story.image} />
                <AvatarFallback>{story.name[0]}</AvatarFallback>
              </Avatar>
              <p className="mt-1 text-sm">{story.name}</p>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Post Creation */}
      <Card className="mb-6 p-4">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Input placeholder="What's on your mind?" className="bg-gray-50" />
        </div>
        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <Button variant="ghost" size="sm">
            <ImageIcon className="mr-2 h-4 w-4" />
            Image/Video
          </Button>
          <Button variant="ghost" size="sm">
            <Link2 className="mr-2 h-4 w-4" />
            Attachment
          </Button>
          <Button variant="ghost" size="sm">
            <Bell className="mr-2 h-4 w-4" />
            Live
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="mr-2 h-4 w-4" />
            Hashtag
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Mention
          </Button>
        </div>
      </Card>
    </div>
  )
}

