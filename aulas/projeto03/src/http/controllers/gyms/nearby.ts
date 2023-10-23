import { makeFetchNearbyGymsService } from '@/services/factories/make-fetch-nearby-service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQueryParams = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
    page: z.coerce.number().default(1),
  })

  const { latitude, longitude } = nearbyGymsQueryParams.parse(request.query)

  //  cria uma nova estancia do PrismaUsersRepository e manda pro service como dependência
  const nearbyService = makeFetchNearbyGymsService()

  // chama o método execute do RegisterService previamente instanciado
  const { gyms } = await nearbyService.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  reply.status(200).send({ gyms })
}
