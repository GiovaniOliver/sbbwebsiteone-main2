/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Layout from '@/app/components/usersmaincomponents/homefeed/homefeed-layout'
import { Card } from '@/app/components/molecules/cards/Card'
import { Button } from '@/app/components/atoms/buttons/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/molecules/navigation/Tabs'
import { useLesson } from '@/hooks/use-lesson'
import { BookOpen, CheckCircle, MessageSquare } from 'lucide-react'

export default function LessonPage() {
  const { courseId, lessonId } = useParams()
  const [activeTab, setActiveTab] = useState('content')
  const { lesson, isLoading, markAsCompleted } = useLesson(courseId as string, lessonId as string)

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-gray-200 rounded w-1/4" />
              <div className="h-96 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  if (!lesson) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Lesson not found</h1>
              <p className="mt-2 text-gray-600">The lesson you're looking for doesn't exist.</p>
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
                  <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
                  <p className="mt-2 text-gray-600">Lesson {lesson.order}</p>
                </div>

                {lesson.videoUrl && (
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <video
                      src={lesson.videoUrl}
                      controls
                      className="w-full h-full"
                      poster={lesson.thumbnail}
                    />
                  </div>
                )}

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <TabsList>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="discussion">Discussion</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="space-y-6">
                    <Card className="p-6">
                      <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: lesson.content }}
                      />
                    </Card>
                  </TabsContent>

                  <TabsContent value="discussion" className="space-y-6">
                    <Card className="p-6">
                      <h2 className="text-xl font-semibold mb-4">Discussion</h2>
                      {/* Add discussion component */}
                    </Card>
                  </TabsContent>

                  <TabsContent value="resources" className="space-y-6">
                    <Card className="p-6">
                      <h2 className="text-xl font-semibold mb-4">Additional Resources</h2>
                      {/* Add resources list */}
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Course Progress</h2>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                          In Progress
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-blue-600">
                          {lesson.progress}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                      <div
                        style={{ width: `${lesson.progress}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                      />
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => markAsCompleted()}
                    disabled={lesson.completed}
                  >
                    {lesson.completed ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      <>
                        <BookOpen className="h-4 w-4 mr-2" />
                        Mark as Completed
                      </>
                    )}
                  </Button>

                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-2">Next Up:</h3>
                    {lesson.nextLesson ? (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          // Navigate to next lesson
                        }}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        {lesson.nextLesson.title}
                      </Button>
                    ) : (
                      <p className="text-sm text-gray-600">
                        You've reached the end of this course!
                      </p>
                    )}
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