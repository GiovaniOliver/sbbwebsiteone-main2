'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/molecules/cards/Card'
import { Button } from '@/app/components/atoms/buttons/Button'
import { Skeleton } from '@/app/components/atoms/feedback/Skeleton'
import { Label } from '@/app/components/atoms/feedback/Label'
import { Input } from '@/app/components/atoms/inputs/Input'
import { Checkbox } from '@/app/components/ui/checkbox'
import { ArrowRight, DollarSign, BadgeDollarSign, TrendingUp } from 'lucide-react'

interface CirculationAnalysisProps {
  state: string
  city: string
}

interface ExpenseCategory {
  id: string
  category: string
  averageMonthlyCost: number
  hasBlackOwned: boolean
}

// Mock expense categories based on industries
const DEFAULT_EXPENSES: ExpenseCategory[] = [
  { id: 'housing', category: 'Housing (Rent/Mortgage)', averageMonthlyCost: 1450, hasBlackOwned: false },
  { id: 'utilities', category: 'Utilities', averageMonthlyCost: 320, hasBlackOwned: false },
  { id: 'groceries', category: 'Groceries', averageMonthlyCost: 520, hasBlackOwned: false },
  { id: 'healthcare', category: 'Healthcare', averageMonthlyCost: 380, hasBlackOwned: false },
  { id: 'insurance', category: 'Insurance', averageMonthlyCost: 220, hasBlackOwned: false },
  { id: 'transportation', category: 'Transportation', averageMonthlyCost: 340, hasBlackOwned: false },
  { id: 'dining', category: 'Dining & Entertainment', averageMonthlyCost: 420, hasBlackOwned: false },
  { id: 'personal', category: 'Personal Care', averageMonthlyCost: 180, hasBlackOwned: false },
  { id: 'education', category: 'Education', averageMonthlyCost: 240, hasBlackOwned: false },
  { id: 'childcare', category: 'Childcare', averageMonthlyCost: 450, hasBlackOwned: false },
  { id: 'subscriptions', category: 'Subscriptions & Services', averageMonthlyCost: 120, hasBlackOwned: false },
  { id: 'other', category: 'Other Expenses', averageMonthlyCost: 350, hasBlackOwned: false }
]

// Location-specific expense adjustments
const EXPENSE_ADJUSTMENTS: Record<string, Record<string, number>> = {
  'GA': {
    'Atlanta': 1.1, // 10% higher than default
    'Savannah': 0.9 // 10% lower than default
  },
  'NY': {
    'New York': 1.4 // 40% higher than default
  },
  'CA': {
    'Los Angeles': 1.3 // 30% higher than default
  },
  'TX': {
    'Houston': 1.05 // 5% higher than default
  }
}

export default function CirculationAnalysis({ state, city }: CirculationAnalysisProps) {
  const [loading, setLoading] = useState(true)
  const [expenses, setExpenses] = useState<ExpenseCategory[]>([])
  const [circulationAmount, setCirculationAmount] = useState(0)
  const [showResults, setShowResults] = useState(false)
  
  // Load location-specific expense data
  useEffect(() => {
    setLoading(true)
    setShowResults(false)
    
    setTimeout(() => {
      // Apply location-specific adjustments or use default
      const adjustmentFactor = EXPENSE_ADJUSTMENTS[state]?.[city] || 1.0
      
      // Create a copy of default expenses with adjusted costs
      const adjustedExpenses = DEFAULT_EXPENSES.map(expense => ({
        ...expense,
        averageMonthlyCost: Math.round(expense.averageMonthlyCost * adjustmentFactor)
      }))
      
      setExpenses(adjustedExpenses)
      setLoading(false)
    }, 800)
  }, [state, city])

  // Toggle whether an expense is spent at Black-owned businesses
  const toggleBlackOwned = (id: string) => {
    setExpenses(prev => 
      prev.map(expense => 
        expense.id === id 
          ? { ...expense, hasBlackOwned: !expense.hasBlackOwned } 
          : expense
      )
    )
  }

  // Calculate total circulation amount
  const calculateCirculation = () => {
    const total = expenses
      .filter(expense => expense.hasBlackOwned)
      .reduce((sum, expense) => sum + expense.averageMonthlyCost, 0)
    
    setCirculationAmount(total)
    setShowResults(true)
  }

  if (loading) {
    return <CirculationSkeleton />
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Money Circulation Analysis for {city}, {state}</h2>
      
      <Card className="bg-[#1B2130] border-[#2E3446] text-white">
        <CardHeader>
          <CardTitle>Select Your Black-Owned Business Expenses</CardTitle>
          <CardDescription className="text-gray-400">
            Check all expense categories where you spend money with Black-owned businesses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {expenses.map(expense => (
                <div 
                  key={expense.id}
                  className="flex items-center space-x-3 p-3 rounded-md bg-[#2A314B] border border-[#3B4559]"
                >
                  <Checkbox 
                    id={expense.id}
                    checked={expense.hasBlackOwned}
                    onCheckedChange={() => toggleBlackOwned(expense.id)}
                    className="border-[#4A5568]"
                  />
                  <div className="flex-1">
                    <Label 
                      htmlFor={expense.id} 
                      className="text-sm font-medium cursor-pointer flex justify-between"
                    >
                      <span>{expense.category}</span>
                      <span className="text-gray-400">${expense.averageMonthlyCost}/mo</span>
                    </Label>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button 
                className="bg-[#2563EB] hover:bg-blue-600 text-white"
                onClick={calculateCirculation}
              >
                Calculate Circulation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showResults && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-[#1B2130] border-[#2E3446] text-white md:col-span-2">
            <CardHeader>
              <CardTitle>Your Black Dollar Circulation</CardTitle>
              <CardDescription className="text-gray-400">
                Money circulating in the Black community based on your spending
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex items-center justify-between bg-[#2A314B] p-4 rounded-md">
                  <div>
                    <p className="text-gray-400 text-sm">Total Monthly Circulation</p>
                    <p className="text-3xl font-bold mt-1">${circulationAmount.toLocaleString()}</p>
                  </div>
                  <ArrowRight className="h-8 w-8 text-blue-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Annual Circulation</p>
                    <p className="text-3xl font-bold mt-1">${(circulationAmount * 12).toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#2A314B] rounded-md">
                    <DollarSign className="h-6 w-6 text-green-400 mb-2" />
                    <p className="text-sm text-gray-400">Circulation Percentage</p>
                    <p className="text-xl font-bold mt-1">
                      {circulationAmount === 0 ? 0 : Math.round((circulationAmount / expenses.reduce((sum, exp) => sum + exp.averageMonthlyCost, 0)) * 100)}%
                    </p>
                    <p className="text-xs text-gray-500 mt-2">of your total expenses</p>
                  </div>
                  
                  <div className="p-4 bg-[#2A314B] rounded-md">
                    <BadgeDollarSign className="h-6 w-6 text-purple-400 mb-2" />
                    <p className="text-sm text-gray-400">Selected Categories</p>
                    <p className="text-xl font-bold mt-1">
                      {expenses.filter(exp => exp.hasBlackOwned).length} / {expenses.length}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">expense categories</p>
                  </div>
                  
                  <div className="p-4 bg-[#2A314B] rounded-md">
                    <TrendingUp className="h-6 w-6 text-blue-400 mb-2" />
                    <p className="text-sm text-gray-400">Community Impact</p>
                    <p className="text-xl font-bold mt-1">
                      ${(circulationAmount * 0.85 * 12).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">annual community benefit</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1B2130] border-[#2E3446] text-white">
            <CardHeader>
              <CardTitle>Circulation Impact</CardTitle>
              <CardDescription className="text-gray-400">
                What this means for the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 border border-[#3B4559] rounded-lg">
                  <p className="text-sm text-gray-300">
                    By spending ${circulationAmount.toLocaleString()} monthly with Black-owned businesses, 
                    you're contributing approximately ${(circulationAmount * 12).toLocaleString()} annually 
                    to the Black economy in {city}.
                  </p>
                  <p className="text-sm text-gray-300 mt-4">
                    Money circulating within the community stays for an average of 6 hours, compared to 28 days 
                    in other communities.
                  </p>
                  <p className="text-sm text-gray-300 mt-4">
                    Increasing Black business patronage by just 10% could reduce Black unemployment 
                    significantly in your area.
                  </p>
                </div>
                
                <Button 
                  className="w-full bg-[#2563EB] hover:bg-blue-600 text-white"
                  onClick={() => setShowResults(false)}
                >
                  Modify Selections
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

function CirculationSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-64 bg-[#2E3446]" />
      
      <Card className="bg-[#1B2130] border-[#2E3446] text-white">
        <CardHeader>
          <Skeleton className="h-6 w-64 bg-[#2E3446]" />
          <Skeleton className="h-4 w-80 bg-[#2E3446]" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array(8).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full bg-[#2A314B]" />
            ))}
          </div>
          <div className="pt-4 flex justify-end">
            <Skeleton className="h-10 w-40 bg-[#2E3446]" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 