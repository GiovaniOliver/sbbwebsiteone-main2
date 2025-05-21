'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/molecules/cards/Card'
import { ChevronDown } from 'lucide-react'

interface IndustryBreakdownProps {
  selectedState: string
  selectedCity: string
}

interface Industry {
  id: string
  name: string
  avgMonthlySpend: number
  blackOwned: number
  circulated: number
}

// List of available industries
const AVAILABLE_INDUSTRIES: Industry[] = [
  { id: 'construction', name: 'Construction', avgMonthlySpend: 750, blackOwned: 12, circulated: 638 },
  { id: 'wholesale', name: 'Wholesale trade', avgMonthlySpend: 380, blackOwned: 8, circulated: 342 },
  { id: 'information', name: 'Information', avgMonthlySpend: 420, blackOwned: 15, circulated: 357 },
  { id: 'education', name: 'Education services', avgMonthlySpend: 980, blackOwned: 22, circulated: 764 },
  { id: 'government', name: 'Federal Government', avgMonthlySpend: 560, blackOwned: 5, circulated: 532 },
  { id: 'agriculture', name: 'Agriculture', avgMonthlySpend: 290, blackOwned: 9, circulated: 264 },
  { id: 'utilities', name: 'Utilities', avgMonthlySpend: 620, blackOwned: 7, circulated: 577 },
  { id: 'realestate', name: 'Real estate, renting, leasing', avgMonthlySpend: 1450, blackOwned: 25, circulated: 1088 },
  { id: 'retail', name: 'Retail', avgMonthlySpend: 850, blackOwned: 18, circulated: 697 },
  { id: 'healthcare', name: 'Healthcare', avgMonthlySpend: 1250, blackOwned: 14, circulated: 1075 }
]

export default function IndustryBreakdown({ selectedState, selectedCity }: IndustryBreakdownProps) {
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(['realestate'])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  
  // Get selected industry objects
  const selectedIndustryObjects = AVAILABLE_INDUSTRIES.filter(industry => 
    selectedIndustries.includes(industry.id)
  )
  
  // Calculate totals
  const totalMonthlySpending = selectedIndustryObjects.reduce(
    (sum, industry) => sum + industry.avgMonthlySpend, 
    0
  )
  
  const totalCirculated = selectedIndustryObjects.reduce(
    (sum, industry) => sum + industry.circulated,
    0
  )
  
  const toggleIndustry = (industryId: string) => {
    if (selectedIndustries.includes(industryId)) {
      // Don't allow deselecting the last industry
      if (selectedIndustries.length > 1) {
        setSelectedIndustries(selectedIndustries.filter(id => id !== industryId))
      }
    } else {
      setSelectedIndustries([...selectedIndustries, industryId])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Industry Breakdown for {selectedCity}, {selectedState}</h2>
        
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 rounded-md bg-[#1B2130] px-3 py-2 text-sm font-medium border border-[#2E3446]"
          >
            <span>{selectedIndustries.length} selected</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-md border border-[#2E3446] bg-[#1B2130] py-1 z-10">
              {AVAILABLE_INDUSTRIES.map(industry => (
                <label
                  key={industry.id}
                  className="flex items-center px-4 py-2 hover:bg-[#232A3C] cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="mr-3 h-4 w-4"
                    checked={selectedIndustries.includes(industry.id)}
                    onChange={() => toggleIndustry(industry.id)}
                  />
                  {industry.name}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Card className="bg-[#1B2130] border-[#2E3446] text-white">
        <CardHeader>
          <CardTitle className="text-lg">Selected Industries Summary</CardTitle>
          <p className="text-sm text-gray-400">Average monthly spending and business statistics</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2E3446]">
                  <th className="text-left py-2 px-4 font-medium text-gray-400">Industry</th>
                  <th className="text-right py-2 px-4 font-medium text-gray-400">Avg. Monthly Spend</th>
                  <th className="text-right py-2 px-4 font-medium text-gray-400">Black-Owned %</th>
                </tr>
              </thead>
              <tbody>
                {selectedIndustryObjects.map(industry => (
                  <tr key={industry.id} className="border-b border-[#2E3446]">
                    <td className="py-3 px-4">{industry.name}</td>
                    <td className="py-3 px-4 text-right">${industry.avgMonthlySpend.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">{industry.blackOwned}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-[#1B2130] border-[#2E3446] text-white">
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-1">Your Community Impact</h3>
              <p className="text-sm text-gray-400 mb-4">If you choose Black-owned businesses in these industries</p>
              
              <div className="bg-[#232A3C] p-6 rounded-lg border border-[#2E3446]">
                <p className="text-sm text-gray-300 mb-2">Total average monthly spending in selected industries:</p>
                <p className="text-3xl font-bold mb-6">${totalMonthlySpending.toLocaleString()}</p>
                
                <p className="text-sm text-gray-300 mb-2">
                  By choosing Black-owned businesses in these industries, you would circulate approximately
                </p>
                <p className="text-2xl font-bold text-green-400">
                  ${totalCirculated.toLocaleString()} back into the Black community.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 