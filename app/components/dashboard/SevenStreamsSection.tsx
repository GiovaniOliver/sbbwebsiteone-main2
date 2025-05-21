'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/molecules/cards/Card'
import { Button } from '@/app/components/atoms/buttons/Button'
import { Skeleton } from '@/app/components/atoms/feedback/Skeleton'
import { Input } from '@/app/components/atoms/inputs/Input'
import { Label } from '@/app/components/atoms/feedback/Label'
import { CheckCircle2, PiggyBank, TrendingUp } from 'lucide-react'

interface SevenStreamsProps {
  state: string
  city: string
}

interface IncomeStream {
  id: string
  name: string
  description: string
  active: boolean
  amount: number
  communityPercentage: number // percentage flowing back to the community
}

// The Seven Streams of Income
const DEFAULT_STREAMS: IncomeStream[] = [
  { 
    id: 'earned', 
    name: 'Earned Income',
    description: 'Income from employment or self-employment',
    active: false,
    amount: 0,
    communityPercentage: 30
  },
  { 
    id: 'profit', 
    name: 'Profit Income',
    description: 'Income from buying and selling assets',
    active: false,
    amount: 0,
    communityPercentage: 45
  },
  { 
    id: 'interest', 
    name: 'Interest Income',
    description: 'Income from lending money',
    active: false,
    amount: 0,
    communityPercentage: 15
  },
  { 
    id: 'dividend', 
    name: 'Dividend Income',
    description: 'Income from business ownership/stock',
    active: false,
    amount: 0,
    communityPercentage: 25
  },
  { 
    id: 'rental', 
    name: 'Rental Income',
    description: 'Income from renting assets (property, etc.)',
    active: false,
    amount: 0,
    communityPercentage: 40
  },
  { 
    id: 'capital', 
    name: 'Capital Gains',
    description: 'Income from appreciating assets',
    active: false,
    amount: 0,
    communityPercentage: 20
  },
  { 
    id: 'royalty', 
    name: 'Royalty Income',
    description: 'Income from intellectual property',
    active: false,
    amount: 0,
    communityPercentage: 35
  }
]

// Average stream participation rates by location
const STREAM_PARTICIPATION: Record<string, Record<string, number[]>> = {
  'GA': {
    'Atlanta': [78, 25, 42, 31, 22, 18, 12], // percentages for each stream
    'Savannah': [75, 18, 35, 22, 19, 12, 8]
  },
  'NY': {
    'New York': [82, 32, 48, 38, 24, 29, 15]
  },
  'TX': {
    'Houston': [76, 28, 38, 29, 26, 21, 10]
  }
}

// Average stream amounts by location (annual)
const STREAM_AMOUNTS: Record<string, Record<string, number[]>> = {
  'GA': {
    'Atlanta': [62000, 8500, 3200, 4500, 12000, 6500, 3800],
    'Savannah': [48000, 6200, 2800, 3400, 9800, 4200, 2500]
  },
  'NY': {
    'New York': [85000, 12000, 5400, 7800, 18500, 9800, 6200]
  },
  'TX': {
    'Houston': [68000, 9200, 3900, 5600, 14200, 7800, 4500]
  }
}

export default function SevenStreamsSection({ state, city }: SevenStreamsProps) {
  const [loading, setLoading] = useState(true)
  const [streams, setStreams] = useState<IncomeStream[]>([])
  const [communityFlowTotal, setCommunityFlowTotal] = useState(0)
  const [communityStreams, setCommunityStreams] = useState(0)
  const [averages, setAverages] = useState<{
    participation: number[]
    amounts: number[]
  }>({ participation: [], amounts: [] })

  // Load location-specific data
  useEffect(() => {
    setLoading(true)
    
    setTimeout(() => {
      // Get location-specific participation rates and amounts or use defaults
      const locationParticipation = STREAM_PARTICIPATION[state]?.[city] || [75, 20, 35, 25, 20, 15, 10]
      const locationAmounts = STREAM_AMOUNTS[state]?.[city] || [55000, 7500, 3000, 4000, 10000, 5500, 3000]
      
      setAverages({
        participation: locationParticipation,
        amounts: locationAmounts
      })
      
      setStreams(DEFAULT_STREAMS.map((stream, index) => ({
        ...stream,
        amount: locationAmounts[index] / 12 // convert to monthly
      })))
      
      setLoading(false)
    }, 1000)
  }, [state, city])

  // Update stream status
  const toggleStream = (id: string) => {
    setStreams(prev => 
      prev.map(stream => 
        stream.id === id 
          ? { ...stream, active: !stream.active } 
          : stream
      )
    )
  }

  // Update stream amount
  const updateAmount = (id: string, amount: string) => {
    const numAmount = parseFloat(amount) || 0
    
    setStreams(prev => 
      prev.map(stream => 
        stream.id === id 
          ? { ...stream, amount: numAmount } 
          : stream
      )
    )
  }

  // Calculate totals when streams change
  useEffect(() => {
    const activeStreams = streams.filter(stream => stream.active)
    setCommunityStreams(activeStreams.length)
    
    const flowTotal = activeStreams.reduce((total, stream) => {
      return total + (stream.amount * (stream.communityPercentage / 100))
    }, 0)
    
    setCommunityFlowTotal(flowTotal)
  }, [streams])

  if (loading) {
    return <StreamsSkeleton />
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Seven Streams of Income Analysis for {city}, {state}</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-[#1B2130] border-[#2E3446] text-white lg:col-span-2">
          <CardHeader>
            <CardTitle>Your Income Streams</CardTitle>
            <CardDescription className="text-gray-400">
              Select the income streams you currently have and enter your monthly amounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {streams.map((stream, index) => (
                <div 
                  key={stream.id}
                  className={`p-4 rounded-lg border transition-colors ${
                    stream.active 
                      ? 'bg-[#2A314B] border-blue-500' 
                      : 'bg-[#1D2435] border-[#2E3446]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <Button
                      variant={stream.active ? 'outline' : 'ghost'}
                      className={`min-w-[2.5rem] h-10 p-0 ${
                        stream.active 
                          ? 'bg-blue-500/20 border-blue-500 hover:bg-blue-500/30' 
                          : 'bg-[#2E3446] hover:bg-[#3B4559]'
                      }`}
                      onClick={() => toggleStream(stream.id)}
                    >
                      {index + 1}
                    </Button>
                    
                    <div className="flex-1 space-y-1">
                      <p className="font-medium text-white flex items-center">
                        {stream.name}
                        {stream.active && (
                          <CheckCircle2 className="ml-2 h-4 w-4 text-green-500" />
                        )}
                      </p>
                      <p className="text-sm text-gray-400">{stream.description}</p>
                      
                      {stream.active && (
                        <div className="mt-4">
                          <div className="flex items-center">
                            <div className="space-y-2 w-full max-w-xs">
                              <Label htmlFor={`amount-${stream.id}`} className="text-sm text-gray-400">
                                Monthly Amount
                              </Label>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                                <Input
                                  id={`amount-${stream.id}`}
                                  type="number"
                                  className="pl-8 bg-[#1D2435] border-[#2E3446] text-white"
                                  placeholder="0.00"
                                  value={stream.amount || ''}
                                  onChange={(e) => updateAmount(stream.id, e.target.value)}
                                />
                              </div>
                            </div>
                            
                            <div className="ml-4 pl-4 border-l border-[#2E3446] text-center">
                              <p className="text-xs text-gray-400">Community Flow</p>
                              <p className="text-lg font-semibold text-white">
                                ${Math.round(stream.amount * (stream.communityPercentage / 100)).toLocaleString()}
                              </p>
                              <p className="text-xs text-gray-500">{stream.communityPercentage}%</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Average Participation</p>
                      <p className="text-lg font-semibold">{averages.participation[index]}%</p>
                      <p className="text-xs text-gray-400 mt-1">Avg. Monthly</p>
                      <p className="text-sm">${Math.round(averages.amounts[index] / 12).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card className="bg-[#1B2130] border-[#2E3446] text-white">
            <CardHeader>
              <CardTitle>Community Flow</CardTitle>
              <CardDescription className="text-gray-400">
                Income circulating in your community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-[#2A314B] rounded-lg text-center">
                  <TrendingUp className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Monthly Community Flow</p>
                  <p className="text-3xl font-bold mt-1">${Math.round(communityFlowTotal).toLocaleString()}</p>
                  <p className="text-sm text-gray-400 mt-2">Annual Impact</p>
                  <p className="text-xl font-semibold">${Math.round(communityFlowTotal * 12).toLocaleString()}</p>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-[#1D2435] rounded-lg">
                  <div>
                    <p className="text-sm text-gray-400">Active Streams</p>
                    <p className="text-xl font-semibold">{communityStreams} / 7</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-[#2A314B] flex items-center justify-center text-lg font-bold">
                    {communityStreams}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1B2130] border-[#2E3446] text-white">
            <CardHeader>
              <CardTitle>Community Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-[#2A314B] rounded-md">
                  <PiggyBank className="h-8 w-8 text-green-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-400">Your Score</p>
                    <p className="text-lg font-semibold">{streams.filter(s => s.active).length} out of 7</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm text-gray-300">
                    Having multiple streams helps community wealth building:
                  </p>
                  
                  <div className="text-xs text-gray-400 space-y-2">
                    <div className="flex items-baseline">
                      <span className="inline-block w-32">7 out of 7 Streams:</span>
                      <span className="ml-2 font-medium text-green-400">100% Impact</span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="inline-block w-32">5-6 Streams:</span>
                      <span className="ml-2 font-medium text-green-300">85% Impact</span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="inline-block w-32">3-4 Streams:</span>
                      <span className="ml-2 font-medium text-yellow-300">65% Impact</span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="inline-block w-32">1-2 Streams:</span>
                      <span className="ml-2 font-medium text-red-300">35% Impact</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StreamsSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-64 bg-[#2E3446]" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-[#1B2130] border-[#2E3446] text-white">
            <CardHeader>
              <Skeleton className="h-6 w-48 bg-[#2E3446]" />
              <Skeleton className="h-4 w-72 bg-[#2E3446]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Array(7).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full bg-[#2A314B]" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="bg-[#1B2130] border-[#2E3446] text-white">
            <CardHeader>
              <Skeleton className="h-6 w-40 bg-[#2E3446]" />
              <Skeleton className="h-4 w-56 bg-[#2E3446]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-40 w-full bg-[#2A314B]" />
            </CardContent>
          </Card>
          
          <Card className="bg-[#1B2130] border-[#2E3446] text-white">
            <CardHeader>
              <Skeleton className="h-6 w-40 bg-[#2E3446]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-16 w-full bg-[#2A314B]" />
                <Skeleton className="h-40 w-full bg-[#2A314B]" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 