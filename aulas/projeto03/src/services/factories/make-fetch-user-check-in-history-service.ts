import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchUserCheckInsHistoryService } from '../fetch-user-check-ins-history'

export function makeFetchUserCheckInHistoryService() {
  const checkInRepository = new PrismaCheckInsRepository()
  const service = new FetchUserCheckInsHistoryService(checkInRepository)

  return service
}
