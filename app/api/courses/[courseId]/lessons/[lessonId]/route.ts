import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ensureUserExists } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string; lessonId: string } }
) {
  try {
    const currentUser = await ensureUserExists()
    if (!currentUser) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    // Get the lesson and check if the user is enrolled in the course
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        courseId: params.courseId,
        userId: currentUser.id,
      },
    })

    if (!enrollment) {
      return NextResponse.json(
        { success: false, error: 'Not enrolled in this course' },
        { status: 403 }
      )
    }

    // Get the lesson with progress and next lesson
    const lesson = await prisma.lesson.findUnique({
      where: {
        id: params.lessonId,
      },
      include: {
        progress: {
          where: {
            userId: currentUser.id,
          },
        },
      },
    })

    if (!lesson) {
      return NextResponse.json(
        { success: false, error: 'Lesson not found' },
        { status: 404 }
      )
    }

    // Get the next lesson in sequence
    const nextLesson = await prisma.lesson.findFirst({
      where: {
        courseId: params.courseId,
        order: {
          gt: lesson.order,
        },
      },
      orderBy: {
        order: 'asc',
      },
      select: {
        id: true,
        title: true,
      },
    })

    // Calculate lesson progress
    const lessonProgress = lesson.progress[0]
    const completed = lessonProgress?.completed || false

    // Format the response
    const formattedLesson = {
      ...lesson,
      progress: enrollment.progress,
      completed,
      nextLesson: nextLesson || null,
    }

    return NextResponse.json(formattedLesson)
  } catch (error) {
    console.error('Error fetching lesson:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch lesson' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { courseId: string; lessonId: string } }
) {
  try {
    const currentUser = await ensureUserExists()
    if (!currentUser) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    // Check if the user is the course instructor
    const course = await prisma.course.findUnique({
      where: {
        id: params.courseId,
      },
      select: {
        instructorId: true,
      },
    })

    if (!course || course.instructorId !== currentUser.id) {
      return NextResponse.json(
        { success: false, error: 'Not authorized to update this lesson' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { title, content, videoUrl, duration, order } = body

    const updatedLesson = await prisma.lesson.update({
      where: {
        id: params.lessonId,
      },
      data: {
        title,
        content,
        videoUrl,
        duration,
        order,
      },
    })

    return NextResponse.json(updatedLesson)
  } catch (error) {
    console.error('Error updating lesson:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update lesson' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { courseId: string; lessonId: string } }
) {
  try {
    const currentUser = await ensureUserExists()
    if (!currentUser) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    // Check if the user is the course instructor
    const course = await prisma.course.findUnique({
      where: {
        id: params.courseId,
      },
      select: {
        instructorId: true,
      },
    })

    if (!course || course.instructorId !== currentUser.id) {
      return NextResponse.json(
        { success: false, error: 'Not authorized to delete this lesson' },
        { status: 403 }
      )
    }

    await prisma.lesson.delete({
      where: {
        id: params.lessonId,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting lesson:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete lesson' },
      { status: 500 }
    )
  }
} 