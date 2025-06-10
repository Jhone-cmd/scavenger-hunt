import { app } from '@/app'
import { prisma } from '@/infra/lib/prisma'
import request from 'supertest'
import { createAccountAndAuthenticate } from '../../../../test/utils/create-account-and-authenticate'

describe('Edit Item (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[PUT] should be able to edit item', async () => {
    const { token } = await createAccountAndAuthenticate(app)
    const item = await prisma.items.create({
      data: {
        name: 'item',
        points: 10,
      },
    })

    const itemId = item.id

    const result = await request(app.server)
      .delete(`/items/${itemId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        points: 150,
      })

    expect(result.statusCode).toEqual(204)
  })
})
