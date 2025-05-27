import { FastifyInstance } from 'fastify'
import { registerAccountController } from '../controllers/register-account-controller'

export async function routes(app: FastifyInstance) {
  app.post('/accounts', registerAccountController)
}
