import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { authenticateController } from '../controllers/authenticate-controller'
import { registerAccountController } from '../controllers/register-account-controller'

export async function accountRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/accounts',
    {
      schema: {
        tags: ['Accounts'],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(8),
        }),
        response: {
          201: z.null(),
        },
      },
    },
    registerAccountController
  )
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions',
    {
      schema: {
        tags: ['Accounts'],
        body: z.object({
          email: z.string().email(),
          password: z.string().min(8),
        }),
        response: {
          200: z.object({
            access_token: z.string(),
          }),
        },
      },
    },
    authenticateController
  )
}
