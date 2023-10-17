import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '../services/errors/invalid-credentials-error'
import { makeAuthenticateService } from '../services/factories/make-authenticate-service'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(255),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)
  // faz dentro do try catch para capturar os erros e mandar retornar em casa de sucesso ou erro
  try {
    //  cria uma nova estancia do PrismaUsersRepository e manda pro service como dependência
    const authenticateService = makeAuthenticateService()

    // chama o método execute do RegisterService previamente instanciado
    await authenticateService.execute({ email, password })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }

  reply.status(200).send()
}