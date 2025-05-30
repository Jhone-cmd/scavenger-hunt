import { prisma } from '@/infra/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAccountAndAuthenticate(app: FastifyInstance) {
  await prisma.accounts.create({
    data: {
      name: 'account-1',
      email: 'admin@email.com',
      password: await hash('12345678', 8),
    },
  })

  const response = await request(app.server).post('/sessions').send({
    email: 'admin@email.com',
    password: '12345678',
  })

  const token = response.body.access_token

  return { token }
}
