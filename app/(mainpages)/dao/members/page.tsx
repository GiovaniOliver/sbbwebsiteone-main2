'use client'

import Layout from '@/app/components/usersmaincomponents/homefeed/homefeed-layout'
import { Card } from '@/app/components/molecules/cards/Card'
import { Button } from '@/app/components/atoms/buttons/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/molecules/navigation/Tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/molecules/display/Avatar'
import { Search, Shield, Star, Users, UserPlus, BarChart3, Trophy } from 'lucide-react'

// Mock data for members
const members = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Core Contributor",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    tokens: 25000,
    proposals: 8,
    joinedDate: "2023-01-15",
    status: "active"
  },
  {
    id: 2,
    name: "Sarah Wilson",
    role: "Community Lead",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    tokens: 15000,
    proposals: 5,
    joinedDate: "2023-03-20",
    status: "active"
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Developer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    tokens: 12000,
    proposals: 3,
    joinedDate: "2023-05-10",
    status: "active"
  }
]

const roles = [
  "All Roles",
  "Core Contributor",
  "Community Lead",
  "Developer",
  "Content Creator",
  "Moderator"
]

export default function MembersPage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Members</h1>
            <p className="text-gray-500">Manage DAO members and roles</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
            <UserPlus className="h-4 w-4" />
            Invite Member
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Members</p>
                <p className="text-xl font-semibold text-gray-900">2.4K</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Shield className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Core Members</p>
                <p className="text-xl font-semibold text-gray-900">156</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Today</p>
                <p className="text-xl font-semibold text-gray-900">892</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Trophy className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Top Contributors</p>
                <p className="text-xl font-semibold text-gray-900">48</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search members..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            {roles.map((role) => (
              <option key={role} value={role.toLowerCase().replace(" ", "-")}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Members List */}
        <Card className="p-6">
          <div className="space-y-6">
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between py-4 border-b last:border-0">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      {member.role === "Core Contributor" && (
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{member.role}</span>
                      <span>•</span>
                      <span>Joined {new Date(member.joinedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{member.tokens.toLocaleString()} SBB</p>
                    <p className="text-sm text-gray-500">{member.proposals} Proposals</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  )
} 