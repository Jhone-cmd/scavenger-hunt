import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import fastify from 'fastify'
import { errorHandler } from './error-handler'
import { env } from './infra/env/schema'
import { accountRoutes } from './infra/http/routes/account-routes'

export const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: env.JWT_SECRET,
})

app.register(accountRoutes)

app.setErrorHandler(errorHandler)
