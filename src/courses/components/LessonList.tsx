// src/courses/components/LessonList.tsx
import React from 'react'
import LessonListItem from './LessonListItem'

type Item = {
  id: number
  title: string
  slug: string
  order: number
  summary?: string
  isFree?: boolean
  locked?: boolean
}

export default function LessonList({
  title,
  lessons,
  onItemClick
}: {
  title: string
  lessons: Item[]
  onItemClick?: (lesson: Item) => void
}) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground">
      {title ? (
        <div className="border-b p-4">
          <h4 className="text-base font-semibold">{title}</h4>
        </div>
      ) : null}

      {!lessons?.length ? (
        <div className="p-4 text-sm text-muted-foreground">No lessons yet.</div>
      ) : (
        <ul className="divide-y">
          {lessons.map((l) => (
            <LessonListItem key={l.id} {...l} onClick={() => onItemClick?.(l)} />
          ))}
        </ul>
      )}
    </div>
  )
}
