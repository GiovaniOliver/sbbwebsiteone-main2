'use client'

import Layout from '@/app/components/usersmaincomponents/homefeed/homefeed-layout'
import { Card } from '@/app/components/molecules/cards/Card'
import { Button } from '@/app/components/atoms/buttons/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/molecules/navigation/Tabs'
import { Vote, Clock, CheckCircle2, XCircle, Users, BarChart3 } from 'lucide-react'

// Mock data for active proposals
const activeProposals = [
  {
    id: 1,
    title: "Community Treasury Allocation Q1 2024",
    description: "Proposal to allocate 500,000 tokens for community development initiatives in Q1 2024",
    votesFor: 15420,
    votesAgainst: 4230,
    endTime: "2024-01-15T00:00:00Z",
    status: "active",
    quorum: 20000,
    category: "Treasury"
  },
  {
    id: 2,
    title: "New Governance Framework Implementation",
    description: "Implementation of updated voting mechanisms and proposal submission guidelines",
    votesFor: 12800,
    votesAgainst: 3100,
    endTime: "2024-01-10T00:00:00Z",
    status: "active",
    quorum: 15000,
    category: "Governance"
  }
]

// Mock data for past proposals
const pastProposals = [
  {
    id: 3,
    title: "Platform Feature Enhancement",
    description: "Addition of new community engagement features",
    votesFor: 25000,
    votesAgainst: 5000,
    endTime: "2023-12-01T00:00:00Z",
    status: "passed",
    category: "Development"
  },
  {
    id: 4,
    title: "Partnership Program Expansion",
    description: "Expanding strategic partnerships with other DAOs",
    votesFor: 18000,
    votesAgainst: 12000,
    endTime: "2023-11-25T00:00:00Z",
    status: "passed",
    category: "Partnerships"
  }
]

export default function GovernancePage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Governance</h1>
            <p className="text-gray-500">Participate in community decision-making</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Create Proposal
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Vote className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Proposals</p>
                <p className="text-xl font-semibold text-gray-900">8</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Voters</p>
                <p className="text-xl font-semibold text-gray-900">24.5K</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Participation Rate</p>
                <p className="text-xl font-semibold text-gray-900">76.3%</p>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="active">Active Proposals</TabsTrigger>
            <TabsTrigger value="past">Past Proposals</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="space-y-4">
              {activeProposals.map((proposal) => (
                <Card key={proposal.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{proposal.title}</h3>
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
                          {proposal.category}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm mb-4">{proposal.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>Ends {new Date(proposal.endTime).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Voting Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">Progress</span>
                      <span className="text-sm font-medium text-gray-900">
                        {Math.round((proposal.votesFor / proposal.quorum) * 100)}% of quorum
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${(proposal.votesFor / proposal.quorum) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <Button variant="outline" className="gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        For ({proposal.votesFor.toLocaleString()})
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <XCircle className="h-4 w-4" />
                        Against ({proposal.votesAgainst.toLocaleString()})
                      </Button>
                    </div>
                    <Button>
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past">
            <div className="space-y-4">
              {pastProposals.map((proposal) => (
                <Card key={proposal.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{proposal.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          proposal.status === 'passed' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                          {proposal.category}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm">{proposal.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex gap-4">
                      <span>For: {proposal.votesFor.toLocaleString()}</span>
                      <span>Against: {proposal.votesAgainst.toLocaleString()}</span>
                    </div>
                    <span>Ended {new Date(proposal.endTime).toLocaleDateString()}</span>
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