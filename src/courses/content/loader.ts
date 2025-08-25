// src/courses/content/loader.ts
import type { LessonContentModule, LessonMeta } from '../types'

// 1) 懒加载：真正需要渲染时才加载组件
const lazyMap =
  (import.meta as any).glob('./**/index.tsx') as Record<string, () => Promise<LessonContentModule>>

// 2) 预加载 meta：为了做列表/预览，不必加载整份组件
const eagerMap =
  (import.meta as any).glob('./**/index.tsx', { eager: true }) as Record<
    string,
    { meta?: LessonMeta }
  >

// 把 './basic-language/01-pronunciation/index.tsx' => 'basic-language/01-pronunciation'
function toKey (p: string) {
  return p.replace(/^.\//, '').replace(/\/index\.tsx$/, '')
}

function findPathByKey (contentKey: string) {
  return Object.keys(lazyMap).find((p) => toKey(p) === contentKey)
}

/** 旧接口：按 contentKey 加载（保留给可能的旧代码用） */
export function loadLocalLessonModule (contentKey: string): Promise<LessonContentModule> {
  const path = findPathByKey(contentKey)
  if (!path) return Promise.reject(new Error(`No local lesson for "${contentKey}"`))
  return lazyMap[path]().then((m) => m as LessonContentModule)
}

/** 新增：把 (courseSlug, slug) -> contentKey -> 懒加载模块 */
export function loadLocalLessonModuleBySlug (
  courseSlug: string,
  slug: string
): Promise<LessonContentModule> {
  const key = `${courseSlug}/${slug}` // 例如 'basic-language/01-pronunciation'
  const path = findPathByKey(key)
  if (!path) return Promise.reject(new Error(`No local lesson for "${key}"`))
  return lazyMap[path]().then((m) => m as LessonContentModule)
}

export type LocalLessonLite = {
  id: string
  slug: string        // 例如 '01-pronunciation'
  order: number       // 例如 1（来自文件夹前缀）
  title: string
  summary?: string
}

/** 列出某课程下本地的课节（仅用 meta，不碰后端/数据库） */
export function listLocalLessons (courseSlug: string): LocalLessonLite[] {
  const out: LocalLessonLite[] = []

  for (const [path, modAny] of Object.entries(eagerMap)) {
    const key = toKey(path)                           // 'basic-language/01-pronunciation'
    if (!key.startsWith(courseSlug + '/')) continue

    const slug = key.split('/')[1]                    // '01-pronunciation'
    const order = parseInt(slug.split('-')[0], 10) || 0
    const meta = (modAny as any).meta as LessonMeta | undefined

    out.push({
      id: key,
      slug,
      order,
      title: meta?.title ?? slug,
      summary: meta?.summary,
    })
  }

  out.sort((a, b) => a.order - b.order)
  return out
}
