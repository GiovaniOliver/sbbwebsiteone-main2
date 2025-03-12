'use client'

import Layout from '@/app/components/usersmaincomponents/homefeed/layout'
import { Card } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'
import { Search, Plus, Calendar, CheckCircle2, Clock, AlertCircle, BarChart3, Target, Layers } from 'lucide-react'

// Mock data for projects
const projects = [
  {
    id: 1,
    title: "Community Platform V2",
    description: "Upgrade of the community platform with new features and improved UX",
    status: "in-progress",
    progress: 65,
    dueDate: "2024-03-15",
    team: [
      { name: "Alex T", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36" },
      { name: "Sarah W", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" },
      { name: "Michael C", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" }
    ],
    tasks: { completed: 24, total: 36 },
    priority: "high"
  },
  {
    id: 2,
    title: "Token Economics Revision",
    description: "Review and update of token distribution and incentive mechanisms",
    status: "planning",
    progress: 25,
    dueDate: "2024-02-28",
    team: [
      { name: "Emma R", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80" },
      { name: "James L", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61" }
    ],
    tasks: { completed: 8, total: 20 },
    priority: "medium"
  },
  {
    id: 3,
    title: "Governance Dashboard",
    description: "Development of a comprehensive governance analytics dashboard",
    status: "completed",
    progress: 100,
    dueDate: "2023-12-01",
    team: [
      { name: "David K", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12" },
      { name: "Lisa M", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956" }
    ],
    tasks: { completed: 45, total: 45 },
    priority: "completed"
  }
]

const projectStats = [
  { label: "Active Projects", value: "12", icon: Layers, color: "blue" },
  { label: "Completed", value: "45", icon: CheckCircle2, color: "green" },
  { label: "In Progress", value: "8", icon: Clock, color: "yellow" },
  { label: "Upcoming", value: "4", icon: Target, color: "purple" }
]

export default function ProjectsPage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-500">Track and manage DAO initiatives</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {projectStats.map((stat, index) => (
            <Card key={index} className={`p-4 bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100/50`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 bg-${stat.color}-100 rounded-lg`}>
                  <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">All Status</option>
            <option value="planning">Planning</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {project.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      project.status === 'completed'
                        ? 'bg-green-100 text-green-600'
                        : project.status === 'in-progress'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {project.status.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </span>
                    {project.priority !== 'completed' && (
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        project.priority === 'high'
                          ? 'bg-red-100 text-red-600'
                          : project.priority === 'medium'
                          ? 'bg-orange-100 text-orange-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)} Priority
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>

              <div className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Progress</span>
                    <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        project.status === 'completed'
                          ? 'bg-green-500'
                          : 'bg-blue-500'
                      }`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {/* Team */}
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {project.team.map((member, index) => (
                        <Avatar key={index} className="border-2 border-white h-8 w-8">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {project.team.length} team members
                    </span>
                  </div>

                  {/* Tasks and Due Date */}
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{project.tasks.completed}/{project.tasks.total} Tasks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Due {new Date(project.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
} 