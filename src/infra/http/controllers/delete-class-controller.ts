import { ResourceNotFound } from '@/core/error/resource-not-found'
import { makeDeleteClassUseCase } from '@/infra/factories/make-delete-class-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteClassController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteClassParamSchema = z.object({
    classId: z.string().uuid(),
  })

  const { classId } = deleteClassParamSchema.parse(request.params)

  try {
    const deleteClassUseCase = makeDeleteClassUseCase()
    await deleteClassUseCase.execute({
      classId,
    })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(400).send({ error: error.message })
    }

    throw error
  }
}
