import fastify from 'fastify'
import { accountRoutes } from './infra/http/routes/account-routes'

export const app = fastify()

app.register(accountRoutes)
