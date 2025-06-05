import { makeClassification } from '@/infra/factories/make-classification-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ClassificationPresenter } from '../presenters/classification-presenter'

export async function classificationController(
  _: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const classificationUseCase = makeClassification()
    const { classification } = await classificationUseCase.execute()
    return reply.status(200).send({
      classification: classification.map(ClassificationPresenter.toHttp),
    })
  } catch (error) {
    return reply.status(400).send({ error })
  }
}
