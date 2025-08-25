// src/courses/types.ts
import type React from 'react';

export type CourseSlug = 'basic-language' | 'travel-scenes' | 'professional' | string;

export interface CourseLite {
  id: number;
  title: string;
  slug: CourseSlug;
  code?: string | null;
  category?: string | null;
}

export interface LessonLite {
  id: number;
  title: string;
  slug: string;
  order: number;
  contentKey: string;
}

/** 每课的元信息：支持多页 */
export interface LessonMeta {
  title: string;
  summary?: string;
  duration?: string;
  coverImage?: string;
  free?: boolean;
  /** 可选：总页数，>=1。缺省视为 1 页。 */
  pages?: number;
}

/** 由内容模块导出的形状（默认导出是组件，接收可选 pageIndex） */
export interface LessonContentModule {
  default: React.ComponentType<{ pageIndex?: number }>;
  meta: LessonMeta;
}
