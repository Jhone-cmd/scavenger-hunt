import { ResourceNotFound } from '@/core/error/resource-not-found'
import { makeFetchClassesUseCase } from '@/infra/factories/make-fetch-classes-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchClassesController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchClasseQuerySchema = z.object({
    page: z.coerce.number().default(1),
  })

  const { page } = fetchClasseQuerySchema.parse(request.params)

  try {
    const fetchClassesUseCase = makeFetchClassesUseCase()
    const { classes } = await fetchClassesUseCase.execute({ page })

    return reply.status(200).send({ classes })
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(400).send({ error: error.message })
    }

    throw error
  }
}
