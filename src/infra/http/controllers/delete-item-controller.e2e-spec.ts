import { app } from '@/app'
import { prisma } from '@/infra/lib/prisma'
import request from 'supertest'
import { createAccountAndAuthenticate } from '../../../../test/utils/create-account-and-authenticate'

describe('Delete Item (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[DELETE] should be able to delete item', async () => {
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
      .send()

    expect(result.statusCode).toEqual(204)
  })
})
