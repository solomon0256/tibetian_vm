// src/client/pages/home/HeroBanner.tsx
import React from 'react'
import { useAuth } from 'wasp/client/auth'
import SectionTitle from '../../../landing-page/components/SectionTitle'
import MountainImageButton from './MountainButton'

const slides = [
  {
    src: '/media/home/hero/slide-01.webp', // public 下
    title: 'Start Learning Tibetan',
    subtitle: 'Language • Culture • Travel Guide',
    primaryHref: '/courses',
  },
]

export default function HeroBanner() {
  const { data: user } = useAuth()
  const s = slides[0]
  const PUB = '/media/home/mountain' // 统一前缀

  return (
    <section className="relative">
      {/* 大图：固定视窗高度，显示更多下缘 */}
      <div className="relative w-full overflow-hidden bg-gray-100 h-[62vh] md:h-[68vh] lg:h-[72vh] min-h-[460px]">
        <img
          src={s.src}
          alt="Hero"
          className="h-full w-full object-cover object-[center_55%]"
          loading="eager"
          decoding="async"
        />

        {/* 暗层提升可读性 */}
        <div className="absolute inset-0 z-10 bg-black/30" />

        {/* 下边缘渐隐到页面背景色 */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 sm:h-28 md:h-36 lg:h-40 bg-gradient-to-b from-transparent to-background" />

        {/* 左侧标题文案 */}
        <div className="absolute inset-0 z-30 flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl text-white">
              <SectionTitle title={s.title} description={s.subtitle} />
            </div>
          </div>
        </div>

        {/* 底部中部：两座雪山图片按钮（更长更高，间距更近） */}
        <div className="absolute inset-x-0 bottom-3 md:bottom-5 z-40 flex justify-center">
          <div className="flex items-end gap-4">
            <MountainImageButton
              to={user ? '/courses' : '/login'}
              label={user ? 'Go to Courses' : 'Start now'}
              imgSrc={`${PUB}/meili.png`}
              imgAlt="Meili Snow Mountain"
              size="xl"
            />
            <MountainImageButton
              to="/scenic"
              label="Explore Scenic & History"
              imgSrc={`${PUB}/kailash.png`}
              imgAlt="Mount Kailash"
              size="xl"
            />
          </div>
        </div>
      </div>

      {/* 占位 */}
      <div className="container mx-auto px-6">
        <div className="mt-6 h-8" />
      </div>
    </section>
  )
}
