import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { createItemController } from '../controllers/create-item-controller'
import { deleteItemController } from '../controllers/delete-item-controller'
import { editItemController } from '../controllers/edit-item-controller'
import { fetchItemsController } from '../controllers/fetch-items-controller'
import { verifyJWT } from '../middlewares/verify-jwt'

export async function itemRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/items',
    {
      onRequest: [verifyJWT],
      schema: {
        tags: ['Items'],
        security: [{ authorization: [] }],
        body: z.object({
          name: z.string(),
          points: z.coerce.number(),
        }),
        response: {
          201: z.null(),
        },
      },
    },
    createItemController
  )
  app.withTypeProvider<ZodTypeProvider>().get(
    '/items',
    {
      schema: {
        tags: ['Items'],
        querystring: z.object({
          page: z.coerce.number().default(1),
        }),
        response: {
          200: z.object({
            items: z.array(
              z.object({
                id: z.string().uuid(),
                name: z.string(),
                points: z.number(),
              })
            ),
          }),
        },
      },
    },
    fetchItemsController
  )

  app.withTypeProvider<ZodTypeProvider>().put(
    '/items/:itemId',
    {
      onRequest: [verifyJWT],
      schema: {
        tags: ['Items'],
        security: [{ authorization: [] }],
        params: z.object({
          itemId: z.string().uuid(),
        }),
        body: z.object({
          name: z.string().optional(),
          points: z.coerce.number().optional(),
        }),
        response: {
          204: z.null(),
        },
      },
    },
    editItemController
  )

  app.withTypeProvider<ZodTypeProvider>().delete(
    '/items/:itemId',
    {
      onRequest: [verifyJWT],
      schema: {
        tags: ['Items'],
        security: [{ authorization: [] }],
        params: z.object({
          itemId: z.string().uuid(),
        }),
        response: {
          204: z.null(),
        },
      },
    },
    deleteItemController
  )
}
