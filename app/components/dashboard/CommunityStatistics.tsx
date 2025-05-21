'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/molecules/cards/Card'
import { Skeleton } from '@/app/components/atoms/feedback/Skeleton'
import { 
  Users, 
  BadgeDollarSign, 
  Building2, 
  TrendingDown, 
  DollarSign, 
  CreditCard 
} from 'lucide-react'

interface CommunityStatisticsProps {
  state: string
  city: string
}

// Add interface for Facebook groups
interface FacebookGroup {
  name: string
  members: number
  url: string
}

// Add interface for city statistics
interface CityStats {
  blackPopulation: number
  blackIncomeAvg: number
  blackBusinessCount: number
  blackUnemploymentRate: number
  stateMinWage: number
  stateDollarValue: number
  facebookGroups: FacebookGroup[]
}

// Add interface for state data
interface StateData {
  [city: string]: CityStats
}

// Define the mock statistics type
interface MockStatistics {
  [state: string]: StateData
}

// Mock data for presentation - would be replaced with API calls in production
const MOCK_STATISTICS: MockStatistics = {
  'GA': {
    'Atlanta': {
      blackPopulation: 456879,
      blackIncomeAvg: 45923,
      blackBusinessCount: 4821,
      blackUnemploymentRate: 7.2,
      stateMinWage: 7.25,
      stateDollarValue: 0.93,
      facebookGroups: [
        { name: "Atlanta Black Business Network", members: 12500, url: "#" },
        { name: "Black Atlanta Community Support", members: 8700, url: "#" },
        { name: "Metro ATL Black Entrepreneurs", members: 5300, url: "#" }
      ]
    },
    'Savannah': {
      blackPopulation: 102843,
      blackIncomeAvg: 39750,
      blackBusinessCount: 1263,
      blackUnemploymentRate: 8.1,
      stateMinWage: 7.25,
      stateDollarValue: 0.93,
      facebookGroups: [
        { name: "Savannah Black Business Owners", members: 3200, url: "#" },
        { name: "Black Savannah Community", members: 4100, url: "#" }
      ]
    }
  },
  'NY': {
    'New York': {
      blackPopulation: 1894543,
      blackIncomeAvg: 52650,
      blackBusinessCount: 15467,
      blackUnemploymentRate: 9.4,
      stateMinWage: 15.00,
      stateDollarValue: 0.87,
      facebookGroups: [
        { name: "NYC Black Business Owners", members: 25700, url: "#" },
        { name: "Black NYC Community Network", members: 18900, url: "#" },
        { name: "Harlem Black Entrepreneurs", members: 8600, url: "#" }
      ]
    }
  },
  'CA': {
    'Los Angeles': {
      blackPopulation: 849384,
      blackIncomeAvg: 58240,
      blackBusinessCount: 10982,
      blackUnemploymentRate: 8.7,
      stateMinWage: 16.00,
      stateDollarValue: 0.85,
      facebookGroups: [
        { name: "LA Black Business Network", members: 18600, url: "#" },
        { name: "Black Los Angeles", members: 12400, url: "#" }
      ]
    }
  },
  'TX': {
    'Houston': {
      blackPopulation: 1085954,
      blackIncomeAvg: 49870,
      blackBusinessCount: 9564,
      blackUnemploymentRate: 6.8,
      stateMinWage: 7.25,
      stateDollarValue: 0.97,
      facebookGroups: [
        { name: "Houston Black Business Coalition", members: 15200, url: "#" },
        { name: "Black Houston Community", members: 11300, url: "#" }
      ]
    }
  }
}

export default function CommunityStatistics({ state, city }: CommunityStatisticsProps) {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<CityStats | null>(null)

  useEffect(() => {
    // Simulate API call
    setLoading(true)
    
    setTimeout(() => {
      // Find data for selected state and city
      if (MOCK_STATISTICS[state] && MOCK_STATISTICS[state][city]) {
        setStats(MOCK_STATISTICS[state][city])
      } else {
        // Use Atlanta data for any city not in our mock data
        setStats(MOCK_STATISTICS['GA']['Atlanta'])
      }
      setLoading(false)
    }, 1000)
  }, [state, city])

  if (loading) {
    return <StatsLoadingSkeleton />
  }

  if (!stats) {
    return (
      <Card className="bg-[#1B2130] border-[#2E3446] text-white">
        <CardHeader>
          <CardTitle>No Data Available</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">
            No statistics available for {city}, {state}. Please try another location.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Community Statistics for {city}, {state}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard 
          title="Black Population" 
          value={stats.blackPopulation.toLocaleString()} 
          icon={<Users className="h-5 w-5 text-blue-400" />} 
        />
        <StatCard 
          title="Avg. Black Income" 
          value={`$${stats.blackIncomeAvg.toLocaleString()}`} 
          icon={<BadgeDollarSign className="h-5 w-5 text-green-400" />} 
        />
        <StatCard 
          title="Black-Owned Businesses" 
          value={stats.blackBusinessCount.toLocaleString()} 
          icon={<Building2 className="h-5 w-5 text-purple-400" />} 
        />
        <StatCard 
          title="Black Unemployment Rate" 
          value={`${stats.blackUnemploymentRate}%`} 
          icon={<TrendingDown className="h-5 w-5 text-red-400" />} 
        />
        <StatCard 
          title="State Minimum Wage" 
          value={`$${stats.stateMinWage.toFixed(2)}`} 
          icon={<DollarSign className="h-5 w-5 text-yellow-400" />} 
        />
        <StatCard 
          title="State Dollar Value" 
          value={`$${stats.stateDollarValue.toFixed(2)}`} 
          icon={<CreditCard className="h-5 w-5 text-indigo-400" />} 
        />
      </div>

      <Card className="bg-[#1B2130] border-[#2E3446] text-white">
        <CardHeader>
          <CardTitle>Local Black Facebook Groups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.facebookGroups.map((group: FacebookGroup, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#2A314B] rounded-md">
                <div>
                  <p className="font-medium text-white">{group.name}</p>
                  <p className="text-sm text-gray-400">{group.members.toLocaleString()} members</p>
                </div>
                <a
                  href={group.url}
                  className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  Join
                </a>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Add parameter types to StatCard
interface StatCardProps {
  title: string
  value: string
  icon: React.ReactNode
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card className="bg-[#1B2130] border-[#2E3446] text-white">
      <CardContent className="pt-4">
        <div className="flex justify-between items-center">
          <p className="text-gray-400 text-sm">{title}</p>
          {icon}
        </div>
        <p className="text-2xl font-bold mt-2">{value}</p>
      </CardContent>
    </Card>
  )
}

function StatsLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-64 bg-[#2E3446]" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(6).fill(0).map((_, i) => (
          <Card key={i} className="bg-[#1B2130] border-[#2E3446] text-white">
            <CardContent className="pt-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-24 bg-[#2E3446]" />
                <Skeleton className="h-5 w-5 rounded-full bg-[#2E3446]" />
              </div>
              <Skeleton className="h-8 w-32 mt-2 bg-[#2E3446]" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="bg-[#1B2130] border-[#2E3446] text-white">
        <CardHeader>
          <Skeleton className="h-6 w-48 bg-[#2E3446]" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-[#2A314B] rounded-md">
                <div>
                  <Skeleton className="h-5 w-40 bg-[#3B4559]" />
                  <Skeleton className="h-4 w-24 mt-1 bg-[#3B4559]" />
                </div>
                <Skeleton className="h-8 w-16 bg-[#3B4559]" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 