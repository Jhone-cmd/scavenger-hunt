import { app } from '@/app'
import { prisma } from '@/infra/lib/prisma'
import request from 'supertest'

describe('Fetch Institution (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] should be able to fetch institutions', async () => {
    await prisma.institutions.createMany({
      data: [
        {
          name: 'institution-1',
          responsible: 'responsible-1',
          address: 'address',
          phone: 'phone',
        },
        {
          name: 'institution-2',
          responsible: 'responsible-2',
          address: 'address',
          phone: 'phone',
        },
        {
          name: 'institution-3',
          responsible: 'responsible-3',
          address: 'address',
          phone: 'phone',
        },
      ],
    })

    const result = await request(app.server).get('/institutions').send()

    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual({
      institutions: expect.arrayContaining([
        expect.objectContaining({
          props: expect.objectContaining({ name: 'institution-1' }),
        }),
        expect.objectContaining({
          props: expect.objectContaining({ name: 'institution-2' }),
        }),
        expect.objectContaining({
          props: expect.objectContaining({ name: 'institution-3' }),
        }),
      ]),
    })
  })
})
