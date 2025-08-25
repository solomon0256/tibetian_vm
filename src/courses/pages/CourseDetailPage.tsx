//app\src\courses\pages\CourseDetailPage.tsx
import React, { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, getMembership } from 'wasp/client/operations'
import { isLessonFree, isMemberFrom } from '../hooks/usePaywall'

import CategoryPills from '../components/CategoryPills'
import LessonList from '../components/LessonList'
import PaywallNotice from '../components/PaywallNotice'
import { listLocalLessons } from '../content/loader'

const PILL_ITEMS = [
  { slug: 'basic-language', title: 'Basic Language Framework' },
  { slug: 'travel-scenes',  title: 'Travel Scene Practice' },
  { slug: 'professional',   title: 'Professional Study' },
] as const

const TITLE_BY_SLUG: Record<string, string> = {
  'basic-language': 'Basic Language Framework',
  'travel-scenes' : 'Travel Scene Practice',
  'professional'  : 'Professional Study',
}

export default function CourseDetailPage() {
  const { courseSlug = 'basic-language' } = useParams()
  const navigate = useNavigate()

  // 读取本门课的所有课节（来自本地 content/index.tsx 的 meta）
  const metas = useMemo(() => listLocalLessons(courseSlug), [courseSlug])

  // 会员信息（一次查询，全页复用）
  const { data: membership } = useQuery<unknown, any>(getMembership, {})

  const items = useMemo(() => {
    const member = isMemberFrom(membership)
    return metas.map((m, idx) => {
      const free = isLessonFree(courseSlug, m.order)
      const locked = !free && !member
      return {
        id: idx + 1,
        order: m.order,
        slug: m.slug,
        title: m.title,
        summary: m.summary,
        isFree: free,
        locked,
      }
    })
  }, [metas, membership, courseSlug])

  const [showPaywall, setShowPaywall] = useState(false)

  const onSelectCourse = (slug: string) => navigate(`/courses/${slug}`)

  const onItemClick = (lesson: { slug: string; order: number; locked?: boolean }) => {
    if (lesson.locked) {
      setShowPaywall(true) // ⛔️ 点击锁定课节 → 就地弹付费提示（不跳转）
      return
    }
    navigate(`/courses/${courseSlug}/${lesson.slug}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 顶部分类切换 */}
      <div className="mb-6">
        <CategoryPills
          items={PILL_ITEMS as any}
          active={courseSlug}
          onSelect={onSelectCourse}
        />
      </div>

      {/* 全部课节列表 */}
      <LessonList
        title={TITLE_BY_SLUG[courseSlug] ?? 'Course'}
        lessons={items}
        onItemClick={onItemClick}
      />

      {/* 付费提示（点击锁定项时出现） */}
      <PaywallNotice
        open={showPaywall}
        onClose={() => setShowPaywall(false)}
      />
    </div>
  )
}
