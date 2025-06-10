import { ResourceNotFound } from '@/core/error/resource-not-found'
import { makeDeleteItemUseCase } from '@/infra/factories/make-delete-item-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteItemController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteItemParamSchema = z.object({
    itemId: z.string().uuid(),
  })

  const { itemId } = deleteItemParamSchema.parse(request.params)

  try {
    const deleteItemUseCase = makeDeleteItemUseCase()
    await deleteItemUseCase.execute({
      itemId,
    })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(400).send({ error: error.message })
    }

    throw error
  }
}
