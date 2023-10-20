import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { CheckInService } from '../check-in'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gym-repository'

export function makeCheckInService() {
  const checkINrepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const service = new CheckInService(checkINrepository, gymsRepository)

  return service
}
