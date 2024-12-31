import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/usersmaincomponents/homefeed/ui/avatar"
import { Button } from "@/app/components/usersmaincomponents/homefeed/ui/button"
import { Input } from "@/app/components/usersmaincomponents/homefeed/ui/input"
import { MessageSquare, Search } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { UserButton } from "@clerk/nextjs"
import { NotificationDropdown } from "../notifications/NotificationDropdown"

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center pl-6 py-2">
          <div className="bg-white mr-2">
            <Image
              src="/images/sbblogo.png"
              alt="SBB logo"
              width={40}
              height={40}
            />
          </div>
          <span className="text-xl font-black text-gray-900">SBB DAO<span className="text-indigo-600">.</span></span>
        </Link>
        <div className="flex-1 flex items-center justify-end px-4 gap-4">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input className="pl-8" placeholder="Search" />
          </div>
          <NotificationDropdown />
          <Button variant="ghost" size="icon">
            <MessageSquare className="h-5 w-5" />
          </Button>
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10"
              }
            }}
          />
        </div>
      </div>
    </header>
  )
}

