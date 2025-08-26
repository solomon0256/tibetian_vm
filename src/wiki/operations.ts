// src/wiki/operations.ts
import type { Domain } from './data/types'
import { listCategories, listWikiEntries, loadWikiModuleBySlug } from './content/loader'

export const getDomains = (): { id: Domain; title: string }[] => ([
  { id: 'culture-history',   title: 'Humanities & History' },
  { id: 'tourism-landscape', title: 'Travel & Landscape' }
])

export const getCategoriesByDomain = (domain: Domain) =>
  listCategories(domain).map(id => ({ id, title: id }))

export const getEntriesByCategory = (domain: Domain, category: string) =>
  listWikiEntries(domain, category)

export const getEntryModule = (domain: Domain, category: string, slug: string) =>
  loadWikiModuleBySlug(domain, category, slug)
