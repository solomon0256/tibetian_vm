import React from 'react'

/** 预扫描本地所有课节内容模块（按约定目录） */
const contentModules = import.meta.glob(
  '/src/courses/content/**/index.tsx'   // 只要 index.tsx
)

/** contentKey 形如 "basic-language/01-pronunciation" */
function keyToPath(contentKey: string) {
  return `/src/courses/content/${contentKey}/index.tsx`
}

export default function LessonContentLoader({ contentKey }: { contentKey: string }) {
  const [Comp, setComp] = React.useState<React.ComponentType | null>(null)
  const [err, setErr] = React.useState<string | null>(null)

  React.useEffect(() => {
    setComp(null); setErr(null)
    const path = keyToPath(contentKey)
    const importer = (contentModules as Record<string, () => Promise<any>>)[path]
    if (!importer) {
      setErr(`Content not found for key: ${contentKey}`)
      return
    }
    importer()
      .then((mod) => setComp(() => mod.default || mod.Content))
      .catch((e) => setErr(e?.message || 'Load content failed'))
  }, [contentKey])

  if (err) {
    return (
      <div className="rounded-lg border p-6 text-sm text-red-600 bg-red-50">
        {err} — put file at <code>src/courses/content/{contentKey}/index.tsx</code>
      </div>
    )
  }
  if (!Comp) {
    return <div className="animate-pulse h-40 rounded-lg bg-gray-100" />
  }
  return <Comp />
}
