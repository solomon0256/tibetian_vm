import React from 'react'
import { useAuth } from 'wasp/client/auth'
import { Link } from 'react-router-dom'
import SectionTitle from '../../../landing-page/components/SectionTitle'

/**
 * Hero banner with big promo image(s).
 * 先用静态第一张图；后续可把 slides 扩展为轮播。
 * 图片放在 public/media/home/hero/* 下即可。
 */
const slides = [
  {
    src: '/media/home/hero/slide-01.webp',
    title: 'Start Learning Tibetan',
    subtitle: 'Language • Culture • Travel Guide',
    primaryHref: '/courses',
  },
]

export default function HeroBanner() {
  const { data: user } = useAuth()
  const s = slides[0]

  return (
    <section className="relative">
      {/* 大图 */}
      <div className="relative aspect-[16/6] w-full overflow-hidden bg-gray-100">
        <img
          src={s.src}
          alt="Hero"
          className="h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
        {/* 文案覆盖 */}
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl text-white">
              <SectionTitle
                title={s.title}
                description={s.subtitle}
              />
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to={user ? '/courses' : '/login'}
                  className="inline-flex items-center rounded-md bg-white text-black px-4 py-2 font-medium hover:bg-gray-100"
                >
                  {user ? 'Go to Courses' : 'Start now'}
                </Link>
                <Link
                  to="/scenic"
                  className="inline-flex items-center rounded-md border border-white/80 text-white px-4 py-2 font-medium hover:bg-white/10"
                >
                  Explore Scenic & History
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 三角“山”位置：占位（后续可替换为 SVG/装饰图） */}
      <div className="container mx-auto px-6">
        <div className="mt-6 h-8" />
      </div>
    </section>
  )
}
