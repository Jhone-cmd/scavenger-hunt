import { AccountAlreadyExists } from '@/core/error/account-already-exists'
import { makeRegisterAccountUseCase } from '@/infra/factories/make-register-account-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerAccountController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerAccountUseCase = makeRegisterAccountUseCase()
    await registerAccountUseCase.execute({ name, email, password })
  } catch (error) {
    if (error instanceof AccountAlreadyExists) {
      return reply.status(409).send({ error: error.message })
    }
    throw error
  }

  return reply.status(201).send()
}
