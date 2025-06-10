import { ResourceNotFound } from '@/core/error/resource-not-found'
import { makeEditPointUseCase } from '@/infra/factories/make-edit-point-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function editPointController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const editPointParamSchema = z.object({
    pointId: z.string().uuid(),
  })

  const editPointBodySchema = z.object({
    itemId: z.string().uuid().optional(),
    amount: z.coerce.number().optional(),
  })

  const { pointId } = editPointParamSchema.parse(request.params)
  const { itemId, amount } = editPointBodySchema.parse(request.body)

  try {
    const editPointUseCase = makeEditPointUseCase()
    await editPointUseCase.execute({
      pointId,
      itemId,
      amount,
    })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(400).send({ error: error.message })
    }

    throw error
  }
}
