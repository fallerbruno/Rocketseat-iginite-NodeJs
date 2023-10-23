import { makeCreateGymService } from '@/services/factories/make-create-gym-service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string().min(3).max(255),
    description: z.string().nullable(),
    phone: z.string().min(6).nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { title, description, phone, latitude, longitude } =
    createGymBodySchema.parse(request.body)

  //  cria uma nova estancia do PrismaUsersRepository e manda pro service como dependência
  const createService = makeCreateGymService()

  // chama o método execute do RegisterService previamente instanciado
  const { gym } = await createService.execute({
    title,
    description,
    phone,
    longitude,
    latitude,
  })

  reply.status(201).send({
    gym,
  })
}
