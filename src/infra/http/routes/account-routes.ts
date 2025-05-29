import { FastifyInstance } from 'fastify'
import { authenticateController } from '../controllers/authenticate-controller'
import { registerAccountController } from '../controllers/register-account-controller'

export async function accountRoutes(app: FastifyInstance) {
  app.post('/accounts', registerAccountController)
  app.post('/sessions', authenticateController)
}
