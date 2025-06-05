import { ResourceNotFound } from '@/core/error/resource-not-found'
import { makeFetchSpecificClassesUseCase } from '@/infra/factories/make-fetch-specific-classes-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ClassPresenter } from '../presenters/class-presenter'

export async function fetchSpecificClassesController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchSpecificClassesParamSchema = z.object({
    institutionId: z.string().uuid(),
  })
  const fetchSpecificClassesQuerySchema = z.object({
    page: z.coerce.number().default(1),
  })

  const { institutionId } = fetchSpecificClassesParamSchema.parse(
    request.params
  )
  const { page } = fetchSpecificClassesQuerySchema.parse(request.query)

  try {
    const fetchSpecificClassesUseCase = makeFetchSpecificClassesUseCase()
    const { classes } = await fetchSpecificClassesUseCase.execute({
      institutionId,
      page,
    })

    return reply
      .status(200)
      .send({ classes: classes.map(ClassPresenter.toHttp) })
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(400).send({ error: error.message })
    }

    throw error
  }
}
