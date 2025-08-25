// src/client/pages/MainPage.tsx
import React from 'react'
import HeroBanner from './home/HeroBanner'
import FeatureTeasers from './home/FeatureTeasers'
import IntroTibetan from './home/IntroTibetan'
import PromoBlock from './home/PromoBlock'
import Footer from '../../landing-page/components/Footer'

export default function MainPage() {
  return (
    <>
      <HeroBanner />
      <FeatureTeasers />
      <IntroTibetan />
      <PromoBlock />
      <Footer footerNavigation={{ 
        app: [],
        company: []
      }} />
    </>
  )
}
