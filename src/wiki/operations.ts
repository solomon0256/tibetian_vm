// src/wiki/operations.ts

const CATEGORIES = [
    { id: 'culture', title: 'Humanities & History', description: 'Museums, historical figures, local customs' },
    { id: 'travel',  title: 'Travel & Landscape',   description: 'Landmarks, routes, nature & cityscape' },
  ]
  
  const ENTRIES: Record<string, { id: string, title: string, tags: string[] }[]> = {
    culture: [
      { id: 'museum-a', title: 'City Museum A', tags: ['museum'] },
      { id: 'historic-person-x', title: 'Historic Person X', tags: ['figure'] },
    ],
    travel: [
      { id: 'scenic-peak', title: 'Scenic Peak', tags: ['mountain'] },
      { id: 'old-town',    title: 'Old Town',    tags: ['architecture'] },
    ]
  }
  
  export const getScenicCategories = async () => CATEGORIES
  export const getScenicEntriesByCategory = async (args: unknown) => {
    const { category } = (args as { category: string })
    return ENTRIES[category] ?? []
  }
  