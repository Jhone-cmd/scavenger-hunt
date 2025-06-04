import { FastifyInstance } from 'fastify'
import { fetchClassesController } from '../controllers/fetch-classes-controller'
import { insertionPointsController } from '../controllers/insertion-points-controller'
import { verifyJWT } from '../middlewares/verify-jwt'

export async function classRoutes(app: FastifyInstance) {
  app.post(
    '/classes/:classId/points',
    { onRequest: [verifyJWT] },
    insertionPointsController
  )

  app.get('/classes', fetchClassesController)
}
