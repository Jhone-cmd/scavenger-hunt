import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { classificationController } from '../controllers/classification-controller'
import { fetchPointsController } from '../controllers/fetch-points-controller'
import { verifyJWT } from '../middlewares/verify-jwt'

export async function pointRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/classification',
    {
      schema: {
        tags: ['Classification'],
        response: {
          200: z.object({
            classification: z.array(
              z.object({
                name: z.string(),
                total: z.number(),
              })
            ),
          }),
        },
      },
    },
    classificationController
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    '/points',
    {
      onRequest: [verifyJWT],
      schema: {
        tags: ['Points'],
        querystring: z.object({
          page: z.coerce.number().default(1),
        }),
        response: {
          200: z.object({
            points: z.array(
              z.object({
                id: z.string(),
                classe: z.string().nullish(),
                item: z.string().nullish(),
                amount: z.number(),
                total: z.number(),
              })
            ),
          }),
        },
      },
    },
    fetchPointsController
  )
}
