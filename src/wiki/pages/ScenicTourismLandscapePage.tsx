// src/wiki/pages/ScenicTourismLandscapePage.tsx
import React, { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import WikiPills from '../components/WikiPills'
import WikiItemCard from '../components/WikiItemCard'
import { listCategories, listWikiEntries, loadWikiModuleBySlug } from '../content/loader'
import type { WikiModule } from '../data/types'

export default function ScenicTourismLandscapePage() {
  const nav = useNavigate()
  const [category, setCategory] = useState<string | undefined>(undefined)
  const categories = useMemo(() => listCategories('tourism-landscape'), [])
  const entries = useMemo(
    () => listWikiEntries('tourism-landscape', category),
    [category]
  )

  const [selected, setSelected] = useState<{ category: string; slug: string } | null>(null)
  const [mod, setMod] = useState<WikiModule | null>(null)

  useEffect(() => {
    if (!selected) return setMod(null)
    loadWikiModuleBySlug('tourism-landscape', selected.category, selected.slug).then(setMod).catch(() => setMod(null))
  }, [selected])

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="rounded-xl border p-4" onClick={() => nav('/scenic/tourism-landscape')}>
          Tourism & Landscape
        </button>
        <button className="rounded-xl border p-4" onClick={() => nav('/scenic/culture-history')}>
          Culture & History
        </button>
      </div>

      {/* (Optional) “routes” block would live here; left placeholder for now */}

      <WikiPills items={categories} active={category} onSelect={(c) => setCategory(c === category ? undefined : c)} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {entries.map((e) => (
            <WikiItemCard
              key={e.id}
              title={e.title}
              summary={e.summary}
              coverImage={e.coverImage}
              onOpen={() => setSelected({ category: e.category, slug: e.slug })}
            />
          ))}
        </div>
        <div className="lg:col-span-1 rounded-xl border p-4 min-h-[300px]">
          <div className="text-sm text-muted-foreground mb-2">Overview</div>
          {mod ? <mod.default /> : <div className="text-sm text-muted-foreground">Select an entry…</div>}
        </div>
      </div>
    </div>
  )
}
