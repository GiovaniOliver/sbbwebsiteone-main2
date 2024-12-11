import { Button } from "./ui/button"
import { Bell, FileText, Image, MessageCircle, ShoppingBag, Users, Video, Vote, Coins, FileCode, Users2, BookOpen, GanttChart } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = [
  { icon: Image, label: 'Feed', href: '/homefeed' },
  { icon: Users, label: 'Friends', href: '/friends' },
  { icon: Bell, label: 'Events', href: '/events' },
  { icon: Video, label: 'Watch Videos', href: '/videos' },
  { icon: Image, label: 'Photos', href: '/photos' },
  { icon: ShoppingBag, label: 'Marketplace', href: '/marketplace' },
  { icon: FileText, label: 'Files', href: '/files' },
]

const daoFeatures = [
  { icon: Vote, label: 'Governance', href: '/dao/governance' },
  { icon: Coins, label: 'Treasury', href: '/dao/treasury' },
  { icon: FileCode, label: 'Proposals', href: '/dao/proposals' },
  { icon: Users2, label: 'Members', href: '/dao/members' },
  { icon: BookOpen, label: 'Documentation', href: '/dao/docs' },
  { icon: GanttChart, label: 'Projects', href: '/dao/projects' },
]

export default function LeftSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white border-r pt-16">
      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <Button
              variant={pathname === item.href ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
      <div className="px-4 mt-8">
        <h3 className="font-semibold mb-2 text-gray-500 uppercase text-xs">DAO Features</h3>
        <div className="space-y-2">
          {daoFeatures.map((item, index) => (
            <Link key={index} href={item.href}>
              <Button
                variant="ghost"
                className="w-full justify-start text-sm hover:bg-blue-50 hover:text-blue-600"
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

