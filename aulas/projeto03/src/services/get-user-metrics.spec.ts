import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-chek-ins-repository'
import { GetUserMetricsService } from './get-user-metrics'

describe('Get User Metrics Service', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let sut: GetUserMetricsService

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsService(checkInsRepository)
  })

  it('should be able to get check in Metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toBe(2)
  })
})
