import { app } from '@/app'
import request from 'supertest'
import { createAccountAndAuthenticate } from '../../../../test/utils/create-account-and-authenticate'
import { createInstitutionClassItem } from '../../../../test/utils/create-institution-class-item'

describe('Insertion Points (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[POST] should be able to insertion points', async () => {
    const { token } = await createAccountAndAuthenticate(app)

    const { classId, itemId } = await createInstitutionClassItem()

    const result = await request(app.server)
      .post(`/classes/${classId}/points`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        itemId,
        amount: 5,
      })

    expect(result.statusCode).toEqual(201)
    expect(result.body).toEqual({
      point: expect.objectContaining({
        props: expect.objectContaining({ total: 750 }),
      }),
    })
  })
})
