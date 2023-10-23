import { makeCheckInService } from '@/services/factories/make-check-in-service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInRouteParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)
  const { gymId } = createCheckInRouteParamsSchema.parse(request.params)

  //  cria uma nova estancia do PrismaUsersRepository e manda pro service como dependência
  const checkInService = makeCheckInService()

  // chama o método execute do RegisterService previamente instanciado
  const { checkIn } = await checkInService.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  reply.status(201).send({
    checkIn,
  })
}
