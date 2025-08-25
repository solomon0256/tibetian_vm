// src/courses/components/CategoryPills.tsx
import React from 'react'
import { cn } from '../../lib/utils' // 如果没有 cn，直接用字符串拼接即可

type Item = { slug: string; title: string }

export default function CategoryPills({
  items,
  active,
  onSelect
}: {
  items: Item[]
  active: string
  onSelect: (slug: string) => void
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map(it => (
        <button
          key={it.slug}
          onClick={() => onSelect(it.slug)}
          className={cn(
            'w-full rounded-xl border px-4 py-3 text-center text-sm font-medium transition-colors',
            active === it.slug
              ? 'bg-black text-white hover:bg-black/90' // 夜间模式下也是黑底
              : 'bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground'
          )}
        >
          {it.title}
        </button>
      ))}
    </div>
  )
}
