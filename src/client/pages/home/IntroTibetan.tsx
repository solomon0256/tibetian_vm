import React from 'react'
import SectionTitle from '../../../landing-page/components/SectionTitle'

/**
 * “藏语介绍”区：左文案右图片。
 */
export default function IntroTibetan() {
  return (
    <section className="container mx-auto px-6 py-12">
      <SectionTitle
        title="What is Tibetan"
        description="A language with strong cultural attributes."
      />
      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="prose max-w-none">
          <p>
            Tibetan is not only a language but a window to a unique culture.
            Our platform introduces cultural context while teaching you step by step.
          </p>
          <p>
            You will learn pronunciation, phrases and dialogues, together with
            customs, rituals and daily life knowledge.
          </p>
        </div>
        <div className="rounded-2xl border bg-gray-50 overflow-hidden">
          <img
            src="/media/home/intro/overview.webp"
            alt="Overview"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
