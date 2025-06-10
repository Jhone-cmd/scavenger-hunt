import { ResourceNotFound } from '@/core/error/resource-not-found'
import { makeEditClassUseCase } from '@/infra/factories/make-edit-class-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function editClassController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const editClassParamSchema = z.object({
    classId: z.string().uuid(),
  })

  const editClassBodySchema = z.object({
    name: z.string().optional(),
    teacher: z.string().optional(),
  })

  const { classId } = editClassParamSchema.parse(request.params)
  const { name, teacher } = editClassBodySchema.parse(request.body)

  try {
    const editClassUseCase = makeEditClassUseCase()
    await editClassUseCase.execute({
      classId,
      name,
      teacher,
    })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(400).send({ error: error.message })
    }

    throw error
  }
}
