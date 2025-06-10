import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { createClassController } from '../controllers/create-class-controller'
import { createInstitutionController } from '../controllers/create-institution-controller'
import { deleteInstitutionController } from '../controllers/delete-institution-controller'
import { editInstitutionController } from '../controllers/edit-institution-controller'
import { fetchInstitutionsController } from '../controllers/fetch-institutions-controller'
import { fetchSpecificClassesController } from '../controllers/fetch-specific-classes-controller'
import { verifyJWT } from '../middlewares/verify-jwt'

export async function institutionRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/institutions',
    {
      onRequest: [verifyJWT],
      schema: {
        tags: ['Institutions'],
        security: [{ authorization: [] }],
        body: z.object({
          name: z.string(),
          responsible: z.string(),
          address: z.string(),
          phone: z.string(),
        }),
        response: {
          201: z.null(),
        },
      },
    },
    createInstitutionController
  )

  app.withTypeProvider<ZodTypeProvider>().post(
    '/institutions/:institutionId/classes',
    {
      onRequest: [verifyJWT],
      schema: {
        tags: ['Classes'],
        security: [{ authorization: [] }],
        params: z.object({
          institutionId: z.string().uuid(),
        }),
        body: z.object({
          name: z.string(),
          teacher: z.string(),
        }),
        response: {
          201: z.null(),
        },
      },
    },
    createClassController
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    '/institutions',
    {
      schema: {
        tags: ['Institutions'],
        querystring: z.object({
          page: z.coerce.number().default(1),
        }),
        response: {
          200: z.object({
            institutions: z.array(
              z.object({
                id: z.string().uuid(),
                name: z.string(),
                address: z.string(),
                phone: z.string(),
              })
            ),
          }),
        },
      },
    },
    fetchInstitutionsController
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    '/institutions/:institutionId/classes',
    {
      schema: {
        tags: ['Classes'],
        querystring: z.object({
          page: z.coerce.number().default(1),
        }),
        params: z.object({
          institutionId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            classes: z.array(
              z.object({
                id: z.string().uuid(),
                institution: z.string().nullish(),
                name: z.string(),
                teacher: z.string(),
              })
            ),
          }),
        },
      },
    },
    fetchSpecificClassesController
  )

  app.withTypeProvider<ZodTypeProvider>().put(
    '/institutions/:institutionId',
    {
      onRequest: [verifyJWT],
      schema: {
        tags: ['Institutions'],
        security: [{ authorization: [] }],
        params: z.object({
          institutionId: z.string().uuid(),
        }),
        body: z.object({
          name: z.string().optional(),
          responsible: z.string().optional(),
          address: z.string().optional(),
          phone: z.string().optional(),
        }),
        response: {
          204: z.null(),
        },
      },
    },
    editInstitutionController
  )

  app.withTypeProvider<ZodTypeProvider>().delete(
    '/institutions/:institutionId',
    {
      onRequest: [verifyJWT],
      schema: {
        tags: ['Institutions'],
        security: [{ authorization: [] }],
        params: z.object({
          institutionId: z.string().uuid(),
        }),
        response: {
          204: z.null(),
        },
      },
    },
    deleteInstitutionController
  )
}
