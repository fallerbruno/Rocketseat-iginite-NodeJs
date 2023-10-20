import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { GetUserMetricsService } from '../get-user-metrics'

export function makeGetUserMetricsUserCase() {
  const checkInRepository = new PrismaCheckInsRepository()
  const service = new GetUserMetricsService(checkInRepository)

  return service
}
