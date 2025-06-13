import { ResourceNotFound } from '@/core/error/resource-not-found'
import { makeDeleteAccountUseCase } from '@/infra/factories/make-delete-account-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteAccountController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteAccountParamSchema = z.object({
    accountId: z.string().uuid(),
  })

  const { accountId } = deleteAccountParamSchema.parse(request.params)

  try {
    const deleteAccountUseCase = makeDeleteAccountUseCase()
    await deleteAccountUseCase.execute({ accountId })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(400).send({ error: error.message })
    }

    throw error
  }
}
