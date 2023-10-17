import { prisma } from '@/db/prisma'
import { Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'

// implementa os métodos da interface UsersRepository aqui utilizando o ORM de preferencia no nosso caso Prisma.
export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
