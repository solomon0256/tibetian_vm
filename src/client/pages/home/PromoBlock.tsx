import React from 'react'
import SectionTitle from '../../../landing-page/components/SectionTitle'

/**
 * 底部宣传区：左图右文案两段（“平台介绍”）。
 */
export default function PromoBlock() {
  return (
    <section className="border-t bg-white">
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-start justify-between">
          <div className="text-sm text-gray-500">Platform Intro</div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-2xl border bg-gray-50 overflow-hidden">
            <img
              src="/media/home/promo/value.webp"
              alt="Promo"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col justify-center">
            <SectionTitle
              title="Designed for real-world learning"
              description="From zero to usable Tibetan."
            />
            <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700">
              <li>Clear learning path: basics → scenarios → advanced.</li>
              <li>Culture knowledge embedded alongside language lessons.</li>
              <li>Travel tips and rules to stay safe and respectful.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
