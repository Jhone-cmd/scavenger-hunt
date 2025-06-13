import { ResourceNotFound } from '@/core/error/resource-not-found'
import { makeEditAccountUseCase } from '@/infra/factories/make-edit-account-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function editAccountController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const editAccountParamSchema = z.object({
    accountId: z.string().uuid(),
  })

  const editAccountBodySchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
  })

  const { accountId } = editAccountParamSchema.parse(request.params)

  const { name, email } = editAccountBodySchema.parse(request.body)

  try {
    const editAccountUseCase = makeEditAccountUseCase()
    await editAccountUseCase.execute({ accountId, name, email })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(400).send({ error: error.message })
    }

    throw error
  }
}
