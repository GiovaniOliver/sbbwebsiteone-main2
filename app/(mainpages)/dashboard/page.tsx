'use client'

import { useState } from 'react'
import Layout from '@/app/components/usersmaincomponents/homefeed/homefeed-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/molecules/cards/Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/molecules/navigation/Tabs'
import BuyingPowerSection from '@/app/components/dashboard/BuyingPowerSection'
import CommunityStatistics from '@/app/components/dashboard/CommunityStatistics'
import IndustryBreakdown from '@/app/components/dashboard/IndustryBreakdown'
import CirculationAnalysis from '@/app/components/dashboard/CirculationAnalysis'
import SevenStreamsSection from '@/app/components/dashboard/SevenStreamsSection'
import LocationSelector from '@/app/components/dashboard/LocationSelector'
import BuyingPowerExamples from '@/app/components/dashboard/BuyingPowerExamples'

export default function BuyingPowerDashboard() {
  const [selectedState, setSelectedState] = useState<string>('')
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [dataLoaded, setDataLoaded] = useState(false)

  const handleLocationSubmit = (state: string, city: string) => {
    setSelectedState(state)
    setSelectedCity(city)
    setDataLoaded(true)
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-white">Buying Power Dashboard</h1>
        </div>
        
        <Card className="bg-[#1B2130] border-[#2E3446] text-white">
          <CardHeader>
            <CardTitle>Select Location</CardTitle>
            <CardDescription className="text-gray-400">
              Choose your state and city to view community buying power data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LocationSelector onSubmit={handleLocationSubmit} />
          </CardContent>
        </Card>

        {dataLoaded && (
          <>
            <Tabs defaultValue="statistics" className="space-y-4">
              <TabsList className="bg-[#2E3446]">
                <TabsTrigger value="statistics" className="data-[state=active]:bg-[#3B4559] data-[state=active]:text-white">
                  Community Statistics
                </TabsTrigger>
                <TabsTrigger value="buying-power" className="data-[state=active]:bg-[#3B4559] data-[state=active]:text-white">
                  Buying Power
                </TabsTrigger>
                <TabsTrigger value="examples" className="data-[state=active]:bg-[#3B4559] data-[state=active]:text-white">
                  Impact Examples
                </TabsTrigger>
                <TabsTrigger value="industries" className="data-[state=active]:bg-[#3B4559] data-[state=active]:text-white">
                  Industry Breakdown
                </TabsTrigger>
                <TabsTrigger value="circulation" className="data-[state=active]:bg-[#3B4559] data-[state=active]:text-white">
                  Money Circulation
                </TabsTrigger>
                <TabsTrigger value="seven-streams" className="data-[state=active]:bg-[#3B4559] data-[state=active]:text-white">
                  7 Streams Analysis
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="statistics" className="space-y-4">
                <CommunityStatistics state={selectedState} city={selectedCity} />
              </TabsContent>
              
              <TabsContent value="buying-power" className="space-y-4">
                <BuyingPowerSection state={selectedState} city={selectedCity} />
              </TabsContent>
              
              <TabsContent value="examples" className="space-y-4">
                <BuyingPowerExamples state={selectedState} city={selectedCity} />
              </TabsContent>

              <TabsContent value="industries" className="space-y-4">
                <IndustryBreakdown state={selectedState} city={selectedCity} />
              </TabsContent>
              
              <TabsContent value="circulation" className="space-y-4">
                <CirculationAnalysis state={selectedState} city={selectedCity} />
              </TabsContent>
              
              <TabsContent value="seven-streams" className="space-y-4">
                <SevenStreamsSection state={selectedState} city={selectedCity} />
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </Layout>
  )
} 