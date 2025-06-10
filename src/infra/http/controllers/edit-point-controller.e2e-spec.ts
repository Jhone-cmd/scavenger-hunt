import { app } from '@/app'
import { prisma } from '@/infra/lib/prisma'
import request from 'supertest'
import { createAccountAndAuthenticate } from '../../../../test/utils/create-account-and-authenticate'
import { createInstitutionClassItem } from '../../../../test/utils/create-institution-class-item'

describe('Edit Point (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[PUT] should be able to edit point', async () => {
    const { token } = await createAccountAndAuthenticate(app)
    const { classId, itemId } = await createInstitutionClassItem()

    const point = await prisma.points.create({
      data: {
        classId,
        itemId,
        amount: 1,
        total: 200,
      },
    })

    const pointId = point.id

    const result = await request(app.server)
      .delete(`/points/${pointId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: 5,
      })

    expect(result.statusCode).toEqual(204)
  })
})
