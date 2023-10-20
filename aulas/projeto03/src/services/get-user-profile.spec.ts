import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileService } from './get-user-profile'
import { ResourceNotExist } from './errors/resource-not-exists'

describe('Get User Profile Service', () => {
  let usersRepository: InMemoryUsersRepository
  let sut: GetUserProfileService

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileService(usersRepository)
  })

  it('should be able get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('John Doe')
  })

  it('should be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'wrong-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotExist)
  })
})
