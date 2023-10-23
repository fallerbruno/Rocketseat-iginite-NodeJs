import { makeFetchUserCheckInHistoryService } from '@/services/factories/make-fetch-user-check-in-history-service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  //  cria uma nova estancia do PrismaUsersRepository e manda pro service como dependência
  const historyService = makeFetchUserCheckInHistoryService()

  // chama o método execute do RegisterService previamente instanciado
  const { checkIns } = await historyService.execute({
    userId: request.user.sub,
    page,
  })

  reply.status(201).send({
    checkIns,
  })
}
