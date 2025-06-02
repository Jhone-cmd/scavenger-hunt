import { ResourceAlreadyExists } from '@/core/error/resource-already-exists'
import { makeCreateItemUseCase } from '@/infra/factories/make-create-item-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createItemController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createItemBodySchema = z.object({
    name: z.string(),
    points: z.coerce.number(),
  })

  const { name, points } = createItemBodySchema.parse(request.body)

  try {
    const createItemUseCase = makeCreateItemUseCase()
    const { item } = await createItemUseCase.execute({
      name,
      points,
    })

    return reply.status(201).send({ item })
  } catch (error) {
    if (error instanceof ResourceAlreadyExists) {
      return reply.status(400).send({ error: error.message })
    }

    throw error
  }
}
