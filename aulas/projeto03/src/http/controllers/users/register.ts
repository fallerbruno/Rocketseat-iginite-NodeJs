import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'
import { makeRegisterService } from '@/services/factories/make-register-service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(255),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)
  // faz dentro do try catch para capturar os erros e mandar retornar em casa de sucesso ou erro
  try {
    //  cria uma nova estancia do PrismaUsersRepository e manda pro service como dependência
    const registerService = makeRegisterService()

    // chama o método execute do RegisterService previamente instanciado
    await registerService.execute({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  reply.status(201).send()
}
