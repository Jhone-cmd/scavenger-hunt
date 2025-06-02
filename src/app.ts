import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import fastify from 'fastify'
import { errorHandler } from './error-handler'
import { env } from './infra/env/schema'
import { accountRoutes } from './infra/http/routes/account-routes'
import { classRoutes } from './infra/http/routes/class-routes'
import { institutionRoutes } from './infra/http/routes/institution-routes'
import { itemRoutes } from './infra/http/routes/item-routes'
import { pointRoutes } from './infra/http/routes/point-routes'

export const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: env.JWT_SECRET,
})

app.register(accountRoutes)
app.register(institutionRoutes)
app.register(classRoutes)
app.register(itemRoutes)
app.register(pointRoutes)

app.setErrorHandler(errorHandler)
