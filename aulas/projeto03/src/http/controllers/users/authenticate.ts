import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateService } from '@/services/factories/make-authenticate-service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

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
    const { user } = await authenticateService.execute({ email, password })

    // se der tudo certo, retorna JWT

    const token = await reply.jwtSign(
      { role: user.role },
      {
        sign: {
          sub: user.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      { role: user.role },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
