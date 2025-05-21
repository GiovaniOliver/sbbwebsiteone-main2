'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/molecules/cards/Card'
import { Skeleton } from '@/app/components/atoms/feedback/Skeleton'
import { Progress } from '@/app/components/ui/progress'

interface BuyingPowerProps {
  selectedState: string
  selectedCity: string
}

// Define the mock data structure
interface BuyingPowerData {
  blackPopulation: number
  totalPopulation: number
  blackIncome: number
  totalIncome: number
  blackBusinessSpend: number
  totalSpend: number
  blackBusinessCount: number
  totalBusinessCount: number
  blackBuyingPowerRank: number
  blackBuyingPowerScore: number
  comparisonCities: {
    city: string
    blackBuyingPowerScore: number
  }[]
}

// Mock buying power data
const MOCK_DATA: Record<string, Record<string, BuyingPowerData>> = {
  'GA': {
    'Atlanta': {
      blackPopulation: 456879,
      totalPopulation: 889574,
      blackIncome: 21.4, // Billion
      totalIncome: 65.8, // Billion
      blackBusinessSpend: 4.2, // Billion 
      totalSpend: 28.7, // Billion
      blackBusinessCount: 4821,
      totalBusinessCount: 37562,
      blackBuyingPowerRank: 3,
      blackBuyingPowerScore: 78.4,
      comparisonCities: [
        { city: 'New York, NY', blackBuyingPowerScore: 82.7 },
        { city: 'Washington, DC', blackBuyingPowerScore: 79.5 },
        { city: 'Atlanta, GA', blackBuyingPowerScore: 78.4 },
        { city: 'Chicago, IL', blackBuyingPowerScore: 72.3 },
        { city: 'Los Angeles, CA', blackBuyingPowerScore: 68.9 }
      ]
    },
    'Savannah': {
      blackPopulation: 102843,
      totalPopulation: 187324,
      blackIncome: 3.8, // Billion
      totalIncome: 12.5, // Billion
      blackBusinessSpend: 0.85, // Billion 
      totalSpend: 5.4, // Billion
      blackBusinessCount: 1263,
      totalBusinessCount: 9742,
      blackBuyingPowerRank: 18,
      blackBuyingPowerScore: 62.8,
      comparisonCities: [
        { city: 'New York, NY', blackBuyingPowerScore: 82.7 },
        { city: 'Washington, DC', blackBuyingPowerScore: 79.5 },
        { city: 'Atlanta, GA', blackBuyingPowerScore: 78.4 },
        { city: 'Birmingham, AL', blackBuyingPowerScore: 68.2 },
        { city: 'Savannah, GA', blackBuyingPowerScore: 62.8 }
      ]
    }
  },
  'TX': {
    'Houston': {
      blackPopulation: 1085954,
      totalPopulation: 2462250,
      blackIncome: 32.6, // Billion
      totalIncome: 128.9, // Billion
      blackBusinessSpend: 8.4, // Billion 
      totalSpend: 58.2, // Billion
      blackBusinessCount: 9564,
      totalBusinessCount: 87329,
      blackBuyingPowerRank: 5,
      blackBuyingPowerScore: 75.2,
      comparisonCities: [
        { city: 'New York, NY', blackBuyingPowerScore: 82.7 },
        { city: 'Washington, DC', blackBuyingPowerScore: 79.5 },
        { city: 'Atlanta, GA', blackBuyingPowerScore: 78.4 },
        { city: 'Houston, TX', blackBuyingPowerScore: 75.2 },
        { city: 'Dallas, TX', blackBuyingPowerScore: 71.8 }
      ]
    }
  }
}

export default function BuyingPowerSection({ selectedState, selectedCity }: BuyingPowerProps) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<BuyingPowerData | null>(null)

  useEffect(() => {
    // Simulate API call
    setLoading(true)
    
    setTimeout(() => {
      // Get data for the selected location or default to Atlanta
      if (MOCK_DATA[selectedState]?.[selectedCity]) {
        setData(MOCK_DATA[selectedState][selectedCity])
      } else {
        // Use Atlanta data if the selected location doesn't have data
        setData(MOCK_DATA['GA']['Atlanta'])
      }
      setLoading(false)
    }, 1200)
  }, [selectedState, selectedCity])

  if (loading) {
    return <BuyingPowerSkeleton />
  }

  if (!data) {
    return (
      <Card className="bg-[#1B2130] border-[#2E3446] text-white">
        <CardHeader>
          <CardTitle>Data Unavailable</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">
            Buying power data is not available for this location.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Community Buying Power for {selectedCity}, {selectedState}</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#1B2130] border-[#2E3446] text-white">
          <CardHeader>
            <CardTitle>Population Distribution</CardTitle>
            <CardDescription className="text-gray-400">
              Black vs. Total Population
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Black Population</span>
                  <span className="font-medium">{data.blackPopulation.toLocaleString()}</span>
                </div>
                <Progress value={(data.blackPopulation / data.totalPopulation) * 100} className="h-2 bg-[#2E3446]" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Population</span>
                  <span className="font-medium">{data.totalPopulation.toLocaleString()}</span>
                </div>
                <Progress value={100} className="h-2 bg-[#2E3446]" />
              </div>
              
              <div className="pt-4 border-t border-[#2E3446]">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Black Population %</span>
                  <span className="text-xl font-bold text-white">
                    {((data.blackPopulation / data.totalPopulation) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1B2130] border-[#2E3446] text-white">
          <CardHeader>
            <CardTitle>Income Distribution</CardTitle>
            <CardDescription className="text-gray-400">
              Black vs. Total Income (Annual)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Black Income</span>
                  <span className="font-medium">${data.blackIncome.toFixed(1)} Billion</span>
                </div>
                <Progress value={(data.blackIncome / data.totalIncome) * 100} className="h-2 bg-[#2E3446]" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Income</span>
                  <span className="font-medium">${data.totalIncome.toFixed(1)} Billion</span>
                </div>
                <Progress value={100} className="h-2 bg-[#2E3446]" />
              </div>
              
              <div className="pt-4 border-t border-[#2E3446]">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Black Income %</span>
                  <span className="text-xl font-bold text-white">
                    {((data.blackIncome / data.totalIncome) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1B2130] border-[#2E3446] text-white">
          <CardHeader>
            <CardTitle>Business Spending</CardTitle>
            <CardDescription className="text-gray-400">
              Black-owned Business vs. Total Spending
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Black Business Spending</span>
                  <span className="font-medium">${data.blackBusinessSpend.toFixed(1)} Billion</span>
                </div>
                <Progress value={(data.blackBusinessSpend / data.totalSpend) * 100} className="h-2 bg-[#2E3446]" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Spending</span>
                  <span className="font-medium">${data.totalSpend.toFixed(1)} Billion</span>
                </div>
                <Progress value={100} className="h-2 bg-[#2E3446]" />
              </div>
              
              <div className="pt-4 border-t border-[#2E3446]">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Black Business Spending %</span>
                  <span className="text-xl font-bold text-white">
                    {((data.blackBusinessSpend / data.totalSpend) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1B2130] border-[#2E3446] text-white">
          <CardHeader>
            <CardTitle>Buying Power Comparison</CardTitle>
            <CardDescription className="text-gray-400">
              {selectedCity} ranks #{data.blackBuyingPowerRank} nationally
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.comparisonCities.map((cityData, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className={cityData.city === `${selectedCity}, ${selectedState}` ? 'font-medium text-white' : 'text-gray-400'}>
                      {cityData.city}
                    </span>
                    <span className="font-medium">{cityData.blackBuyingPowerScore.toFixed(1)}</span>
                  </div>
                  <Progress 
                    value={cityData.blackBuyingPowerScore} 
                    className={`h-2 ${cityData.city === `${selectedCity}, ${selectedState}` ? 'bg-blue-900' : 'bg-[#2E3446]'}`} 
                  />
                </div>
              ))}
              
              <div className="pt-4 border-t border-[#2E3446]">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Buying Power Score</span>
                  <span className="text-xl font-bold text-white">
                    {data.blackBuyingPowerScore.toFixed(1)}/100
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function BuyingPowerSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-64 bg-[#2E3446]" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array(4).fill(0).map((_, index) => (
          <Card key={index} className="bg-[#1B2130] border-[#2E3446] text-white">
            <CardHeader>
              <Skeleton className="h-6 w-48 bg-[#2E3446]" />
              <Skeleton className="h-4 w-64 bg-[#2E3446]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Skeleton className="h-4 w-32 bg-[#2E3446]" />
                    <Skeleton className="h-4 w-20 bg-[#2E3446]" />
                  </div>
                  <Skeleton className="h-2 w-full bg-[#2E3446]" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Skeleton className="h-4 w-32 bg-[#2E3446]" />
                    <Skeleton className="h-4 w-20 bg-[#2E3446]" />
                  </div>
                  <Skeleton className="h-2 w-full bg-[#2E3446]" />
                </div>
                
                <div className="pt-4 border-t border-[#2E3446]">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-32 bg-[#2E3446]" />
                    <Skeleton className="h-6 w-16 bg-[#2E3446]" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 