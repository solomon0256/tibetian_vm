// src/wiki/content/loader.ts
import type { WikiEntryLite, WikiMeta, WikiModule, Domain } from '../data/types'

// 本文件位于 content/ 目录下，所以 glob 根用 "./**/index.tsx"
const lazyMap =
  (import.meta as any).glob('./**/index.tsx') as Record<string, () => Promise<WikiModule>>

const eagerMap =
  (import.meta as any).glob('./**/index.tsx', { eager: true }) as Record<
    string,
    { meta?: WikiMeta }
  >

const toKey = (p: string) => p.replace(/^\.\//, '').replace(/\/index\.tsx$/, '')
// 例： "culture-history/architecture/great-wall"
const split = (key: string) => {
  const parts = key.split('/')
  if (parts.length < 3) throw new Error(`Bad wiki key: ${key}`)
  const domain = parts[0] as Domain
  const category = parts[1]
  const slug = parts[2]
  return { domain, category, slug }
}

export function listWikiEntries(domain: Domain, categoryFilter?: string): WikiEntryLite[] {
  const out: WikiEntryLite[] = []
  for (const [path, mod] of Object.entries(eagerMap)) {
    const key = toKey(path)
    const { domain: d, category, slug } = split(key)
    if (d !== domain) continue
    if (categoryFilter && category !== categoryFilter) continue
    const m = (mod as any).meta as WikiMeta | undefined
    out.push({
      id: `${d}/${category}/${slug}`,
      domain: d,
      category,
      slug,
      title: m?.title ?? slug,
      summary: m?.summary,
      coverImage: m?.coverImage,
    })
  }
  out.sort((a, b) => a.title.localeCompare(b.title))
  return out
}

export async function loadWikiModuleBySlug(
  domain: Domain,
  category: string,
  slug: string
): Promise<WikiModule> {
  const key = `./${domain}/${category}/${slug}/index.tsx`
  const loader = lazyMap[key]
  if (!loader) throw new Error(`No wiki entry: ${domain}/${category}/${slug}`)
  return loader()
}

export function listCategories(domain: Domain): string[] {
  const set = new Set<string>()
  for (const path of Object.keys(eagerMap)) {
    const key = toKey(path)
    const { domain: d, category } = split(key)
    if (d !== domain) continue
    set.add(category)
  }
  return Array.from(set).sort()
}
