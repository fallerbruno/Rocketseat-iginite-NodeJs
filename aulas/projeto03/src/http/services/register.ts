import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterServiceRequest {
  name: string
  email: string
  password: string
}

export class RegisterService {
  // define o construtor para inversão de dependências do UsersRepository
  constructor(private usersRepository: UsersRepository) {}

  // so pode ter um método execute por classe
  async execute({ name, email, password }: RegisterServiceRequest) {
    const password_hash = await hash(password, 6)

    // chama o método findByEmail do UsersRepository
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('Email already in use')
    }

    await this.usersRepository.create({ name, email, password_hash })
  }
}
