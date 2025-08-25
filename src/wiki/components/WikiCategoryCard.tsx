// src/wiki/components/WikiCategoryCard.tsx
import React from 'react'

type Props = {
  title: string
  subtitle?: string
  onClick?: () => void
}

export default function WikiCategoryCard({ title, subtitle, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl border p-6 text-left hover:bg-accent transition"
    >
      <div className="text-xl font-semibold">{title}</div>
      {subtitle ? <div className="mt-1 text-sm text-muted-foreground">{subtitle}</div> : null}
    </button>
  )
}
