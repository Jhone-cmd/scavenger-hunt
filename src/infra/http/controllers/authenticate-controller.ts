import { InvalidCredentials } from '@/core/error/invalid-credentials'
import { makeAuthenticateUseCase } from '@/infra/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()
    const { accessToken } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: accessToken,
          expiresIn: '7d',
        },
      }
    )

    return reply.status(200).send({ access_token: token })
  } catch (error) {
    if (error instanceof InvalidCredentials) {
      return reply.status(400).send({ error: error.message })
    }

    throw error
  }
}
