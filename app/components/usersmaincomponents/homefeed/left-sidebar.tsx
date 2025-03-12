'use client'

import { useState } from 'react'
import { Bell, FileText, Image, MessageCircle, ShoppingBag, Users, Video, Vote, Coins, FileCode, Users2, BookOpen, GanttChart, GraduationCap, Blocks } from 'lucide-react'
import { Route } from 'next'
import { Sidebar, SidebarBody, SidebarLink } from '@/app/components/ui/sidebar'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useSidebar } from '@/app/components/ui/sidebar'

const menuItems = [
  { icon: <Image className="h-5 w-5" />, label: 'Feed', href: '/homefeed' as Route },
  { icon: <Users className="h-5 w-5" />, label: 'Friends', href: '/friends' as Route },
  { icon: <Bell className="h-5 w-5" />, label: 'Events', href: '/events' as Route },
  { icon: <Video className="h-5 w-5" />, label: 'Watch Videos', href: '/videos' as Route },
  { icon: <Image className="h-5 w-5" />, label: 'Photos', href: '/photos' as Route },
  { icon: <ShoppingBag className="h-5 w-5" />, label: 'Marketplace', href: '/marketplace' as Route },
  { icon: <BookOpen className="h-5 w-5" />, label: 'SBB University', href: '/sbbuniversity' as Route },
]

const daoFeatures = [
  { icon: <Vote className="h-5 w-5" />, label: 'Governance', href: '/dao/governance' as Route },
  { icon: <Coins className="h-5 w-5" />, label: 'Treasury', href: '/dao/treasury' as Route },
  { icon: <FileCode className="h-5 w-5" />, label: 'Proposals', href: '/dao/proposals' as Route },
  { icon: <Users2 className="h-5 w-5" />, label: 'Members', href: '/dao/members' as Route },
  { icon: <BookOpen className="h-5 w-5" />, label: 'Documentation', href: '/dao/docs' as Route },
  { icon: <GanttChart className="h-5 w-5" />, label: 'Projects', href: '/dao/projects' as Route },
]

const DaoFeaturesTitle = () => {
  const { open, animate } = useSidebar();
  
  return (
    <div className="flex items-center gap-2 px-2 mb-4">
      <Blocks className="h-4 w-4 text-neutral-400" />
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-xs font-semibold text-neutral-400 uppercase"
      >
        DAO Features
      </motion.span>
    </div>
  );
};

export default function LeftSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Link
            href="/"
            className="font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20 mb-8"
          >
            <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
            <span className="font-medium whitespace-pre">SBB DAO</span>
          </Link>

          <div className="flex flex-col gap-2">
            {menuItems.map((item, idx) => (
              <SidebarLink key={idx} link={item} />
            ))}
          </div>

          <div className="mt-8">
            <DaoFeaturesTitle />
            <div className="flex flex-col gap-2">
              {daoFeatures.map((item, idx) => (
                <SidebarLink key={idx} link={item} />
              ))}
            </div>
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  )
} 