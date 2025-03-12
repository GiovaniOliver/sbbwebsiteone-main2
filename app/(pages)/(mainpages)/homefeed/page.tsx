import { Metadata } from 'next'
import Layout from '@/app/components/usersmaincomponents/homefeed/layout'
import MainFeed from '@/app/components/usersmaincomponents/homefeed/MainFeed'
import { Suspense } from 'react'
import { Skeleton } from '@/app/components/ui/skeleton'

export const metadata: Metadata = {
  title: 'Home Feed | SBB DAO',
  description: 'View and interact with posts from the SBB DAO community'
}

export default function HomeFeedPage() {
  return (
    <Layout>
      <Suspense fallback={
        <div className="max-w-3xl mx-auto space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 space-y-4 bg-white rounded-lg shadow animate-pulse">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </div>
              <Skeleton className="h-20 w-full" />
              <div className="flex space-x-4">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          ))}
        </div>
      }>
        <MainFeed />
      </Suspense>
    </Layout>
  )
}





