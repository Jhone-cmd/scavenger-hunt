import fastify from 'fastify'
import { routes } from './infra/routes/routes'

export const app = fastify()

app.register(routes)
