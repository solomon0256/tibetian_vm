// src/courses/pages/CoursesListPage.tsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CourseTabs, { type CoursesTab } from '../components/CourseTabs'
import LessonList from '../components/LessonList'
import CategoryPills from '../components/CategoryPills'
import { listLocalLessons } from '../content/loader'

const DEFAULT_COURSE = 'basic-language' as const

const PILL_ITEMS = [
  { slug: 'basic-language', title: 'Basic Language Framework' },
  { slug: 'travel-scenes',  title: 'Travel Scene Practice' },
  { slug: 'professional',   title: 'Professional Study' },
] as const

// 仅用于把 slug 映射为页面显示的课程标题（不依赖后端）
const COURSE_TITLES: Record<string, string> = {
  'basic-language': 'Basic Language Framework',
  'travel-scenes' : 'Travel Scene Practice',
  'professional'  : 'Professional Study',
}

/** 本地预览：从 src/courses/content//index.tsx 自动发现并取 meta */
async function getLocalPreview(courseSlug: string): Promise<{
  courseTitle: string
  lessons: Array<{
    id: number
    title: string
    slug: string
    order: number
    summary?: string
  }>
}> {
  const metas = listLocalLessons(courseSlug)
  const courseTitle = COURSE_TITLES[courseSlug] ?? 'Course'

  const lessons = metas.slice(0, 6).map((m, idx) => ({
    id: idx + 1,      // 仅作 React key
    title: m.title,
    slug: m.slug,
    order: m.order,
    summary: m.summary,
  }))

  return { courseTitle, lessons }
}

export default function CoursesListPage () {
  const navigate = useNavigate()

  // 顶部 Tab：默认 Language；切到 Scenic 直接去 /scenic
  const [tab, setTab] = useState<CoursesTab>('language')
  const onTab = (next: CoursesTab) => {
    setTab(next)
    if (next === 'scenic') navigate('/scenic')
  }

  // 当前预览的课程（默认 basic-language）
  const [activeCourse, setActiveCourse] = useState<string>(DEFAULT_COURSE)
  const [loading, setLoading] = useState<boolean>(true)
  const [title, setTitle] = useState<string>(COURSE_TITLES[DEFAULT_COURSE] ?? '')
  const [lessons, setLessons] = useState<
    Array<{ id: number; title: string; slug: string; order: number; summary?: string }>
  >([])

  // 载入本地预览（不依赖后端）
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    getLocalPreview(activeCourse)
      .then(({ courseTitle, lessons }) => {
        if (cancelled) return
        setTitle(courseTitle)
        setLessons(lessons)
        setLoading(false)
      })
      .catch(() => setLoading(false))
    return () => { cancelled = true }
  }, [activeCourse])

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Tabs */}
      <div className='mb-6'>
        <CourseTabs active={tab} onChange={onTab} />
      </div>

      {/* 中部：当前课程预览（不显示 “Preview” 字样） */}
      <section>
        {loading ? (
          <div className='text-sm text-muted-foreground'>Loading…</div>
        ) : (
          <LessonList
            title={title}
            lessons={lessons}
            // 点任意一条直接进入该课节
            onItemClick={(l) => navigate(`/courses/${activeCourse}/${l.slug}`)}
          />
        )}
      </section>

      {/* 底部：三枚按钮切换预览 */}
      <section className='mt-8'>
        <CategoryPills
          items={PILL_ITEMS as any}
          active={activeCourse}
          onSelect={(slug) => setActiveCourse(slug)}
        />
      </section>
    </div>
  )
}
