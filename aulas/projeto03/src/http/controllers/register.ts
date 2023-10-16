import { FastifyRequest, FastifyReply } from 'fastify'
import { RegisterService } from '../services/register'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

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
    const usersRepository = new PrismaUsersRepository()

    const registerService = new RegisterService(usersRepository)

    // chama o método execute do RegisterService previamente instanciado
    await registerService.execute({ name, email, password })
  } catch (error) {
    return reply.status(409).send()
  }

  reply.status(201).send()
}
