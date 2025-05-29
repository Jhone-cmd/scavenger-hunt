import fastify from 'fastify'
import { errorHandler } from './error-handler'
import { accountRoutes } from './infra/http/routes/account-routes'

export const app = fastify()

app.register(accountRoutes)

app.setErrorHandler(errorHandler)
