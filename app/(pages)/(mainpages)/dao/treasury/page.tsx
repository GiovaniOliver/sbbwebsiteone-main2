'use client'

import Layout from '@/app/components/usersmaincomponents/homefeed/Layout'
import { Card } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs'
import { Coins, ArrowUpRight, ArrowDownRight, DollarSign, LineChart, Wallet } from 'lucide-react'

// Mock data for treasury assets
const treasuryAssets = [
  {
    id: 1,
    name: "SBB Token",
    symbol: "SBB",
    balance: 1500000,
    value: 750000,
    change: 5.2
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    balance: 150,
    value: 300000,
    change: -2.1
  },
  {
    id: 3,
    name: "USDC",
    symbol: "USDC",
    balance: 250000,
    value: 250000,
    change: 0
  }
]

// Mock data for recent transactions
const recentTransactions = [
  {
    id: 1,
    type: "outgoing",
    description: "Community Development Fund",
    amount: 50000,
    token: "SBB",
    date: "2023-12-05T10:30:00Z",
    status: "completed"
  },
  {
    id: 2,
    type: "incoming",
    description: "Treasury Swap: ETH to SBB",
    amount: 75000,
    token: "SBB",
    date: "2023-12-04T15:45:00Z",
    status: "completed"
  },
  {
    id: 3,
    type: "outgoing",
    description: "Marketing Campaign Payment",
    amount: 25000,
    token: "USDC",
    date: "2023-12-03T09:15:00Z",
    status: "completed"
  }
]

export default function TreasuryPage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Treasury</h1>
            <p className="text-gray-500">Manage and monitor DAO finances</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              Transfer
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Swap Assets
            </Button>
          </div>
        </div>

        {/* Treasury Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Wallet className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Value</p>
                <p className="text-xl font-semibold text-gray-900">$1.3M</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <LineChart className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Monthly Growth</p>
                <p className="text-xl font-semibold text-green-600">+12.5%</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Treasury Assets</p>
                <p className="text-xl font-semibold text-gray-900">5</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Asset List */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Treasury Assets</h2>
              <div className="space-y-4">
                {treasuryAssets.map((asset) => (
                  <div key={asset.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg">
                        <Coins className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{asset.name}</h3>
                        <p className="text-sm text-gray-500">{asset.balance.toLocaleString()} {asset.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${asset.value.toLocaleString()}</p>
                      <p className={`text-sm ${
                        asset.change > 0 ? 'text-green-600' : asset.change < 0 ? 'text-red-600' : 'text-gray-500'
                      }`}>
                        {asset.change > 0 ? '+' : ''}{asset.change}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Transactions */}
          <div>
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      transaction.type === 'incoming' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'incoming' ? (
                        <ArrowUpRight className={`h-4 w-4 ${
                          transaction.type === 'incoming' ? 'text-green-600' : 'text-red-600'
                        }`} />
                      ) : (
                        <ArrowDownRight className={`h-4 w-4 ${
                          transaction.type === 'incoming' ? 'text-green-600' : 'text-red-600'
                        }`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{transaction.description}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(transaction.date).toLocaleDateString()}
                          </p>
                        </div>
                        <p className={`font-medium ${
                          transaction.type === 'incoming' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'incoming' ? '+' : '-'}{transaction.amount.toLocaleString()} {transaction.token}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4">
                View All Transactions
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
} 