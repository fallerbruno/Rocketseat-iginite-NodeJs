import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface SearchGymServiceRequest {
  query: string
  page: number
}

interface SearchGymServiceResponse {
  gyms: Gym[]
}

export class SearchGymService {
  // define o construtor para inversão de dependências do UsersRepository
  constructor(private gymsRepository: GymsRepository) {}

  // so pode ter um método execute por classe
  async execute({
    query,
    page,
  }: SearchGymServiceRequest): Promise<SearchGymServiceResponse> {
    // chama o método findByEmail do UsersRepository
    const gyms = await this.gymsRepository.searchManyByQuery(query, page)

    return { gyms }
  }
}
