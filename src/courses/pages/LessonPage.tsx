// src/courses/pages/LessonPage.tsx
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PaywallNotice from '../components/PaywallNotice'
import { listLocalLessons, loadLocalLessonModule } from '../content/loader'
import { usePaywall } from '../hooks/usePaywall'

type Progress = { pageIndex: number; completed?: boolean }

export default function LessonPage() {
  const { courseSlug = 'basic-language', lessonSlug = '' } = useParams()
  const navigate = useNavigate()

  // lessons of this course (from local meta)
  const lessons = useMemo(() => listLocalLessons(courseSlug), [courseSlug])
  const idx = lessons.findIndex((l) => l.slug === lessonSlug)
  const cur = lessons[idx]

  const { locked } = usePaywall(courseSlug, cur?.order ?? 0)

  // component & meta
  const [Comp, setComp] = useState<React.ComponentType<{ pageIndex?: number }> | null>(null)
  const [meta, setMeta] = useState<any>(null)
  const [pagesCount, setPagesCount] = useState<number>(1)
  const [pageIndex, setPageIndex] = useState<number>(0)

  // localStorage helpers (temporary; DB later)
  const lsKey = `lesson:${courseSlug}/${lessonSlug}`
  const safeRead = (): Progress => {
    try {
      const raw = localStorage.getItem(lsKey)
      if (!raw) return { pageIndex: 0, completed: false }
      const obj = JSON.parse(raw)
      return {
        pageIndex: typeof obj?.pageIndex === 'number' && obj.pageIndex >= 0 ? obj.pageIndex | 0 : 0,
        completed: !!obj?.completed,
      }
    } catch {
      return { pageIndex: 0, completed: false }
    }
  }
  const safeWrite = (p: Progress) => {
    try { localStorage.setItem(lsKey, JSON.stringify(p)) } catch {}
  }

  // invalid slug -> back
  useEffect(() => {
    if (!cur) navigate(`/courses/${courseSlug}`)
  }, [cur, courseSlug, navigate])

  // ✅ load via loader.ts (no string-built import path)
  useEffect(() => {
    if (!cur || locked) return
    ;(async () => {
      try {
        const mod = await loadLocalLessonModule(`${courseSlug}/${cur.slug}`)
        setComp(() => (mod.default as React.ComponentType<{ pageIndex?: number }>))
        setMeta(mod.meta ?? null)

        const total = typeof mod?.meta?.pages === 'number' && mod.meta.pages > 0 ? mod.meta.pages : 1
        setPagesCount(total)

        const saved = safeRead()
        const clamped = Math.max(0, Math.min(saved.pageIndex || 0, total - 1))
        setPageIndex(clamped)
      } catch (err) {
        console.error('load lesson failed:', err)
        setComp(() => () => <div className="text-sm text-red-500">Failed to load content.</div>)
      }
    })()
  }, [cur, locked, courseSlug])

  if (!cur) return null

  const canPrev = pageIndex > 0
  const canNext = pageIndex < pagesCount - 1
  const onPrev = () => {
    if (!canPrev) return
    const n = pageIndex - 1
    setPageIndex(n); safeWrite({ pageIndex: n, completed: false })
  }
  const onNext = () => {
    if (!canNext) return
    const n = pageIndex + 1
    setPageIndex(n); safeWrite({ pageIndex: n, completed: false })
  }
  const onComplete = () => {
    safeWrite({ pageIndex: pagesCount - 1, completed: true })
    // TODO: later also persist to DB (markLessonDone)
    navigate(`/courses/${courseSlug}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{meta?.title ?? cur.title}</h1>
        {meta?.duration && <div className="text-sm text-muted-foreground">Duration: {meta.duration}</div>}
        <div className="text-sm text-muted-foreground mt-1">Page {Math.min(pageIndex + 1, pagesCount)} / {pagesCount}</div>
      </div>

      {locked ? (
        <PaywallNotice open={true} onClose={() => navigate(`/courses/${courseSlug}`)} />
      ) : (
        <div className="prose max-w-none">
          {Comp ? <Comp pageIndex={pageIndex} /> : <div className="text-sm text-muted-foreground">Loading…</div>}
        </div>
      )}

      <div className="mt-8 flex justify-between items-center gap-3">
        <button className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50" onClick={onPrev} disabled={!canPrev}>
          ← Prev
        </button>
        {canNext ? (
          <button className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50" onClick={onNext} disabled={!canNext}>
            Next →
          </button>
        ) : (
          <button className="rounded-md border px-3 py-1.5 text-sm" onClick={onComplete}>
            Complete
          </button>
        )}
      </div>
    </div>
  )
}
