import { Prisma, User } from '@prisma/client'
// cria a interface que deve ser seguida pelo repositório definindo os métodos que devem ser implementados
export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
