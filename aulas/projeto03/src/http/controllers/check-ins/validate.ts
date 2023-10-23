import { makeValidateCheckInService } from '@/services/factories/make-validate-check-in-service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInRouteParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInRouteParamsSchema.parse(request.params)

  //  cria uma nova estancia do PrismaUsersRepository e manda pro service como dependência
  const validateService = makeValidateCheckInService()

  // chama o método execute do RegisterService previamente instanciado
  const { checkIn } = await validateService.execute({
    checkInId,
  })

  reply.status(204).send({
    checkIn,
  })
}
