// src/courses/operations.ts
import { HttpError } from 'wasp/server'
import { ProgressStatus } from '@prisma/client'   
import { z } from 'zod'                           

// 课程卡片列表（课程总览）
export const getCourses = async (_args: unknown, context: any) => {
  return context.entities.Course.findMany({
    select: { id: true, title: true, slug: true, code: true, category: true },
    orderBy: { title: 'asc' },
  })
}

// 课程详情 + 课节列表
export const getCourseWithLessons = async (args: unknown, context: any) => {
  const { courseSlug } = (args as { courseSlug: string })
  const course = await context.entities.Course.findUnique({
    where: { slug: courseSlug },
    select: {
      id: true, title: true, slug: true, code: true, category: true,
      lessons: {
        select: { id: true, title: true, slug: true, order: true, contentKey: true },
        orderBy: { order: 'asc' },
      }
    }
  })
  if (!course) throw new HttpError(404, 'Course not found')
  return course
}

// 课节详情（带 course 基本信息）
export const getLessonBySlug = async (args: unknown, context: any) => {
  const { courseSlug, lessonSlug } = (args as { courseSlug: string, lessonSlug: string })

  const course = await context.entities.Course.findUnique({
    where: { slug: courseSlug },
    select: { id: true, title: true, slug: true }
  })
  if (!course) throw new HttpError(404, 'Course not found')

  const lesson = await context.entities.Lesson.findFirst({
    where: { courseId: course.id, slug: lessonSlug },
    select: { id: true, title: true, slug: true, order: true, contentKey: true }
  })
  if (!lesson) throw new HttpError(404, 'Lesson not found')

  return { course, lesson }
}

/* ---------------------- 新增：标记课节完成 ---------------------- */
const MarkArgs = z.object({ contentKey: z.string().min(1) })

export const markLessonDone = async (rawArgs: unknown, context: any) => {
  if (!context.user) throw new HttpError(401, 'Unauthorized')
  const { contentKey } = MarkArgs.parse(rawArgs)

  // 你的枚举大概率是 completed；兜底兼容常见写法
  const DONE =
    (ProgressStatus as any).completed ??
    (ProgressStatus as any).COMPLETED ??
    (ProgressStatus as any).done ??
    (ProgressStatus as any).DONE ??
    ('completed' as any)

  return context.entities.Progress.upsert({
    where: { userId_contentKey: { userId: context.user.id, contentKey } },
    update: { status: DONE },
    create: { userId: context.user.id, contentKey, status: DONE },
  })
}
