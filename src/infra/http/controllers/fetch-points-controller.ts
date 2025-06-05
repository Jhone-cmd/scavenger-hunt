import { ResourceNotFound } from '@/core/error/resource-not-found'
import { makeFetchPointsUseCase } from '@/infra/factories/make-fetch-points-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PointPresenter } from '../presenters/point-presenter'

export async function fetchPointsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchPointQuerySchema = z.object({
    page: z.coerce.number().default(1),
  })

  const { page } = fetchPointQuerySchema.parse(request.params)

  try {
    const fetchPointsUseCase = makeFetchPointsUseCase()
    const { points } = await fetchPointsUseCase.execute({ page })

    return reply.status(200).send({ points: points.map(PointPresenter.toHttp) })
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(400).send({ error: error.message })
    }

    throw error
  }
}
