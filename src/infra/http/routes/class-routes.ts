import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { fetchClassesController } from '../controllers/fetch-classes-controller'
import { insertionPointsController } from '../controllers/insertion-points-controller'
import { verifyJWT } from '../middlewares/verify-jwt'

export async function classRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/classes/:classId/points',
    {
      onRequest: [verifyJWT],
      schema: {
        tags: ['Points'],
        security: [{ authorization: [] }],
        params: z.object({
          classId: z.string().uuid(),
        }),
        body: z.object({
          itemId: z.string().uuid(),
          amount: z.coerce.number(),
        }),
        response: {
          201: z.null(),
        },
      },
    },
    insertionPointsController
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    '/classes',
    {
      schema: {
        tags: ['Classes'],
        querystring: z.object({
          page: z.coerce.number().default(1),
        }),
        response: {
          200: z.object({
            classes: z.array(
              z.object({
                id: z.string().uuid(),
                institution: z.string(),
                name: z.string(),
                teacher: z.string(),
              })
            ),
          }),
        },
      },
    },
    fetchClassesController
  )
}
