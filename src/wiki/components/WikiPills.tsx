// src/wiki/components/WikiPills.tsx
import React from 'react'

type Props = {
  items: string[]
  active?: string
  onSelect: (v: string) => void
}

export default function WikiPills({ items, active, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((x) => {
        const isActive = x === active
        return (
          <button
            key={x}
            onClick={() => onSelect(x)}
            className={
              'rounded-full border px-3 py-1 text-sm ' +
              (isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-accent')
            }
          >
            {x}
          </button>
        )
      })}
    </div>
  )
}
