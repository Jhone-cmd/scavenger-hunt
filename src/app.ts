import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify, { FastifyReply } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { errorHandler } from './error-handler'
import { env } from './infra/env/schema'
import { accountRoutes } from './infra/http/routes/account-routes'
import { classRoutes } from './infra/http/routes/class-routes'
import { institutionRoutes } from './infra/http/routes/institution-routes'
import { itemRoutes } from './infra/http/routes/item-routes'
import { pointRoutes } from './infra/http/routes/point-routes'

export const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'API do Scavenger-Hunt',
      description:
        'Documentação da api scavenger-hunt utilizando o framework fastify, ela serve para auxiliar as gincanas de festas juninas das instituições escolares.',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        authorization: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },

  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    // Ordena as tags manualmente, colocando 'Classification' primeiro
    tagsSorter: (a, b) => {
      if (a === 'Classification') return -1
      if (b === 'Classification') return 1
      return 0 // as outras tags ficarão na ordem padrão
    },
  },
})

app.get('/', async (_, reply: FastifyReply) => {
  reply.redirect('/docs')
})

app.register(accountRoutes)
app.register(institutionRoutes)
app.register(classRoutes)
app.register(itemRoutes)
app.register(pointRoutes)

app.setErrorHandler(errorHandler)
