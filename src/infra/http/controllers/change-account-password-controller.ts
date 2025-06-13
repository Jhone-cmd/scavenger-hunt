import { ResourceNotFound } from '@/core/error/resource-not-found'
import { makeChangeAccountPasswordUseCase } from '@/infra/factories/make-change-account-password-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function changeAccountPasswordController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const changeAccountPasswordParamSchema = z.object({
    accountId: z.string().uuid(),
  })

  const changeAccountPasswordBodySchema = z.object({
    password: z.string().min(8),
  })

  const { accountId } = changeAccountPasswordParamSchema.parse(request.params)

  const { password } = changeAccountPasswordBodySchema.parse(request.body)

  try {
    const changeAccountPasswordUseCase = makeChangeAccountPasswordUseCase()
    await changeAccountPasswordUseCase.execute({ accountId, password })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(400).send({ error: error.message })
    }

    throw error
  }
}
