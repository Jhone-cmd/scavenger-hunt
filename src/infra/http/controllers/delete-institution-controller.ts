import { ResourceNotFound } from '@/core/error/resource-not-found'
import { makeDeleteInstitutionUseCase } from '@/infra/factories/make-delete-institution-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteInstitutionController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteInstitutionParamSchema = z.object({
    institutionId: z.string().uuid(),
  })

  const { institutionId } = deleteInstitutionParamSchema.parse(request.params)

  try {
    const deleteInstitutionUseCase = makeDeleteInstitutionUseCase()
    await deleteInstitutionUseCase.execute({
      institutionId,
    })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(400).send({ error: error.message })
    }

    throw error
  }
}
