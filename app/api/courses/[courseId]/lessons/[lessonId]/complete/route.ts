import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ensureUserExists } from '@/lib/auth'

export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string; lessonId: string } }
) {
  try {
    const currentUser = await ensureUserExists()
    if (!currentUser) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    // Get the enrollment and check if the user is enrolled in the course
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

    // Mark the lesson as completed
    const lessonProgress = await prisma.lessonProgress.upsert({
      where: {
        lessonId_userId: {
          lessonId: params.lessonId,
          userId: currentUser.id,
        },
      },
      update: {
        completed: true,
      },
      create: {
        lessonId: params.lessonId,
        userId: currentUser.id,
        completed: true,
      },
    })

    // Calculate overall course progress
    const [completedLessons, totalLessons] = await Promise.all([
      prisma.lessonProgress.count({
        where: {
          userId: currentUser.id,
          completed: true,
          lesson: {
            courseId: params.courseId,
          },
        },
      }),
      prisma.lesson.count({
        where: {
          courseId: params.courseId,
        },
      }),
    ])

    const progress = (completedLessons / totalLessons) * 100

    // Update enrollment progress
    const updatedEnrollment = await prisma.enrollment.update({
      where: {
        id: enrollment.id,
      },
      data: {
        progress,
        completed: progress === 100,
      },
    })

    // If the course is completed, generate a certificate
    if (progress === 100) {
      const existingCertificate = await prisma.certificate.findFirst({
        where: {
          enrollmentId: enrollment.id
        }
      });

      if (!existingCertificate) {
        const certificate = await prisma.certificate.create({
          data: {
            enrollmentId: enrollment.id,
            certificateUrl: `https://example.com/certificates/${enrollment.id}`, // Replace with actual certificate generation
          },
        })

        return NextResponse.json({
          success: true,
          lessonProgress,
          enrollment: updatedEnrollment,
          certificate,
        })
      }
    }

    return NextResponse.json({
      success: true,
      lessonProgress,
      enrollment: updatedEnrollment,
    })
  } catch (error) {
    console.error('Error completing lesson:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to complete lesson' },
      { status: 500 }
    )
  }
} 