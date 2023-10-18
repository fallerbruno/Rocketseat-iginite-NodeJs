import { Prisma, CheckIn } from '@prisma/client'
// cria a interface que deve ser seguida pelo repositório definindo os métodos que devem ser implementados
export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
}
