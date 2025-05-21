'use client'

import { useState } from 'react'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/app/components/molecules/cards/Card'
import { 
  Users, 
  TrendingUp, 
  Building2, 
  ShoppingBag, 
  UserPlus,
  Repeat, 
  DollarSign,
  ArrowRight
} from 'lucide-react'
import { Progress } from '@/app/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/molecules/navigation/Tabs'
import { Slider } from '@/app/components/ui/slider'
import { Button } from '@/app/components/atoms/buttons/Button'
import { Input } from '@/app/components/atoms/inputs/Input'
import { Label } from '@/app/components/atoms/feedback/Label'

interface BuyingPowerExamplesProps {
  selectedState: string
  selectedCity: string
}

export default function BuyingPowerExamples({ selectedState, selectedCity }: BuyingPowerExamplesProps) {
  // State for the spending calculator
  const [monthlySpending, setMonthlySpending] = useState<number>(100)
  const [peopleCount, setPeopleCount] = useState<number>(1000)
  const [multiplier, setMultiplier] = useState<number>(12)
  
  // State for the business impact calculator
  const [productPrice, setProductPrice] = useState<number>(50)
  const [customersPerMonth, setCustomersPerMonth] = useState<number>(1000)
  const [jobsSupported, setJobsSupported] = useState<number>(4)
  
  // State for industry spending calculator
  const [industrySpendingPercent, setIndustrySpendingPercent] = useState<number>(20)
  const [monthlyBudget, setMonthlyBudget] = useState<number>(3000)
  
  // Calculate total monthly revenue
  const totalMonthlyRevenue = productPrice * customersPerMonth
  
  // Calculate total spending impact
  const individualYearlyImpact = monthlySpending * 12
  const communityYearlyImpact = individualYearlyImpact * peopleCount
  
  // Calculate industry impact
  const blackBusinessAmount = (monthlyBudget * industrySpendingPercent) / 100
  const communityIndustryImpact = blackBusinessAmount * 10000 // 10,000 people

  return (
    <Card className="dark:bg-zinc-900">
      <CardHeader>
        <CardTitle>Buying Power Impact Examples</CardTitle>
        <CardDescription>
          Calculate potential economic impacts in {selectedCity}, {selectedState}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="smallImpact">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="smallImpact">Small-Scale Impact</TabsTrigger>
            <TabsTrigger value="businessGrowth">Business Growth</TabsTrigger>
            <TabsTrigger value="industrySpending">Industry Spending</TabsTrigger>
          </TabsList>
          
          {/* Small Scale Impact */}
          <TabsContent value="smallImpact" className="space-y-4">
            <Card className="bg-[#1B2130] border-[#2E3446] text-white">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-400" />
                  <CardTitle>Small Scale Impact</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                  How individual spending habits create community impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="monthly-spending" className="text-gray-400">Monthly spending at Black-owned businesses ($)</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="monthly-spending"
                            type="number"
                            value={monthlySpending}
                            onChange={(e) => setMonthlySpending(Number(e.target.value))}
                            className="bg-[#2E3446] border-[#3D4E66] text-white"
                          />
                          <span className="text-sm text-gray-400">per month</span>
                        </div>
                        <Slider
                          onValueChange={(value: number[]) => setMonthlySpending(value[0])}
                          defaultValue={[100]}
                          min={10}
                          max={500}
                          step={10}
                          value={[monthlySpending]}
                          className="py-4"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="people-count" className="text-gray-400">Number of people with similar spending habits</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="people-count"
                            type="number"
                            value={peopleCount}
                            onChange={(e) => setPeopleCount(Number(e.target.value))}
                            className="bg-[#2E3446] border-[#3D4E66] text-white"
                          />
                          <span className="text-sm text-gray-400">people</span>
                        </div>
                        <Slider
                          onValueChange={(value: number[]) => setPeopleCount(value[0])}
                          defaultValue={[1000]}
                          min={100}
                          max={10000}
                          step={100}
                          value={[peopleCount]}
                          className="py-4"
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-between space-y-4 bg-[#232A3C] p-4 rounded-lg border border-[#2E3446]">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Individual Impact</h3>
                        <p className="text-sm text-gray-400 mb-2">
                          Your monthly spending of ${monthlySpending} adds up to:
                        </p>
                        <div className="text-2xl font-bold text-green-400 mb-4">
                          ${individualYearlyImpact.toLocaleString()} per year
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Community Impact</h3>
                        <p className="text-sm text-gray-400 mb-2">
                          If {peopleCount.toLocaleString()} people spent the same amount:
                        </p>
                        <div className="text-3xl font-bold text-green-400">
                          ${communityYearlyImpact.toLocaleString()} per year
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-500/20 p-2 rounded-full">
                        <TrendingUp className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-blue-400 mb-1">Impact Insight</h3>
                        <p className="text-sm text-gray-300">
                          If {peopleCount.toLocaleString()} people spent ${monthlySpending} per month with Black businesses, we would generate over ${communityYearlyImpact.toLocaleString()} per year circulating within our community.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Business Growth Impact */}
          <TabsContent value="businessGrowth" className="space-y-4">
            <Card className="bg-[#1B2130] border-[#2E3446] text-white">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5 text-purple-400" />
                  <CardTitle>Business Growth Impact</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                  How consumer spending supports jobs in the community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="product-price" className="text-gray-400">Average product/service price ($)</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="product-price"
                            type="number"
                            value={productPrice}
                            onChange={(e) => setProductPrice(Number(e.target.value))}
                            className="bg-[#2E3446] border-[#3D4E66] text-white"
                          />
                          <span className="text-sm text-gray-400">per purchase</span>
                        </div>
                        <Slider
                          onValueChange={(value: number[]) => setProductPrice(value[0])}
                          defaultValue={[50]}
                          min={10}
                          max={200}
                          step={5}
                          value={[productPrice]}
                          className="py-4"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="customers-count" className="text-gray-400">Monthly customers</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="customers-count"
                            type="number"
                            value={customersPerMonth}
                            onChange={(e) => setCustomersPerMonth(Number(e.target.value))}
                            className="bg-[#2E3446] border-[#3D4E66] text-white"
                          />
                          <span className="text-sm text-gray-400">customers</span>
                        </div>
                        <Slider
                          onValueChange={(value: number[]) => setCustomersPerMonth(value[0])}
                          defaultValue={[1000]}
                          min={100}
                          max={2000}
                          step={100}
                          value={[customersPerMonth]}
                          className="py-4"
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-between space-y-4 bg-[#232A3C] p-4 rounded-lg border border-[#2E3446]">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Business Revenue</h3>
                        <p className="text-sm text-gray-400 mb-2">
                          With {customersPerMonth} customers buying ${productPrice} products:
                        </p>
                        <div className="text-2xl font-bold text-purple-400 mb-4">
                          ${totalMonthlyRevenue.toLocaleString()} per month
                        </div>
                        <div className="text-xl font-semibold text-purple-300">
                          ${(totalMonthlyRevenue * 12).toLocaleString()} per year
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Job Creation Impact</h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <UserPlus className="h-5 w-5 text-purple-400" />
                          <p className="text-sm text-gray-300">
                            This revenue can support approximately:
                          </p>
                        </div>
                        <div className="text-3xl font-bold text-purple-400">
                          {Math.floor(totalMonthlyRevenue / 10000)} full-time jobs
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          (at $40,000 annual salary)
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="bg-purple-500/20 p-2 rounded-full">
                        <Building2 className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-purple-400 mb-1">Impact Insight</h3>
                        <p className="text-sm text-gray-300">
                          Your spending helps create jobs in the community. If {customersPerMonth.toLocaleString()} people buy from Black businesses, they can sustain full-time employment for {Math.floor(totalMonthlyRevenue / 10000)} people!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Industry Spending Impact */}
          <TabsContent value="industrySpending" className="space-y-4">
            <Card className="bg-[#1B2130] border-[#2E3446] text-white">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="h-5 w-5 text-amber-400" />
                  <CardTitle>Consumer Spending by Industry</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                  Impact of redirecting a percentage of spending to Black-owned businesses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="monthly-budget" className="text-gray-400">Average Monthly Budget ($)</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="monthly-budget"
                            type="number"
                            value={monthlyBudget}
                            onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                            className="bg-[#2E3446] border-[#3D4E66] text-white"
                          />
                          <span className="text-sm text-gray-400">per month</span>
                        </div>
                        <Slider
                          onValueChange={(value: number[]) => setMonthlyBudget(value[0])}
                          defaultValue={[3000]}
                          min={1000}
                          max={5000}
                          step={100}
                          value={[monthlyBudget]}
                          className="py-4"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="spending-percent" className="text-gray-400">
                          Percentage to Black-owned businesses (%)
                        </Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="spending-percent"
                            type="number"
                            value={industrySpendingPercent}
                            onChange={(e) => setIndustrySpendingPercent(Number(e.target.value))}
                            className="bg-[#2E3446] border-[#3D4E66] text-white"
                          />
                          <span className="text-sm text-gray-400">%</span>
                        </div>
                        <Slider
                          onValueChange={(value: number[]) => setIndustrySpendingPercent(value[0])}
                          defaultValue={[20]}
                          min={5}
                          max={50}
                          step={5}
                          value={[industrySpendingPercent]}
                          className="py-4"
                        />
                      </div>
                      
                      <div className="p-4 bg-[#232A3C] rounded-lg border border-[#2E3446] space-y-3">
                        <h3 className="font-medium">Essential Monthly Expenses</h3>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Housing/Rent</span>
                            <span>${Math.round(monthlyBudget * 0.4)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Food & Dining</span>
                            <span>${Math.round(monthlyBudget * 0.17)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Transportation</span>
                            <span>${Math.round(monthlyBudget * 0.1)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Health & Wellness</span>
                            <span>${Math.round(monthlyBudget * 0.08)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Shopping & Retail</span>
                            <span>${Math.round(monthlyBudget * 0.1)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Entertainment</span>
                            <span>${Math.round(monthlyBudget * 0.07)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Miscellaneous</span>
                            <span>${Math.round(monthlyBudget * 0.08)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-6">
                      <div className="bg-[#232A3C] p-4 rounded-lg border border-[#2E3446]">
                        <h3 className="text-lg font-medium mb-3">Your Redirected Spending</h3>
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="bg-[#1B2130] p-3 rounded-full">
                            <ArrowRight className="h-6 w-6 text-amber-400" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 mb-1">
                              {industrySpendingPercent}% of your monthly budget
                            </p>
                            <div className="text-2xl font-bold text-amber-400">
                              ${blackBusinessAmount.toFixed(0)} per month
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm text-gray-400">Percentage of budget redirected</p>
                          <Progress value={industrySpendingPercent} max={100} className="h-2 bg-[#2E3446]" />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>0%</span>
                            <span>25%</span>
                            <span>50%</span>
                            <span>75%</span>
                            <span>100%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-[#232A3C] p-4 rounded-lg border border-[#2E3446]">
                        <h3 className="text-lg font-medium mb-3">Community Impact (10,000 people)</h3>
                        <div className="p-4 bg-[#1B2130] rounded-lg">
                          <div className="text-center mb-3">
                            <p className="text-sm text-gray-400 mb-1">Monthly Revenue to Black Businesses</p>
                            <div className="text-3xl font-bold text-amber-400">
                              ${(communityIndustryImpact).toLocaleString()}
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-400 mb-1">Annual Revenue to Black Businesses</p>
                            <div className="text-2xl font-bold text-amber-300">
                              ${(communityIndustryImpact * 12).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="bg-amber-500/20 p-2 rounded-full">
                        <ShoppingBag className="h-5 w-5 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-amber-400 mb-1">Impact Insight</h3>
                        <p className="text-sm text-gray-300">
                          If just {industrySpendingPercent}% of your spending went to Black businesses, we could drive ${(communityIndustryImpact).toLocaleString()} in monthly revenue across the community (based on 10,000 people).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 