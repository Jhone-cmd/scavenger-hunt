import { FastifyInstance } from 'fastify'
import { createItemController } from '../controllers/create-item-controller'
import { verifyJWT } from '../middlewares/verify-jwt'

export async function itemRoutes(app: FastifyInstance) {
  app.post('/items', { onRequest: [verifyJWT] }, createItemController)
}
