import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { CreateGymService } from './create-gym'

describe('Create Gym Service', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: CreateGymService

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(gymsRepository)
  })

  it('should be able create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'Academia',
      description: 'Academia de musculação',
      latitude: -30.1857986,
      longitude: -52.3698176,
      phone: '999999999',
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
