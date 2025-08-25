import React from 'react'
import SectionTitle from '../../../landing-page/components/SectionTitle'
import { Link } from 'react-router-dom'

type Teaser = {
  title: string
  desc: string
  img: string
  href: string
}

const teasers: Teaser[] = [
  {
    title: 'Multi-dialect Tibetan',
    desc: 'Learn practical Tibetan with curated lessons.',
    img: '/media/home/features/lang.webp',
    href: '/courses',
  },
  {
    title: 'Language & Culture',
    desc: 'Understand culture while learning the language.',
    img: '/media/home/features/culture.webp',
    href: '/courses',
  },
  {
    title: 'Travel Guides',
    desc: 'Rules, tips and local insights for travelers.',
    img: '/media/home/features/travel.webp',
    href: '/scenic',
  },
]

/**
 * 三个入口卡片（下方“介绍”区域）
 * 复用 SectionTitle；卡片用轻量 Tailwind，图片来自 public。
 */
export default function FeatureTeasers() {
  return (
    <section className="container mx-auto px-6 py-12">
      <SectionTitle
        title="Pick your start"
        description="Choose a track to begin"
      />

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {teasers.map((t) => (
          <Link
            key={t.title}
            to={t.href}
            className="group overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-md transition"
          >
            <div className="aspect-video overflow-hidden bg-gray-50">
              <img src={t.img} alt={t.title} className="h-full w-full object-cover group-hover:scale-105 transition" loading="lazy" />
            </div>
            <div className="p-4">
              <div className="text-base font-semibold">{t.title}</div>
              <div className="mt-1 text-sm text-gray-500">{t.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
