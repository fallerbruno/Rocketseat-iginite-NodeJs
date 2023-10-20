import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface FetchNearbyGymServiceRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymServiceResponse {
  gyms: Gym[]
}

export class FetchNearbyGymService {
  // define o construtor para inversão de dependências do UsersRepository
  constructor(private gymsRepository: GymsRepository) {}

  // so pode ter um método execute por classe
  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymServiceRequest): Promise<FetchNearbyGymServiceResponse> {
    // chama o método findByEmail do UsersRepository
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
      page: 1,
    })

    return { gyms }
  }
}
