import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'crypto'
import dayJs from 'dayjs'

// repositório em memoria para testes

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async save(checkIn: CheckIn) {
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)

    if (checkInIndex > 0) {
      this.items[checkInIndex] = checkIn
    }

    return checkIn
  }

  async findById(id: string): Promise<CheckIn | null> {
    return this.items.find((checkIn) => checkIn.id === id) || null
  }

  async countByUserId(userId: string): Promise<number> {
    return this.items.filter((checkIn) => checkIn.user_id === userId).length
  }

  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayJs(date).startOf('date')
    const endOfTheDay = dayJs(date).endOf('date')

    const checkOnSameData = this.items.find((checkIn) => {
      const checkInDate = dayJs(checkIn.created_at)
      const inOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && inOnSameDate
    })

    if (!checkOnSameData) {
      return null
    }

    return checkOnSameData
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }
}
