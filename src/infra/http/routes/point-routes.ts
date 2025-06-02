import { FastifyInstance } from 'fastify'
import { classificationController } from '../controllers/classification-controller'

export async function pointRoutes(app: FastifyInstance) {
  app.get('/classification', classificationController)
}
