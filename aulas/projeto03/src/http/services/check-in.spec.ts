import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckInService } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-chek-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckinsError } from './errors/max-number-of-check-ins-erro'
import { MaxDistanceError } from './errors/max-distance-error'

describe('Check Ins Service', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let gymsRepository: InMemoryGymsRepository
  let sut: CheckInService

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInService(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-id',
      title: 'Academia',
      description: 'Academia de musculação',
      latitude: -30.1857986,
      longitude: -52.3698176,
      phone: '999999999',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -30.1857986,
      userLongitude: -52.3698176,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date('2021-01-01 10:00:00'))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -30.1857986,
      userLongitude: -52.3698176,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-id',
        userId: 'user-id',
        userLatitude: -30.1857986,
        userLongitude: -52.3698176,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckinsError)
  })

  it('should be able to check in twice in the diff day', async () => {
    vi.setSystemTime(new Date('2021-01-01 10:00:00'))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -30.1857986,
      userLongitude: -52.3698176,
    })

    vi.setSystemTime(new Date('2021-01-02 10:00:00'))

    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -30.1857986,
      userLongitude: -52.3698176,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-id2',
      title: 'gym-name-a',
      latitude: new Decimal(-30.1623742),
      longitude: new Decimal(-52.2925451),
      phone: 'phone',
      description: 'description',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-id2',
        userId: 'user-id',
        userLatitude: -30.1857986,
        userLongitude: -52.3698176,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
