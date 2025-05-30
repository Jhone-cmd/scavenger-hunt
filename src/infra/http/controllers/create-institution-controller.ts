import { ResourceAlreadyExists } from '@/core/error/resource-already-exists'
import { makeInstitutionUseCase } from '@/infra/factories/make-create-institution-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createInstitutionController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createInstitutionBodySchema = z.object({
    name: z.string(),
    responsible: z.string(),
    address: z.string(),
    phone: z.string(),
  })

  const { name, responsible, address, phone } =
    createInstitutionBodySchema.parse(request.body)

  try {
    const institutionUseCase = makeInstitutionUseCase()
    const { institution } = await institutionUseCase.execute({
      name,
      responsible,
      address,
      phone,
    })

    return reply.status(201).send({ institution })
  } catch (error) {
    if (error instanceof ResourceAlreadyExists) {
      return reply.status(400).send({ error: error.message })
    }
  }
}
