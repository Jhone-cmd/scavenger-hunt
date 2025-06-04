import { ResourceNotFound } from '@/core/error/resource-not-found'
import { makeFetchInstitutionsUseCase } from '@/infra/factories/make-fetch-institutions-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchInstitutionsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchInstitutionQuerySchema = z.object({
    page: z.coerce.number().default(1),
  })

  const { page } = fetchInstitutionQuerySchema.parse(request.params)

  try {
    const fetchInstitutionsUseCase = makeFetchInstitutionsUseCase()
    const { institutions } = await fetchInstitutionsUseCase.execute({ page })

    return reply.status(200).send({ institutions })
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(400).send({ error: error.message })
    }

    throw error
  }
}
