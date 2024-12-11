import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/usersmaincomponents/homefeed/ui/avatar"
import { Button } from "@/app/components/usersmaincomponents/homefeed/ui/button"
import { Bell } from 'lucide-react'

const messages = [
  { name: "Roger Korsgaard", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fHww" },
  { name: "Terry Torff", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww" },
  { name: "Angel Bergson", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D" },
  { name: "Emerson Gouse", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww" },
  { name: "Coney Baptista", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyfGVufDB8fDB8fHww" },
  { name: "Zain Culhane", image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YXZhdGFyfGVufDB8fDB8fHww" },
  { name: "Randy Lipshutz", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D" },
  { name: "Craig Botosh", image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D" },
]

const events = [
  { name: "10 Events Invites", date: "Tomorrow" },
  { name: "Design System Collaboration", date: "Thursday 4PM" },
  { name: "Web Dev 2.0 Meetup", date: "Yoshkar-Ola, Russia" },
  { name: "Prada's Invitation Birthday", date: "Next Week" },
]

export default function RightSidebar() {
  return (
    <div className="w-80 bg-white border-l p-4">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Messages</h2>
          <Button variant="ghost" size="sm" className="text-blue-600">
            View All
          </Button>
        </div>
        <div className="space-y-4">
          {messages.map((message, i) => (
            <div key={i} className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={message.image} />
                <AvatarFallback>{message.name[0]}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{message.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Events</h2>
          <Button variant="ghost" size="sm" className="text-blue-600">
            View All
          </Button>
        </div>
        <div className="space-y-4">
          {events.map((event, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">{event.name}</p>
                <p className="text-sm text-gray-500">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

