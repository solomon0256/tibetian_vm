// src/courses/components/LessonListItem.tsx
import React from 'react'

export default function LessonListItem({
  order,
  title,
  summary,
  isFree,
  locked,
  onClick
}: {
  order: number
  title: string
  summary?: string
  isFree?: boolean
  locked?: boolean
  onClick?: () => void
}) {
  return (
    <li
      className={`flex items-center justify-between p-4 transition-colors
                  ${locked ? 'opacity-60' : 'cursor-pointer hover:bg-accent hover:text-accent-foreground'}`}
      onClick={locked ? undefined : onClick}
    >
      <div className="min-w-0">
        <div className="text-sm text-muted-foreground">Lesson {order}</div>
        <div className="truncate font-medium">{title}</div>
        {summary ? <div className="mt-1 line-clamp-1 text-sm text-muted-foreground">{summary}</div> : null}
      </div>

      <div className="ml-4 flex items-center gap-2">
        {isFree && <span className="rounded bg-green-600/10 px-2 py-0.5 text-xs text-green-600">Free</span>}
        {locked && <span className="rounded bg-muted px-2 py-0.5 text-xs">🔒 Locked</span>}
      </div>
    </li>
  )
}
