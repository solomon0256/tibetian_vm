// src/wiki/components/WikiItemCard.tsx
import React from 'react'

type Props = {
  title: string
  summary?: string
  coverImage?: string
  onOpen?: () => void
}

export default function WikiItemCard({ title, summary, coverImage, onOpen }: Props) {
  return (
    <button
      onClick={onOpen}
      className="w-full rounded-xl border text-left hover:bg-accent transition focus:outline-none focus:ring-2 focus:ring-offset-2 p-3"
      aria-label={`Open ${title}`}
    >
      {coverImage ? (
        <img src={coverImage} alt="" className="mb-3 aspect-video object-cover rounded-lg" />
      ) : null}
      <div className="font-medium">{title}</div>
      {summary ? (
        <div className="text-sm text-muted-foreground line-clamp-1 mt-1">
          {summary}
        </div>
      ) : null}
    </button>
  )
}
