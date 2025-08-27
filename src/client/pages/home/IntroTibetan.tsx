// src/client/pages/home/IntroTibetan.tsx
import React, { useEffect, useState } from 'react'
import SectionTitle from '../../../landing-page/components/SectionTitle'
import { Link } from 'react-router-dom'

type Slide = { src: string; alt: string }

const slides: Slide[] = [
  { src: '/media/home/intro/script.webp',   alt: 'Tibetan script sample' },
  { src: '/media/home/intro/teahouse.webp', alt: 'Teahouse conversation' },
  { src: '/media/home/intro/door.webp',     alt: 'Greeting at a family door' },
]

export default function IntroTibetan() {
  const [idx, setIdx] = useState(0)
  const next  = (idx + 1) % slides.length
  const next2 = (idx + 2) % slides.length

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative container mx-auto px-6 py-12">
      {/* （可选）背景图：把图片放到 public/media/home/intro/bg.webp
          然后取消下一行注释即可。按照需要换成自己的路径。 */}
      {/* <div className="absolute inset-0 -z-10 bg-[url('/media/home/intro/bg.webp')] bg-cover bg-center opacity-90" /> */}

      {/* 渐变纱：顶部透明 → 中部微透明 → 底部更实。
         颜色跟随主题：浅色用黑色轻纱，深色用白色轻纱。*/}
      <div
        className="
          pointer-events-none absolute inset-x-0 top-0 -z-10 h-full
          bg-gradient-to-b
          from-transparent
          via-black/6 to-black/14
          dark:via-white/4 dark:to-white/10
        "
      />

      <SectionTitle
        title="Tibetan, beyond words"
        description="A living language shaped by altitude, seasons, and stories."
      />

      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* 左：文案 —— 颜色随主题变化，不写死。
           使用 typography 的反色，并显式覆盖段落/粗体颜色。 */}
        <div className="
          prose prose-lg max-w-none
          text-foreground/90
          prose-headings:text-foreground
          prose-p:text-foreground/90
          prose-strong:text-foreground
          dark:prose-invert
        ">
          <p>
            Tibetan feels musical: greetings change with time of day, respect is built into how you address people,
            and short set phrases carry real warmth.
          </p>
          <p>
            You’ll begin with sounds you can hear and copy, then meet how real lines are said —
            <strong> in a teahouse, on the road, at a family door</strong>.
          </p>
          <p>
            Along the way, you’ll meet the small cultural moments that make conversations smoother —
            the tone, the timing, and the little gestures that help words land kindly.
          </p>
          <p>
            Whether you love languages or you’re getting ready to travel, our focus is simple and professional:
            <strong> clear Tibetan you can use, carried by its living culture.</strong>
          </p>

          {/* Go to Courses —— 黑白按钮但主题自适应（foreground/background 变量） */}
          <Link
            to="/courses"
            className="
              mt-6 inline-flex w-fit items-center rounded-lg px-4 py-2 font-medium
              bg-foreground text-background
              hover:opacity-90 focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-foreground/40
              transition
            "
          >
            Go to Courses
          </Link>
        </div>

        {/* 右：轮播 + 两张预览。对齐规则：
            - 预览1：贴主图右上角（top-3 right-3）
            - 预览2：贴主图右下角（bottom-3 right-3）
            这样上下边缘严格对齐，不会“隔离感”。 */}
        <div className="relative">
          {/* 主图：圆角/边框/主题色自适应 */}
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
          </div>

          {/* 预览1：右上角，略微旋转/阴影 */}
          <div
            className="pointer-events-none absolute right-3 top-3 w-[32%] aspect-[4/3]
                       overflow-hidden rounded-xl border border-border bg-muted shadow-sm rotate-[-1.5deg]"
            aria-hidden="true"
          >
            <img src={slides[next].src} alt="" className="h-full w-full object-cover" loading="lazy" />
          </div>

          {/* 预览2：右下角，略微旋转/阴影 */}
          <div
            className="pointer-events-none absolute right-3 bottom-3 w-[26%] aspect-[4/3]
                       overflow-hidden rounded-xl border border-border bg-muted shadow-sm rotate-[2deg]"
            aria-hidden="true"
          >
            <img src={slides[next2].src} alt="" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  )
}
