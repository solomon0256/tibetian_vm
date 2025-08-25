import { faker } from '@faker-js/faker'
import type { Prisma, PrismaClient } from '@prisma/client'
import { getSubscriptionPaymentPlanIds, SubscriptionStatus } from '../../payment/plans'

// ✅ 跟 prisma.user.create 完全一致的输入类型
type MockUserData = Prisma.UserCreateInput

export async function seedMockUsers(prisma: PrismaClient) {
  const users = generateMockUsersData(50)
  await Promise.all(users.map((data) => prisma.user.create({ data })))
}

function generateMockUsersData(n: number): MockUserData[] {
  return Array.from({ length: n }, () => generateMockUserData())
}

function generateMockUserData(): MockUserData {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const subscriptionStatus = faker.helpers.arrayElement<SubscriptionStatus | null>([
    ...Object.values(SubscriptionStatus),
    null,
  ])

  const now = new Date()
  const createdAt = faker.date.past({ refDate: now })
  const timePaid = faker.date.between({ from: createdAt, to: now })
  const credits = subscriptionStatus ? 0 : faker.number.int({ min: 0, max: 10 })
  const hasUserPaidOnStripe = !!subscriptionStatus || credits > 3

  // 会员到期：有订阅给未来日期，否则 null
  const subscriptionCurrentPeriodEnd =
    subscriptionStatus ? faker.date.future({ years: 1, refDate: timePaid }) : null

  return {
    email: faker.internet.email({ firstName, lastName }),
    username: faker.internet.userName({ firstName, lastName }),
    createdAt,
    isAdmin: false,
    credits,
    subscriptionStatus,
    lemonSqueezyCustomerPortalUrl: null,
    paymentProcessorUserId: hasUserPaidOnStripe ? `cus_test_${faker.string.uuid()}` : null,
    datePaid: hasUserPaidOnStripe ? faker.date.between({ from: createdAt, to: timePaid }) : null,
    subscriptionPlan: subscriptionStatus ? faker.helpers.arrayElement(getSubscriptionPaymentPlanIds()) : null,
    // 关键字段：与 Prisma schema 对齐
    subscriptionCurrentPeriodEnd,
  }
}
