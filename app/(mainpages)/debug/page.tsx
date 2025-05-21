'use client'

import { useUser } from '@/hooks/useUser'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/molecules/cards/Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/molecules/navigation/Tabs'
import { AlertTriangle, ShieldAlert, Database } from 'lucide-react'
import dynamic from 'next/dynamic'
import Layout from '@/app/components/usersmaincomponents/homefeed/homefeed-layout'

// Dynamically import the RLS Checker to avoid rendering issues
const RlsChecker = dynamic(() => import('@/app/components/debug/rlsChecker'), {
  ssr: false,
  loading: () => <p className="p-4 text-gray-500 dark:text-gray-400">Loading RLS checker...</p>
})

export default function DebugPage() {
  const { user, isLoading } = useUser()
  
  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </Layout>
    )
  }
  
  if (!user) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <Card className="max-w-md w-full dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2 dark:text-gray-100">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Authentication Required
              </CardTitle>
              <CardDescription className="dark:text-gray-300">
                You need to be logged in to access this page.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </Layout>
    )
  }
  
  return (
    <Layout>
      <div className="container mx-auto py-6 px-4 md:px-6 max-w-6xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Debug Tools
        </h1>
        
        <Tabs defaultValue="rls" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mb-6">
            <TabsTrigger value="rls" className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4" />
              <span>RLS Policies</span>
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>Database</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="rls" className="mt-4">
            <RlsChecker />
          </TabsContent>
          
          <TabsContent value="database" className="mt-4">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl dark:text-gray-100">Database Inspector</CardTitle>
                <CardDescription className="dark:text-gray-300">
                  Coming soon - Database inspection tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  This feature is under development. Check back later for database inspection tools.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
} 