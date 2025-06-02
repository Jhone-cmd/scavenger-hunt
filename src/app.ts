import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import fastify from 'fastify'
import { errorHandler } from './error-handler'
import { env } from './infra/env/schema'
import { accountRoutes } from './infra/http/routes/account-routes'
import { institutionRoutes } from './infra/http/routes/institution-routes'
import { itemRoutes } from './infra/http/routes/item-routes'

export const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: env.JWT_SECRET,
})

app.register(accountRoutes)
app.register(institutionRoutes)
app.register(itemRoutes)

app.setErrorHandler(errorHandler)
