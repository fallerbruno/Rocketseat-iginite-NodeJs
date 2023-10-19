import { Gym, Prisma } from '@prisma/client'
// cria a interface que deve ser seguida pelo repositório definindo os métodos que devem ser implementados

export interface findManyNearbyParams {
  longitude: number
  latitude: number
  page: number
}

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  searchManyByQuery(query: string, page: number): Promise<Gym[]>
  findManyNearby(params: findManyNearbyParams): Promise<Gym[]>
}
