import { makeGetUserMetricsUserCase } from '@/services/factories/make-get-user-metrics-service'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  //  cria uma nova estancia do PrismaUsersRepository e manda pro service como dependência
  const metricsService = makeGetUserMetricsUserCase()

  // chama o método execute do RegisterService previamente instanciado
  const { checkInsCount } = await metricsService.execute({
    userId: request.user.sub,
  })

  reply.status(201).send({
    checkInsCount,
  })
}
