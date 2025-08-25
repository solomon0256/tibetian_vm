//basic-language/02-greetings/index.ts
import React from 'react';
import type { LessonMeta } from '../../../types';

export const meta: LessonMeta = {
  title: 'Essential Greetings',
  summary: 'Say hello, goodbye, and be polite.',
  duration: '6 min',
};

export default function LessonGreetings() {
  return (
    <article className="prose max-w-none">
      <h1>{meta.title}</h1>
      <p>{meta.summary}</p>
      <p>(Placeholder content - to be expanded)</p>
    </article>
  );
}
