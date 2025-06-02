import { app } from '@/app'
import { prisma } from '@/infra/lib/prisma'
import request from 'supertest'
import { createAccountAndAuthenticate } from '../../../../test/utils/create-account-and-authenticate'

describe('Fetch Item (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[POST] should be able to fetch items', async () => {
    const { token } = await createAccountAndAuthenticate(app)

    const items = await prisma.items.createMany({
      data: [
        { name: 'item-1', points: 100 },
        { name: 'item-2', points: 200 },
        { name: 'item-3', points: 150 },
      ],
    })

    const result = await request(app.server).get('/items').send()

    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual({
      items: expect.arrayContaining([
        expect.objectContaining({
          props: expect.objectContaining({ name: 'item-1' }),
        }),
        expect.objectContaining({
          props: expect.objectContaining({ name: 'item-2' }),
        }),
        expect.objectContaining({
          props: expect.objectContaining({ name: 'item-3' }),
        }),
      ]),
    })
  })
})
