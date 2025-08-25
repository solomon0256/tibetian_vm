// src/wiki/pages/ScenicHubPage.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import WikiCategoryCard from '../components/WikiCategoryCard'

export default function ScenicHubPage() {
  const nav = useNavigate()
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WikiCategoryCard
          title="Culture & History"
          subtitle="Architecture, customs, food, daily life, rituals"
          onClick={() => nav('/scenic/culture-history')}
        />
        <WikiCategoryCard
          title="Tourism & Landscape"
          subtitle="Humanities, hiking, pilgrimage, trails, scenery"
          onClick={() => nav('/scenic/tourism-landscape')}
        />
      </div>
    </div>
  )
}
