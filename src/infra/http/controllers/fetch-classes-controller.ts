import { ResourceNotFound } from '@/core/error/resource-not-found'
import { makeFetchClassesUseCase } from '@/infra/factories/make-fetch-classes-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ClassPresenter } from '../presenters/class-presenter'

export async function fetchClassesController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchClasseParamSchema = z.object({
    institutionId: z.string().uuid(),
  })
  const fetchClasseQuerySchema = z.object({
    page: z.coerce.number().default(1),
  })

  const { institutionId } = fetchClasseParamSchema.parse(request.params)
  const { page } = fetchClasseQuerySchema.parse(request.query)

  try {
    const fetchClassesUseCase = makeFetchClassesUseCase()
    const { classes } = await fetchClassesUseCase.execute({
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
