import { app } from '@/app'
import { prisma } from '@/infra/lib/prisma'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { createAccountAndAuthenticate } from '../../../../test/utils/create-account-and-authenticate'

describe('Change Account Password (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[PATCH] should be able to change account password', async () => {
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
      .patch(`/accounts/${accountId}/change-password`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        password: 'new password',
      })

    expect(result.statusCode).toEqual(204)
  })
})
