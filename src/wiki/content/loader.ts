// src/wiki/loader.ts
import type { WikiEntryLite, WikiMeta, WikiModule } from '../data/types.ts'

// Lazy import full modules (for detail/overview)
const lazyMap =
  (import.meta as any).glob('./content/**/index.tsx') as Record<string, () => Promise<WikiModule>>

// Eager import only meta (for lists)
const eagerMap =
  (import.meta as any).glob('./content/**/index.tsx', { eager: true }) as Record<
    string,
    { meta?: WikiMeta }
  >

const toKey = (p: string) => p.replace(/^.\//, '').replace(/\/index\.tsx$/, '')
const split = (key: string) => {
  // key: "content/culture-history/architecture/great-wall"
  const parts = key.split('/')
  const domain = parts[1] as 'culture-history' | 'tourism-landscape'
  const category = parts[2]
  const slug = parts[3]
  return { domain, category, slug }
}

export function listWikiEntries(
  domain: 'culture-history' | 'tourism-landscape',
  categoryFilter?: string
): WikiEntryLite[] {
  const out: WikiEntryLite[] = []
  for (const [path, mod] of Object.entries(eagerMap)) {
    const key = toKey(path) // "content/culture-history/architecture/great-wall"
    if (!key.startsWith(`content/${domain}/`)) continue
    const { category, slug } = split(key)
    if (categoryFilter && category !== categoryFilter) continue
    const m = (mod as any).meta as WikiMeta | undefined
    out.push({
      id: `${domain}/${category}/${slug}`,
      domain,
      category,
      slug,
      title: m?.title ?? slug,
      summary: m?.summary,
      coverImage: m?.coverImage,
    })
  }
  // simple alpha sort by title; change if you need
  out.sort((a, b) => a.title.localeCompare(b.title))
  return out
}

export async function loadWikiModuleBySlug(
  domain: 'culture-history' | 'tourism-landscape',
  category: string,
  slug: string
): Promise<WikiModule> {
  const key = `./content/${domain}/${category}/${slug}/index.tsx`
  const loader = lazyMap[key]
  if (!loader) throw new Error(`No wiki entry: ${domain}/${category}/${slug}`)
  const mod = await loader()
  return mod
}

export function listCategories(domain: 'culture-history' | 'tourism-landscape'): string[] {
  const set = new Set<string>()
  for (const path of Object.keys(eagerMap)) {
    const key = toKey(path)
    if (!key.startsWith(`content/${domain}/`)) continue
    const { category } = split(key)
    set.add(category)
  }
  return Array.from(set).sort()
}
