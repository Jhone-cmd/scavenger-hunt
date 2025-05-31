import { ResourceAlreadyExists } from '@/core/error/resource-already-exists'
import { makeCreateClassUseCase } from '@/infra/factories/make-create-class-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createClassController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createClassParamSchema = z.object({
    institutionId: z.string().uuid(),
  })
  const createClassBodySchema = z.object({
    name: z.string(),
    teacher: z.string(),
  })

  const { institutionId } = createClassParamSchema.parse(request.params)
  const { name, teacher } = createClassBodySchema.parse(request.body)

  try {
    const createClassUseCase = makeCreateClassUseCase()
    const { classe } = await createClassUseCase.execute({
      name,
      teacher,
      institutionId,
    })

    return reply.status(201).send({ classe })
  } catch (error) {
    if (error instanceof ResourceAlreadyExists) {
      return reply.status(400).send({ error: error.message })
    }

    throw error
  }
}
