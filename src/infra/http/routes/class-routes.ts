import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { insertionPointsController } from '../controllers/insertion-points-controller'
import { verifyJWT } from '../middlewares/verify-jwt'

export async function classRoutes(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post(
      '/classes/:classId/points',
      { onRequest: [verifyJWT] },
      insertionPointsController
    )
}
