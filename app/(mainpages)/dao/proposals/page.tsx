'use client'

import Layout from '@/app/components/usersmaincomponents/homefeed/homefeed-layout'
import { Card } from '@/app/components/molecules/cards/Card'
import { Button } from '@/app/components/atoms/buttons/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/molecules/navigation/Tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/molecules/feedback/Dialog'
import { Textarea } from '@/app/components/atoms/inputs/Textarea'
import { FileText, Filter, Search, Tag, Calendar, Users, ArrowRight } from 'lucide-react'

// Mock data for proposals
const proposals = [
  {
    id: 1,
    title: "Implement New Staking Mechanism",
    description: "Proposal to upgrade the current staking system with improved rewards distribution and lock-up periods",
    author: "Alex Thompson",
    category: "Protocol",
    status: "draft",
    createdAt: "2023-12-05T10:00:00Z",
    deadline: "2023-12-20T00:00:00Z",
    supporters: 45
  },
  {
    id: 2,
    title: "Community Events Budget Q1 2024",
    description: "Allocate budget for community events and meetups in the first quarter of 2024",
    author: "Sarah Wilson",
    category: "Treasury",
    status: "review",
    createdAt: "2023-12-04T15:30:00Z",
    deadline: "2023-12-18T00:00:00Z",
    supporters: 72
  },
  {
    id: 3,
    title: "Partnership with DeFi Protocol",
    description: "Strategic partnership proposal with leading DeFi protocol for liquidity provision",
    author: "Michael Chen",
    category: "Partnership",
    status: "review",
    createdAt: "2023-12-03T09:15:00Z",
    deadline: "2023-12-17T00:00:00Z",
    supporters: 89
  }
]

const categories = [
  "All",
  "Protocol",
  "Treasury",
  "Partnership",
  "Development",
  "Marketing",
  "Community"
]

export default function ProposalsPage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Proposals</h1>
            <p className="text-gray-500">Create and manage community proposals</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Create Proposal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Proposal</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-md border border-gray-300 p-2"
                    placeholder="Enter proposal title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <Textarea
                    className="mt-1"
                    placeholder="Describe your proposal in detail..."
                    rows={5}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Category</label>
                    <select className="mt-1 w-full rounded-md border border-gray-300 p-2">
                      {categories.slice(1).map((category) => (
                        <option key={category} value={category.toLowerCase()}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="deadline" className="text-sm font-medium text-gray-700">Deadline</label>
                    <input
                      id="deadline"
                      type="date"
                      className="mt-1 w-full rounded-md border border-gray-300 p-2"
                      title="Select the proposal deadline"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline">Save as Draft</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Submit Proposal</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search proposals..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Categories</option>
            {categories.slice(1).map((category) => (
              <option key={category} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Proposals List */}
        <div className="space-y-4">
          {proposals.map((proposal) => (
            <Card key={proposal.id} className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {proposal.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      proposal.status === 'draft' 
                        ? 'bg-gray-100 text-gray-600'
                        : proposal.status === 'review'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
                      {proposal.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{proposal.description}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Due {new Date(proposal.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{proposal.supporters} Supporters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      <span>{proposal.category}</span>
                    </div>
                  </div>
                </div>
                <Button className="gap-2">
                  View Details
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
} 