import { app } from '@/app'
import { prisma } from '@/infra/lib/prisma'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { createAccountAndAuthenticate } from '../../../../test/utils/create-account-and-authenticate'

describe('Edit Account (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[PUT] should be able to edit account', async () => {
    const { token } = await createAccountAndAuthenticate(app)
    const account = await prisma.accounts.create({
      data: {
        name: 'fulano',
        email: 'fulano@email.com',
        password: await hash('123456789', 8),
      },
    })

    const accountId = account.id

    const result = await request(app.server)
      .put(`/accounts/${accountId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'fulano tal',
      })

    expect(result.statusCode).toEqual(204)
  })
})
