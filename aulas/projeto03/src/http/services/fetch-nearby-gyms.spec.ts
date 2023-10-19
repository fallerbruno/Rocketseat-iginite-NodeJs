import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { FetchNearbyGymService } from './fetch-nearby-gyms'

describe('Nearby Gyms Service', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: FetchNearbyGymService

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymService(gymsRepository)
  })

  it('should be able to featch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: 'Academia de musculação',
      latitude: -30.1857986,
      longitude: -52.3698176,
      phone: '999999999',
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: 'Academia de musculação',
      latitude: -30.1728417,
      longitude: -52.2409579,
      phone: '999999999',
    })

    const { gyms } = await sut.execute({
      userLatitude: -30.1857986,
      userLongitude: -52.3698176,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Near Gym',
      }),
    ])
  })
})
