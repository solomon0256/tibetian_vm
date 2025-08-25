// src/courses/components/CourseCardGrid.tsx
import React from 'react'
import type { CourseLite } from '../types'

type Props = {
  courses: CourseLite[]
  onOpen: (slug: string) => void
}

/** Pure layout — renders a responsive grid of course cards. */
export default function CourseCardGrid({ courses, onOpen }: Props) {
  if (!courses?.length) {
    return <div className="text-sm text-muted-foreground">No courses yet.</div>
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((c) => (
        <article key={c.id} className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="mb-2 text-sm text-muted-foreground">{c.code ?? '—'}</div>
          <h4 className="text-base font-medium">{c.title}</h4>

          <div className="mt-4">
            <button
              className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
              onClick={() => onOpen(c.slug)}
            >
              Enter Course
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}
