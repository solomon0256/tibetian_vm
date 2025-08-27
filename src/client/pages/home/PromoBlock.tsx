// src/client/pages/home/PromoBlock.tsx
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Slide = { src: string; alt: string }

// 两张轮播图：把图片放到 public/media/home/promo/ 下即可
const slides: Slide[] = [
  { src: '/media/home/promo/value.webp',  alt: 'Learning value' },
  { src: '/media/home/promo/method.webp', alt: 'How it works'  }, // ← 自行放图
]

export default function PromoBlock() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])
  const next = (idx + 1) % slides.length

  return (
    <section className="relative border-t bg-background">
      {/* （可选）背景图：把图片放到 public/media/home/promo/bg.webp 后，取消下一行注释 */}
      {/* <div className="absolute inset-0 -z-10 bg-[url('/media/home/promo/bg.webp')] bg-cover bg-center opacity-90" /> */}

      {/* 上透明→中微透明→下更实 的渐变纱，浅色/深色适配 */}
      <div className="pointer-events-none absolute inset-0 -z-10
                      bg-gradient-to-b from-transparent via-black/6 to-black/14
                      dark:via-white/4 dark:to-white/10" />

      <div className="container mx-auto px-6 py-12">
        {/* 只保留这个大号主标题 */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Platform Info
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* 左侧：两张图轮播 */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-card">
            {slides.map((s, i) => (
              <img
                key={s.src}
                src={s.src}
                alt={s.alt}
                loading={i === idx ? 'eager' : 'lazy'}
                className={`absolute inset-0 h-full w-full object-cover rounded-2xl
                            transition-opacity duration-700 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
            {/* 右下角预览（可留可删） */}
            <div
              className="pointer-events-none absolute right-3 bottom-3 w-[32%] aspect-[4/3]
                         overflow-hidden rounded-xl border border-border bg-muted shadow-sm"
              aria-hidden="true"
            >
              <img src={slides[next].src} alt="" className="h-full w-full object-cover" />
            </div>
          </div>

          {/* 右侧：副标题 + 卖点 + 按钮（小号 Platform Info 已删除） */}
          <div className="flex flex-col justify-center">
            <p className="text-base sm:text-lg text-muted-foreground">
              From zero to usable Tibetan.
            </p>
            <ul className="mt-4 space-y-2 text-foreground/90">
              <li className="list-disc ml-5">Clear path: sounds → phrases → real scenes.</li>
              <li className="list-disc ml-5">Culture woven into language, not taught apart.</li>
              <li className="list-disc ml-5">Travel-safe tips to stay respectful and confident.</li>
            </ul>

            <Link
              to="/courses"
              className="mt-6 inline-flex w-fit items-center rounded-lg px-4 py-2 font-medium
                         bg-foreground text-background hover:opacity-90
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 transition"
            >
              Go to Courses
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
