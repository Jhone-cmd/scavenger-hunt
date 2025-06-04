import { FastifyInstance } from 'fastify'
import { classificationController } from '../controllers/classification-controller'
import { fetchPointsController } from '../controllers/fetch-points-controller'
import { verifyJWT } from '../middlewares/verify-jwt'

export async function pointRoutes(app: FastifyInstance) {
  app.get('/classification', classificationController)
  app.get('/points', { onRequest: [verifyJWT] }, fetchPointsController)
}
