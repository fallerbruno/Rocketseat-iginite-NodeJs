import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { SearchGymService } from './search-gyms'

describe('Search Gyms Service', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: SearchGymService

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymService(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Academia 01',
      description: 'Academia de musculação',
      latitude: -30.1857986,
      longitude: -52.3698176,
      phone: '999999999',
    })

    await gymsRepository.create({
      title: 'Academia 02',
      description: 'Academia de musculação',
      latitude: -30.1857986,
      longitude: -52.3698176,
      phone: '999999999',
    })

    const { gyms } = await sut.execute({
      query: 'Academia 01',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Academia 01',
      }),
    ])
  })

  it('should be able to fetch paginated gym Search ', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Academia ${i}`,
        description: 'Academia de musculação',
        latitude: -30.1857986,
        longitude: -52.3698176,
        phone: '999999999',
      })
    }

    const { gyms } = await sut.execute({
      query: 'Academia',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Academia 21',
      }),
      expect.objectContaining({
        title: 'Academia 22',
      }),
    ])
  })
})
