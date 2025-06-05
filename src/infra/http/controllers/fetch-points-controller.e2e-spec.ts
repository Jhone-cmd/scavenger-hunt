import { app } from '@/app'
import { prisma } from '@/infra/lib/prisma'
import request from 'supertest'
import { createAccountAndAuthenticate } from '../../../../test/utils/create-account-and-authenticate'
import { createInstitutionClassItem } from '../../../../test/utils/create-institution-class-item'

describe('Fetch Point (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] should be able to fetch points', async () => {
    const { token } = await createAccountAndAuthenticate(app)

    const { classId, itemId } = await createInstitutionClassItem()
    await prisma.points.createMany({
      data: [
        { classId, itemId, amount: 1, total: 150 },
        { classId, itemId, amount: 2, total: 300 },
        { classId, itemId, amount: 3, total: 450 },
      ],
    })

    const result = await request(app.server)
      .get('/points')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual({
      points: expect.arrayContaining([
        expect.objectContaining({ classe: '1º C', total: 150 }),
        expect.objectContaining({ classe: '1º C', total: 300 }),
        expect.objectContaining({ classe: '1º C', total: 450 }),
      ]),
    })
  })
})
