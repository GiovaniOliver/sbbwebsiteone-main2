/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import Layout from '@/app/components/usersmaincomponents/homefeed/layout' 
import { Card } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs'
import { Badge } from '@/app/components/ui/badge'
import { Search, BookOpen, Trophy, Star, Clock, FileText } from 'lucide-react'
import { useCourses } from '@/hooks/use-courses'


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

// Mock data for files
const files = [
  {
    id: '1',
    name: 'Business Plan Template',
    type: 'PDF',
    size: '2.5 MB',
    category: 'Business',
    downloads: 234,
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    name: 'Marketing Strategy Guide',
    type: 'DOCX',
    size: '1.8 MB',
    category: 'Marketing',
    downloads: 156,
    lastUpdated: '2024-01-14'
  },
  {
    id: '3',
    name: 'Financial Model Spreadsheet',
    type: 'XLSX',
    size: '3.2 MB',
    category: 'Business',
    downloads: 189,
    lastUpdated: '2024-01-13'
  }
]

export default function SBBUniversityPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All Levels')
  const [searchQuery, setSearchQuery] = useState('')
  const { data: courses, isLoading } = useCourses()

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">SBB University</h1>
          <Button>Create Course</Button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search courses and resources..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="courses">
          <TabsList>
            <TabsTrigger value="courses">
              <BookOpen className="mr-2 h-4 w-4" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="files">
              <FileText className="mr-2 h-4 w-4" />
              Files
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-4">
            <div className="flex space-x-4 overflow-x-auto py-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="flex space-x-4 overflow-x-auto py-2">
              {levels.map((level) => (
                <Button
                  key={level}
                  variant={selectedLevel === level ? "default" : "outline"}
                  onClick={() => setSelectedLevel(level)}
                >
                  {level}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoading ? (
                Array(6).fill(0).map((_, i) => (
                  <Card key={i} className="p-4 space-y-4">
                    <div className="h-40 bg-gray-200 rounded-lg animate-pulse" />
                    <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                  </Card>
                ))
              ) : (
                courses?.map((course) => (
                  <Card key={course.id} className="p-4 space-y-4">
                    <div className="relative h-40 bg-gray-100 rounded-lg">
                      {/* Course thumbnail would go here */}
                    </div>
                    <div>
                      <h3 className="font-semibold">{course.title}</h3>
                      <p className="text-sm text-gray-500">{course.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">
                        <Trophy className="mr-1 h-3 w-3" />
                        {course.level}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="mr-1 h-3 w-3" />
                        {course.duration}
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="files" className="space-y-4">
            <div className="flex space-x-4 overflow-x-auto py-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4">
              {files.map((file) => (
                <Card key={file.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <FileText className="h-8 w-8 text-blue-500" />
                      <div>
                        <h3 className="font-semibold">{file.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{file.type}</span>
                          <span>•</span>
                          <span>{file.size}</span>
                          <span>•</span>
                          <span>{file.downloads} downloads</span>
                        </div>
                      </div>
                    </div>
                    <Button>Download</Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
} 