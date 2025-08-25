// src/courses/hooks/usePaywall.ts
import { useQuery, getMembership } from 'wasp/client/operations'

/** —— 唯一真相：每门课的免费节数（只改这里，全站生效） —— */
const FREE_LESSONS_BY_COURSE: Record<string, number> = {
  'basic-language': 4,
  'travel-scenes' : 0,
  'professional'  : 0,
}

/** 纯函数：某门课的某节是否免费 */
export const isLessonFree = (courseSlug: string, order: number) =>
  order <= (FREE_LESSONS_BY_COURSE[courseSlug] ?? 0)

/** 会员模型（与 getMembership 返回值对齐） */
type Membership = {
  subscriptionStatus: string | null
  subscriptionPlan: string | null
  subscriptionCurrentPeriodEnd: string | Date | null
}
export type MembershipLike = Partial<Membership> | null | undefined

/** 从 membership 推导是否为会员（active / trialing / 在有效期内） */
export const isMemberFrom = (m: MembershipLike) => {
  if (!m) return false
  const status = (m.subscriptionStatus ?? '').toLowerCase()
  const periodEnd = m.subscriptionCurrentPeriodEnd
    ? new Date(m.subscriptionCurrentPeriodEnd as any)
    : null
  const now = new Date()
  return (
    status === 'active' ||
    status === 'trialing' ||
    (periodEnd !== null && periodEnd.getTime() > now.getTime())
  )
}

/** 纯函数：给目录页等用的“是否锁定”判定 */
export const deriveLocked = (
  courseSlug: string,
  order: number,
  membership: MembershipLike
) => !isLessonFree(courseSlug, order) && !isMemberFrom(membership)

/** Hook：课节页/目录页都可用 */
export function usePaywall(courseSlug: string, lessonOrder: number) {
  // getMembership 无入参：传 {} 占位（Wasp 的 useQuery 需要第二个参数）
  const { data: membership } =
    useQuery<unknown, Membership | null>(getMembership, {})

  const isMember = isMemberFrom(membership)
  const free = isLessonFree(courseSlug, lessonOrder)

  return {
    locked: !free && !isMember,
    isFree: free,
    isMember,
    status: (membership?.subscriptionStatus ?? '').toLowerCase(),
    periodEnd: membership?.subscriptionCurrentPeriodEnd
      ? new Date(membership.subscriptionCurrentPeriodEnd as any)
      : null,
  }
}
