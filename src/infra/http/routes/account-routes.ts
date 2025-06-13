import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { authenticateController } from '../controllers/authenticate-controller'
import { deleteAccountController } from '../controllers/delete-account-controller'
import { editAccountController } from '../controllers/edit-account-controller'
import { registerAccountController } from '../controllers/register-account-controller'
import { verifyJWT } from '../middlewares/verify-jwt'

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

  app.withTypeProvider<ZodTypeProvider>().put(
    '/accounts/:accountId',
    {
      onRequest: [verifyJWT],
      schema: {
        tags: ['Accounts'],
        security: [{ authorization: [] }],
        params: z.object({
          accountId: z.string().uuid(),
        }),
        body: z.object({
          name: z.string().optional(),
          email: z.string().email().optional(),
        }),
        response: {
          204: z.null(),
        },
      },
    },
    editAccountController
  )

  app.withTypeProvider<ZodTypeProvider>().delete(
    '/accounts/:accountId',
    {
      onRequest: [verifyJWT],
      schema: {
        tags: ['Accounts'],
        security: [{ authorization: [] }],
        params: z.object({
          accountId: z.string().uuid(),
        }),
        response: {
          204: z.null(),
        },
      },
    },
    deleteAccountController
  )
}
