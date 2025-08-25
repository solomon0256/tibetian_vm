// app\src\wiki\content\culture-history\architecture\1\index.tsx
import React from 'react'
import type { WikiMeta } from '../../../../data/types'


export const meta: WikiMeta = {
  title: 'Great Wall',
  summary: 'Major fortification system; sections, construction, cultural significance.',

}

export default function GreatWall() {
  return (
    <article className="prose max-w-none">
      <h2>{meta.title}</h2>
      <p>The wall spans multiple provinces with distinct materials and periods…</p>
    </article>
  )
}
