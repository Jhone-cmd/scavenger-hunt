import { ResourceNotFound } from '@/core/error/resource-not-found'
import { makeInsertionPointUseCase } from '@/infra/factories/make-insertion-points-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function insertionPointsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const insertionPointsParamSchema = z.object({
    classId: z.string().uuid(),
  })

  const insertionPointsBodySchema = z.object({
    itemId: z.string().uuid(),
    amount: z.coerce.number(),
  })

  const { classId } = insertionPointsParamSchema.parse(request.params)
  const { itemId, amount } = insertionPointsBodySchema.parse(request.body)

  try {
    const insertionPointsUseCase = makeInsertionPointUseCase()
    const { point } = await insertionPointsUseCase.execute({
      classId,
      itemId,
      amount,
    })

    return reply.status(201).send({ point })
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(400).send({ error: error.message })
    }

    throw error
  }
}
