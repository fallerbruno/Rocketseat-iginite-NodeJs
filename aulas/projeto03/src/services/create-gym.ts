import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface CreateGymServiceRequest {
  title: string
  description: string | null
  latitude: number
  longitude: number
  phone: string | null
}

interface CreateGymServiceResponse {
  gym: Gym
}

export class CreateGymService {
  // define o construtor para inversão de dependências do UsersRepository
  constructor(private gymsRepository: GymsRepository) {}

  // so pode ter um método execute por classe
  async execute({
    title,
    description,
    latitude,
    longitude,
    phone,
  }: CreateGymServiceRequest): Promise<CreateGymServiceResponse> {
    // chama o método findByEmail do UsersRepository
    const gym = await this.gymsRepository.create({
      title,
      description,
      latitude,
      longitude,
      phone,
    })

    return { gym }
  }
}
