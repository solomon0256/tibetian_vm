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
    <div className="rounded-xl border overflow-hidden flex flex-col">
      {coverImage ? <img src={coverImage} alt="" className="aspect-video object-cover" /> : null}
      <div className="p-3">
        <div className="font-medium">{title}</div>
        {summary ? <div className="text-sm text-muted-foreground line-clamp-2">{summary}</div> : null}
        <div className="mt-3">
          <button onClick={onOpen} className="rounded-md border px-3 py-1 text-sm hover:bg-accent">
            Open
          </button>
        </div>
      </div>
    </div>
  )
}
