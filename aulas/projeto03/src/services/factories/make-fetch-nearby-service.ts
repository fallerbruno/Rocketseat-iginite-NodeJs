import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gym-repository'
import { FetchNearbyGymService } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymsService() {
  const gymsRepository = new PrismaGymsRepository()
  const service = new FetchNearbyGymService(gymsRepository)

  return service
}
