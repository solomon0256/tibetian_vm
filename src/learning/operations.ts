// app/src/learning/operations.ts
import type { User } from 'wasp/entities'
import { ProgressStatus } from '@prisma/client'
import { z } from 'zod'

const GetPayload = z.object({ contentKey: z.string().min(1) })
const UpsertPayload = z.object({
  contentKey: z.string().min(1),
  status: z.nativeEnum(ProgressStatus),
})

// ✅ 关键：放宽 context 类型，别限定 entities 的键
export const getProgress = async (args: unknown, context: any) => {
  if (!context.user) return null
  const { contentKey } = GetPayload.parse(args)
  return context.entities.Progress.findUnique({
    where: { userId_contentKey: { userId: context.user.id, contentKey } },
  })
}

export const upsertProgress = async (args: unknown, context: any) => {
  if (!context.user) throw new Error('Unauthorized')
  const { contentKey, status } = UpsertPayload.parse(args)
  return context.entities.Progress.upsert({
    where: { userId_contentKey: { userId: context.user.id, contentKey } },
    update: { status },
    create: { userId: context.user.id, contentKey, status },
  })
}
