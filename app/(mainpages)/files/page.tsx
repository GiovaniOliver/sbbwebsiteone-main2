/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import Layout from '@/app/components/usersmaincomponents/homefeed/homefeed-layout'
import { Card } from '@/app/components/molecules/cards/Card'
import { Button } from '@/app/components/atoms/buttons/Button'
import { Input } from '@/app/components/atoms/inputs/Input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/molecules/navigation/Tabs'
import { Search, BookOpen, Trophy, Star, Clock } from 'lucide-react'
import { useCourses } from '@/hooks/use-courses'
import { Badge } from '@/app/components/atoms/display/Badge'

const categories = [
  'All',
  'Business',
  'Technology',
  'Marketing',
  'Personal Development',
  'Leadership'
]

const levels = [
  'All Levels',
  'Beginner',
  'Intermediate',
  'Advanced'
]

export default function SBBUniversityPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All Levels')
  const [searchQuery, setSearchQuery] = useState('')
  
  const { data: courses, isLoading } = useCourses({
    category: selectedCategory === 'All' ? undefined : selectedCategory,
    level: selectedLevel === 'All Levels' ? undefined : selectedLevel.toLowerCase(),
    search: searchQuery
  })

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SBB University</h1>
              <p className="mt-2 text-gray-600">Expand your knowledge with our expert-led courses</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search courses..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Tabs defaultValue="courses" className="space-y-6">
            <TabsList>
              <TabsTrigger value="courses">All Courses</TabsTrigger>
              <TabsTrigger value="my-courses">My Courses</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
            </TabsList>

            <div className="flex space-x-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                <select
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>

            <TabsContent value="courses" className="space-y-6">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <div className="h-48 bg-gray-200 rounded-t-lg" />
                      <div className="p-4 space-y-3">
                        <div className="h-6 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                        <div className="h-4 bg-gray-200 rounded w-1/4" />
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses?.map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                      {course.thumbnail && (
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary">{course.category}</Badge>
                          <Badge variant="outline">{course.level}</Badge>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {course.description}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {Math.round(course.duration / 60)} hours
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-400" />
                            4.5 (128)
                          </div>
                        </div>
                        <Button className="w-full mt-4">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Start Learning
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="my-courses">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">My Enrolled Courses</h2>
                {/* Add enrolled courses content */}
              </div>
            </TabsContent>

            <TabsContent value="certificates">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">My Certificates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Add certificates content */}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  )
} 