import { ResourceNotFound } from '@/core/error/resource-not-found'
import { makeDeletePointUseCase } from '@/infra/factories/make-delete-point-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deletePointController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deletePointParamSchema = z.object({
    pointId: z.string().uuid(),
  })

  const { pointId } = deletePointParamSchema.parse(request.params)

  try {
    const deletePointUseCase = makeDeletePointUseCase()
    await deletePointUseCase.execute({
      pointId,
    })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(400).send({ error: error.message })
    }

    throw error
  }
}
