import { FastifyInstance } from 'fastify'
import { createInstitutionController } from '../controllers/create-institution-controller'
import { verifyJWT } from '../middlewares/verify-jwt'

export async function institutionRoutes(app: FastifyInstance) {
  app.post(
    '/institutions',
    { onRequest: [verifyJWT] },
    createInstitutionController
  )
}
