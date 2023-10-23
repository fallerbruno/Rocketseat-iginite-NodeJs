import { makeGetUserProfilesService } from '@/services/factories/make-get-user-profile-service'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const getUserProfile = makeGetUserProfilesService()

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
