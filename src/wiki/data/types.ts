// src/wiki/data/types.ts
import type { ComponentType } from 'react'

export type Domain = 'culture-history' | 'tourism-landscape'

export type WikiMeta = {
  title: string
  summary?: string
  coverImage?: string
  tags?: string[]
  duration?: string
}

export type WikiModule = {
  default: ComponentType<any>
  meta: WikiMeta
}

export type WikiEntryLite = {
  id: string                // "culture-history/architecture/great-wall"
  domain: Domain
  category: string          // "architecture"
  slug: string              // "great-wall"
  title: string
  summary?: string
  coverImage?: string
}
