import { ResourceNotFound } from '@/core/error/resource-not-found'
import { makeEditInstitutionUseCase } from '@/infra/factories/make-edit-institution-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function editInstitutionController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const editInstitutionParamSchema = z.object({
    institutionId: z.string().uuid(),
  })

  const editInstitutionBodySchema = z.object({
    name: z.string().optional(),
    responsible: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
  })

  const { institutionId } = editInstitutionParamSchema.parse(request.params)
  const { name, responsible, address, phone } = editInstitutionBodySchema.parse(
    request.body
  )

  try {
    const editInstitutionUseCase = makeEditInstitutionUseCase()
    await editInstitutionUseCase.execute({
      institutionId,
      name,
      responsible,
      address,
      phone,
    })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(400).send({ error: error.message })
    }

    throw error
  }
}
