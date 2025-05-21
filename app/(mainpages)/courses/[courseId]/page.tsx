/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Layout from '@/app/components/usersmaincomponents/homefeed/homefeed-layout'
import { Card } from '@/app/components/molecules/cards/Card'
import { Button } from '@/app/components/atoms/buttons/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/molecules/navigation/Tabs'
import { Badge } from '@/app/components/atoms/display/Badge'
import { BookOpen, Clock, Star, MessageSquare, Award } from 'lucide-react'
import { useCourse } from '@/hooks/use-course'

export default function CoursePage() {
  const { courseId } = useParams()
  const [activeTab, setActiveTab] = useState('overview')
  const { data: course, isLoading } = useCourse(courseId as string)

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-gray-200 rounded w-1/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <div className="h-64 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
                <div className="space-y-4">
                  <div className="h-48 bg-gray-200 rounded" />
                  <div className="h-12 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  if (!course) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Course not found</h1>
              <p className="mt-2 text-gray-600">The course you're looking for doesn't exist.</p>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
                  <p className="mt-2 text-gray-600">{course.description}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <Badge variant="secondary">{course.category}</Badge>
                  <Badge variant="outline">{course.level}</Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {Math.round(course.duration / 60)} hours
                  </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                    <TabsTrigger value="discussions">Discussions</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <Card className="p-6">
                      <h2 className="text-xl font-semibold mb-4">What you'll learn</h2>
                      <ul className="space-y-2">
                        {/* Add learning objectives */}
                      </ul>
                    </Card>

                    <Card className="p-6">
                      <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                      <ul className="space-y-2">
                        {/* Add course requirements */}
                      </ul>
                    </Card>
                  </TabsContent>

                  <TabsContent value="curriculum" className="space-y-6">
                    {course.lessons?.map((lesson) => (
                      <Card key={lesson.id} className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">{lesson.title}</h3>
                            <p className="text-sm text-gray-500">
                              {Math.round(lesson.duration)} minutes
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            <BookOpen className="h-4 w-4 mr-2" />
                            Start Lesson
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="discussions" className="space-y-6">
                    {course.discussions?.map((discussion) => (
                      <Card key={discussion.id} className="p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">{discussion.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{discussion.content}</p>
                            <div className="flex items-center mt-2 text-sm text-gray-500">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              {discussion.replies?.length || 0} replies
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="reviews" className="space-y-6">
                    {course.reviews?.map((review) => (
                      <Card key={review.id} className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-1">
                            <div className="flex items-center">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                                    fill="currentColor"
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="mt-2 text-gray-600">{review.comment}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    {course.thumbnail && (
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <Button className="w-full" size="lg">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Enroll Now
                  </Button>

                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-2">This course includes:</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2" />
                        {course.lessons?.length || 0} lessons
                      </li>
                      <li className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {Math.round(course.duration / 60)} hours
                      </li>
                      <li className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Course discussions
                      </li>
                      <li className="flex items-center">
                        <Award className="h-4 w-4 mr-2" />
                        Certificate of completion
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 