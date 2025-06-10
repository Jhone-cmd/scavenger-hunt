import { ResourceNotFound } from '@/core/error/resource-not-found'
import { makeEditItemUseCase } from '@/infra/factories/make-edit-item-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function editItemController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const editItemParamSchema = z.object({
    itemId: z.string().uuid(),
  })

  const editItemBodySchema = z.object({
    name: z.string().optional(),
    points: z.coerce.number().optional(),
  })

  const { itemId } = editItemParamSchema.parse(request.params)
  const { name, points } = editItemBodySchema.parse(request.body)

  try {
    const editItemUseCase = makeEditItemUseCase()
    await editItemUseCase.execute({
      itemId,
      name,
      points,
    })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(400).send({ error: error.message })
    }

    throw error
  }
}
