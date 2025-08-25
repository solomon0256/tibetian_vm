// src/wiki/types.ts
export type WikiMeta = {
    title: string
    summary?: string
    coverImage?: string
    tags?: string[]
    duration?: string
  }
  
  export type WikiModule = {
    default: React.ComponentType
    meta: WikiMeta
  }
  
  export type WikiEntryLite = {
    id: string                // "culture-history/architecture/great-wall"
    domain: 'culture-history' | 'tourism-landscape'
    category: string          // "architecture"
    slug: string              // "great-wall"
    title: string
    summary?: string
    coverImage?: string
  }
  