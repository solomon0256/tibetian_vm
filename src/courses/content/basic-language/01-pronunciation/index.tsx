// src/courses/content/basic-language/01-pronunciation/index.tsx
import React from 'react'
import type { LessonMeta } from '../../../types'
import mouthShapes from './assets/mouth-shapes.png'

export const meta: LessonMeta = {
  title: 'Pronunciation Basics',
  summary: 'Vowels, consonants and how to shape your mouth.',
  duration: '8 min',
  coverImage: mouthShapes,
  pages: 3, // ← 三页
}

// 第 1 页
function PageIntro() {
  return (
    <>
      <h1>Pronunciation Basics</h1>
      <p>{meta.summary}</p>
      <img src={mouthShapes} alt="Mouth shapes" className="rounded-xl border my-4" />
      <p>In this lesson you’ll get a quick overview of how sounds are produced,
         how air flows, and how the shape of your mouth affects vowels and consonants.</p>
    </>
  )
}

// 第 2 页
function PageVowels() {
  return (
    <>
      <h2>Vowels</h2>
      <ul>
        <li>Front: i / e</li>
        <li>Central: ə</li>
        <li>Back: u / o / a</li>
      </ul>
      <p>Keep the airflow smooth; hold each vowel for one steady beat.</p>
    </>
  )
}

// 第 3 页
function PageConsonants() {
  return (
    <>
      <h2>Consonants</h2>
      <ul>
        <li><strong>Plosives:</strong> p / b, t / d, k / g</li>
        <li><strong>Fricatives:</strong> f / v, s / z, sh / zh</li>
        <li><strong>Nasals:</strong> m, n, ng</li>
      </ul>
      <p>Practice minimal pairs and keep the airflow steady.</p>
    </>
  )
}

// 默认导出：按 pageIndex 显示对应页
export default function Lesson({ pageIndex = 0 }: { pageIndex?: number }) {
  const pages = [<PageIntro key={0} />, <PageVowels key={1} />, <PageConsonants key={2} />]
  const i = Math.min(Math.max(0, pageIndex), pages.length - 1)
  return <article className="prose max-w-none">{pages[i]}</article>
}
