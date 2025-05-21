'use client'

import { useUser } from '@/hooks/useUser'
import { Button } from '@/app/components/atoms/buttons/Button'
import { Card, CardContent, CardFooter, CardHeader } from '@/app/components/molecules/cards/Card'
import { Progress } from '@/app/components/atoms/feedback/Progress'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

interface ProfileField {
  field: string
  label: string
  completed: boolean
}

export function ProfileCompletionCard() {
  const { user } = useUser()

  if (!user) return null

  const profileFields: ProfileField[] = [
    {
      field: 'avatar_url',
      label: 'Profile Picture',
      completed: !!user.user_metadata?.avatar_url
    },
    {
      field: 'full_name',
      label: 'Full Name',
      completed: !!user.user_metadata?.full_name
    },
    {
      field: 'bio',
      label: 'Bio',
      completed: !!user.user_metadata?.bio
    },
    {
      field: 'location',
      label: 'Location',
      completed: !!user.user_metadata?.location
    }
  ]

  const completedFields = profileFields.filter(field => field.completed)
  const completionPercentage = (completedFields.length / profileFields.length) * 100

  if (completionPercentage === 100) return null

  return (
    <Card className="bg-[#1B2130] border-[#2E3446] text-white mb-6">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <AlertCircle className="h-5 w-5 text-yellow-500" />
        <h3 className="text-lg font-semibold">Profile Incomplete</h3>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-gray-400 mb-4">
          Add a profile picture, bio, and personal details to make your profile stand out.
        </p>
        <Progress value={completionPercentage} className="h-2 mb-4" />
        <div className="space-y-2">
          {profileFields.map((field) => (
            <div key={field.field} className="flex items-center gap-2 text-sm">
              {field.completed ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <div className="h-4 w-4 rounded-full border-2 border-gray-500" />
              )}
              <span className={field.completed ? 'text-gray-400' : 'text-white'}>
                {field.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link href="/settings/profile" className="w-full">
          <Button 
            variant="primary"
            className="w-full bg-[#2563EB] hover:bg-blue-600 text-white"
          >
            Complete Profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
} 