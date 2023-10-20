import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'

interface RegisterServiceRequest {
  name: string
  email: string
  password: string
}

interface RegisterServiceResponse {
  user: User
}

export class RegisterService {
  // define o construtor para inversão de dependências do UsersRepository
  constructor(private usersRepository: UsersRepository) {}

  // so pode ter um método execute por classe
  async execute({
    name,
    email,
    password,
  }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
    const password_hash = await hash(password, 6)

    // chama o método findByEmail do UsersRepository
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }
}
