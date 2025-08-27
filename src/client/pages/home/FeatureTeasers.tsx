// src/client/pages/home/FeatureTeasers.tsx
import React, { useEffect, useMemo, useState } from 'react'
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
    title: 'Language & Culture',
    desc: 'Master basics and manners while understanding cultural context.',
    img: '/media/home/features/culture.jpg',
    href: '/courses',
  },
  {
    title: 'Travel Guide',
    desc: 'Places, routes, seasons and safety essentials for your trip.',
    img: '/media/home/features/guide.jpg',
    href: '/scenic',
  },
  {
    title: 'Travel Phrases',
    desc: 'Quick phrases for food, transport, stays and emergencies.',
    img: '/media/home/features/phrases.jpg',
    href: '/courses',
  },
  {
    title: 'Customs & Experiences',
    desc: 'Wear, food and crafts—how to enjoy respectfully.',
    img: '/media/home/features/customs.jpg',
    href: '/courses',
  },
  {
    title: 'History & Museums',
    desc: 'Key timelines and highlights from must-see collections.',
    img: '/media/home/features/museums.jpg',
    href: '/scenic',
  },
]

// 一排显示的数量
const VISIBLE = 3
const INTERVAL = 3000 // 3 秒/步

export default function FeatureTeasers() {
  // 为无缝循环，把前 VISIBLE 张复制到末尾
  const loopSlides = useMemo(
    () => [...teasers, ...teasers.slice(0, VISIBLE)],
    []
  )
  const [idx, setIdx] = useState(0)         // 当前“步”索引（每次 +1 张）
  const [anim, setAnim] = useState(true)    // 是否启用过渡动画
  const [paused, setPaused] = useState(false)

  // 自动轮播（横向每 3 秒向左移动 1 张）
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setIdx((i) => i + 1), INTERVAL)
    return () => clearInterval(id)
  }, [paused])

  // 到达“复制区”后瞬间回跳 0，制造无缝效果
  const handleTransitionEnd = () => {
    if (idx >= teasers.length) {
      // 关闭动画 -> 回到 0 -> 下一帧再打开动画
      setAnim(false)
      setIdx(0)
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnim(true))
      )
    }
  }

  const activeDot = idx % teasers.length
  const trackStyle: React.CSSProperties = {
    transform: `translateX(-${(100 / VISIBLE) * idx}%)`,
  }

  return (
    <section className="container mx-auto px-6 py-12">
      <SectionTitle title="Pick your start" description="Choose a track to begin" />

      <div
        className="mt-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* 视口（固定高度，横向隐藏溢出） */}
        <div className="relative overflow-hidden">
          {/* 轨道：横向 flex；每张宽度 = 1/3，一次移动 33.333% */}
          <div
            className={[
              'flex -mx-3',                       // -mx-3 抵消卡片左右 padding 形成间距
              anim ? 'transition-transform duration-700 ease-out' : '',
            ].join(' ')}
            style={trackStyle}
            onTransitionEnd={handleTransitionEnd}
          >
            {loopSlides.map((t, i) => (
              <div
                key={`${t.title}-${i}`}
                className="basis-1/3 shrink-0 px-3" // 显示 3 张
              >
                <Link
                  to={t.href}
                  className="group block overflow-hidden rounded-2xl border bg-white/90 shadow-sm backdrop-blur hover:shadow-md transition"
                >
                  <div className="aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-gray-50">
                    <img
                      src={t.img}
                      alt={t.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-base font-semibold">{t.title}</div>
                    <div className="mt-1 text-sm text-gray-600">{t.desc}</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* 指示点 */}
        <div className="mt-4 flex justify-center gap-2">
          {teasers.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to ${i + 1}`}
              onClick={() => setIdx(i)}
              className={`h-2 w-2 rounded-full transition ${
                activeDot === i ? 'bg-gray-800' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
