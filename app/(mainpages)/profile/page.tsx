'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { Skeleton } from '@/app/components/atoms/feedback/Skeleton'
import Link from 'next/link'
import { Card } from '@/app/components/molecules/cards/Card'
import { Button } from '@/app/components/atoms/buttons/Button'
import { Loader2 } from 'lucide-react'

export default function DefaultProfilePage() {
  const router = useRouter()
  const { user, isLoading } = useUser()

  useEffect(() => {
    // Only redirect if we have a user and we're not loading
    if (!isLoading && user) {
      console.log('Profile page - Redirecting to user profile', user.id);
      router.push(`/profile/${user.id}`);
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="container py-6 space-y-6">
        <Card className="p-6">
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mb-4" />
            <p>Loading your profile...</p>
          </div>
        </Card>
      </div>
    )
  }
  
  if (!user) {
    return (
      <div className="container py-6 space-y-6">
        <Card className="p-6">
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <h1 className="text-xl font-bold">Authentication Required</h1>
            <p>You need to be signed in to view your profile</p>
            <div className="flex gap-4 mt-4">
              <Link href="/sign-in">
                <Button>
                  Sign In
                </Button>
              </Link>
              <Link href="/auth-debug">
                <Button variant="outline">
                  Check Auth Status
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  // This should never be shown as the useEffect should redirect
  return (
    <div className="container py-6 space-y-6">
      <Card className="p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <p>Redirecting to your profile...</p>
        </div>
      </Card>
    </div>
  )
}
