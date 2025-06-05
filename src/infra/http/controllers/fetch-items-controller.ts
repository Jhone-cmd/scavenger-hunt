import { ResourceNotFound } from '@/core/error/resource-not-found'
import { makeFetchItemsUseCase } from '@/infra/factories/make-fetch-items-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ItemPresente } from '../presenters/item-presenter'

export async function fetchItemsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchItemQuerySchema = z.object({
    page: z.coerce.number().default(1),
  })

  const { page } = fetchItemQuerySchema.parse(request.params)

  try {
    const fetchItemsUseCase = makeFetchItemsUseCase()
    const { items } = await fetchItemsUseCase.execute({ page })

    return reply.status(200).send({ items: items.map(ItemPresente.toHttp) })
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(400).send({ error: error.message })
    }

    throw error
  }
}
